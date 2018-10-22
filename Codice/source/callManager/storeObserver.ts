/*
 * Author: Marco Pasqualini
 * File: source/callManager/storeObserver.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { Action } from 'redux';

/** Observer interface used by ActionMiddleware */
interface Observer {
  notify: (action: Action) => void;
}

export { Observer };
