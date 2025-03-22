import { Link } from 'react-router-dom';
import { AlbumType } from '../../types';

type AlbumCardProps = {
  data: AlbumType
};

function AlbumCard({ data }: AlbumCardProps) {
  return (
    <Link
      to={ `/album/${data.collectionId}` }
      data-testid={ `link-to-album-${data.collectionId}` }
    >
      <img src={ data.artworkUrl100 } alt="foto do album" />
      <p>{data.collectionName}</p>
      <p>{data.artistName}</p>
    </Link>
  );
}

export { AlbumCard };
