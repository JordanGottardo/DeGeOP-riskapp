/*
 * Author: Leonardo Brutesco
 * File: source/components/mapComponent/styles/featureStyle.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as ol from 'openlayers';
import { isNullOrUndefined } from 'util';
import { indigo500 } from 'material-ui/styles/colors';
import { NodeTypes } from '../../../store/types/node';
import {
  AssetFeatureInformation, FeatureInformation, FeatureType,
  NodeFeatureInformation, addCoordinate, rotateCoordinate,
} from '../mapUtils/mapUtils';
import { hex2rgb } from '../../../callManager/transformers/callManagerUtils/callManagerUtils';
import { normalStyles, selectedStyles } from './baseStyle';

type color = ol.Color|string;
type Style = ol.style.Style;

const whiteV: color = [255, 255, 255, 1];
const whiteVH: color = 'rgba(255, 255, 255, 0.5)';
const blueV: color = [0, 153, 255, 1];
const widthV = 3;

// http://openlayers.org/en/latest/apidoc/ol.geom.html
// ol.geom.GeometryType
enum StyleType {
  NORMAL,
  SELECTED,
}

/** Parametri per le funzioni di stile */
interface StyleParams {
  feature: ol.Feature;
  resolution: number;
  styleType: StyleType;
}

/**  */
class CommonStyle {
  /** definisce se i nodi devono essere colorati oppure no */
  public static setNodeColorVisibility(show: boolean) {
    // console.log('MAP show color', show);
    CommonStyle.showNodeColor = show;
  }

  /** metodo per stilare le feature asset */
  public static assetStyle(params: StyleParams): Style|Style[] {
    const { feature } = params;
    const { resolution } = params;
    const assetInfo: AssetFeatureInformation = feature.get('_info');
    const afC = assetInfo.color;
    const fC = { r:afC.r ,g:afC.g ,b:afC.b , a:1 };
    // 	color= [63, 229, 244, 0.9];
    let colorI: color = [200, 229, 244, 0.33];
    let colorO: color = [200, 229, 244, 1.0];
    if (fC.a !== 0) {
      colorO = [fC.r, fC.g, fC.b, fC.a];
      colorI = [fC.r, fC.g, fC.b, fC.a / 3];
    }
    if (params.styleType === StyleType.SELECTED) {
      colorI = whiteVH;
    }
    const stroke = new ol.style.Stroke({ color: colorO, width: 2 });
    const styles: ol.style.Style[] = [];

    styles.push(new ol.style.Style({
      text: new ol.style.Text({
        text: assetInfo.name, //  + ' ' + Math.round(Math.random() * 100),
        stroke: CommonStyle.whiteStroke,
        fill: CommonStyle.blackStroke,
        scale: 2,
      }),          // textBaseline: 'bottom',      // offsetY: -6,
      zIndex: 10000,
    }));
    styles.push(new ol.style.Style({
      stroke,
      fill: new ol.style.Fill({ color: colorI }),
      zIndex: 10,
    }));
    return styles;
  }

  /** metodo per stilare le feature node */
  public static nodeStyle(params: StyleParams): Style |Style[] {
    const { feature } = params;
    const { resolution } = params;
    // console.log('MAP node style show:', CommonStyle.showNodeColor);
    const nodeInfo: NodeFeatureInformation = feature.get('_info');

    const shape = CommonStyle.nodeKindToShape[nodeInfo.kind];
    let fillColor: color = 'rgba(8, 73, 79, 0.2)';
    let strokeColor: color = 'rgba(8, 73, 79, 1)';
    if (CommonStyle.showNodeColor === true) {
      let a = hex2rgb(indigo500);
      if (!isNullOrUndefined(nodeInfo.color)) {
        a = hex2rgb(nodeInfo.color);
      }
      // fillColor = [a.r, a.g, a.b, 0.2];
      strokeColor = [a.r, a.g, a.b, 1];
      fillColor = strokeColor;
    }
    if (params.styleType === StyleType.SELECTED) {
      fillColor = whiteV;
    }
    const fill = new ol.style.Fill({ color: fillColor });
    const stroke = new ol.style.Stroke({ color: strokeColor, width: 2 });
    const blackStroke = new ol.style.Stroke({ color: [0, 0, 0, 0.5], width: 1 });
    let image = null;
    let points = 0;
    let radius = 0;
    let angle = 0;
    let drawCircle = false;
    let showText = true;
    let textV = null;
    let tScale = 1;
    switch (shape) {
      case 'square':		  points = 4;	angle = Math.PI / 4;	break;
      case 'triangleDown':points = 3;	angle = Math.PI;		  break;
      case 'circle':		  drawCircle = true;			          break;
      case 'database':    points = 3; angle = 0;            break;
      default: 			      drawCircle = true;			          break;
    }
    if (resolution < 0.6) {
      radius = 15;
      tScale = 1.5;
    }else if (resolution < 1.2) {
      radius = 6;
      tScale = 1.2;
    }else {
      radius = 1;
      showText = false;
    }
    if (showText === true) {
      textV = new ol.style.Text({
        text:nodeInfo.label,
        textBaseline: 'bottom',
        offsetY: -8,
        stroke: blackStroke,
        scale: tScale,
      });
    }
    if (shape === 'dot') {
      image = new ol.style.Circle({
        radius: widthV * 2,
        fill: new ol.style.Fill({ color: fillColor }),
        stroke: new ol.style.Stroke({ color: strokeColor, width: widthV / 2 }),
      });
    }else if (drawCircle === true) {
      image = new ol.style.Circle({ radius, fill, stroke, snapToPixel: false });
    }else {
      image = new ol.style.RegularShape({
        radius, points, angle, fill, stroke, snapToPixel: false,
      });
    }
    const styles: Style[] = [];
    styles.push(new ol.style.Style({ stroke, image, zIndex: 20 }));
    styles.push(new ol.style.Style({ text: textV,zIndex: 10000 }));
    return styles;
  }

