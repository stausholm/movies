import VideoType from '@/types/VideoType';
// NOTE: to keep it as simple as possible, all the data filtering is done here in the frontend, instead of having a backend handling it.
import store from '@/store';
import { ContentActions } from '@/store/content/actions';
import Movie from '@/types/Movie';
import Series from '@/types/Series';
import Episode from '@/types/Episode';
import { slugify } from '@/utils/stringToSlug';
import Genre from '@/types/Genre';

type ContentType = VideoType | 'all';

const getContent = (): Promise<(Episode | Series | Movie)[]> => {
  return new Promise((resolve) => {
    if (store.getters.contentLoaded) {
      return resolve(store.getters.videos);
    } else {
      return store.dispatch(ContentActions.LOAD_VIDEOS).then(() => {
        return resolve(store.getters.videos);
      });
    }
  });
};

type SeasonsForSeries = { season: number; episodes: number }[];
type SeriesEpisodes = { season: number; episodes: Episode[] }[];

const contentService = {
  getMoviePageContent(
    movieImdbIDorTitleSlug: string
  ): Promise<{ content: Movie; related: (Series | Movie)[] }> {
    // returns everything needed for the pagetype
    return new Promise((resolve, reject) => {
      return getContent().then(async (content) => {
        const movie = content
          .filter((x) => x.type === 'movie')
          .find(
            (x) =>
              x.imdbId === movieImdbIDorTitleSlug || slugify(x.imdbTitle) === movieImdbIDorTitleSlug
          );
        if (movie) {
          const relatedContent = await this.getRelatedContent(movie.imdbId);
          return resolve({ content: movie as Movie, related: relatedContent });
        } else {
          return reject({ response: { status: 404 } });
        }
      });
    });
  },
  getSeriesPageContent(seriesImdbIDorTitleSlug: string): Promise<{
    content: Series;
    related: (Series | Movie)[];
    seasons: SeasonsForSeries;
    episodes: SeriesEpisodes;
  }> {
    // returns series content and content for all episodes under the first available season of the series, and related content
    return new Promise((resolve, reject) => {
      return getContent().then(async (content) => {
        const series = content
          .filter((x) => x.type === 'series')
          .find(
            (x) =>
              x.imdbId === seriesImdbIDorTitleSlug ||
              slugify(x.imdbTitle) === seriesImdbIDorTitleSlug
          );
        if (series) {
          try {
            const relatedContent = await this.getRelatedContent(series.imdbId);
            const seasons = await this.getSeasonsForSeries(series.imdbId);
            const episodes = await this.getEpisodesForSeason(series.imdbId, seasons[0].season);

            return resolve({
              content: series as Series,
              related: relatedContent,
              seasons: seasons,
              episodes: [{ season: seasons[0].season, episodes: episodes }],
            });
          } catch (error) {
            return reject(error);
          }
        } else {
          return reject({ response: { status: 404 } });
        }
      });
    });
  },
  getEpisodePageContent(
    imdbID: string
  ): Promise<{ content: Episode; series: { title: string; imdbTitle: string; imdbId: string } }> {
    // returns the specific episode + some info about the series
    return new Promise((resolve, reject) => {
      return getContent().then(async (content) => {
        const episode = content.find((x) => x.imdbId === imdbID && x.type === 'episode');
        if (episode) {
          const series = content.find((x) => x.imdbId === (episode as Episode).seriesId) as Series;
          return resolve({
            content: episode as Episode,
            series: {
              title: series.title,
              imdbId: series.imdbId,
              imdbTitle: series.imdbTitle,
            },
          });
        } else {
          return reject({ response: { status: 404 } });
        }
      });
    });
  },
  getSeasonsForSeries(seriesImdbID: string): Promise<SeasonsForSeries> {
    // returns array with every season number avaiable, and how many episodes from each of those seasons is available
    // [{season: 1, episodes: 5}, {season: 2: episodes 3}]
    return new Promise((resolve) => {
      return getContent().then(() => {
        const episodes = store.getters.episodes as Episode[];
        const filtered = episodes.filter((x) => x.seriesId === seriesImdbID);
        const reduced = filtered.reduce((acc, curr) => {
          const accumulated = acc.find((x) => x.season === curr.season);
          if (accumulated) {
            accumulated.episodes += 1;
          } else {
            acc.push({ season: curr.season, episodes: 1 });
          }
          return acc;
        }, [] as SeasonsForSeries);
        return resolve(reduced.sort((a, b) => a.season - b.season));
      });
    });
  },
  getEpisodesForSeason(seriesImdbID: string, season: number): Promise<Episode[]> {
    // returns array with all available episodes for a given season in a given series
    return new Promise((resolve) => {
      return getContent().then(() => {
        const episodes = store.getters.episodes as Episode[];
        return resolve(
          episodes
            .filter((x) => x.seriesId === seriesImdbID && x.season === season)
            .sort((a, b) => a.episode - b.episode)
        );
      });
    });
  },
  getRelatedContent(
    imdbID: string,
    actors = true,
    directors = true,
    genres = true
  ): Promise<(Series | Movie)[]> {
    // modtager et imdbID, returnerer array med andre imdb video objekter
    // mulighed for at angive om der skal returneres relateret indhold baseret på actors, directors, og/eller genres.
    // Hvis både actors og directors, skal der kun returneres videoer hvor der er overlap mellem actors og directors
    // returnerer tomt array hvis intet relateret indhold findes
    return new Promise((resolve, reject) => {
      // TODO
      return resolve([]);
    });
    throw new Error('TODO: NOT IMPLEMENTED YET');
  },
  getContentByGenre(
    genreName: string,
    type: 'movie' | 'series' | 'all' = 'all',
    take: number | null = null
  ): Promise<{ content: (Series | Movie)[]; totalResults: number }> {
    // returns array of content containing genreName + totalResults
    return new Promise((resolve) => {
      return getContent().then((content) => {
        const filtered = content.filter((x) => {
          return x.genres.indexOf(genreName as Genre) !== -1 && type === 'all'
            ? x.type !== 'episode'
            : x.type === type;
        }) as (Movie | Series)[];
        const sorted = filtered.sort(
          (a, b) => a.imdbTitle.toLowerCase().localeCompare(b.imdbTitle.toLowerCase()) // sort alphabetically
        );
        if (take) {
          return resolve({ content: sorted.slice(0, take), totalResults: sorted.length });
        }
        return resolve({ content: sorted, totalResults: sorted.length });
      });
    });
  },
  getContentByActor(actorName: string): Promise<(Episode | Series | Movie)[]> {
    // returns array of content where the actor is in
    return new Promise((resolve) => {
      return getContent().then((content) => {
        const filtered = content.filter((x) => x.actors.indexOf(actorName) !== -1);
        return resolve(
          filtered.sort(
            (a, b) => a.imdbTitle.toLowerCase().localeCompare(b.imdbTitle.toLowerCase()) // sort alphabetically
          )
        );
      });
    });
  },
  getContentByDirector(directorName: string): Promise<(Episode | Series | Movie)[]> {
    // returns array of content directed by director
    return new Promise((resolve) => {
      return getContent().then((content) => {
        const filtered = content.filter((x) => x.director.indexOf(directorName) !== -1);
        return resolve(
          filtered.sort(
            (a, b) => a.imdbTitle.toLowerCase().localeCompare(b.imdbTitle.toLowerCase()) // sort alphabetically
          )
        );
      });
    });
  },
  getActors(): Promise<string[]> {
    // returns string[] of all unique actors across all videos
    return new Promise((resolve) => {
      return getContent().then((content) => {
        const reduced = content.reduce((acc, curr) => {
          return acc.concat(curr.actors);
        }, [] as string[]);
        const uniques = Array.from(new Set(reduced));
        return resolve(uniques.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))); // sort alphabetically
      });
    });
  },
  getDirectors(): Promise<string[]> {
    // returns string[] of all unique directors across all videos
    return new Promise((resolve) => {
      return getContent().then((content) => {
        const reduced = content.reduce((acc, curr) => {
          return acc.concat(curr.director);
        }, [] as string[]);
        const uniques = Array.from(new Set(reduced));
        return resolve(uniques.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))); // sort alphabetically
      });
    });
  },

  // search api
  getResults(
    query: string,
    type: ContentType = 'all',
    page = 1,
    pageSize = 12,
    filters: 'TODO: object af forskellige parametre man kan filtrere på. f.eks. imdbRating, runtime, genres'
  ): Promise<Response> {
    // returnerer liste af søgeresultater + totalResults
    throw new Error('TODO: NOT IMPLEMENTED YET');
  },
};

export { contentService, SeriesEpisodes, SeasonsForSeries };
