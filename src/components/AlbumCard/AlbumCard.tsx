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
      className="flex flex-col gap-1"
    >
      <img
        src={ data.artworkUrl100 }
        alt="foto do album"
        className="w-[12.5rem] h-[12.5rem] rounded-lg"
      />
      <p
        className="text-[#3D495C] font-bold text-xs truncate"
      >
        {data.collectionName}
      </p>
      <p
        className="text-[#3D495C] font-normal text-[0.7rem] truncate"
      >
        {data.artistName}
      </p>
    </Link>
  );
}

export { AlbumCard };
