/*
 * Author: Leonardo Brutesco
 * File: source/components/mapComponent/interactions/editScenarioInteraction.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as ol from 'openlayers';
import { ActionCreatorInterface } from '../../../store/action/actionInterface';
import { convertArrayToSRID, convertPolygonCoordinates, proj2lonlat } from '../mapUtils/mapUtils';

/** parametri da passare a EditScenarioInteraction */
interface EditScenarioInteractionOptions {
  features?: ol.Collection<ol.Feature>;
  emitUpdateReactData?: ActionCreatorInterface;
  handleChange: any;
}

/** interazione per modificare uno scenario */
class EditScenarioInteraction extends ol.interaction.Modify {
  /** nodo da modificare */
  private features: ol.Collection<ol.Feature>;
  /** funzione per inviare le modifiche */
  private handleChange: any;
  /** geometria salvata del nodo al momento di inizializzazione dell'interazione */
  private startingGeo: any;

  constructor(options: EditScenarioInteractionOptions) {
    super({
      // freehandCondition: ol.events.condition.never,
      features: options.features,
      // hitTolerance: 4,   // types schifosi
    });
    this.handleChange = options.handleChange;
    this.features = options.features;

    this.onModifyEnd = this.onModifyEnd.bind(this);

    const geo: any = this.features.item(0).getGeometry(); // Geometry, SimpleGeometry, Point
    this.startingGeo = geo.clone();  // necessario altrimenti ref shared

    this.on('modifyend', this.onModifyEnd);
  }
  /** metodo che attiva o disattiva l'interazione */
  public setActive(active: boolean) {
    if (!active) {
      this.features.item(0).setGeometry(this.startingGeo);
    }
    super.setActive(active);
  }
  /** funzione da richiamare quando si finisce di modificare */
  private onModifyEnd(ev: any) {
    console.log('MAP EditNodeInteraction once (mde)');
    const feat = this.features.item(0);
    const geo: any = feat.getGeometry();
    const coords = convertPolygonCoordinates(geo.getCoordinates(), proj2lonlat);

    const applicationArea = convertArrayToSRID(coords, 'polygon');
    this.handleChange('application_area', applicationArea);  // salvo l'ultimo poligono
  }

}

export { EditScenarioInteraction };
