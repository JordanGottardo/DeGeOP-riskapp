/*
 * Author: Leonardo Brutesco
 * File: source/components/mapComponent/mapComponent.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { StoreInterface } from '../../store/types/storeInterface';
import {
  MapComponentOwnPropsInterface, MapComponentPropsInterface, MapComponentStateInterface,
  MapComponentStateToPropsInterface,
} from './mapComponentInterface';
import { connect } from 'react-redux';
import * as React from 'react';
import * as ol from 'openlayers';
import { RaisedButton } from 'material-ui';
import { isNullOrUndefined } from 'util';

import { AssetVector } from './assetVector';
import { NodeVector } from './nodeVector';
import { EdgeVector } from './edgeVector';
import { ScenarioVector } from './scenarioVector';
import { SelectInteraction } from './interactions/selectInteraction';
import { AddAssetInteraction } from './interactions/addAssetInteraction';
import { AddNodeInteraction } from './interactions/addNodeInteraction';
import { AddEdgeInteraction } from './interactions/addEdgeInteraction';
import { AddScenarioInteraction } from './interactions/addScenarioInteraction';
import { EditAssetInteraction } from './interactions/editAssetInteraction';
import { EditNodeInteraction } from './interactions/editNodeInteraction';
import { EditScenarioInteraction } from './interactions/editScenarioInteraction';

import {
  AssetFeatureInformation, FeatureInformation, FeatureType,
  getFeatureFinder, isEmptyObj, lonlat2proj, NodeFeatureInformation,
} from './mapUtils/mapUtils';

// import 'https://openlayers.org/en/v4.2.0/css/ol.css';
import './styles/ol.css';
import './styles/map.css';

import { SidebarTypeInterface } from '../sidebar/sidebarTypeInterface';
import { ElementType, OperationType } from '../../store/action/actionInterface';
import { CommonStyle } from './styles/featureStyle';
import { Asset } from '../../store/types/asset';
import { BaseNode } from '../../store/types/node';
import { Edge } from '../../store/types/edge';
import { Scenario } from '../../store/types/scenario';

const mapStateToMapComponentProps = (state: StoreInterface):
MapComponentStateToPropsInterface => ({
  assets: state.assets,
  nodes: state.nodes,
  edges: state.edges,
  scenarios: state.scenarios,
  selectedUuid: state.reactData.selectedUuid,
  centerTimestamp: state.reactData.centerTimestamp,
});

/** Componente mappa: mostra asset, nodi, archi e scenari sulla mappa */
class MapComponent extends React.Component<MapComponentPropsInterface, MapComponentStateInterface> {
  /** div contenente la mappa di openlayers */
  private mapDiv: HTMLElement = null;
  /** mappa di openlayers */
  private map: ol.Map;
  /** layer contenente gli asset */
  private assetsLayer: AssetVector;
  /** layer contenente i nodi */
  private nodesLayer: NodeVector;
  /** layer contenente gli archi */
  private edgesLayer: EdgeVector;
  /** layer contenente gli scenari */
  private scenariosLayer: ScenarioVector;
  /** view della mappa */
  private view: ol.View;
  /** interazione per la selezione di feature nella mappa */
  private selectInt: SelectInteraction;
  /** interazione per l'aggiunta di asset nella mappa */
  private addAssetInt: AddAssetInteraction;
  /** interazione per l'aggiunta di nodi nella mappa */
  private addNodeInt: AddNodeInteraction;
  /** interazione per l'aggiunta di archi nella mappa */
  private addEdgeInt: AddEdgeInteraction;
  /** interazione per l'aggiunta di scenari nella mappa */
  private addScenarioInt: AddScenarioInteraction;
  /** interazione per la modifica di asset nella mappa */
  private editAssetInt: EditAssetInteraction;
  /** interazione per la modifica di nodi nella mappa */
  private editNodeInt: EditNodeInteraction;
  /** interazione per la modifica di scenari nella mappa */
  private editScenarioInt: EditScenarioInteraction;
  /** collezione openlayers contenente la feature correntemente selezionata */
  private selectedFeatures: ol.Collection<ol.Feature>;

