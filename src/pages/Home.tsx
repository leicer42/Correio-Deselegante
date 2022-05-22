import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import '../styles/button.scss';
import { authContext } from '../App';

export function Home() {

  const navigate = useNavigate();
  const { user, signInWithGoogle } = useContext(authContext)

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    navigate('/rooms/new');

  }

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

          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
            />

            <button className="button" type="submit">
              Entrar na sala
            </button>

          </form>
        </div>
      </main>
    </div>
  )
}