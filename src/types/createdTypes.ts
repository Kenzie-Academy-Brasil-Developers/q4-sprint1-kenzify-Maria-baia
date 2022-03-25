/* eslint object-curly-newline: 0 */

type playlistType = {
  title: string;
  duration: string;
  releasedDate: string | Date;
  listenedByMe?: number;
  genres: string[];
};

type artistType = {
  [key: string]: playlistType | unknown;
};

type userType = {
  id: string;
  username: string;
  password: string;
  playlist: artistType;
};

type userWithoutPassType = {
  id: string;
  username: string;
  password?: string;
  playlist: artistType[];
};

export { playlistType, artistType, userType, userWithoutPassType };
