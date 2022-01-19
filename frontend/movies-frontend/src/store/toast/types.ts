export type ToastTheme = 'default' | 'warning' | 'danger' | 'success';

export interface Toast {
  content: string;
  duration?: number; // amount of ms to show notification
  theme?: ToastTheme;
  dismissable?: boolean;
  id?: string; // optional id to easily find and remove specific toasts again
}

export interface ToastState {
  toasts: Toast[];
}
