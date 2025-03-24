import { useEffect, useState } from 'react';
import { getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';
import { Loading, MusicCard } from '../../components';

function Favorites() {
  const [favorites, setFavorites] = useState<SongType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const favoritedSongs = await getFavoriteSongs();
        setFavorites(favoritedSongs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getSongs();
  }, []);

  const handleRemoveFavorite = (song: SongType) => {
    try {
      removeSong(song);
      setFavorites(
        (prevFavorites) => prevFavorites.filter((fav) => fav.trackId !== song.trackId),
      );
    } catch (error) {
      console.error('Erro ao remover música:', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <ul>
        {favorites.map((song) => (
          <li key={ song.trackId }>
            <MusicCard data={ song } onRemove={ handleRemoveFavorite } />
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Favorites };
