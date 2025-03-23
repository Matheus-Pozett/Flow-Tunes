import { useEffect, useState } from 'react';
import { SongType } from '../../types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';

type MusicCardProps = {
  data: SongType,
};

function MusicCard({ data }: MusicCardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const checkIfFavorited = async () => {
      const favoriteSongs = await getFavoriteSongs();
      const isFavorited = favoriteSongs
        .some((song: SongType) => song.trackId === data.trackId);
      setIsFavorite(isFavorited);
    };

    checkIfFavorited();
  }, [data.trackId]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeSong(data);
      setIsFavorite(false);
    } else {
      addSong(data);
      setIsFavorite(true);
    }
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
