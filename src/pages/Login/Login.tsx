import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    try {
      setIsLoading(true);

      const response = await fetch(
        "http://localhost:3001/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Não foi possível realizar o login.");
        return;
      }

      if (!data.token || !data.user) {
        setError("O servidor retornou uma resposta inválida.");
        return;
      }

      // Armazena o token para as próximas requisições autenticadas.
      sessionStorage.setItem("authToken", data.token);

      navigate("/questionario", {
        state: {
          name: data.user.name,
          email: data.user.email,
        },
      });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      setError(
        "Não foi possível conectar ao servidor. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login">
      <section className="login-card">
        <div className="login-header">
          <h1>Conta D’Água</h1>

          <p>
            Tecnologia e Consciência para o
            <br />
            Uso Sustentável da Água
          </p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>

            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>

            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <Link to="/recuperar-senha" className="forgot-password">
            Esqueci minha senha
          </Link>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="login-register">
          <p>Você ainda não possui uma conta?</p>

          <Link to="/cadastro" className="register-button">
            Criar minha conta
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Login;
