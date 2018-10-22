/*
 * Author: Leonardo Brutesco
 * File: source/components/mapComponent/interactions/addEdgeInteraction.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as ol from 'openlayers';
// import { ActionCreatorInterface } from '../../../store/action/actionInterface';
import { NodeFeatureInformation } from '../mapUtils/mapUtils';
import { NodeVector } from '../nodeVector';
import { CommonStyle } from '../styles/featureStyle';

/** parametri da passare a AddEdgeInteraction */
interface AddEdgeInteractionOptions {
  features: ol.Collection<ol.Feature>;
  // emitUpdateReactData?: ActionCreatorInterface;
  nodesLayer: NodeVector;
  handleChange: any;
}

/** interazione per aggiungere un edge */
class AddEdgeInteraction extends ol.interaction.Select {
  /** funzione per la inviare le modifiche */
  private handleChange: any;
  /** collezione a cui aggiungere la feature disegnata */
  private features: ol.Collection<ol.Feature>;

  constructor(options: AddEdgeInteractionOptions) {
    super({
      // features: undefined, // i nodi selezionati vanno in una loro collection
      addCondition: ol.events.condition.singleClick,
      removeCondition: ol.events.condition.singleClick,
      layers: [options.nodesLayer], // Array di layers da cui prendere le feats;
                                    // undefined => tutti quelli della mappa
      // hitTolerance: 24, // tslint:disable-line
      style: CommonStyle.styleFunctionSelected,
    });
    this.handleChange = options.handleChange;
    this.features = options.features;

    this.onSelect = this.onSelect.bind(this);
    this.checkFeaturesNum = this.checkFeaturesNum.bind(this);

    this.on('select', this.onSelect);
    this.getFeatures().on('add', this.checkFeaturesNum);
  }

  /** metodo che attiva o disattiva l'interazione */
  public setActive(active: boolean) {
    if (active === false) {
      this.getFeatures().clear();
    }
    super.setActive(active);
  }
  /** funzione che controlla il numero di features selezionate */
  private checkFeaturesNum(ev: any) {
    const f = this.getFeatures();// poppa le features fino a che non ne rimangono soltanto 2 (???)
    while (f.getLength() > 2) {
      // f.pop();               // remove last
      f.removeAt(0);  // remove first
    }
  }
  /** funzione da richiamare quando si selezinoa una feature dei nodi */
  private  onSelect(ev: any) {
    console.log('AddEdgeInteraction once');
    if (this.getFeatures().getLength() >= 2) {
      const feat1 = this.getFeatures().item(0);
      const feat2 = this.getFeatures().item(1);
      const info1: NodeFeatureInformation = feat1.get('_info');
      const info2: NodeFeatureInformation = feat2.get('_info');
      this.handleChange('node_from', info1.uuid);
      this.handleChange('node_to', info2.uuid);
      // this.getFeatures().clear();
    }
  }
}

export { AddEdgeInteraction };
