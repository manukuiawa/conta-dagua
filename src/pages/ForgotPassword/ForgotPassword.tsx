
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import './ForgotPassword.css'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage(
      'Solicitação registrada na interface. O envio real do e-mail será implementado posteriormente.',
    )
  }

  return (
    <main className="forgot-password-page">
      <section className="forgot-password-content">
        <Link
          to="/login"
          className="forgot-password-back"
          aria-label="Voltar para o login"
        >
          ← Voltar
        </Link>

        <header className="forgot-password-header">
          <div className="forgot-password-icon" aria-hidden="true">
            <span>✉</span>
          </div>

          <h1>Recuperar acesso</h1>

          <p>
            Esqueceu sua senha?
            <br />
            Vamos ajudar você a voltar.
          </p>
        </header>

        <form
          className="forgot-password-form"
          onSubmit={handleSubmit}
        >
          <div className="forgot-password-group">
            <label htmlFor="recovery-email">E-mail cadastrado</label>

            <input
              id="recovery-email"
              type="email"
              placeholder="Digite seu e-mail"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          {error && (
            <p className="forgot-password-error" role="alert">
              {error}
            </p>
          )}

          {message && (
            <p className="forgot-password-message" role="status">
              {message}
            </p>
          )}

          <button type="submit" className="forgot-password-submit">
            Recuperar minha senha
          </button>
        </form>

        <footer className="forgot-password-footer">
          <p>Lembrou sua senha?</p>

          <Link to="/login" className="forgot-password-login-link">
            Voltar para o login
          </Link>
        </footer>
      </section>
    </main>
  )
}

export default ForgotPassword