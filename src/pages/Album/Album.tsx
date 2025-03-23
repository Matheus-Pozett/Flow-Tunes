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
    <div>
      <section>
        <img src={ albumInfo?.artworkUrl100 } alt="Imagem do album" />
        <p data-testid="album-name">{albumInfo?.collectionName}</p>
        <p data-testid="artist-name">{albumInfo?.artistName}</p>
      </section>

      <section>
        <ul>
          {songs.map((song) => (
            <li key={ song.trackId }>
              <MusicCard data={ song } />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export { Album };
