/*
 * Author: Leonardo Brutesco
 * File: source/components/mapComponent/interactions/editAssetInteraction.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as ol from 'openlayers';
import { ActionCreatorInterface } from '../../../store/action/actionInterface';
import {
  convertArrayToSRID, convertPolygonCoordinates, FeatureInformation,
  NodeFeatureInformation, proj2lonlat,
} from '../mapUtils/mapUtils';

/** parametri da passare a EditAssetInteraction */
interface EditAssetInteractionOptions {
  features?: ol.Collection<ol.Feature>;
  emitUpdateReactData: ActionCreatorInterface;
  handleChange: any;
  nodesFeatures: ol.source.Vector;
}

/** interazione per modificare un asset */
class EditAssetInteraction extends ol.interaction.Modify {
  /** funzione per inviare le modifiche */
  private handleChange: any;
  /** collezione in cui è presente la feature modificata */
  private features: ol.Collection<ol.Feature>;
  /** funzione per inviare messaggi */
  private emitUpdateReactData: ActionCreatorInterface;
  /** ultima geometria salvata dell'asset */
  private lastAssetGeo: any;
  /** geometria salvata dell'asset al momento di inizializzazione dell'interazione */
  private startingGeo: any;
  /** features dei nodi */
  private assetNodesFeatures: ol.Feature[];

  constructor(options: EditAssetInteractionOptions) {
    super({
      features: options.features,
      // hitTolerance: 4,
    });
    this.handleChange = options.handleChange;
    this.emitUpdateReactData = options.emitUpdateReactData;
    this.features = options.features;

    const assetInfo: FeatureInformation = this.features.item(0).get('_info');
    this.assetNodesFeatures = options.nodesFeatures.getFeatures().filter((el: ol.Feature) => {
      const nodeInfo: NodeFeatureInformation = el.get('_info');
      if (assetInfo.uuid === nodeInfo.assetUuid) {
        return true;
      }
      return false;
    });

    const geo: any = this.features.item(0).getGeometry(); // Geometry, SimpleGeometry, Point
    this.startingGeo = geo.clone();  // necessario altrimenti ref shared

    this.onModifyEnd = this.onModifyEnd.bind(this);
    this.onModifyStart = this.onModifyStart.bind(this);

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
    this.lastAssetGeo = geo.clone();  // necessario altrimenti ref shared
  }
  /** funzione da richiamare quando si finisce di modificare */
  private onModifyEnd(ev: any) {
    console.log('MAP EditNodeInteraction once (mde)');
    const feat = this.features.item(0);
    const geo: any = feat.getGeometry();
    const coords = convertPolygonCoordinates(geo.getCoordinates(), proj2lonlat);

    const assetGeo: any = this.features.item(0).getGeometry(); // .getExtent();
    const hasAllPreviousNodes = this.assetNodesFeatures.every((el) => {
      const ext = el.getGeometry().getExtent();
      if (assetGeo.intersectsExtent(ext)) {
        return true;
      }
      return false;
    });
    if (hasAllPreviousNodes) {
      const geoshape = convertArrayToSRID(coords, 'polygon');
      this.handleChange('geoshape', geoshape);  // salvo l'ultimo poligono
    }else {
      feat.setGeometry(this.lastAssetGeo);
      this.emitUpdateReactData({
        snackbarMessage: 'I bordi dell\'asset devono comprendere tutti i nodi',
        snackbarDuration: '3000',
        snackbarVisibility: true,
      });
    }
  }

}

export { EditAssetInteraction };