  constructor(props: MapComponentPropsInterface) {
    super(props);
    console.log('MAPA props', props);
    this.mapDiv = null;
    this.bindMyself();
    this.setupVecsAndLayers();
    this.buildMap();
    this.setupInteractions();
    this.activateInteractions(props.sidebarType, null);
    this.state = {
      showPOWButton: false,
    };
  }
  // https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/update
  //  /component_will_receive_props.html
  public componentWillReceiveProps(nextProps: MapComponentPropsInterface, nextContext: any) {
    console.log('MAPA nuove props:', nextProps);  // update mappa
    //  // this.props si aggiona!! non rimane costante dal costructor
    const { props } = this;
    // super.componentWillReceiveProps(nextProps, nextContext);

    if (props.assets !== nextProps.assets || props.nodes !== nextProps.nodes ||
        props.edges !== nextProps.edges || props.scenarios !== nextProps.scenarios ||
        (props.coloredNodeList !== nextProps.coloredNodeList &&
          !(isEmptyObj(props.coloredNodeList) && isEmptyObj(nextProps.coloredNodeList)))) {
      this.updateLayers(
        nextProps.assets, nextProps.nodes, nextProps.edges,
        nextProps.scenarios, nextProps.coloredNodeList,
      );
    }

    if (props.sidebarType !== nextProps.sidebarType ||
        props.selectedUuid !== nextProps.selectedUuid) {
      this.showPOW(false);
      this.activateInteractions(nextProps.sidebarType, nextProps.selectedUuid);
      if (nextProps.sidebarType.operationType === OperationType.VIEW &&
          nextProps.sidebarType.elementType === ElementType.ANALYSIS) {
        CommonStyle.setNodeColorVisibility(true);
      }else {
        CommonStyle.setNodeColorVisibility(false);
      }
      {
        this.nodesLayer.getSource().changed();
        console.log('MAP update');
      }
    }
    if (props.centerTimestamp !== nextProps.centerTimestamp) {
      // importante che sia dopo il select delle feature
      this.fitViewToSelectedFeature();
    }
  }
  /** si imposta il div contente la mappa */
  public componentDidMount() {
    this.map.setTarget(this.mapDiv); // imposta il div target su cui disegnare la mappa
  }
  public componentWillUnmount() { // nasconde la mappa
    this.map.setTarget(undefined);
  }
  public render() {
    return (
      <div id = "map" className = "mapContainer" ref = {(el) => {this.mapDiv = el;}}>
        <div
          className = "mapPOLOW"
          style = {{ display: this.state.showPOWButton ? 'initial' : 'none' }}
        >
          <RaisedButton
            primary = {true}
            label = "Rimuovi l'ultimo punto"
            onClick = {() => { this.addAssetInt.removeLastPoint(); }}
          />
        </div>
      </div>
    );
  }

  private bindMyself() {
    this.showPOW = this.showPOW.bind(this);
  }
  /** prepara i layer per la mappa */
  private setupVecsAndLayers() {
    const wrapX = true;
    const { props } = this;
    // costruisce la mappa di Open Street Map    // attributions: ol.source.OSM.ATTRIBUTION,
    this.assetsLayer = new AssetVector({ wrapX, assets:props.assets });
    this.nodesLayer = new NodeVector({
      wrapX, nodes:props.nodes, coloredNodeList:props.coloredNodeList,
    });
    this.edgesLayer = new EdgeVector({ wrapX, edges:props.edges, nodes:props.nodes });
    this.scenariosLayer = new ScenarioVector({ wrapX, scenarios:props.scenarios });
  }
  /** costruisce la mappa */
  private buildMap() {
    const center = lonlat2proj([12.123425,45.433011]);
    this.view = new ol.View({ center, enableRotation:false, maxZoom:21, minZoom:2, zoom:4.3 });
    this.map = new ol.Map({
      target: '', // div della mappa iniziale
      layers: [  // layers da visualizzare sulla mappa
        new ol.layer.Tile({ source: new ol.source.OSM({ wrapX: true }) }),
        this.assetsLayer,
        this.nodesLayer,
        this.edgesLayer,
        this.scenariosLayer,
      ],
      view: this.view,
      // definisce i controlli sulla mappa(tastiera/mouse, zoom ecc)(nascondo il (c) in basso a dx)
      controls: ol.control.defaults({ attribution:false }),
    });    // attributionOptions:{ collapsible: true },
    this.map.addControl(new ol.control.ZoomSlider()); // aggiungere lo zoomslider alla mappa
     // da togliere quello sotto;     aggiungere le coordinate visualizzate al momento
    // this.map.addControl(new ol.control.MousePosition({ projection: 'EPSG:4326' }));
  }

