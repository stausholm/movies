import Episode from '@/types/Episode';
import Movie from '@/types/Movie';
import Series from '@/types/Series';

export interface ContentState {
  videos: (Episode | Series | Movie)[];
  loading: boolean;
  loadingFailed: boolean;
}
