
const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateToken(userId) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não configurado.');
  }

  return jwt.sign(
    { sub: String(userId) },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Validar campos obrigatórios
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: 'Nome, e-mail e senha são obrigatórios.',
      });
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (password.length < 8) {
      return res.status(400).json({
        message: 'A senha deve ter pelo menos 8 caracteres.',
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET não configurado.');

      return res.status(500).json({
        message: 'Erro de configuração do servidor.',
      });
    }

    // Verificar se o e-mail já existe
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [normalizedEmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: 'Este e-mail já está cadastrado.',
      });
    }

    // Armazenar somente o hash da senha
    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [normalizedName, normalizedEmail, passwordHash]
    );

    const user = result.rows[0];

    // Autenticar imediatamente o novo usuário
    const token = generateToken(user.id);

    return res.status(201).json({
      message: 'Cadastro realizado com sucesso!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({
        message: 'Este e-mail já está cadastrado.',
      });
    }

    console.error('Erro ao cadastrar usuário:', error.message);

    return res.status(500).json({
      message: 'Não foi possível realizar o cadastro.',
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: 'Informe o e-mail e a senha.',
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET não configurado.');

      return res.status(500).json({
        message: 'Erro de configuração do servidor.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const result = await pool.query(
      `SELECT id, name, email, password_hash
       FROM users
       WHERE email = $1`,
      [normalizedEmail]
    );

    const user = result.rows[0];

    // Evitar revelar se o e-mail está cadastrado
    if (!user) {
      return res.status(401).json({
        message: 'E-mail ou senha inválidos.',
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: 'E-mail ou senha inválidos.',
      });
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Erro ao realizar login:', error.message);

    return res.status(500).json({
      message: 'Não foi possível realizar o login.',
    });
  }
}

module.exports = {
  register,
  login,
};
