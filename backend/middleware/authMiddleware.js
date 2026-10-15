
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Autenticação necessária.",
    });
  }

  const token = authorization.slice(7);

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "Erro de configuração do servidor.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.sub) {
      return res.status(401).json({
        message: "Token inválido.",
      });
    }

    req.userId = decoded.sub;
    next();
  } catch {
    return res.status(401).json({
      message: "Sessão inválida ou expirada. Entre novamente.",
    });
  }
}

module.exports = authMiddleware;
