export const getLocalStorageValue = (
  key: string,
  defaultValue?: unknown,
  mergeWithDefaultValue = false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  const storageItem = localStorage.getItem(key);

  if (storageItem) {
    try {
      const val = JSON.parse(storageItem);
      if (mergeWithDefaultValue && isObject(defaultValue) && isObject(val)) {
        return mergeDeep(defaultValue, val); // update old object (val) with new properties, in case new properties gets added to the default value
      }
      return val;
    } catch (e) {
      console.error('Failed to parse as JSON from localStorage: ', key);
      // localStorage.removeItem(key);
      return null;
    }
  } else if (defaultValue !== undefined) {
    return defaultValue;
  }

  return null;
};

export const setLocalStorageValue = (key: string, newVal: unknown): void => {
  const parsed = JSON.stringify(newVal);
  localStorage.setItem(key, parsed);
};

export const isObject = (val: unknown): boolean => {
  return typeof val === 'object' && !Array.isArray(val);
};
export const isStringifiedObject = (val: unknown): boolean => {
  return typeof val === 'string' && val.slice(0, 1) === '{' && val.slice(-1) === '}';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const mergeDeep = (target: any, ...sources: any): any => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  // Note that this will lead to infinite recursion on circular references.
  // https://stackoverflow.com/a/34749873
  return mergeDeep(target, ...sources);
};