  /** prepara le interazioni base: select e add asset|node|edge|scenario */
  private setupInteractions() {
    this.selectedFeatures = new ol.Collection();

    this.selectInt = new SelectInteraction({  // SELECT
      features: this.selectedFeatures,
      emitUpdateReactData: this.props.emitUpdateReactData,
    });
    this.map.addInteraction(this.selectInt);

    this.addAssetInt = new AddAssetInteraction({  // ADD ASSET
      features: this.selectedFeatures,
      handleChange: this.props.handleChange,
      showPOW: this.showPOW,
    });
    this.map.addInteraction(this.addAssetInt);
    this.addNodeInt = new AddNodeInteraction({  // ADD NODE
      features: this.selectedFeatures,
      handleChange: this.props.handleChange,
      emitUpdateReactData: this.props.emitUpdateReactData,
      assetsFeatures: this.assetsLayer.getSource(),
    });
    this.map.addInteraction(this.addNodeInt);
    this.addEdgeInt = new AddEdgeInteraction({  // ADD EDGE
      features: this.selectedFeatures,
      handleChange: this.props.handleChange,
      nodesLayer: this.nodesLayer,
    });
    this.map.addInteraction(this.addEdgeInt);
    this.addScenarioInt = new AddScenarioInteraction({  // ADD SCENARIO
      features: this.selectedFeatures,
      handleChange: this.props.handleChange,
      showPOW: this.showPOW,
    });
    this.map.addInteraction(this.addScenarioInt);
  }
  /** attiva l'interazione di edit asset */
  private activateEditAssetInt() {
    this.editAssetInt = new EditAssetInteraction({  // EDIT ASSET
      features: this.selectedFeatures,
      handleChange: this.props.handleChange,
      emitUpdateReactData: this.props.emitUpdateReactData,
      nodesFeatures: this.nodesLayer.getSource(),
    });
    this.map.addInteraction(this.editAssetInt);
  }
  /** attiva l'interazione di edit node */
  private activateEditNodeInt() {
    this.editNodeInt = new EditNodeInteraction({  // EDIT NODE
      features: this.selectedFeatures,
      handleChange: this.props.handleChange,
      assetsFeatures: this.assetsLayer.getSource(),
      emitUpdateReactData: this.props.emitUpdateReactData,
    });
    this.map.addInteraction(this.editNodeInt);
  }
  /** attiva l'interazione di edit scenario */
  private activateEditScenarioInt() {
    this.editScenarioInt = new EditScenarioInteraction({  // EDIT NODE
      features: this.selectedFeatures,
      handleChange: this.props.handleChange,
    });
    this.map.addInteraction(this.editScenarioInt);
  }
  /** disattiva un'interazione (tra editAssetInt, editNodeInt, editScenarioInt ) */
  private deactivateEditInteraction(interaction: string) {
    if (!isNullOrUndefined(this[interaction])) {
      this[interaction].setActive(false);
      this.map.removeInteraction(this[interaction]);
      this[interaction] = null;
    }
  }
  /** reimposta le interazioni e trova la feature da selezionare nella mappa */
  private resetInteractions(selectedUuid: string) {
    this.selectInt.setActive(false);
    this.addAssetInt.setActive(false);
    this.addNodeInt.setActive(false);
    this.addEdgeInt.setActive(false);
    this.addScenarioInt.setActive(false);
    this.deactivateEditInteraction('editAssetInt');
    this.deactivateEditInteraction('editNodeInt');
    this.deactivateEditInteraction('editScenarioInt');

    this.selectInt.getFeatures().clear();
    if (!isNullOrUndefined(selectedUuid)) {
      this.selectedFeatures.clear();
      if (selectedUuid !== null) {
        const cbk = getFeatureFinder(selectedUuid, this.selectedFeatures);
        this.assetsLayer.getSource().forEachFeature(cbk);
        this.nodesLayer.getSource().forEachFeature(cbk);
        this.edgesLayer.getSource().forEachFeature(cbk);
        this.scenariosLayer.getSource().forEachFeature(cbk);
      }
    }
  }

