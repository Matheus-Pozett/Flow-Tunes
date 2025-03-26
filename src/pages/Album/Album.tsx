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
    <div
      className="bg-loading bg-cover bg-no-repeat flex flex-col flex-1"
    >
      <section className="p-6 flex items-center space-x-6">
        <img
          src={ albumInfo?.artworkUrl100 }
          alt="Imagem do album"
          className="w-48 h-48 rounded-lg shadow-lg object-cover"
        />
        <div>
          <p
            data-testid="album-name"
            className="text-white text-3xl font-bold"
          >
            {albumInfo?.collectionName}
          </p>
          <p
            data-testid="artist-name"
            className="text-white/80 text-xl"
          >
            {albumInfo?.artistName}
          </p>
        </div>
      </section>

      <section className="bg-[#EFF3F9]">
        <ul className="flex flex-col items-center mt-9 gap-8 mb-9">
          {songs.map((song) => (
            <li
              key={ song.trackId }
              className="w-[36.875rem] h-[3.813rem] border-b last:border-b-0
              border-gray-300"
            >
              <MusicCard data={ song } />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export { Album };
