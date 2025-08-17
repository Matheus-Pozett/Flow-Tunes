/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-max-depth */
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { USER_VALUES, UserType } from '../../types';
import { getUser } from '../../services/userAPI';
import './header.css';
import logo from '../../images/logo.svg';
import vector from '../../images/Vector.svg';
import star_empty from '../../images/icon_starempty.svg';
import profile from '../../images/icon_profile.svg';
import userimg from '../../images/user.webp';

function Header() {
  const [username, setUsername] = useState<UserType>(USER_VALUES);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header
        data-testid="header-component"
        className="hidden lg:flex lg:w-[15.625rem] lg:h-screen lg:flex-col
        lg:py-8 lg:px-10 lg:justify-between lg:fixed"
      >
        <img
          src={ logo }
          alt="Logo da aplicação"
          className="w-[10.625rem] h-24"
        />
        <nav className="flex flex-col gap-14">
          <NavLink
            to="/search"
            data-testid="link-to-search"
            className="flex gap-4 text-[#444955]"
          >
            <img src={ vector } alt="icone da pesquisa" />
            Pesquisa
          </NavLink>

          <NavLink
            to="/favorites"
            data-testid="link-to-favorites"
            className="flex gap-4 text-[#444955]"
          >
            <img src={ star_empty } alt="icona de musicas favoritas" />
            Favoritas
          </NavLink>

          <NavLink
            to="/profile"
            data-testid="link-to-profile"
            className="flex gap-4 text-[#444955]"
          >
            <img src={ profile } alt="icone do perfil" />
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
            <img
              src={ userimg }
              alt="foto do usuario"
              className="w-10 h-10 rounded-full"
            />
            <p data-testid="header-user-name">{username.name}</p>
          </div>
        )}
      </header>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between p-4">
          <img
            src={ logo }
            alt="Logo da aplicação"
            className="w-24 h-14"
          />

          <button
            onClick={ toggleMobileMenu }
            className="p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-0.5 bg-gray-600 mb-1" />
            <div className="w-6 h-0.5 bg-gray-600 mb-1" />
            <div className="w-6 h-0.5 bg-gray-600" />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={ toggleMobileMenu }
          >
            <div className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-lg z-50">
              <div className="p-4">
                <button
                  onClick={ toggleMobileMenu }
                  className="absolute top-4 right-4 text-2xl"
                >
                  ×
                </button>

                {loading ? (
                  <div className="flex gap-2 items-center mb-6 mt-8">
                    <span className="loader-header" />
                    <p className="text-sm">Carregando...</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 mb-6 mt-8">
                    <img
                      src={ userimg }
                      alt="foto do usuario"
                      className="w-10 h-10 rounded-full"
                    />
                    <p
                      data-testid="header-user-name"
                      className="text-sm"
                    >
                      {username.name}
                    </p>
                  </div>
                )}

                <nav className="flex flex-col gap-6">
                  <NavLink
                    to="/search"
                    data-testid="link-to-search"
                    className="flex gap-4 text-[#444955] items-center py-2"
                    onClick={ toggleMobileMenu }
                  >
                    <img
                      src={ vector }
                      alt="icone da pesquisa"
                      className="w-5 h-5"
                    />
                    Pesquisa
                  </NavLink>

                  <NavLink
                    to="/favorites"
                    data-testid="link-to-favorites"
                    className="flex gap-4 text-[#444955] items-center py-2"
                    onClick={ toggleMobileMenu }
                  >
                    <img
                      src={ star_empty }
                      alt="icona de musicas favoritas"
                      className="w-5 h-5"
                    />
                    Favoritas
                  </NavLink>

                  <NavLink
                    to="/profile"
                    data-testid="link-to-profile"
                    className="flex gap-4 text-[#444955] items-center py-2"
                    onClick={ toggleMobileMenu }
                  >
                    <img
                      src={ profile }
                      alt="icone do perfil"
                      className="w-5 h-5"
                    />
                    Perfil
                  </NavLink>
                </nav>
              </div>
            </div>
          </div>
        )}
      </header>
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t
       border-gray-200 z-40"
      >
        <nav className="flex justify-around py-2">
          <NavLink
            to="/search"
            data-testid="link-to-search-mobile"
            className="flex flex-col items-center gap-1 py-2 px-4"
          >
            <img src={ vector } alt="icone da pesquisa" className="w-5 h-5" />
            <span className="text-xs text-[#444955]">Pesquisa</span>
          </NavLink>

          <NavLink
            to="/favorites"
            data-testid="link-to-favorites-mobile"
            className="flex flex-col items-center gap-1 py-2 px-4"
          >
            <img
              src={ star_empty }
              alt="icona de musicas favoritas"
              className="w-5 h-5"
            />
            <span className="text-xs text-[#444955]">Favoritas</span>
          </NavLink>

          <NavLink
            to="/profile"
            data-testid="link-to-profile-mobile"
            className="flex flex-col items-center gap-1 py-2 px-4"
          >
            <img src={ profile } alt="icone do perfil" className="w-5 h-5" />
            <span className="text-xs text-[#444955]">Perfil</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
}

export { Header };
