export type param = string | null;

export type paramsObj = Record<string, param>;

type paramOrParamsObj<T> = T extends string ? param : paramsObj;

export const getUrlParamValues = <T extends string | string[]>(
  paramOrParamsList: T,
  url = window.location as Location | string
): paramOrParamsObj<T> => {
  const parsedUrl = new URL(url.toString());

  if (typeof paramOrParamsList === 'string') {
    const x = parsedUrl.searchParams.get(paramOrParamsList) as paramOrParamsObj<T>;
    return x;
  } else {
    const paramObj: paramsObj = {};
    (paramOrParamsList as string[]).forEach((param) => {
      paramObj[param] = parsedUrl.searchParams.get(param);
    });

    return paramObj as unknown as paramOrParamsObj<T>;
  }
};
