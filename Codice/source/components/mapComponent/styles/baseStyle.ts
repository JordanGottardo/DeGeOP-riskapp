/*
 * Author: Leonardo Brutesco
 * File: source/components/mapComponent/styles/baseStyle.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as ol from 'openlayers';

/**
 * stili di default copiati da openalyers
 */

/** geometry type secondo ol.geom.GeometryType */
enum GeometryType {
  POINT = 'Point',      // ol.geom.GeometryType.POINT
  LINE_STRING = 'LineString',
  // 'LinearRing',
  POLYGON = 'Polygon',  // ol.geom.GeometryType.POINT
  MULTI_POINT = 'MultiPoint',
  MULTI_LINE_STRING = 'MultiLineString',
  MULTI_POLYGON = 'MultiPolygon',
  GEOMETRY_COLLECTION = 'GeometryCollection',
  // 'Circle',
}

const fill = new ol.style.Fill({ color: 'rgba(255,255,255,0.4)' });
const stroke = new ol.style.Stroke({ color: '#3399CC', width: 1.25 });
const normalStyles = [
  new ol.style.Style({
    fill,
    stroke,
    image: new ol.style.Circle({ fill, stroke, radius: 5 }),
  }),
];

type color4 = [number, number, number, number];
const white: color4 = [255, 255, 255, 1];
const blue: color4 = [0, 153, 255, 1];
const width = 3;

const selectedStyles: ol.style.Style[][] = [];
selectedStyles[GeometryType.POLYGON] = [
  new ol.style.Style({
    stroke: new ol.style.Stroke({ width, color: blue }),
    fill: new ol.style.Fill({ color: [255, 255, 255, 0.5] }),
  }),
];
selectedStyles[GeometryType.MULTI_POLYGON] = selectedStyles[GeometryType.POLYGON];
selectedStyles[GeometryType.LINE_STRING] = [
  new ol.style.Style({ stroke: new ol.style.Stroke({ color: white, width: width + 2 }) }),
  new ol.style.Style({ stroke: new ol.style.Stroke({ width, color: blue }) }),
];
selectedStyles[GeometryType.MULTI_LINE_STRING] = selectedStyles[GeometryType.LINE_STRING];
selectedStyles[GeometryType.POINT] = [
  new ol.style.Style({
    image: new ol.style.Circle({
      radius: width * 2,
      fill: new ol.style.Fill({ color: blue }),
      stroke: new ol.style.Stroke({ color: white, width: width / 2 }),
    }),
    zIndex: Infinity,
  }),
];
selectedStyles[GeometryType.MULTI_POINT] =  selectedStyles[GeometryType.POINT];
selectedStyles[GeometryType.GEOMETRY_COLLECTION] = selectedStyles[GeometryType.POLYGON].
concat(selectedStyles[GeometryType.POINT]);

export { normalStyles, selectedStyles };

export { GeometryType };
