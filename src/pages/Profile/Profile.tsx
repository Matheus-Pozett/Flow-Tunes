import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { USER_VALUES, UserType } from '../../types';
import { getUser } from '../../services/userAPI';
import { Loading } from '../../components';
import userimg from '../../images/user.webp';

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
      <div className="w-full h-32 sm:h-56 bg-loading relative">
        <div className="absolute top-8 sm:top-10 left-1/2 transform -translate-x-1/2">
          <img
            src={ userimg }
            alt="Foto de perfil do usuário"
            data-testid="profile-image"
            className="w-24 h-24 sm:w-60 sm:h-60 rounded-full border-4
            border-white shadow-lg"
          />
        </div>
      </div>
      <div
        className="mt-12 sm:mt-20 bg-white shadow-lg rounded-lg p-4 sm:p-6
                      w-full max-w-lg mx-4 text-center space-y-4 sm:space-y-6"
      >
        <div className="text-gray-800">
          <p className="text-base sm:text-lg font-semibold">Nome</p>
          <p className="text-gray-500 text-sm sm:text-base">{user.name}</p>
        </div>

        <div className="text-gray-800">
          <p className="text-base sm:text-lg font-semibold">E-mail</p>
          <p className="text-gray-500 text-sm sm:text-base break-words">{user.email}</p>
        </div>

        <div className="text-gray-800">
          <p className="text-base sm:text-lg font-semibold">Descrição</p>
          <p
            className="text-gray-500 text-sm sm:text-base
          leading-relaxed"
          >
            {user.description}
          </p>
        </div>

        <Link
          to="/profile/edit"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 sm:px-8 sm:py-3
            rounded-full font-semibold shadow-md hover:bg-blue-700 transition-colors
              text-sm sm:text-base"
        >
          Editar perfil
        </Link>
      </div>
    </div>
  );
}

export { Profile };
