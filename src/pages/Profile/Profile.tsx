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
    <div className="flex flex-col flex-1 items-center bg-gray-100 min-h-screen">
      <div className="w-full h-56 bg-loading relative">
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
          <img
            src="/src/images/user.webp"
            alt="Foto de perfil do usuário"
            data-testid="profile-image"
            className="w-60 h-60 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      <div className="mt-20 bg-white shadow-lg rounded-lg p-2 w-3/4 max-w-lg text-center">
        <div className="text-gray-800">
          <p className="text-lg font-semibold">Nome</p>
          <p className="text-gray-500">{user.name}</p>
        </div>

        <div className="mt-4 text-gray-800">
          <p className="text-lg font-semibold">E-mail</p>
          <p className="text-gray-500">{user.email}</p>
        </div>

        <div className="mt-4 text-gray-800">
          <p className="text-lg font-semibold">Descrição</p>
          <p className="text-gray-500 text-sm">{user.description}</p>
        </div>

        <Link
          to="/profile/edit"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2
          rounded-full font-semibold shadow-md hover:bg-blue-700 transition"
        >
          Editar perfil
        </Link>
      </div>
    </div>
  );
}

export { Profile };
