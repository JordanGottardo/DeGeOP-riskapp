/*
 * Author: Giovanni Prete
 * File: source/store/types/uuid.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */

/**
 * restituisce un uuid generato randomicamente
 * @returns {string}
 */
export const generateNewUUID = () =>  {
  let d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now(); // use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // tslint:disable-next-line:no-bitwise
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    // tslint:disable-next-line:no-bitwise
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
};
