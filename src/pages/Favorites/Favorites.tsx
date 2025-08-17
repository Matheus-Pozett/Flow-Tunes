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
      <div className="h-32 sm:h-56 flex items-center justify-center text-white font-bold">
        <h1 className="text-lg sm:text-xl text-center px-4">Músicas Favoritas</h1>
      </div>
      <section className="bg-[#EFF3F9] flex flex-1 items-center justify-center">

        {favorites.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-gray-500 text-lg">Nenhuma música favorita ainda</p>
            <p className="text-gray-400 text-sm mt-2">
              Adicione músicas aos favoritos para vê-las aqui!
            </p>
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            <ul
              className="flex flex-col mt-6 sm:mt-9 gap-4 sm:gap-8
                           mb-6 sm:mb-9 px-4"
            >
              {favorites.map((song) => (
                <li
                  key={ song.trackId }
                  className="w-full max-w-[36.875rem] mx-auto min-h-[3.813rem]
                             border-b last:border-b-0 border-gray-300 py-2"
                >
                  <MusicCard data={ song } onRemove={ handleRemoveFavorite } />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

export { Favorites };
