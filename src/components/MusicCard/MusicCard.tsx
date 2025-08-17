import { useEffect, useState } from 'react';
import { SongType } from '../../types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import './musicCard.css';
import checked_heart from '../../images/checked_heart.png';
import empty_heart from '../../images/empty_heart.png';

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
    <div
      className="flex flex-col sm:flex-row sm:justify-between sm:items-center
                    gap-3 sm:gap-4 h-full py-2"
    >
      <div className="flex-shrink-0 sm:w-[7.625rem]">
        <p className="text-sm sm:text-base font-medium truncate text-gray-800">
          {data.trackName}
        </p>
      </div>
      <div className="flex items-center justify-between gap-3 sm:gap-4 flex-1">
        <div className="flex-1 min-w-0">
          <audio
            data-testid="audio-component"
            src={ data.previewUrl }
            controls
            className="w-full h-8 sm:h-[3.438rem] max-w-[23.125rem]"
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
        <div className="flex-shrink-0">
          <label
            htmlFor={ `fav-${data.trackId}` }
            data-testid={ `checkbox-music-${data.trackId}` }
            className="cursor-pointer block p-1 sm:p-2"
          >
            <img
              src={ isFavorite ? checked_heart : empty_heart }
              alt="favorite"
              className="w-5 h-5 sm:w-6 sm:h-6 hover:scale-110 transition-transform"
            />
          </label>
          <input
            type="checkbox"
            id={ `fav-${data.trackId}` }
            checked={ isFavorite }
            onChange={ handleFavoriteToggle }
            className="hidden"
          />
        </div>

      </div>
    </div>
  );
}

export { MusicCard };
