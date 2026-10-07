import { useState } from 'react'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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

        <form className="login-form">

          <div className="form-group">
            <label htmlFor="email">E-mail</label>

            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>

            <div className="password-wrapper">

              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword
                    ? 'Ocultar senha'
                    : 'Mostrar senha'
                }
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>

            </div>
          </div>

          <button
            type="button"
            className="forgot-password"
          >
            Esqueci minha senha
          </button>

          <button
            type="submit"
            className="login-button"
          >
            Entrar
          </button>

        </form>

        <div className="login-register">
          <p>Você ainda não possui uma conta?</p>

          <button
            type="button"
            className="register-button"
          >
            Criar minha conta
          </button>
        </div>

      </section>
    </main>
  )
}

export default Login