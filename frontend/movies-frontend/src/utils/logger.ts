import { App } from 'vue';
import { ToastMutations } from '@/store/toast/mutations';
import store from '@/store';
import { Toast } from '@/store/toast/types';
import { APP_NAME, APP_CODE_URL } from '@/constants/SiteSettings.json';

const getLogoTag = (color = '#0d6efd'): string => {
  const logoAndTextColor = 'ffffff';
  return `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23${logoAndTextColor}'%3E%3Cg%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'%3E%3C/path%3E%3Cpath d='M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); background-color: ${color}; background-size: 13px; background-position: 4px 3px; background-repeat: no-repeat; padding: 2px 5px; padding-left: 15px; border-radius: 2px; color: #${logoAndTextColor};`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logger = (message: string, ...args: any[]): void => {
  console.log(
    `%c ${APP_NAME}%c ${message}%c`,
    getLogoTag(),
    'font-weight:bold;',
    'background-color:transparent;',
    ...args
  );
};

export const configureLogger = (app: App): void => {
  if (process.env.NODE_ENV === 'production') {
    logger(
      `Hello there 👋\nInterested in how this app is built? It's open source! Check it out on ${APP_CODE_URL}`
    );
    // allow for easy debugging with a debug=true queryparam
    if (
      window.location.href.includes('debug=true') ||
      store.getters.getAppSettings._devmodeEnableLogs
    ) {
      console.warn(
        '%c [WARNING] console logs are enabled in production mode',
        'color:Orange;font-weight:bold;font-size:1.1em'
      );
    } else {
      // by default disable rogue console.logs in prod.
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      window['console']['log'] = function () {};

      // and show a toast in the frontend for any unhandled errors that might require a full page reload (🤞 it won't happen)
      app.config.errorHandler = (err) => {
        store.commit(ToastMutations.ADD_TOAST, {
          content: 'UNHANDLED ERROR: ' + err,
          theme: 'danger',
          duration: 1000000,
        } as Toast);

        // here we could also send error log data to some other service if we wanted to keep track of errors
      };
    }
  }
};

export default logger;
