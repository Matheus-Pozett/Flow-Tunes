export type AlbumType = {
  artistId: number;
  artistName: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  artworkUrl100: string;
  releaseDate: string;
  trackCount: number;
};

export type UserType = {
  name: string;
  email: string;
  image: string;
  description: string;
};

export type SongType = {
  trackId: number,
  trackName: string,
  previewUrl: string,
};

export const USER_VALUES: UserType = {
  name: '',
  email: '',
  image: '',
  description: '',
};
