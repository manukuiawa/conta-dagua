
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import './Questionnaire.css'

type Answers = {
  residents: string
  showerTime: string
  showerFrequency: string
  tapHabits: string
  laundryFrequency: string
  leak: string
}

const initialAnswers: Answers = {
  residents: '',
  showerTime: '',
  showerFrequency: '',
  tapHabits: '',
  laundryFrequency: '',
  leak: '',
}

function Questionnaire() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Answers>(initialAnswers)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function updateAnswer(field: keyof Answers, value: string) {
    setAnswers((current) => ({ ...current, [field]: value }))
    setError('')
  }

  function handleNext(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (step === 1 && (!answers.residents || !answers.showerFrequency)) {
      setError('Responda às duas perguntas para continuar.')
      return
    }

    if (step === 2 && (!answers.showerTime || !answers.tapHabits)) {
      setError('Responda às duas perguntas para continuar.')
      return
    }

    if (
      step === 3 &&
      (!answers.laundryFrequency || !answers.leak)
    ) {
      setError('Responda às duas perguntas para concluir.')
      return
    }

    if (step < 3) {
      setStep((current) => current + 1)
      setError('')
      return
    }

    console.log('Respostas do questionário:', answers)
    navigate('/dashboard')
  }

  function handleBack() {
    if (step > 1) {
      setStep((current) => current - 1)
      setError('')
    } else {
      navigate('/login')
    }
  }

  return (
    <main className="questionnaire-page">
      <section className="questionnaire-content">
        <header className="questionnaire-header">

          <h1>Vamos conhecer seus hábitos?</h1>

          <p>
            Responda algumas perguntas e descubra oportunidades
            para usar a água de forma mais consciente.
          </p>
        </header>

        <div
          className="questionnaire-progress"
          aria-label={`Etapa ${step} de 3`}
        >
          <div className="questionnaire-progress-info">
            <span>Etapa {step} de 3</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>

          <div className="questionnaire-progress-track">
            <div
              className="questionnaire-progress-fill"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <form className="questionnaire-form" onSubmit={handleNext}>
          {step === 1 && (
            <div className="questionnaire-step">
              <h2>Sobre sua residência</h2>
              <p className="questionnaire-step-description">
                Vamos começar entendendo um pouco da sua rotina.
              </p>

              <fieldset className="question-group">
                <legend>Quantas pessoas moram com você, incluindo você?</legend>

                {[
                  ['1', 'Moro sozinho(a)'],
                  ['2', '2 pessoas'],
                  ['3-4', '3 a 4 pessoas'],
                  ['5+', '5 pessoas ou mais'],
                ].map(([value, label]) => (
                  <label className="question-option" key={value}>
                    <input
                      type="radio"
                      name="residents"
                      value={value}
                      checked={answers.residents === value}
                      onChange={() => updateAnswer('residents', value)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </fieldset>

              <fieldset className="question-group">
                <legend>Com que frequência você toma banho?</legend>

                {[
                  ['1', 'Uma vez por dia'],
                  ['2', 'Duas vezes por dia'],
                  ['3+', 'Três vezes ou mais por dia'],
                  ['varies', 'Varia bastante'],
                ].map(([value, label]) => (
                  <label className="question-option" key={value}>
                    <input
                      type="radio"
                      name="showerFrequency"
                      value={value}
                      checked={answers.showerFrequency === value}
                      onChange={() =>
                        updateAnswer('showerFrequency', value)
                      }
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </fieldset>
            </div>
          )}

          {step === 2 && (
            <div className="questionnaire-step">
              <h2>Seu uso diário</h2>
              <p className="questionnaire-step-description">
                Pequenos hábitos podem fazer diferença.
              </p>

              <fieldset className="question-group">
                <legend>Em média, quanto tempo dura seu banho?</legend>

                {[
                  ['under5', 'Até 5 minutos'],
                  ['5-10', 'De 5 a 10 minutos'],
                  ['10-15', 'De 10 a 15 minutos'],
                  ['over15', 'Mais de 15 minutos'],
                ].map(([value, label]) => (
                  <label className="question-option" key={value}>
                    <input
                      type="radio"
                      name="showerTime"
                      value={value}
                      checked={answers.showerTime === value}
                      onChange={() => updateAnswer('showerTime', value)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </fieldset>

              <fieldset className="question-group">
                <legend>Você fecha a torneira ao escovar os dentes ou ensaboar a louça?</legend>

                {[
                  ['always', 'Sempre'],
                  ['sometimes', 'Às vezes'],
                  ['rarely', 'Raramente'],
                ].map(([value, label]) => (
                  <label className="question-option" key={value}>
                    <input
                      type="radio"
                      name="tapHabits"
                      value={value}
                      checked={answers.tapHabits === value}
                      onChange={() => updateAnswer('tapHabits', value)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </fieldset>
            </div>
          )}

          {step === 3 && (
            <div className="questionnaire-step">
              <h2>Outros hábitos importantes</h2>
              <p className="questionnaire-step-description">
                Estamos quase terminando!
              </p>

              <fieldset className="question-group">
                <legend>Com que frequência você lava roupas em casa?</legend>

                {[
                  ['daily', 'Todos os dias'],
                  ['2-3', '2 a 3 vezes por semana'],
                  ['weekly', 'Uma vez por semana'],
                  ['less', 'Menos de uma vez por semana'],
                ].map(([value, label]) => (
                  <label className="question-option" key={value}>
                    <input
                      type="radio"
                      name="laundryFrequency"
                      value={value}
                      checked={answers.laundryFrequency === value}
                      onChange={() =>
                        updateAnswer('laundryFrequency', value)
                      }
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </fieldset>

              <fieldset className="question-group">
                <legend>Você percebeu algum vazamento na sua residência?</legend>

                {[
                  ['yes', 'Sim'],
                  ['no', 'Não'],
                  ['unsure', 'Não tenho certeza'],
                ].map(([value, label]) => (
                  <label className="question-option" key={value}>
                    <input
                      type="radio"
                      name="leak"
                      value={value}
                      checked={answers.leak === value}
                      onChange={() => updateAnswer('leak', value)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </fieldset>
            </div>
          )}

          {error && (
            <p className="questionnaire-error" role="alert">
              {error}
            </p>
          )}

          <div className="questionnaire-actions">
            <button
              type="button"
              className="questionnaire-back"
              onClick={handleBack}
            >
              Voltar
            </button>

            <button type="submit" className="questionnaire-next">
              {step === 3 ? 'Concluir questionário' : 'Continuar'}
            </button>
          </div>
        </form>

        <p className="questionnaire-privacy">
          Suas respostas serão usadas para gerar estimativas educativas
          de consumo e sugestões de economia.
        </p>
      </section>
    </main>
  )
}

export default Questionnaire
