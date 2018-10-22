/*
 * Author: Leonardo Brutesco
 * File: source/components/mapComponent/interactions/selectInteraction.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */

import * as ol from 'openlayers';
import { ActionCreatorInterface, OperationType,
  ElementType } from '../../../store/action/actionInterface';
import { isNullOrUndefined } from 'util';
import { FeatureInformation, FeatureType } from '../mapUtils/mapUtils';
import { ReactDataOptionsInterface } from '../../../store/types/reactDataOptionsInterface';
import { CommonStyle } from '../styles/featureStyle';

/** parametri da passare a SelectInteraction */
interface SelectInteractionOptions {
  features: ol.Collection<ol.Feature>;
  emitUpdateReactData: ActionCreatorInterface;
}

/** interazione per selezionare una feature */
class SelectInteraction extends ol.interaction.Select {
  private emitUpdateReactData: any;
  constructor(options: SelectInteractionOptions) {
    super({
      toggleCondition: ol.events.condition.never,
      features: options.features,   // colleione in cui inserire le feats selezionate
      // layers: undefined,   // Array di layers da cui prendere le feats;
                              // undefined => tutti quelli della mappa
      // style: SelectInteraction.styleFunctionSelect,  // stile delle feats selezionate
      // hitTolerance: 4, // tslint:disable-line
      style: CommonStyle.styleFunctionSelected,
    });
    this.emitUpdateReactData = options.emitUpdateReactData;
    this.onFeatureSelect = this.onFeatureSelect.bind(this);
    this.on('select', this.onFeatureSelect);
  }

  /** funzione da richiamare quando si [de]seleziona una feature */
  private onFeatureSelect(ev: ol.interaction.Select.Event) {
    // prende la prima (e l'unica) feature contenuta nella collection e chiama la handleChange
    // (funzione per cambiare la sidebar) (getFeatures è ereditato da ol.interaction.Select)
    // console.log('MAP selected feats:', this.getFeatures().getLength());

    const elementMap = {
      [FeatureType.ASSET]: ElementType.ASSET,
      [FeatureType.NODE]: ElementType.NODE,
      [FeatureType.EDGE]: ElementType.EDGE,
    };
    let elUuid = null;
    let elType: ElementType = ElementType.SCENARIO;

    const feat = this.getFeatures().item(0);
    if (!isNullOrUndefined(feat)) {
      const info: FeatureInformation = feat.get('_info');
      console.log('MAP feature info: ', info);
      elUuid = info.uuid;
      elType = elementMap[info.type];
    }
    const o: ReactDataOptionsInterface = {
      sidebarType: { operationType: OperationType.VIEW, elementType: elType },
      selectedUuid: elUuid,
    };
    this.emitUpdateReactData(o);
  }

}

export { SelectInteraction };
