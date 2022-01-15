export const focusableSelectors = [
  'a[href]:not([tabindex^="-"])',
  'area[href]:not([tabindex^="-"])',
  'input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])',
  'input[type="radio"]:not([disabled]):not([tabindex^="-"])',
  'select:not([disabled]):not([tabindex^="-"])',
  'textarea:not([disabled]):not([tabindex^="-"])',
  'button:not([disabled]):not([tabindex^="-"])',
  'iframe:not([tabindex^="-"])',
  'audio[controls]:not([tabindex^="-"])',
  'video[controls]:not([tabindex^="-"])',
  '[contenteditable]:not([tabindex^="-"])',
  '[tabindex]:not([tabindex^="-"])',
];

export const getFocusableChildren = (el: HTMLElement): HTMLElement[] => {
  return [...el.querySelectorAll(focusableSelectors.join(','))] as HTMLElement[];
};

export const trapTabKey = (node: HTMLElement, event: KeyboardEvent): void => {
  const focusableChildren = getFocusableChildren(node);
  const focusedItemIndex = focusableChildren.indexOf(document.activeElement as HTMLElement);
  const lastIndex = focusableChildren.length - 1;
  const withShift = event.shiftKey;

  if (focusableChildren.length === 0) {
    event.preventDefault();
  } else if (withShift && focusedItemIndex === 0) {
    focusableChildren[lastIndex].focus();
    event.preventDefault();
  } else if (!withShift && focusedItemIndex === lastIndex) {
    focusableChildren[0].focus();
    event.preventDefault();
  }
};

// https://www.smashingmagazine.com/2021/07/accessible-dialog-from-scratch/
// https://github.com/KittyGiraudel/a11y-dialog
