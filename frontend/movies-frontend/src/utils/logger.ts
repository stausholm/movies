import { App } from 'vue';
import { ToastMutations } from '@/store/toast/mutations';
import store from '@/store';
import { Toast } from '@/store/toast/types';

const configureLogger = (app: App): void => {
  if (process.env.NODE_ENV === 'production') {
    // allow for easy debugging with a debug=true queryparam
    if (window.location.href.includes('debug=true')) {
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

export default configureLogger;
