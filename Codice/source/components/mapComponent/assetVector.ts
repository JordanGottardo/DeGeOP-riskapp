/*
 * Author: Leonardo Brutesco
 * File: source/components/mapComponent/assetVector.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as ol from 'openlayers';
import { Asset } from '../../store/types/asset';

import {
  AssetFeatureInformation, convertSRIDToArray,
  FeatureType, lonlat2proj,
} from './mapUtils/mapUtils';
import { CommonStyle } from './styles/featureStyle';

/** parametri da passare ad AssetVector */
interface AssetVectorOptions {
  wrapX?: boolean;
  assets?: Asset[];
}

/** classe layer openlayers per mostrare gli asset */
class AssetVector extends ol.layer.Vector {

  constructor(options: AssetVectorOptions) {
    const assetsVec = new ol.source.Vector({ wrapX: options.wrapX });
    super({
      source:assetsVec,
      style: CommonStyle.styleFunctionNormal,
    });
    this.loadAssets(options.assets);
  }
  /** metodo per aggiornare il vettore */
  public update(options: AssetVectorOptions) {
    this.loadAssets(options.assets);
  }
  /** metodo che popola il vettore di feature */
  private loadAssets(assets: Asset[]) {
    this.getSource().clear();
    const feats = assets.map((el) => {
      const coordsT = convertSRIDToArray(el.geoshape);
      const coords = coordsT[0].map(lonlat2proj);
      const feat = new ol.Feature(new ol.geom.Polygon([coords]));
      const a: AssetFeatureInformation = {
        type: FeatureType.ASSET,
        uuid: el.uuid,
        color: el.color,
        name: el.name,
        description: el.description,
      };
      feat.set('_info', a);
      return feat;
    });
    this.getSource().addFeatures(feats);
  }
}

export { AssetVector };
