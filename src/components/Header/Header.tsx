import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { USER_VALUES, UserType } from '../../types';
import { getUser } from '../../services/userAPI';
import './header.css';

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
    <header
      data-testid="header-component"
      className="w-[15.625rem] h-screen flex flex-col py-8 px-10 justify-between fixed"
    >
      <img
        src="/src/images/logo.svg"
        alt="Logo da aplicação"
        className="w-[10.625rem] h-24"
      />
      <nav className="flex flex-col gap-14">
        <NavLink
          to="/search"
          data-testid="link-to-search"
          className="flex gap-4 text-[#444955]"
        >
          <img src="/src/images/Vector.svg" alt="icone da pesquisa" />
          Pesquisa
        </NavLink>

        <NavLink
          to="/favorites"
          data-testid="link-to-favorites"
          className="flex gap-4 text-[#444955]"
        >
          <img src="/src/images/icon_starempty.svg" alt="icona de musicas favoritas" />
          Favoritas
        </NavLink>

        <NavLink
          to="/profile"
          data-testid="link-to-profile"
          className="flex gap-4 text-[#444955]"
        >
          <img src="/src/images/icon_starempty.svg" alt="icone do perfil" />
          Perfil
        </NavLink>
      </nav>

      {loading ? (
        <div className="flex gap-8">
          <span className="loader-header" />
          <p>Carregando...</p>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <img src="/src/images/foto.png" alt="" />
          <p>{username.name}</p>
        </div>)}
    </header>
  );
}

export { Header };
