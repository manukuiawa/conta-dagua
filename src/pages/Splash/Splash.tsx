import './Splash.css'

function Splash() {
  return (
    <main className="splash">
      <div className="splash-content">

        <div className="water-animation" aria-label="Animação de uma gota de água">
          
          <svg
            className="water-drop"
            viewBox="0 0 100 140"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M50 5
                 C50 5 18 45 18 75
                 C18 101 32 122 50 122
                 C68 122 82 101 82 75
                 C82 45 50 5 50 5Z"
            />
          </svg>

          <div className="water-ripple ripple-one" />
          <div className="water-ripple ripple-two" />

        </div>

        <h1 className="splash-title">
          Conta D’Água
        </h1>

        <p className="splash-subtitle">
          Tecnologia e Consciência
          <br />
          para o Uso Sustentável da Água
        </p>

        <div className="splash-divider" />

        <p className="splash-slogan">
          Transforme seus hábitos.
          <br />
          Preserve cada gota.
        </p>

      </div>
    </main>
  )
}

export default Splash