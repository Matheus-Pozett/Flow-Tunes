import { useState } from 'react';
import { SongType } from '../../types';

type MusicCardProps = {
  data: SongType,
};

function MusicCard({ data }: MusicCardProps) {
  const [checked, setChecked] = useState(false);

  const handleChangeFavorites = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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
        {checked
          ? <img src="/src/images/checked_heart.png" alt="favorite" />
          : <img src="/src/images/empty_heart.png" alt="favorite" />}
      </label>
      <input
        type="checkbox"
        id={ `fav-${data.trackId}` }
        checked={ checked }
        onChange={ handleChangeFavorites }
      />
    </div>
  );
}

export { MusicCard };
