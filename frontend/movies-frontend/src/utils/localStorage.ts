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
        return Object.assign(defaultValue, val); // update old object (val) with new properties, in case new properties gets added to the default value
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
