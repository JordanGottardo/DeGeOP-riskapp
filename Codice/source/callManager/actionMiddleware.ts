/*
 * Author: Marco Pasqualini
 * File: source/callManager/actionMiddleware.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { Observer } from './storeObserver';

/** Redux middleware: reflect action towards all subscribed Observers */
class ActionMiddleware {
  /** list of Observer to send action towards */
  private subscribers: Observer[];

  constructor() {
    this.subscribers = [];
  }

  /** attach an observer  */
  public attach(subscriber: Observer) {
    this.subscribers.push(subscriber);
  }

  /** deattach an observer  */
  public deattach(subscriber: Observer) {
    this.subscribers.slice(this.subscribers.indexOf(subscriber), 1);
  }

  /** exposes redux middleware  */
  public middleware: Middleware =
    <S>({ getState }: MiddlewareAPI<S>) =>
      (next: Dispatch<S>) =>
        (action: any): any => {
          const prevState = getState();
          const result = next(action);
          const nextState = getState();
          if (prevState !== nextState) {
            this.update(action);
          }
          return result;
        }

  /** notify subscribed observers  */
  protected update(action: Action) {
    for (const observer of this.subscribers) {
      observer.notify(action);
    }
  }
}

export { ActionMiddleware };
