import { SongType } from '../../types';

type MusicCardProps = {
  data: SongType,
};

function MusicCard({ data }: MusicCardProps) {
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
    </div>
  );
}

export { MusicCard };
