import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';
import { Loading, MusicCard } from '../../components';

function Album() {
  const [songList, setSongList] = useState<[AlbumType, ...SongType[]] | []>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getSongs = async () => {
      try {
        if (id) {
          const songs = await getMusics(id);
          setSongList(songs);
        }
      } catch (error) {
        console.error('Erro ao buscar músicas:', error);
      } finally {
        setLoading(false);
      }
    };
    getSongs();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  const [albumInfo, ...songs] = songList;

  return (
    <div className="bg-loading bg-cover bg-no-repeat flex flex-col flex-1">
      <section
        className="p-4 sm:p-6 flex flex-col sm:flex-row items-center
                          sm:items-start space-y-4 sm:space-y-0 sm:space-x-6"
      >
        <div className="flex-shrink-0">
          <img
            src={ albumInfo?.artworkUrl100 }
            alt="Imagem do album"
            className="w-32 h-32 sm:w-48 sm:h-48 rounded-lg shadow-lg object-cover"
          />
        </div>

        <div className="text-center sm:text-left space-y-2 sm:space-y-1">
          <p
            data-testid="album-name"
            className="text-white text-xl sm:text-3xl font-bold leading-tight"
          >
            {albumInfo?.collectionName}
          </p>
          <p
            data-testid="artist-name"
            className="text-white/80 text-base sm:text-xl"
          >
            {albumInfo?.artistName}
          </p>
        </div>
      </section>
      <section className="bg-[#EFF3F9] flex flex-col flex-1 min-h-0">
        <div className="flex-1 overflow-y-auto">
          <ul
            className="flex flex-col items-center mt-6 sm:mt-9 gap-4 sm:gap-8
                         mb-6 sm:mb-9 px-4"
          >
            {songs.map((song) => (
              <li
                key={ song.trackId }
                className="w-full max-w-[36.875rem] min-h-[3.813rem]
                           border-b last:border-b-0 border-gray-300 py-2"
              >
                <MusicCard data={ song } />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export { Album };
