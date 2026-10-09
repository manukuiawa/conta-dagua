
import { useState } from 'react'
import './Register.css'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')

  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setError('')
    alert('Cadastro validado! A criação real da conta será implementada depois.')
  }

  return (
    <main className="register">
      <section className="register-content">
        <header className="register-header">
          <h1>Conta D’Água</h1>

          <p>
            Faça parte dessa mudança.
            <br />
            Crie sua conta e cuide de cada gota.
          </p>
        </header>

        <form className="register-form" onSubmit={handleRegister}>
          <div className="register-form-group">
            <label htmlFor="register-name">Nome completo</label>

            <input
              id="register-name"
              type="text"
              placeholder="Nome Completo"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="register-email">E-mail</label>

            <input
              id="register-email"
              type="email"
              placeholder="Digite seu e-mail"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="register-password">Senha</label>

            <div className="register-password-wrapper">
              <input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mínimo de 8 caracteres"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                required
              />

              <button
                type="button"
                className="register-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          <div className="register-form-group">
            <label htmlFor="register-confirm-password">
              Confirmar senha
            </label>

            <div className="register-password-wrapper">
              <input
                id="register-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Digite a senha novamente"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />

              <button
                type="button"
                className="register-password-toggle"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                aria-label={
                  showConfirmPassword
                    ? 'Ocultar confirmação de senha'
                    : 'Mostrar confirmação de senha'
                }
              >
                {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          {error && (
            <p className="register-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="register-submit">
            Criar minha conta
          </button>
        </form>

        <footer className="register-footer">
          <p>Já possui uma conta?</p>

          <button
            type="button"
            className="register-login-link"
            onClick={() => window.location.assign('/')}
          >
            Voltar para o login
          </button>
        </footer>
      </section>
    </main>
  )
}

export default Register