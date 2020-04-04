export const ENTER_KEY = 13;
export const ESCAPE_KEY = 27;
export const ITEMS_LOCAL_STORAGE_KEY = "items";

export const delay = (ms: number) =>
  new Promise((res, rej) => {
    setTimeout(res, ms);
  });
