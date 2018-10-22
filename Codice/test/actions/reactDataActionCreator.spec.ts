// Viene verificato che il NodeCreator crei correttamente le azioni relative a reactData

import { updateReactData } from '../../source/store/action/reactDataAction';
import * as stubObjects from '../stubs/stubObjects.spec';

describe('Il NodeActionCreator', () => {
  it('crea un\'azione di tipo REACTDATA_UPDATE', () => {
    const actionReactDataUpdate = updateReactData(
      stubObjects.objectOptionSidebarType,stubObjects.actionTypeReactDataUpdate);
    expect(actionReactDataUpdate).toEqual(stubObjects.actionSideBarTypeOption);
  });
});
