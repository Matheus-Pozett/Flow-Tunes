import { useState } from 'react';
import { AlbumCard, Loading } from '../../components';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';

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
      {loading ? (<Loading />
      ) : (
        <form
          onSubmit={ handleSubmitSearch }
          className="flex items-center justify-center bg-login h-56 gap-4"
        >
          <div className="relative">
            <input
              type="text"
              data-testid="search-artist-input"
              value={ searchValue }
              onChange={ handleChangeSearch }
              placeholder="Digite a sua pesquisa"
              className="w-[25rem] h-10 rounded-3xl px-5 bg-[#ffffff80]
            placeholder:text-white placeholder:text-sm placeholder:uppercase"
            />
            <img
              src="/src/images/icon_search.svg"
              alt=""
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            />
          </div>
          <button
            data-testid="search-artist-button"
            disabled={ searchValue.length < 2 }
            className="w-28 h-10 bg-[#00D5E2] rounded-3xl uppercase text-white
            text-sm font-bold disabled:bg-gray-400"
          >
            Procurar
          </button>
        </form>
      )}

      <section className="flex flex-1 bg-[#EFF3F9]">
        {searched && albumList.length === 0
          && (
            <div
              className="flex flex-col flex-1 items-center justify-center gap-4"
            >
              <img
                src="/src/images/icon_circleerror.svg"
                alt=""
                className="w-16 h-16"
              />
              <p
                className="text-3xl font-normal text-[#C0C3C9]"
              >
                Nenhum álbum foi encontrado
              </p>
            </div>
          )}

        {albumList.length > 0 && (
          <div className="flex flex-col items-center flex-1">
            <p
              className="text-login-blue text-xl italic font-light"
            >
              {`Resultado de álbuns de: ${artistName}`}
            </p>
            <ul
              className="inline-grid grid-cols-4 gap-10"
            >
              {albumList.map((album) => (
                <li
                  key={ album.collectionId }
                  className="w-[12.5rem] h-[15.5rem] transition-transform
                  duration-300 hover:scale-110"
                >
                  <AlbumCard data={ album } />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

export { Search };
