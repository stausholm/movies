const placeholder = '/img/broken.png';

// replaces all <img> tags src that 404, with a placeholder
export const replaceBrokenImagesInit = (
  placeholderPath = placeholder,
  cb?: (el: HTMLElement) => unknown
): void => {
  document.addEventListener(
    'error',
    (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' && !target.getAttribute('data-replaced-broken-image')) {
        target.setAttribute('data-replaced-broken-image', '1');
        target.setAttribute('data-broken-image-src', target.getAttribute('src') as string);
        target.setAttribute('src', placeholderPath);
        if (cb) {
          cb(target);
        }
      }
    },
    true
  );
};

export const generateQuerySelector = (el: HTMLElement): string => {
  if (el.tagName.toLowerCase() == 'html') return 'HTML';
  let str = el.tagName;
  str += el.id != '' ? '#' + el.id : '';
  if (el.className) {
    const classes = el.className.split(/\s/);
    for (let i = 0; i < classes.length; i++) {
      str += '.' + classes[i];
    }
  }
  return generateQuerySelector(el.parentNode as HTMLElement) + ' > ' + str;
};
