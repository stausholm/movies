import { VIDEO_TYPES } from '@/constants/videoTypes';
import VideoType from '@/types/VideoType';
import { OMDB_API_KEY } from '../../secrets';
const omdbBaseUrl = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

const omdb = {
  searchTitles(title: string, page = 1): Promise<Response> {
    return fetch(`${omdbBaseUrl}&s=${title}&page=${page}`);
  },
  searchMovies(title: string, page = 1): Promise<Response> {
    return fetch(`${omdbBaseUrl}&s=${title}&page=${page}&type=${VIDEO_TYPES.MOVIE}`);
  },
  searchEpisodes(title: string, page = 1): Promise<Response> {
    return fetch(`${omdbBaseUrl}&s=${title}&page=${page}&type=${VIDEO_TYPES.EPISODE}`);
  },
  searchSeries(title: string, page = 1): Promise<Response> {
    return fetch(`${omdbBaseUrl}&s=${title}&page=${page}&type=${VIDEO_TYPES.SERIES}`);
  },
  getById(
    id: string,
    plotType: 'short' | 'full' = 'short',
    type?: VideoType | undefined
  ): Promise<Response> {
    const typeParam = type ? `&type=${type}` : '';
    return fetch(`${omdbBaseUrl}&i=${id}&plot=${plotType}${typeParam}`);
  },
  getByTitle(
    title: string,
    plotType: 'short' | 'full' = 'short',
    type?: VideoType | undefined
  ): Promise<Response> {
    const typeParam = type ? `&type=${type}` : '';
    return fetch(`${omdbBaseUrl}&t=${title}&plot=${plotType}${typeParam}`);
  },
};

export { omdb };
