import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../App';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';
import '../styles/button.scss';


export function NewRoom() {

  const { user } = useContext(authContext);

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração perguntas e respostas" />

        <strong>Crie salas Q&amp;A ao vivo</strong>
        <p>Tire suas duvidas em tempo real!</p>

      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Correio deselegante" />
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>

          <form>
            <input
              type="text"
              placeholder="Nome da sala"
            />

            <button className="button" type="submit">
              Criar sala
            </button>

          </form>

          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>

        </div>
      </main>
    </div>
  )
}