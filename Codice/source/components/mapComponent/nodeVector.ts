/*
 * Author: Leonardo Brutesco
 * File: source/components/mapComponent/nodeVector.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as ol from 'openlayers';
import { BaseNode } from '../../store/types/node';
import {
  convertSRIDToArray, FeatureType,
  lonlat2proj, NodeFeatureInformation,
} from './mapUtils/mapUtils';
import { isNullOrUndefined } from 'util';
import { CommonStyle } from './styles/featureStyle';

// https://stackoverflow.com/questions/21070401/how-does-the-hash-variable-syntax-work-in-typescript

/** parametri da passare a EdgeVector */
interface NodeVectorOptions {
  wrapX?: boolean;
  nodes: BaseNode[];
  coloredNodeList: any;
}

/** classe layer openlayers per mostrare i node */
class NodeVector extends ol.layer.Vector {

  constructor(options: NodeVectorOptions) {
    const nodesVec = new ol.source.Vector({ wrapX: options.wrapX });
    super({
      source: nodesVec,
      style: CommonStyle.styleFunctionNormal,
    });
    this.loadNodes(options.nodes, options.coloredNodeList);
  }
  /** metodo per aggiornare il vettore */
  public update(options: NodeVectorOptions) {
    this.loadNodes(options.nodes, options.coloredNodeList);
  }

  /** metodo che popola il vettore di feature */
  private loadNodes(nodes: BaseNode[], coloredNodeList: any) {
    this.getSource().clear();
    const feats = nodes.map((el) => {
      const coordsT = convertSRIDToArray(el.coordinate);
      const coords = lonlat2proj(coordsT[0][0]);
      const feat = new ol.Feature(new ol.geom.Point(coords));

      let colorV = null;
      const c = coloredNodeList[el.uuid];
      if (!isNullOrUndefined(c)) {
        colorV = c;
      }
      const a: NodeFeatureInformation = {
        uuid: el.uuid,
        type: FeatureType.NODE,
        label: el.label,
        kind: el.node_class,  // viene usata una mappa   kind -> shape
        assetUuid: el.asset,
        color: colorV,
      };
      feat.set('_info', a);
      return feat;
    });
    this.getSource().addFeatures(feats);
  }
}

export { NodeVector };
