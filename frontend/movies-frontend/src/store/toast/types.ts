export type ToastTheme = 'default' | 'warning' | 'danger' | 'success';

export interface Toast {
  content: string;
  duration?: number; // amount of ms to show notification
  theme?: ToastTheme;
  dismissable?: boolean;
}

export interface ToastState {
  toasts: Toast[];
}
