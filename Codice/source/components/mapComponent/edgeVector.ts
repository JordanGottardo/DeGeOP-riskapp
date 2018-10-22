/*
 * Author: Leonardo Brutesco
 * File: source/components/mapComponent/edgeVector.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as ol from 'openlayers';
import { Edge } from '../../store/types/edge';
import { BaseNode } from '../../store/types/node';
import {
  convertSRIDToArray, newSemiLine, lonlat2proj,
  EdgeFeatureInformation, FeatureType,
} from './mapUtils/mapUtils';
import { CommonStyle } from './styles/featureStyle';

/** parametri da passare a EdgeVector */
interface EdgeVectorOptions {
  wrapX?: boolean;
  edges?: Edge[];
  nodes?: BaseNode[];
}

/** classe layer openlayers per mostrare gli edge */
class EdgeVector extends ol.layer.Vector {

  constructor(options: EdgeVectorOptions) {
    const edgesVec = new ol.source.Vector({ wrapX: options.wrapX });
    super({
      source: edgesVec,
      style: CommonStyle.styleFunctionNormal,
    });
    this.loadEdges(options.edges, options.nodes);
  }
  /** metodo per aggiornare il vettore */
  public update(options: EdgeVectorOptions) {
    this.loadEdges(options.edges, options.nodes);
  }

  /** metodo che popola il vettore di feature */
  private loadEdges(edges: Edge[], nodes: BaseNode[]) {
    this.getSource().clear();
    const feats = edges.map((el) => {
      let n1: BaseNode = null;
      let n2: BaseNode = null;
      nodes.some((e) => {
        if (e.uuid === el.node_from) { n1 = e; }
        if (e.uuid === el.node_to) { n2 = e; }
        if (!((n1 === null) || (n2 === null))) {
          return true;
        }
      });
      const c1T = convertSRIDToArray(n1.coordinate);
      const c1 = lonlat2proj(c1T[0][0]);
      const c2T = convertSRIDToArray(n2.coordinate);
      const c2 = lonlat2proj(c2T[0][0]);

      const coords = newSemiLine([c1, c2], 1);// 0.49);
      const feat = new ol.Feature(new ol.geom.LineString(coords));
      const a: EdgeFeatureInformation = {
        type: FeatureType.EDGE,
        uuid: el.uuid,
        from: el.node_from,
        to: el.node_to,
      };
      feat.set('_info', a);
      return feat;
    });
    this.getSource().addFeatures(feats);
  }

}

export { EdgeVector };
