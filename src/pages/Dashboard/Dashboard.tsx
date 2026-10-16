
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("authToken");

  if (!token) {
    return <>{navigate("/login", { replace: true })}</>;
  }

  return (
    <main>
      <h1>Conta D’Água</h1>
      <p>Tecnologia e consciência para o uso sustentável da água.</p>

      <section>
        <h2>Seu consumo consciente começa aqui</h2>
        <p>
          Estamos preparando seu painel com base nas respostas
          do seu questionário.
        </p>
      </section>
    </main>
  );
}

export default Dashboard;
