import { ActionMiddleware } from './actionMiddleware';
import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { ElementType, OperationType } from '../store/action/actionInterface';
import { storeObjectActionCreator } from '../store/action/actionCreator';

/** Manages data handling for API adaptation  */
class CallManagerMiddleware extends ActionMiddleware {
  public middleware: Middleware =
    <S>({ getState }: MiddlewareAPI<S>) =>
      (next: Dispatch<S>) =>
        (action: any): any => {
          const prevState: any = getState();
          let nodes: any = [];
          let edges: any = [];
          if (action.type === ElementType.ASSET && action.operation === OperationType.VIEW) {
            nodes = prevState.nodes.filter((e: any) =>  e.asset === action.payload.uuid);
            const nodeIds: any = nodes.map((e: any) => e.uuid);
            edges = prevState.edges.filter((e: any) =>
              nodeIds.includes(e.node_from) || nodeIds.includes(e.node_to));
          } else if (
            action.type === ElementType.NODE && action.operation === OperationType.VIEW) {
            edges = prevState.edges.filter((e: any) =>
              action.payload.uuid === e.node_from || action.payload.uuid === e.node_to);
          }
          for (const node of nodes) {
            this.update(storeObjectActionCreator(node, {
              operationType: OperationType.VIEW,
              elementType: ElementType.NODE,
            }));
          }
          for (const edge of edges) {
            this.update(storeObjectActionCreator(edge, {
              operationType: OperationType.VIEW,
              elementType: ElementType.EDGE,
            }));
          }
          const result = next(action);
          const nextState = getState();
          if (prevState !== nextState) {
            this.update(action);
          }
          return result;
        }
}

export { CallManagerMiddleware };
