import Video from './Video';

interface Movie extends Video {
  DVD: string;
  boxOffice: string;
  production: string;
  website: string;
}

export default Movie;