  /** metodo per stilare le feature edge */
  public static edgeStyle(params: StyleParams): ol.style.Style|ol.style.Style[] {
    const { feature } = params;
    const { resolution } = params;
    const geometry: any = feature.getGeometry();
    let col: ol.Color|string = '#ffcc33';
    if (params.styleType === StyleType.SELECTED) {
      col = whiteV;
    }
    const stroke = new ol.style.Stroke({ color: col, width: 3.5 });
    const styles = [new ol.style.Style({ stroke })];
    let iScale = 1;
    if (resolution < 0.6) {
      iScale = 1;
    }else if (resolution < 2) {
      iScale = 0.8;
    }else {
      iScale = 0.6;
    }
    geometry.forEachSegment((start: ol.Coordinate, end: ol.Coordinate) => {
      const dx = end[0] - start[0];
      const dy = end[1] - start[1];
      const rotation = Math.atan2(dy, dx);
      const rotD = rotation * 180 / Math.PI;
      const u = 3.5 * 1 / iScale;
      const a = addCoordinate(end, rotateCoordinate([0,0], [-u, -u], 90 - rotD));
      const b = addCoordinate(end, rotateCoordinate([0,0], [u, -u], 90 - rotD));
      const coords: ol.Coordinate[] = [a, end, b];
      // console.log('MAP ', coords, a, rotD);
      styles.push(new ol.style.Style({ stroke, geometry: new ol.geom.LineString(coords) }));
    });
    return styles;
  }

  /** funzione di stile per le feature non selezionate */
  public static styleFunctionNormal(featureP: ol.Feature, resolutionP: number): Style|Style[] {
    const info: FeatureInformation = featureP.get('_info');
    let style: Style|Style[] = normalStyles;
    if (!isNullOrUndefined(info)) {
      const params: StyleParams = {
        feature: featureP,
        resolution: resolutionP,
        styleType: StyleType.NORMAL,
      };
      if (info.type === FeatureType.ASSET) {
        style = CommonStyle.assetStyle(params);
      }else if (info.type === FeatureType.NODE) {
        style = CommonStyle.nodeStyle(params);
      }else if (info.type === FeatureType.EDGE) {
        style = CommonStyle.edgeStyle(params);
      }
    }
    return style;
  }

  /** funzione di stile per le feature selezionate */
  public static styleFunctionSelected(featureP: ol.Feature, resolutionP: number): Style|Style[] {
    const t = featureP.getGeometry().getType();
    let style: Style|Style[] = selectedStyles[t];
    const info: FeatureInformation = featureP.get('_info');
    if (!isNullOrUndefined(info)) {
      const params: StyleParams = {
        feature: featureP,
        resolution: resolutionP,
        styleType: StyleType.SELECTED,
      };
      if (info.type === FeatureType.ASSET) {
        style = CommonStyle.assetStyle(params);
      }else if (info.type === FeatureType.NODE) {
        style = CommonStyle.nodeStyle(params);
      }else if (info.type === FeatureType.EDGE) {
        style = CommonStyle.edgeStyle(params);
      }
    }
    return style;
  }

  private static readonly assetDefaultInnerColor: color = [200, 229, 244, 0.33];  // 0.2
  private static readonly assetDefaultOuterColor: color = [200, 229, 244, 1.0];
  private static readonly nodeDefaultInnerColor: color  = [8, 73, 79, 0.2];
  private static readonly nodeDefaultOuterColor: color  = [200, 229, 244, 1.0];
  private static readonly selectedDefaultColor: color   = [255, 255, 255, 1.0];
  private static readonly blackStroke = new ol.style.Stroke({ color:[0, 0, 0, 0.5], width:2 });
  private static readonly whiteStroke = new ol.style.Stroke({ color:[255, 255, 255, 1], width:2 });
  /** mappa nodo.tipo -> forma */
  private static readonly nodeKindToShape = {
    [NodeTypes.Coda]: 'database',
    [NodeTypes.Risorsa]: 'dot',
    [NodeTypes.Macchina]: 'square',
    [NodeTypes.Uscita]: 'circle',
    [NodeTypes.Sorgente]: 'triangleDown',
  };
  private static showNodeColor: boolean = false;
}

export { CommonStyle };
