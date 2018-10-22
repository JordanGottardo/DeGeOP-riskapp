import { ActionCreatorInterface, OperationType } from '../../../store/action/actionInterface';
import { SidebarOperationType } from '../../sidebar/sidebarTypeInterface';

export interface CenterScreenButtonPropsInterface {
  operationType: OperationType;
  emitUpdateReactData: ActionCreatorInterface;

}
