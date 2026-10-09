import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import './Questionnaire.css'

type Answers = {
  residents: string
  billTracking: string
  billType: string
  showerFrequency: string
  showerDuration: string
  showerOff: string
  dishwashing: string
  brushingTeeth: string
  reuseWater: string
  laundryFrequency: string
  machineLoad: string
  laundryReuse: string
  toiletType: string
  leakDetected: string
  leakChecking: string
  biggestChallenge: string
}

type Question = {
  id: keyof Answers
  title: string
  options: { value: string; label: string }[]
}

type QuestionStep = {
  title: string
  description: string
  questions: Question[]
}

const initialAnswers: Answers = {
  residents: '',
  billTracking: '',
  billType: '',
  showerFrequency: '',
  showerDuration: '',
  showerOff: '',
  dishwashing: '',
  brushingTeeth: '',
  reuseWater: '',
  laundryFrequency: '',
  machineLoad: '',
  laundryReuse: '',
  toiletType: '',
  leakDetected: '',
  leakChecking: '',
  biggestChallenge: '',
}

const steps: QuestionStep[] = [
  {
    title: 'Perfil da residência',
    description: 'Vamos conhecer um pouco da sua realidade.',
    questions: [
      {
        id: 'residents',
        title: 'Quantas pessoas moram na sua residência, incluindo você?',
        options: [
          { value: '1', label: '1 pessoa' },
          { value: '2', label: '2 pessoas' },
          { value: '3-4', label: '3 a 4 pessoas' },
          { value: '5+', label: '5 pessoas ou mais' },
        ],
      },
      {
        id: 'billTracking',
        title: 'Você costuma acompanhar o valor da conta de água?',
        options: [
          { value: 'always', label: 'Sempre' },
          { value: 'sometimes', label: 'Às vezes' },
          { value: 'never', label: 'Nunca' },
          { value: 'unknown', label: 'Não tenho acesso a essa informação' },
        ],
      },
      {
        id: 'billType',
        title: 'Como funciona a cobrança da água onde você mora?',
        options: [
          { value: 'individual', label: 'Individual por residência' },
          { value: 'shared', label: 'Compartilhada entre moradores' },
          { value: 'included', label: 'Incluída na taxa do condomínio' },
          { value: 'unknown', label: 'Não sei informar' },
        ],
      },
    ],
  },
  {
    title: 'Banho',
    description: 'O banho é um dos hábitos que podemos avaliar.',
    questions: [
      {
        id: 'showerFrequency',
        title: 'Quantos banhos você costuma tomar por dia?',
        options: [
          { value: '0-1', label: 'Até 1 banho' },
          { value: '2', label: '2 banhos' },
          { value: '3+', label: '3 ou mais banhos' },
          { value: 'varies', label: 'Varia bastante' },
        ],
      },
      {
        id: 'showerDuration',
        title: 'Quanto tempo dura seu banho, em média?',
        options: [
          { value: 'under5', label: 'Até 5 minutos' },
          { value: '5-10', label: 'De 5 a 10 minutos' },
          { value: '10-15', label: 'De 10 a 15 minutos' },
          { value: 'over15', label: 'Mais de 15 minutos' },
        ],
      },
      {
        id: 'showerOff',
        title: 'Você fecha o chuveiro enquanto se ensaboa?',
        options: [
          { value: 'always', label: 'Sempre' },
          { value: 'sometimes', label: 'Às vezes' },
          { value: 'never', label: 'Nunca' },
          { value: 'not_applicable', label: 'Não costumo fazer isso' },
        ],
      },
    ],
  },
  {
    title: 'Cozinha e torneiras',
    description: 'Agora, vamos observar hábitos da rotina diária.',
    questions: [
      {
        id: 'dishwashing',
        title: 'Como você costuma lavar a louça?',
        options: [
          { value: 'tap_on', label: 'Com a torneira aberta durante a lavagem' },
          { value: 'close_tap', label: 'Fecho a torneira enquanto ensaboo' },
          { value: 'basin', label: 'Uso uma bacia ou recipiente' },
          { value: 'dishwasher', label: 'Utilizo lava-louças' },
        ],
      },
      {
        id: 'brushingTeeth',
        title: 'Você fecha a torneira ao escovar os dentes?',
        options: [
          { value: 'always', label: 'Sempre' },
          { value: 'sometimes', label: 'Às vezes' },
          { value: 'never', label: 'Nunca' },
        ],
      },
      {
        id: 'reuseWater',
        title: 'Você reaproveita água em alguma atividade doméstica?',
        options: [
          { value: 'often', label: 'Sim, frequentemente' },
          { value: 'sometimes', label: 'Às vezes' },
          { value: 'no', label: 'Não costumo reaproveitar' },
          { value: 'no_opportunity', label: 'Não sei como fazer isso com segurança' },
        ],
      },
    ],
  },
  {
    title: 'Lavanderia',
    description: 'Vamos entender a frequência e o uso da máquina de lavar.',
    questions: [
      {
        id: 'laundryFrequency',
        title: 'Com que frequência você lava roupas?',
        options: [
          { value: 'daily', label: 'Todos os dias' },
          { value: '2-3', label: '2 a 3 vezes por semana' },
          { value: 'weekly', label: 'Uma vez por semana' },
          { value: 'less', label: 'Menos de uma vez por semana' },
        ],
      },
      {
        id: 'machineLoad',
        title: 'Quando usa a máquina, ela costuma estar cheia?',
        options: [
          { value: 'always', label: 'Sim, geralmente espero encher' },
          { value: 'sometimes', label: 'Depende da quantidade de roupas' },
          { value: 'small', label: 'Costumo lavar poucas peças' },
          { value: 'no_machine', label: 'Não tenho máquina de lavar' },
        ],
      },
      {
        id: 'laundryReuse',
        title: 'Você reaproveita a água da máquina de lavar?',
        options: [
          { value: 'often', label: 'Sim, frequentemente' },
          { value: 'sometimes', label: 'Às vezes' },
          { value: 'no', label: 'Não' },
          { value: 'no_machine', label: 'Não tenho máquina de lavar' },
        ],
      },
    ],
  },
  {
    title: 'Banheiro e pontos de atenção',
    description: 'Por fim, vamos identificar possíveis oportunidades de economia.',
    questions: [
      {
        id: 'toiletType',
        title: 'Sua descarga possui dois botões ou acionamento econômico?',
        options: [
          { value: 'yes', label: 'Sim' },
          { value: 'no', label: 'Não' },
          { value: 'unknown', label: 'Não sei informar' },
        ],
      },
      {
        id: 'leakDetected',
        title: 'Você já percebeu vazamentos na sua residência?',
        options: [
          { value: 'current', label: 'Sim, existe um possível vazamento atualmente' },
          { value: 'past', label: 'Já aconteceu, mas foi resolvido' },
          { value: 'no', label: 'Não percebi vazamentos' },
          { value: 'unknown', label: 'Não tenho certeza' },
        ],
      },
      {
        id: 'leakChecking',
        title: 'Com que frequência você verifica torneiras e descargas?',
        options: [
          { value: 'often', label: 'Frequentemente' },
          { value: 'sometimes', label: 'Às vezes' },
          { value: 'rarely', label: 'Raramente' },
          { value: 'never', label: 'Nunca' },
        ],
      },
      {
        id: 'biggestChallenge',
        title: 'Qual é sua principal dificuldade para economizar água?',
        options: [
          { value: 'cost', label: 'Não conheço o impacto dos meus hábitos' },
          { value: 'routine', label: 'É difícil mudar minha rotina' },
          { value: 'shared_bill', label: 'A conta é compartilhada no condomínio' },
          { value: 'leaks', label: 'Tenho dificuldade para identificar vazamentos' },
          { value: 'other', label: 'Outra dificuldade ou nenhuma em especial' },
        ],
      },
    ],
  },
]

