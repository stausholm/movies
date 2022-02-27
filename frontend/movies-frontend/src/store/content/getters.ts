import { VIDEO_TYPES } from '@/constants/videoTypes';
import Episode from '@/types/Episode';
import Movie from '@/types/Movie';
import Series from '@/types/Series';
import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { ContentState } from './types';

export const getters: GetterTree<ContentState, RootState> = {
  episodes(state): Episode[] {
    return state.videos.filter((x): x is Episode => x.type === VIDEO_TYPES.EPISODE);
  },
  movies(state): Movie[] {
    return state.videos.filter((x): x is Movie => x.type === VIDEO_TYPES.MOVIE);
  },
  series(state): Series[] {
    return state.videos.filter((x): x is Series => x.type === VIDEO_TYPES.SERIES);
  },
  videos(state): (Episode | Series | Movie)[] {
    return state.videos;
  },
  contentLoaded(state): boolean {
    return state.videos.length > 0 && !state.loading;
  },
  contentLoading(state): boolean {
    return state.loading;
  },
};
