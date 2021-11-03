import Video from './Video';

interface Episode extends Video {
  seriesId: string;
  season: number;
  episode: number;
}

export default Episode;
