import { useState } from 'react';
import { AlbumCard, Loading } from '../../components';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';

type SearchProps = {
  artistName: string,
  setArtistName: (e: string) => void,
  songList: AlbumType[],
  setSongList: (e: AlbumType[]) => void,
};

function Search({ artistName, setArtistName, setSongList, songList }: SearchProps) {
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
      setSongList(getSongs);
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

      {searched && songList.length === 0 && <p>Nenhum álbum foi encontrado</p>}

      {songList.length > 0 && (
        <div>
          <p>{`Resultado de álbuns de: ${artistName}`}</p>
          <div>
            {songList.map((song) => (
              <AlbumCard key={ song.collectionId } data={ song } />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { Search };
