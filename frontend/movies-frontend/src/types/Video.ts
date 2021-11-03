import Genre from './Genre';
import VideoType from './VideoType';
import Rating from './Rating';
import Posters from './Posters';

interface Video {
  title: string;
  subtitles: string;
  languages: string;
  imdbId: string;
  imdbTitle: string;
  year: string;
  releaseYear: number;
  rated: string;
  released: string;
  runtimeMinutes: number;
  genres: Genre[];
  director: string[];
  writer: string[];
  actors: string[];
  plot: string;
  country: string;
  awards: string;
  posterUrl: Posters | null;
  ratings: Rating[];
  metascore: string;
  imdbRating: string;
  imdbVotes: string;
  type: VideoType;
  imdbUrl: string;
}

export default Video;
