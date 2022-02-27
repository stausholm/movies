import { VIDEO_TYPES } from '@/constants/videoTypes';
import VideoType from '@/types/VideoType';
import { OMDB_API_KEY } from '../../secrets';
const omdbBaseUrl = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

interface omdbSearchResultItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
type omdbResponse = 'True' | 'False';
interface omdbSearchResponse {
  Search?: omdbSearchResultItem[];
  totalResults?: string;
  Response: omdbResponse;
  Error?: string;
}

const omdb = {
  searchTitles(title: string, page = 1): Promise<omdbSearchResponse> {
    return fetch(`${omdbBaseUrl}&s=${title}&page=${page}`).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      return res.json();
    });
  },
  searchMovies(title: string, page = 1): Promise<omdbSearchResponse> {
    return fetch(`${omdbBaseUrl}&s=${title}&page=${page}&type=${VIDEO_TYPES.MOVIE}`).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      return res.json();
    });
  },
  searchEpisodes(title: string, page = 1): Promise<omdbSearchResponse> {
    return fetch(`${omdbBaseUrl}&s=${title}&page=${page}&type=${VIDEO_TYPES.EPISODE}`).then(
      (res) => {
        if (!res.ok) {
          throw new Error(`${res.status}`);
        }
        return res.json();
      }
    );
  },
  searchSeries(title: string, page = 1): Promise<omdbSearchResponse> {
    return fetch(`${omdbBaseUrl}&s=${title}&page=${page}&type=${VIDEO_TYPES.SERIES}`).then(
      (res) => {
        if (!res.ok) {
          throw new Error(`${res.status}`);
        }
        return res.json();
      }
    );
  },
  getById(
    id: string,
    plotType: 'short' | 'full' = 'short',
    type?: VideoType | undefined
  ): Promise<Response> {
    const typeParam = type ? `&type=${type}` : '';
    // TODO: add same eror and json handling as methods above
    // TODO: make sure result returned is mapped to match the same structure as our own stored movies. Reuse the mapper from /backend
    return fetch(`${omdbBaseUrl}&i=${id}&plot=${plotType}${typeParam}`);
  },
  getByTitle(
    title: string,
    plotType: 'short' | 'full' = 'short',
    type?: VideoType | undefined
  ): Promise<Response> {
    const typeParam = type ? `&type=${type}` : '';
    // TODO: add same eror and json handling as methods above
    // TODO: make sure result returned is mapped to match the same structure as our own stored movies. Reuse the mapper from /backend
    return fetch(`${omdbBaseUrl}&t=${title}&plot=${plotType}${typeParam}`);
  },
};

export { omdb };
