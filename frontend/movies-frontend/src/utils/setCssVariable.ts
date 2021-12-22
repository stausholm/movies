/**
 *
 * @param name must be prefixed with '--'
 * @param value
 * @param element Will be set on :root if not set
 */
export const setCssVariable = (
  name: string,
  value: unknown,
  element = document.documentElement
): void => {
  element.style.setProperty(name, value as string);
};