function Questionnaire() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>(initialAnswers)
  const [error, setError] = useState('')
  const [completed, setCompleted] = useState(false)

  const totalQuestions = steps.reduce(
    (total, current) => total + current.questions.length,
    0,
  )

  const answeredCount = Object.values(answers).filter(
    (answer) => answer !== '',
  ).length

  const progress = Math.round((answeredCount / totalQuestions) * 100)
  const currentStep = steps[step]

  function updateAnswer(id: keyof Answers, value: string) {
    setAnswers((current) => ({ ...current, [id]: value }))
    setError('')
  }

  function handleNext(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const unanswered = currentStep.questions.some(
      (question) => !answers[question.id],
    )

    if (unanswered) {
      setError('Responda a todas as perguntas desta etapa para continuar.')
      return
    }

    if (step < steps.length - 1) {
      setStep((current) => current + 1)
      setError('')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setCompleted(true)

    // Temporário: as respostas ainda não são enviadas a um servidor.
    console.log('Respostas do Conta D’Água:', answers)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleBack() {
    if (completed) {
      setCompleted(false)
      return
    }

    if (step > 0) {
      setStep((current) => current - 1)
      setError('')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function restartQuestionnaire() {
    setAnswers(initialAnswers)
    setStep(0)
    setCompleted(false)
    setError('')
  }

  if (completed) {
    return (
      <main className="questionnaire-page">
        <section className="questionnaire-content questionnaire-result">
          <div className="questionnaire-success-icon" aria-hidden="true">
            ✓
          </div>

          <span className="questionnaire-eyebrow">CONTA D’ÁGUA</span>

          <h1>Obrigado por participar!</h1>

          <p className="questionnaire-result-description">
            Suas respostas foram preenchidas. Elas poderão ajudar a
            identificar hábitos e oportunidades de economia de água.
          </p>

          <div className="questionnaire-result-card">
            <span className="questionnaire-result-number">
              {answeredCount} de {totalQuestions}
            </span>
            <span>perguntas respondidas</span>

            <div className="questionnaire-progress-track">
              <div
                className="questionnaire-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <strong>{progress}% concluído</strong>
          </div>

          <button
            type="button"
            className="questionnaire-next questionnaire-result-button"
            onClick={restartQuestionnaire}
          >
            Responder novamente
          </button>

          <Link to="/login" className="questionnaire-home-link">
            Fazer o Login
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="questionnaire-page">
      <section className="questionnaire-content">
        <header className="questionnaire-header">
          <span className="questionnaire-eyebrow">CONTA D’ÁGUA</span>

          <h1>Vamos conhecer seus hábitos?</h1>

          <p>
            Responda às perguntas para identificar oportunidades de
            usar a água de forma mais consciente.
          </p>
        </header>

        <div className="questionnaire-progress">
          <div className="questionnaire-progress-info">
            <span>
              Etapa {step + 1} de {steps.length}
            </span>
            <span>{progress}% respondido</span>
          </div>

          <div
            className="questionnaire-progress-track"
            role="progressbar"
            aria-label="Progresso do questionário"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="questionnaire-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <form className="questionnaire-form" onSubmit={handleNext}>
          <div className="questionnaire-step" key={step}>
            <span className="questionnaire-step-number">
              BLOCO {step + 1}
            </span>

            <h2>{currentStep.title}</h2>

            <p className="questionnaire-step-description">
              {currentStep.description}
            </p>

            {currentStep.questions.map((question, index) => (
              <fieldset className="question-group" key={question.id}>
                <legend>
                  <span className="question-number">
                    {steps
                      .slice(0, step)
                      .reduce(
                        (total, item) => total + item.questions.length,
                        0,
                      ) + index + 1}
                    .
                  </span>{' '}
                  {question.title}
                </legend>

                {question.options.map((option) => (
                  <label
                    className="question-option"
                    key={option.value}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={answers[question.id] === option.value}
                      onChange={() =>
                        updateAnswer(question.id, option.value)
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </fieldset>
            ))}
          </div>

          {error && (
            <p className="questionnaire-error" role="alert">
              {error}
            </p>
          )}

          <div className="questionnaire-actions">
            {step === 0 ? (
              <Link to="/login" className="questionnaire-back">
                Sair
              </Link>
            ) : (
              <button
                type="button"
                className="questionnaire-back"
                onClick={handleBack}
              >
                Voltar
              </button>
            )}

            <button type="submit" className="questionnaire-next">
              {step === steps.length - 1
                ? 'Concluir questionário'
                : 'Continuar'}
              <span aria-hidden="true"> →</span>
            </button>
          </div>
        </form>

        <p className="questionnaire-privacy">
          {answeredCount} de {totalQuestions} respostas preenchidas.
          Suas respostas serão usadas para análises educativas de hábitos
          de consumo.
        </p>
      </section>
    </main>
  )
}

export default Questionnaire
