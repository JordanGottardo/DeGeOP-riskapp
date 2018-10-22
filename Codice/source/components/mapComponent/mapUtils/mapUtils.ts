/*
 * Author: Leonardo Brutesco
 * File: source/components/mapComponent/mapUtils/mapUtils.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */

import * as ol from 'openlayers';
import { BaseNode, NodeTypes } from '../../../store/types/node';
import { Scenario } from '../../../store/types/scenario';
import { isNullOrUndefined } from 'util';

/** enumerazione per il tipo di feature */
export enum FeatureType {
  ASSET,
  NODE,
  EDGE,
  SCENARIO,
}

/** interfaccia base per le informazioni delle feature */
export interface FeatureInformation {
  uuid: string;
  type: FeatureType;
}

/** interfaccia per le informazioni delle feature asset */
export interface AssetFeatureInformation extends FeatureInformation {
  color: any;
  name: string;
  description: string;
}
/** interfaccia per le informazioni delle feature nodi */
export interface NodeFeatureInformation extends FeatureInformation {
  assetUuid: string;
  label: string;
  kind: NodeTypes;
  color: any;
}
/** interfaccia per le informazioni delle feature archi */
export interface EdgeFeatureInformation extends FeatureInformation {
  from: string;
  to: string;
}
/** interfaccia per le informazioni delle feature scenari */
export interface ScenarioFeatureInformation extends FeatureInformation {
  useless1?: any; // per avere tipi =/=
}

/** funzione per convertire una stringa SRID in un array di array di coordinate */
function convertSRIDToArray(srid: string): ol.Coordinate[][] {
  const parts = srid.split(';');
  const code = parts[0];
  let ret: ol.Coordinate[][]|null = null;
  const coordStr = parts[1];
  if (coordStr.match(/^POLYGON/gi)) {
    const cooT = (srid.match(/\(\((.)*\)\)/gi));
    const coo = cooT[0].slice(2, -2);
    const coos = coo.split(', ');
    const coords = coos.map((el): [number, number] => {
      const a = el.split(' ');
      return [Number(a[0]), Number(a[1])];
    });

    ret = [coords];
  }else if (coordStr.match(/^POINT/)) {
    const cooT = (srid.match(/\((.)*\)/gi));
    const coo = cooT[0].slice(1, -1);
    const a = coo.split(' ');
    const c: [number, number] = [Number(a[0]), Number(a[1])];
    ret = [[c]];
  }
  return ret;
}

/** funzione per convertire un array di array di coordinate in una stringa SRID */
function convertArrayToSRID(coords: ol.Coordinate[][], kind: 'polygon'|'point'): string {
  const code = 'SRID=4326';
  let coordStr = '';

  if (kind === 'polygon') {
    let str = '';
    {// forse sarebbe da metterci una mappa, ma è inutile
      const coords2 = coords[0].slice(0); // cloniamo internamente
      // coords2.pop();
      const b = coords2.map((e: ol.Coordinate): string => {
        const a = e;
        const c = a[0].toFixed(16) + ' ' + a[1].toFixed(16);
        return c;
      });
      str = '(' + b.join(', ') + ')';
    }
    const str2 = '(' + str + ')';
    coordStr = 'POLYGON ' + str2;

  }else if (kind === 'point') {
    const a = coords[0][0];
    const c = a[0].toFixed(16) + ' ' + a[1].toFixed(16);
    const str = '(' + c + ')';
    coordStr = 'POINT ' + str;
  }
  const ret = code + ';' + coordStr;
  return ret;
}

function newSemiLine(coords: [ol.Coordinate, ol.Coordinate], percent: number):
[ol.Coordinate, ol.Coordinate] {
  // coordinata di una retta passante per 2 punti e disegna la retta (forse da portare fuori )
  const c1: ol.Coordinate = coords[0];
  const c2: ol.Coordinate = coords[1];
  const dx2 = ((c2[0] - c1[0]) / 2);
  const dy2 = ((c2[1] - c1[1]) / 2);
  const cx = c1[0] + dx2;
  const cy = c1[1] + dy2;
  const diff: ol.Coordinate = [dx2 * percent, dy2 * percent];
  const start: ol.Coordinate = [cx - diff[0], cy - diff[1]];
  const end: ol.Coordinate = [cx + diff[0], cy + diff[1]];
  return [start, end];
}

/** funzione per convertire una coordinata da longitudine e latitudine a proiezione EPSG:3857 */
function lonlat2proj(coord: ol.Coordinate) {    //
  return ol.proj.transform(coord, 'EPSG:4326', 'EPSG:3857');
}

/** funzione per convertire una coordinata da proiezione EPSG:3857 a longitudine e latitudine */
function  proj2lonlat(coord: ol.Coordinate) {
  return ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326');
}

/** funzione per ottenere l'array di nodi contenuti in uno scenario */
function getEnclosedNodes(scenario: Scenario, nodes: BaseNode[]): BaseNode[] {
  const coords = convertSRIDToArray(scenario.application_area);
  const areaFeat =  new ol.Feature(new ol.geom.Polygon(coords));
  const ret = nodes.filter((el: BaseNode) => {
    const ext = areaFeat.getGeometry().getExtent();
    const point  = convertSRIDToArray(el.coordinate);
    const r =  areaFeat.getGeometry().intersectsCoordinate(point[0][0]);
    return r;
  });
  return ret;
}

function addCoordinate(a1: ol.Coordinate, a2: ol.Coordinate): ol.Coordinate {
  return [a1[0] + a2[0], a1[1] + a2[1]];
}
function rotateCoordinate(cx: ol.Coordinate, point: ol.Coordinate, angle: number): ol.Coordinate {
  const radians = angle / 180 * Math.PI;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  return [
    (cos * (point[0] - cx[0])) + (sin * (point[1] - cx[1])) + cx[0],
    (cos * (point[1] - cx[0])) - (sin * (point[0] - cx[0])) + cx[1],
  ];
}

/** funione che ritorna una callback per trovare la feature selezionata */
function getFeatureFinder(selectedUuid: string, selectedFeatures: ol.Collection<ol.Feature>) {
  return (el: ol.Feature) => {
    const info: FeatureInformation = el.get('_info');
    if (!isNullOrUndefined(info)) {
      if (info.uuid === selectedUuid) {
        console.log('MAP FOUND IT!', info);
        selectedFeatures.push(el);
      }
    }
  };
}

/** funzione per controllare se un oggetto è vuoto */
function isEmptyObj(obj: any) {
  // See https://github.com/eslint/eslint/issues/6125
  let name;
  for (name in obj) {
    if (name !== 'blah') {
      return false;
    }
  }
  return true;
}

function convertPolygonCoordinates(coords: ol.Coordinate[][], converter: (el: any) => any) {
  return coords.map((el: any) => {
    return el.map((el2: any) => {
      return converter(el2);
    });
  });
}

export { convertSRIDToArray, convertArrayToSRID };
export { getEnclosedNodes };
export { newSemiLine };
export { lonlat2proj, proj2lonlat, convertPolygonCoordinates };
export { addCoordinate, rotateCoordinate };
export { getFeatureFinder };
export { isEmptyObj };
