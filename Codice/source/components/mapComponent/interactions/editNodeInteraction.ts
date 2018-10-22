/*
 * Author: Leonardo Brutesco
 * File: source/components/mapComponent/interactions/editNodeInteraction.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as ol from 'openlayers';
import { ActionCreatorInterface } from '../../../store/action/actionInterface';
import { convertArrayToSRID, FeatureInformation, proj2lonlat } from '../mapUtils/mapUtils';

/** parametri da passare a EditNodeInteraction */
interface EditNodeInteractionOptions {
  features?: ol.Collection<ol.Feature>;
  emitUpdateReactData: ActionCreatorInterface;
  handleChange: any;
  assetsFeatures: ol.source.Vector;
}
/** interazione per la modifica di nodi */
class EditNodeInteraction extends ol.interaction.Modify {
  /** nodo da modificare */
  private features: ol.Collection<ol.Feature>;
  /** features degli asset */
  private assetsFeatures: ol.source.Vector;
  /** funzione per inviare le modifiche */
  private handleChange: any;
  /** funzione per inviare messaggi */
  private emitUpdateReactData: ActionCreatorInterface;
  /** ultima geometria salvata del nodo */
  private lastNodeGeo: ol.geom.Geometry;
  /** geometria salvata del nodo al momento di inizializzazione dell'interazione */
  private startingGeo: ol.geom.Geometry;

  constructor(options: EditNodeInteractionOptions) {
    super({
      features: options.features,
      deleteCondition: ol.events.condition.never,
      // hitTolerance: 4,   // types schifosi
    });
    this.handleChange = options.handleChange;
    this.features = options.features;
    this.assetsFeatures = options.assetsFeatures;
    this.emitUpdateReactData = options.emitUpdateReactData;

    this.onModifyEnd = this.onModifyEnd.bind(this);
    this.onModifyStart = this.onModifyStart.bind(this);

    const geo: any = this.features.item(0).getGeometry(); // Geometry, SimpleGeometry, Point
    this.startingGeo = geo.clone();  // necessario altrimenti ref shared

    this.on('modifystart', this.onModifyStart);
    this.on('modifyend', this.onModifyEnd);
  }
  /** metodo che attiva o disattiva l'interazione */
  public setActive(active: boolean) {
    if (!active) {
      this.features.item(0).setGeometry(this.startingGeo);
    }
    super.setActive(active);
  }
  /** funzione da richiamare quando si inizia a modificare */
  private onModifyStart(ev: any) {
    // ce ne sarà almeno una che si sta modificando, no???
    const geo: any = ev.features.item(0).getGeometry();      // Geometry, SimpleGeometry, Point
    this.lastNodeGeo = geo.clone();  // necessario altrimenti ref shared
  }
  /** funzione da richiamare quando si finisce di modificare */
  private onModifyEnd(ev: any) {
    console.log('EditNodeInteraction once (mde)');
    if (this.features.getLength() >= 1) {
      // cancello tutti i poligono disegnati a parte il più recente
      while (this.features.getLength() > 1) {
        this.features.removeAt(0);
      }
      const feat: ol.Feature = this.features.item(0);
      const geo: any = feat.getGeometry();      // Geometry, SimpleGeometry, Point
      const coord = convertArrayToSRID([[proj2lonlat(geo.getCoordinates())]], 'point');
      const ext = feat.getGeometry().getExtent();
      let assetUUid = null;
      const inAsset = this.assetsFeatures.getFeatures().some((el: any) => {
        if (el.getGeometry().intersectsExtent(ext)) {     // da portare fuori il metodo?
          const a: FeatureInformation = el.get('_info');
          assetUUid = a.uuid;
          return true;
        }
      });
      if (inAsset === true) {
        this.handleChange('coordinate', coord);   // WHAT NOW ? ?
        this.handleChange('asset', assetUUid);   // WHAT NOW ? ?
      } else {
        feat.setGeometry(this.lastNodeGeo);
        this.emitUpdateReactData({
          snackbarMessage: 'Il nodo dev\'essere dentro un asset',
          snackbarDuration: '3000',
          snackbarVisibility: true,
        });
      }
    }
  }

}

export { EditNodeInteraction };
