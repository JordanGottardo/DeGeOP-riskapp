/*
 * Author: Leonardo Brutesco
 * File: source/components/mapComponent/assetVector.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as ol from 'openlayers';
import { Scenario } from '../../store/types/scenario';
import {
  ScenarioFeatureInformation, convertSRIDToArray,
  FeatureType, lonlat2proj,
} from './mapUtils/mapUtils';

/** parametri da passare a ScenarioVector */
interface ScenarioVectorOptions {
  wrapX?: boolean;
  scenarios: Scenario[];
}

/** classe layer openlayers per mostrare gli scenari */
class ScenarioVector extends ol.layer.Vector {

  constructor(options: ScenarioVectorOptions) {
    const scenariosVec = new ol.source.Vector({ wrapX: options.wrapX });
    super({
      source:scenariosVec,
      style: null,  // normalmente gli scenari non vengono visualizzati
    });
    this.loadScenarios(options.scenarios);
  }

  /** metodo per aggiornare il vettore */
  public update(options: ScenarioVectorOptions) {
    this.loadScenarios(options.scenarios);
  }
  /** metodo che popola il vettore di feature */
  private loadScenarios(scenarios: Scenario[]) {
    this.getSource().clear();
    const feats = scenarios.map((el) => {
      const coordsT = convertSRIDToArray(el.application_area);  // APP AREA
      const coords = coordsT[0].map(lonlat2proj);
      const feat = new ol.Feature(new ol.geom.Polygon([coords]));
      const a: ScenarioFeatureInformation = {
        type: FeatureType.SCENARIO,
        uuid: el.uuid,
      };
      feat.set('_info', a);
      return feat;
    });
    this.getSource().addFeatures(feats);
  }

}

export { ScenarioVector };
