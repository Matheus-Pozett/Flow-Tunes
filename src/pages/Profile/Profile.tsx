import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { USER_VALUES, UserType } from '../../types';
import { getUser } from '../../services/userAPI';
import { Loading } from '../../components';

function Profile() {
  const [user, setUser] = useState<UserType>(USER_VALUES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <img
        src={ user.image }
        alt="Foto de perfil do usuario"
        data-testid="profile-image"
      />
      <div>
        <p>Nome</p>
        <p>{user.name}</p>
      </div>
      <div>
        <p>E-mail</p>
        <p>{user.email}</p>
      </div>
      <div>
        <p>Descrição</p>
        <p>{user.description}</p>
      </div>
      <Link to="/profile/edit">Editar perfil</Link>
    </div>
  );
}

export { Profile };
