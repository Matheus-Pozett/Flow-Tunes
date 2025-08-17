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
      className="flex flex-col gap-2 sm:gap-1 group"
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={ data.artworkUrl100 }
          alt="foto do album"
          className="w-full aspect-square object-cover rounded-lg
                     group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="space-y-1">
        <p className="text-[#3D495C] font-bold text-xs sm:text-sm truncate leading-tight">
          {data.collectionName}
        </p>
        <p
          className="text-[#3D495C] font-normal text-[0.65rem] sm:text-[0.7rem]
                      truncate opacity-75"
        >
          {data.artistName}
        </p>
      </div>
    </Link>
  );
}

export { AlbumCard };