  /** imposta la view in modo che sia interamente visibile la feature selezionata */
  private fitViewToSelectedFeature(duration: number = 3000) {
    const feat = this.selectedFeatures.item(0);
    let ext: any = feat.getGeometry(); // .getExtent();
    const info: FeatureInformation = feat.get('_info');
    const getAssetFinder = (node: NodeFeatureInformation) => { /*, extentRef: { ext: ol.Extent }*/
      return (el: ol.Feature) => {
        const i: AssetFeatureInformation = el.get('_info');
        if (node.assetUuid === i.uuid) {
          ext = el.getGeometry(); // .getExtent();
          return true;
        }
        return false;
      };
    };
    if (!isNullOrUndefined(info)) {
      if (info.type === FeatureType.NODE) {
        const a: NodeFeatureInformation = info as NodeFeatureInformation;   // downcasting, YEAH
        this.assetsLayer.getSource().getFeatures().some(getAssetFinder(a));
      }
    }
    this.view.fit(ext, { duration });

  }

  /** attiva la giusta interazione in base all'attuale sidebar */
  private activateInteractions(sidebar: SidebarTypeInterface, selectedUuid: string) {
    this.resetInteractions(selectedUuid);
    switch (sidebar.operationType) {
      case OperationType.INSERT:
        switch (sidebar.elementType) {
          case ElementType.ASSET:     this.addAssetInt.setActive(true); break;
          case ElementType.NODE:      this.addNodeInt.setActive(true); break;
          case ElementType.EDGE:      this.addEdgeInt.setActive(true); break;
          case ElementType.SCENARIO:  this.addScenarioInt.setActive(true); break;
        } break;
      case OperationType.EDIT:
        switch (sidebar.elementType) {
          case ElementType.ASSET:   this.activateEditAssetInt(); break;
          case ElementType.NODE:    this.activateEditNodeInt();  break;
          // case ElementType.EDGE:    this.editEdgeInt.setActive(true); break;
          case ElementType.SCENARIO:  this.activateEditScenarioInt(); break;
        } break;
      default: this.selectInt.setActive(true); break;
    }
  }
  /** aggiorna i layer */
  private updateLayers(assets: Asset[], nodes: BaseNode[], edges: Edge[], scenarios: Scenario[],
                       coloredNodeList: any) {
    console.log('MAP updating map features');
    this.assetsLayer.update({ assets });
    this.nodesLayer.update({ nodes, coloredNodeList });
    this.edgesLayer.update({ edges, nodes });

    this.scenariosLayer.update({ scenarios });
  }
  /** mostra o nasconde il pulsante per rimuovere l'ultimo punto aggiunto a un poligono */
  private showPOW(show: boolean) {
    if (this.state.showPOWButton !== show) {
      this.setState({ showPOWButton: show });
    }
  }
}

export default connect<MapComponentStateToPropsInterface, null, MapComponentOwnPropsInterface>(
  mapStateToMapComponentProps, null)(MapComponent);
