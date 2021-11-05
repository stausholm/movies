// export interface Notification {
//   content: string;
//   duration: number; // amount of ms to show notification
//   theme: 'TODO';
//   action: 'TODO a func or null or undefined';
//   label: 'TODO string or undefined';
//   dismissable: boolean;
// }

export interface NotificationState {
  notification: Notification; // TODO: is "Notification" a native type?
}
