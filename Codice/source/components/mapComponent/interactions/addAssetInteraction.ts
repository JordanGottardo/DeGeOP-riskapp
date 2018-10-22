/*
 * Author: Leonardo Brutesco
 * File: source/components/mapComponent/interactions/addAssetInteraction.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as ol from 'openlayers';
import { ActionCreatorInterface } from '../../../store/action/actionInterface';
import { convertArrayToSRID, convertPolygonCoordinates, proj2lonlat } from '../mapUtils/mapUtils';
import { isNullOrUndefined } from 'util';
import { CommonStyle } from '../styles/featureStyle';

/** parametri da passare a AddAssetInteraction */
interface AddAssetInteractionOptions {
  features: ol.Collection<ol.Feature>;
  emitUpdateReactData?: ActionCreatorInterface;
  showPOW: any;  //
  handleChange: any;
}

/** interazione per aggiungere un asset */
class AddAssetInteraction extends ol.interaction.Draw {
  /** funzionare per mostrare/nascondere il bottone per rimuovere l'ultimo punto aggiunto */
  private showPOW: any;
  /** key dell'evento aggiunto alla collezione di features */
  private evKey: any;
  /** poligono al momento disegnato */
  private drawingFeat: ol.Feature;
  /** funzione per la inviare le modifiche */
  private handleChange: any;
  /** collezione a cui aggiungere la feature disegnata */
  private features: ol.Collection<ol.Feature>;

  constructor(options: AddAssetInteractionOptions) {
    super({
      type: 'Polygon',
      freehandCondition: ol.events.condition.never,
      features: options.features,
      style: CommonStyle.styleFunctionSelected,
      /*    // hitTolerance: 4,*/
    });

    this.features = options.features;
    this.handleChange = options.handleChange;
    this.showPOW = options.showPOW;
    this.evKey = null;

    this.onAddFeature = this.onAddFeature.bind(this);
    this.onDrawChange = this.onDrawChange.bind(this);
    this.onDrawStart = this.onDrawStart.bind(this);
    this.onDrawEnd = this.onDrawEnd.bind(this);

    this.drawingFeat = null;
    this.on('drawstart', this.onDrawStart);
    this.on('drawend', this.onDrawEnd);
  }
  /** metodo che attiva o disattiva l'interazione */
  public setActive(active: boolean) {
    if (active === true) {
      this.evKey = this.features.on('add', this.onAddFeature);
    }else {
      if (!isNullOrUndefined(this.evKey)) {
        ol.Observable.unByKey(this.evKey); // unsubscribe
      }
      this.evKey = null;
    }
    super.setActive(active);
  }

  /** funzione da richiamare quando si inizia a disegnare */
  private onDrawStart(ev: any) {
    this.drawingFeat = ev.feature;
    this.drawingFeat.on('change', this.onDrawChange);
    this.showPOW(true);   // necessario all'inizio
  }

  /** funzione da richiamare quando si finisce di disegnare */
  private onDrawEnd(ev: any) {
    this.showPOW(false);  // necessario alla fine
  }
  /** funzione da richiamare quando il disegno cambia */
  private onDrawChange(ev: any) {
    // se coords[0].length==2 : non c'è nessun punto fisso, ma è il puntatore del mouse
    const geo: any = this.drawingFeat.getGeometry();
    if (geo.getCoordinates()[0].length < 3) {
      this.showPOW(false);
    }else {
      this.showPOW(true);
    }
  }
  /** funzione richiamata quando la feature disegnata viene aggiunta alla collezione */
  private onAddFeature(ev: ol.Collection.Event) {
    console.log('AddAssetInteraction once');
    if (this.features.getLength() >= 1) {
      const geo: any = this.drawingFeat.getGeometry();
      // cancello tutti i poligono disegnati a parte il più recente
      while (this.features.getLength() > 1) {
        this.features.removeAt(0);
      }
      const coords = convertPolygonCoordinates(geo.getCoordinates(), proj2lonlat);
      const geoshape = convertArrayToSRID(coords, 'polygon');
      this.handleChange('geoshape', geoshape);  // salvo l'ultimo poligono
    }
  }
}

export { AddAssetInteraction };
