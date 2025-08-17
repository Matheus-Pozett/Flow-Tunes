import { useState } from 'react';
import { AlbumCard } from '../../components';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import iconsearch from '../../images/icon_search.svg';
import circleerror from '../../images/icon_circleerror.svg';

type SearchProps = {
  artistName: string,
  setArtistName: (e: string) => void,
  albumList: AlbumType[],
  setAlbumList: (e: AlbumType[]) => void,
};

function Search({ artistName, setArtistName, setAlbumList, albumList }: SearchProps) {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmitSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const getSongs = await searchAlbumsAPI(searchValue);
      setAlbumList(getSongs);
      setArtistName(searchValue);
      setSearchValue('');
      setSearched(true);
    } catch (error) {
      console.error('Erro ao procurar música:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <form
        onSubmit={ handleSubmitSearch }
        className="flex flex-col sm:flex-row items-center justify-center bg-login
                   h-32 sm:h-56 gap-4 p-4 sm:p-0"
      >
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            data-testid="search-artist-input"
            value={ searchValue }
            onChange={ handleChangeSearch }
            placeholder="Digite a sua pesquisa"
            className="w-full sm:w-[25rem] h-10 rounded-3xl px-5 bg-[#ffffff80]
                       placeholder:text-white placeholder:text-sm placeholder:uppercase
                       text-sm sm:text-base pr-12"
          />
          <img
            src={ iconsearch }
            alt=""
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5
            sm:h-5"
          />
        </div>
        <button
          data-testid="search-artist-button"
          disabled={ searchValue.length < 2 }
          className="w-full sm:w-28 h-10 bg-[#00D5E2] rounded-3xl uppercase text-white
                     text-sm font-bold disabled:bg-gray-400 px-4"
        >
          Procurar
        </button>
      </form>
      {loading ? (
        <div
          className="flex gap-4 sm:gap-8 flex-1 items-center
        justify-center flex-col p-4"
        >
          <span className="loader-header" />
          <p
            className="text-xl sm:text-3xl font-normal text-[#C0C3C9]
          text-center"
          >
            Carregando...
          </p>
        </div>
      ) : (
        <section className="flex flex-1 bg-[#EFF3F9]">
          {searched && albumList.length === 0 && (
            <div className="flex flex-col flex-1 items-center justify-center gap-4 p-4">
              <img
                src={ circleerror }
                alt=""
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
              <p className="text-xl sm:text-3xl font-normal text-[#C0C3C9] text-center">
                Nenhum álbum foi encontrado
              </p>
            </div>
          )}

          {albumList.length > 0 && (
            <div className="flex flex-col items-center flex-1 py-8 sm:py-14 px-4">
              <p
                className="text-login-blue text-base sm:text-xl italic
              font-light mb-8 sm:mb-12 text-center"
              >
                {`Resultado de álbuns de: ${artistName}`}
              </p>

              <ul
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                           gap-4 sm:gap-6 lg:gap-10 w-full max-w-7xl"
              >
                {albumList.map((album) => (
                  <li
                    key={ album.collectionId }
                    className="w-full max-w-[12.5rem] mx-auto
                             transition-transform duration-300 hover:scale-105
                             sm:hover:scale-110"
                  >
                    <AlbumCard data={ album } />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export { Search };
