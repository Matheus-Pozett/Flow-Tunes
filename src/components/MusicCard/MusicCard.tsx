import { useEffect, useState } from 'react';
import { SongType } from '../../types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import './musicCard.css';

type MusicCardProps = {
  data: SongType,
  onRemove?: (song: SongType) => void,
};

function MusicCard({ data, onRemove = () => {} }: MusicCardProps) {
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
    <div className="flex justify-between items-center h-full">
      <p className="w-[7.625rem] truncate">{data.trackName}</p>
      <audio
        data-testid="audio-component"
        src={ data.previewUrl }
        controls
        className="w-[23.125rem] h-[3.438rem]"
      >
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
        className="hidden"
      />
    </div>
  );
}

export { MusicCard };
