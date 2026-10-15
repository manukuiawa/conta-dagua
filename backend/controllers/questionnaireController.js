
const pool = require('../config/database');

const residentValues = {
  '1': 1,
  '2': 2,
  '3-4': 4,
  '5+': 5,
};

const showerValues = {
  under5: 4,
  '5-10': 8,
  '10-15': 13,
  over15: 16,
};

async function saveQuestionnaire(req, res) {
  const answers = req.body;

  const requiredFields = [
    'residents',
    'billTracking',
    'billType',
    'showerFrequency',
    'showerDuration',
    'showerOff',
    'dishwashing',
    'brushingTeeth',
    'reuseWater',
    'laundryFrequency',
    'machineLoad',
    'laundryReuse',
    'toiletType',
    'leakDetected',
    'leakChecking',
    'biggestChallenge',
  ];

  const missingFields = requiredFields.filter(
    (field) =>
      typeof answers[field] !== 'string' ||
      answers[field].trim() === ''
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: 'Preencha todas as perguntas antes de continuar.',
      fields: missingFields,
    });
  }

  const residentsCount = residentValues[answers.residents];
  const showerDuration = showerValues[answers.showerDuration];

  if (residentsCount === undefined || showerDuration === undefined) {
    return res.status(400).json({
      message: 'Uma ou mais respostas são inválidas.',
    });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const questionnaireResult = await client.query(
      `INSERT INTO questionnaires (user_id, status)
       VALUES ($1, $2)
       RETURNING id`,
      [req.userId, 'completed']
    );

    const questionnaireId = questionnaireResult.rows[0].id;

    await client.query(
      `INSERT INTO water_habits (
        questionnaire_id,
        residents_count,
        bill_tracking,
        bill_type,
        shower_frequency,
        shower_duration,
        shower_off,
        dishwashing,
        brushing_teeth,
        reuse_water,
        laundry_frequency,
        machine_load,
        laundry_reuse,
        toilet_type,
        leak_detected,
        leak_checking,
        biggest_challenge
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10, $11, $12, $13, $14, $15, $16, $17
      )`,
      [
        questionnaireId,
        residentsCount,
        answers.billTracking,
        answers.billType,
        answers.showerFrequency,
        showerDuration,
        answers.showerOff,
        answers.dishwashing,
        answers.brushingTeeth,
        answers.reuseWater,
        answers.laundryFrequency,
        answers.machineLoad,
        answers.laundryReuse,
        answers.toiletType,
        answers.leakDetected,
        answers.leakChecking,
        answers.biggestChallenge,
      ]
    );

    await client.query('COMMIT');

    return res.status(201).json({
      message: 'Questionário salvo com sucesso!',
      questionnaireId,
    });
  } catch (error) {
    await client.query('ROLLBACK');

    console.error('Erro ao salvar questionário:', error.message);

    return res.status(500).json({
      message: 'Não foi possível salvar o questionário.',
    });
  } finally {
    client.release();
  }
}

module.exports = { saveQuestionnaire };
