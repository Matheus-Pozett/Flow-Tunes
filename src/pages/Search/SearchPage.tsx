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
    <div>
      {loading ? (<Loading />
      ) : (
        <form onSubmit={ handleSubmitSearch }>
          <input
            type="text"
            data-testid="search-artist-input"
            value={ searchValue }
            onChange={ handleChangeSearch }
          />
          <button
            data-testid="search-artist-button"
            disabled={ searchValue.length < 2 }
          >
            Procurar
          </button>
        </form>
      )}

      {searched && albumList.length === 0 && <p>Nenhum álbum foi encontrado</p>}

      {albumList.length > 0 && (
        <div>
          <p>{`Resultado de álbuns de: ${artistName}`}</p>
          <div>
            {albumList.map((album) => (
              <AlbumCard key={ album.collectionId } data={ album } />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { Search };
