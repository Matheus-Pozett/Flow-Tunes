import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { USER_VALUES, UserType } from '../../types';
import { getUser } from '../../services/userAPI';
import { Loading } from '../Loading';

function Header() {
  const [username, setUsername] = useState<UserType>(USER_VALUES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setUsername(user);
      } catch (error) {
        console.error('log:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <header data-testid="header-component">
      {loading ? (<Loading />
      ) : (
        <>
          <img src="/src/images/logo.svg" alt="Logo da aplicação" />
          <nav>
            <NavLink to="/search" data-testid="link-to-search">Pesquisa</NavLink>
            <NavLink to="/favorites" data-testid="link-to-favorites">Favoritas</NavLink>
            <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
          </nav>
          <p data-testid="header-user-name">{username.name}</p>
        </>
      )}
    </header>
  );
}

export { Header };
