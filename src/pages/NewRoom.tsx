import { Link } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';


import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.png';
import logoImg from '../assets/images/logo.png';

import '../styles/auth.scss';
import '../styles/button.scss';



export function NewRoom() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [newRoom, setNewRom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {

      return;
    }

    const rooRef = database.ref('rooms');

    const firebaseRoom = await rooRef.push({
      title: newRoom,
      authroId: user?.id,

    })

    navigate(`/rooms/${firebaseRoom.key}`);

  }


  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração perguntas e respostas" />

        <strong>Bem vindo ao Correio Deselegante</strong>
        <p>Mande seu recadinho criando uma sala,</p>
        <p>copie o link e envie pro(a) coleguinha :)</p>

      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Correio deselegante" />
          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRom(event.target.value)}
              value={newRoom}
            />

            <Button type="submit">
              Criar sala
            </Button>

          </form>

          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>

        </div>
      </main>
    </div>
  )
}