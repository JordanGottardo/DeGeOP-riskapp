/*
 * Author: Leonardo Brutesco
 * File: source/components/mapComponent/interactions/addNodeInteraction.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as ol from 'openlayers';
import { ActionCreatorInterface } from '../../../store/action/actionInterface';
import { convertArrayToSRID, FeatureInformation, proj2lonlat } from '../mapUtils/mapUtils';
import { isNullOrUndefined } from 'util';
import { CommonStyle } from '../styles/featureStyle';

/** parametri da passare a AddNodeInteraction */
interface AddNodeInteractionOptions {
  features: ol.Collection<ol.Feature>;
  emitUpdateReactData: ActionCreatorInterface;
  assetsFeatures: ol.source.Vector;
  handleChange: any;
}

/** interazione per aggiungere un nodo */
class AddNodeInteraction extends ol.interaction.Draw {
  /** key dell'evento aggiunto alla collezione di features */
  private evKey: any;
  /** features degli asset */
  private assetsFeatures: ol.source.Vector;
  /** funzione per la inviare le modifiche */
  private handleChange: any;
  /** collezione a cui aggiungere la feature disegnata */
  private features: ol.Collection<ol.Feature>;
  /** funzione per inviare messaggi */
  private emitUpdateReactData: ActionCreatorInterface;

  constructor(options: AddNodeInteractionOptions) {
    super({
      type: 'Point',
      freehandCondition: ol.events.condition.never,
      features: options.features,
      style: CommonStyle.styleFunctionSelected,
    });
    this.handleChange = options.handleChange;
    this.emitUpdateReactData = options.emitUpdateReactData;
    this.assetsFeatures = options.assetsFeatures;
    this.features = options.features;
    this.evKey = null;
    this.onAddFeature = this.onAddFeature.bind(this);
  }

  /** metodo che attiva o disattiva l'interazione */
  public setActive(active: boolean) {
    if (active === true) {
      this.activateEvt();
    }else {
      this.deactivateEvt();
    }
    super.setActive(active);
  }
  /** funzione per attivare l'evento sull'aggiunta di features alla collezione */
  private activateEvt() {
    if (isNullOrUndefined(this.evKey)) {  // da togliere?
      this.evKey = this.features.on('add', this.onAddFeature);
    }
  }
  /** funzione per disattivare l'evento sull'aggiunta di features alla collezione */
  private deactivateEvt() {
    if (!isNullOrUndefined(this.evKey)) {
      ol.Observable.unByKey(this.evKey);
    }
    this.evKey = null;
  }

  /** funzione da richiamare quando si aggiunge una feature alla collezione */
  private onAddFeature(ev: any) {
    console.log('AddNodeInteraction once');
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
        if (el.getGeometry().intersectsExtent(ext)) {
          const a: FeatureInformation = el.get('_info');
          assetUUid = a.uuid;
          return true;
        }
      });
      if (inAsset === true) {
        this.handleChange('coordinate', coord);
        this.handleChange('asset', assetUUid);
      } else {
        this.features.clear();
        this.handleChange('coordinate', null);
        this.handleChange('asset', null);
        this.emitUpdateReactData({
          snackbarMessage: 'Il nodo dev\'essere dentro un asset',
          snackbarDuration: '3000',
          snackbarVisibility: true,
        });
      }
    }
  }

}

export { AddNodeInteraction };
