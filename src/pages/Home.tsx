import { useContext, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import '../styles/button.scss';

import { AuthContext } from '../contexts/AuthContext';
import { database } from '../services/firebase';


export function Home() {

  const navigate = useNavigate();
  const { user, signInWithGoogle } = useContext(AuthContext)
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    navigate('/rooms/new');


  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }


    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Essa sala não existe :(');
      return;
    }

    navigate(`/rooms/${roomCode}`);
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

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
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