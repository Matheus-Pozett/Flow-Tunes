import { useEffect, useState } from 'react';
import { SongType } from '../../types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';

type MusicCardProps = {
  data: SongType,
  onRemove: (song: SongType) => void,
};

function MusicCard({ data, onRemove }: MusicCardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const checkIfFavorited = async () => {
      try {
        const favoriteSongs = await getFavoriteSongs();
        const isFavorited = favoriteSongs
          .some((song: SongType) => song.trackId === data.trackId);
        setIsFavorite(isFavorited);
      } catch (error) {
        console.error('Erro', error);
      }
    };

    checkIfFavorited();
  }, [data.trackId]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeSong(data);
      onRemove(data);
    } else {
      addSong(data);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <p>{data.trackName}</p>
      <audio data-testid="audio-component" src={ data.previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
      <label
        htmlFor={ `fav-${data.trackId}` }
        data-testid={ `checkbox-music-${data.trackId}` }
      >
        {isFavorite
          ? <img src="/src/images/checked_heart.png" alt="favorite" />
          : <img src="/src/images/empty_heart.png" alt="favorite" />}
      </label>
      <input
        type="checkbox"
        id={ `fav-${data.trackId}` }
        checked={ isFavorite }
        onChange={ handleFavoriteToggle }
      />
    </div>
  );
}

export { MusicCard };
