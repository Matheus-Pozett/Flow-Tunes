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
    <div className="bg-login flex flex-1 flex-col">
      <div className="h-56 flex items-center justify-center text-white font-bold text-xl">
        <h1>Músicas Favoritas</h1>
      </div>
      <section className="bg-[#EFF3F9] flex flex-1 items-center justify-center">
        <ul className="flex flex-col mt-9 gap-8 mb-9">
          {favorites.map((song) => (
            <li
              key={ song.trackId }
              className="w-[36.875rem] h-[3.813rem] border-b last:border-b-0
              border-gray-300"
            >
              <MusicCard data={ song } onRemove={ handleRemoveFavorite } />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export { Favorites };
