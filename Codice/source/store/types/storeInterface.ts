/*
 * Author: Giovanni Prete
 * File: source/store/types/storeInterface.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { Asset, AssetOwner, AssetTypes } from './asset';
import { AllNodeTypes, NodeTypes } from './node';
import { Edge } from './edge';
import { Scenario, ScenarioType } from './scenario';
import { SidebarTypeInterface } from '../../components/sidebar/sidebarTypeInterface';
import { Container, ContainerStatus } from './container';
import { ElementType, OperationType } from '../action/actionInterface';

/**
 * rappresenta l'interfaccia per un LogMessage
 */
export interface LogMessageInterface {
  /**
   * rappresenta il messaggio da visualizzare
   */
  message: string;
  /**
   * rappresenta il tempo di visualizzazione del messaggio
   */
  timestamp: number;
}

/**
 * rappresenta l'interfaccia per reactData
 */
interface ReactDataInterface {
  /**
   * rappresenta la tipologia di sidebar
   */
  sidebarType: SidebarTypeInterface;
  /**
   * rappresenta l'opzione di visibilità riguardante la dialog
   */
  dialogVisibility: boolean;
  /**
   * rappresenta l'opzione di visibilità riguardante un message box
   */
  messageVisibility: boolean;
  /**
   * rappresenta il messaggio per la message box
   */
  message: string;
  /**
   * rappresenta il messaggio per uno snackbar message
   */
  snackbarMessage: string;
  /**
   * rappresenta la durata di visualizzazione dello snackbar
   */
  snackbarDuration: number;
  /**
   * rappresenta l'opzione di visibilità riguardante uno snackbar
   */
  snackbarVisibility: boolean;
  /**
   * rappresenta l'uuid selezionato
   */
  selectedUuid: string;
  /**
   * rappresenta la presenza di connessione ad internet
   */
  internetAvailable: boolean;
  /**
   * rappresenta lo stato dell'analisi (true solamente se un'analisi è in corso)
   */
  isAnalyzing: boolean;
  /**
   * rappresenta l'anno da analizzare
   */
  yearToAnalyze: number;
  /**
   * rappresenta la durata di visualizzazione
   */
  centerTimestamp: number;
}

/**
 * rappresenta l'interfaccia per lo store
 */
export interface StoreInterface {
  /**
   * rappresenta la lista degli asset
   */
  assets: Asset[];
  /**
   * rappresenta la lista dei nodi
   */
  nodes: AllNodeTypes[];
  /**
   * rappresenta la lista degli edge
   */
  edges: Edge[];
  /**
   * rappresenta la lista degli scenari
   */
  scenarios: Scenario[];
  /**
   * rappresenta la lista dei containers
   */
  containers: Container[];
  /**
   * rappresenta la lista delle analisi richieste
   */
  requestedAnalysis: string[];
  /**
   * rappresenta il reactData
   */
  reactData: ReactDataInterface;
}

export const defaultStore: StoreInterface = {
  assets: [],
  //   {
  //   uuid: '566c970e-77d7-4c11-b640-d9a5c0e3843a',
  //   description: 'descrizione Asset di test',
  //   name: 'Asset di test',
  //   type: AssetTypes.Acciaio,
  //   belong_to: AssetOwner.Assicurando,
  //   surface: 23,
  //   unitValue: 15,
  //   color: {
  //     a: 1.0,
  //     b: 0,
  //     g: 165,
  //     r: 255,
  //   },
  //  /* geoshape: 'SRID=4326;POLYGON ((8.0668938159942627 48.0912898854527242, ' +
  //   '8.5502922534942627 45.2578757421761537, 1.4750969409942627 45.4739998739587250, ' +
  //   '3.3647453784942627 48.3547892885969901, 11.0976505279541016 66.2833590556783605, ' +
  //   '44.8476505279541016 57.3960458740213397, 1.2539005279541016 48.7759825858362959, ' +
  //   '5.4726505279541016 48.3104799000422034, 8.0668938159942627 48.0912898854527242))',/**/
  //   geoshape: 'SRID=4326;POLYGON ((12.1230130000000000 45.4327670000000000, ' +
  //   '12.1231480000000000 45.4327940000000000, 12.1230600000000000 45.4331040000000000,' +
  //   ' 12.1229040000000000 45.4330860000000000, 12.1230130000000000 45.4327670000000000))',
  // },
  //   {
  //     uuid: '06eb5141-e3f6-432c-ab6a-9e09ed2bc894',
  //     description: 'descrizione Asset di test 2',
  //     name: 'Asset di test 2',
  //     type: AssetTypes.Cemento_prefabbricato,
  //     belong_to: AssetOwner.Assicurando,
  //     surface: 44,
  //     unitValue: 23,
  //     color: {
  //       a: 1.0,
  //       b: 22,
  //       g: 33,
  //       r: 33,
  //     },
  //     /*geoshape: 'SRID=4326;POLYGON ((12.7045574783733173 45.9443114328572761, ' +
  //     '12.7045735716274066 45.9442032573368451, 12.7046808599880023 45.9442181781108090,' +
  //     ' 12.7046915888240619 45.9441435742007158, 12.7048256992748065 45.9441584949907664,' +
  //     ' 12.7047988771846576 45.9442330988807868, 12.7048954367091937 45.9442405592642729,' +
  //     ' 12.7048847078731342 45.9443412743430244, 12.7045574783733173 45.9443114328572761))',/**/
  //     geoshape: 'SRID=4326;POLYGON ((12.1230280000000000 45.4326500000000000, ' +
  //     '12.1231130000000000 45.4326650000000000, 12.1231320000000000 45.4326330000000000,' +
  //     ' 12.1231960000000000 45.4326450000000000, 12.1231430000000000 45.4327650000000000,' +
  //     ' 12.1229740000000000 45.4327270000000000, 12.1230280000000000 45.4326500000000000))',
  //   },
  //   {
  //     // uuid: '06eb5141-e3f6-432c-ab6a-9e09ed2bc894',
  //     uuid: '6f796fc3-ee09-4830-9552-831a1ee547f1',
  //     description: 'Asset 3 description',
  //     name: 'Asset 3',
  //     type: AssetTypes.Cemento_prefabbricato,
  //     belong_to: AssetOwner.Assicurando,
  //     surface: 44,
  //     unitValue: 23,
  //     color: {
  //       a: 1.0,
  //       b: 0,
  //       g: 200,
  //       r: 25,
  //     },
  //     geoshape: 'SRID=4326;POLYGON ((12.1237580000000000 45.4328960000000000, ' +
  //     '12.1238910000000000 45.4329020000000000, 12.1238610000000000 45.4331630000000000, ' +
  //     '12.1237050000000000 45.4331470000000000, 12.1237580000000000 45.4328960000000000))',
  //   },
  // ],
  nodes: [],
  //   {
  //   uuid: 'ac19015a-884d-47bc-b6c2-396d54233e0f',
  //   label: 'nodo 1',
  //   asset: '566c970e-77d7-4c11-b640-d9a5c0e3843a',
  //   node_class: NodeTypes.Risorsa,
  //   // coordinate: 'SRID=4326;POINT (-4.9218750000000400 53.0781849718600611)',
  //   coordinate: 'SRID=4326;POINT (12.1230250000000000 45.4328650000000000)',  // 0000000000
  // },
  //   {
  //     uuid: 'bef7cd4e-c486-42d3-aae0-42bc8397e1f1',
  //     label: 'nodo 2',
  //     asset: '06eb5141-e3f6-432c-ab6a-9e09ed2bc894',
  //     node_class: NodeTypes.Coda,
  //     // coordinate: 'SRID=4326;POINT (-4.9218750000000400 53.0781849718600611)',
  //     coordinate: 'SRID=4326;POINT (12.1230110000000000 45.4327120000000000)',
  //     capacity: 40,
  //   },
  //   {
  //     uuid: 'c825a796-91fe-43c8-90be-8579bb97b823',
  //     label: 'nodo 3',
  //     asset: '566c970e-77d7-4c11-b640-d9a5c0e3843a',
  //     node_class: NodeTypes.Macchina,
  //     processingTime: 10,
  //     value: 50,
  //     coordinate: 'SRID=4326;POINT (12.1229880000000000 45.4330480000000000)',
  //     capacity: 40,
  //   },
  //   {
  //     uuid: 'adac00d9-8308-4ff9-8d9d-013085037545',
  //     label: 'nodo 4',
  //     asset: '6f796fc3-ee09-4830-9552-831a1ee547f1',
  //     node_class: NodeTypes.Sorgente,
  //     leadTime: 23,
  //     coordinate: 'SRID=4326;POINT (12.1237770000000000 45.4329630000000000)',
  //   },
  //   {
  //     uuid: '61becb6b-4d50-4877-873b-41b1b33c91a2',
  //     label: 'nodo 5',
  //     asset: '6f796fc3-ee09-4830-9552-831a1ee547f1',
  //     node_class: NodeTypes.Uscita,
  //     coordinate: 'SRID=4326;POINT (12.1237350000000000 45.4331170000000000)',
  //   },
  edges: [],
  //   {
  //   uuid: '12348653-33ed-4256-ba54-cf0f5fb9fc7a',
  //   node_from: 'ac19015a-884d-47bc-b6c2-396d54233e0f',
  //   node_to: 'bef7cd4e-c486-42d3-aae0-42bc8397e1f1',
  // },{
  //   uuid: 'b3127283-144d-4f5b-9a10-24b043c63d22',
  //   node_from: 'ac19015a-884d-47bc-b6c2-396d54233e0f',
  //   node_to: 'adac00d9-8308-4ff9-8d9d-013085037545',
  // },{
  //   uuid: '4ca50dfc-d8c1-4080-8c60-110342b9aa31',
  //   node_from: 'adac00d9-8308-4ff9-8d9d-013085037545',
  //   node_to: '61becb6b-4d50-4877-873b-41b1b33c91a2',
  // },
  scenarios: [],
//     {
//     uuid: 's1',
//     name: 'PrimoScenario',
//     description: 'afafafa',
//     scenario_type: ScenarioType.Rottura_di_macchinari,
//     intensity_measure: 15,
//     p_s: 15,               // exceedance probability, probability di ACCADIMENTO
//     event_time: 15,        // tempo di inizio
//     application_area: 'SRID=4326;POLYGON ((12.1220294095515282 45.4332598545622091,' +
// ' 12.1224692918299706 45.4333840804374915, 12.1224371053217901 45.4330791618919250,' +
// ' 12.1221152402400048 45.4331280995472753, 12.1220294095515282 45.4332598545622091))',
//   }, {
//     uuid: 's2',
//     name: 'SecondoScenario',
//     description: 'afafafa',
//     scenario_type: ScenarioType.Ciclone,
//     intensity_measure: 15,
//     p_s: 15,               // exceedance probability, probability di ACCADIMENTO
//     event_time: 15,        // tempo di inizio
//     application_area: 'SRID=4326;POLYGON ((12.1220294095515282 45.4332598545622091,' +
//     ' 12.1224692918299706 45.4333840804374915, 12.1224371053217901 45.4330791618919250,' +
//     ' 12.1221152402400048 45.4331280995472753, 12.1220294095515282 45.4332598545622091))',
//   },
//     {
//       uuid: 's3',
//       name: 'TerzoScenario - non analizzato',
//       description: 'afafafa',
//       scenario_type: ScenarioType.Ciclone,
//       intensity_measure: 15,
//       p_s: 15,               // exceedance probability, probability di ACCADIMENTO
//       event_time: 15,        // tempo di inizio
//       application_area: 'SRID=4326;POLYGON ((12.1220294095515282 45.4332598545622091,' +
//       ' 12.1224692918299706 45.4333840804374915, 12.1224371053217901 45.4330791618919250,' +
//       ' 12.1221152402400048 45.4331280995472753, 12.1220294095515282 45.4332598545622091))',
//     },
//     {
//       uuid: 's4',
//       name: 'QuartoScenario - non analizzato - colpisce nodi 1 3 4 5',
//       description: 'afafafa',
//       scenario_type: ScenarioType.Ciclone,
//       intensity_measure: 100,
//       p_s: 1,               // exceedance probability, probability di ACCADIMENTO
//       event_time: 1,        // tempo di inizio
//       application_area: 'SRID=4326;POLYGON ((12.1227280683411305 45.4331554191548719,' +
//       ' 12.1240530795944892' +
//       ' 45.4332382365886929, 12.1241013593567573 45.4328053259329181,' +
//       ' 12.1226744241608326 45.4327940325670170,' +
//       ' 12.1227280683411305 45.4331554191548719))',
//     },
//     {
//       uuid: 's5',
//       name: 'QuintoScenario - non analizzato - colpisce nodi 4 e 5',
//       description: 'afafafa',
//       scenario_type: ScenarioType.Ciclone,
//       intensity_measure: 80,
//       p_s: 0.15,               // exceedance probability, probability di ACCADIMENTO
//       event_time: 5,       // tempo di inizio
//       application_area: 'SRID=4326;POLYGON ((12.1234419614465718 45.4332215463475109,' +
//       ' 12.1242358953149800 45.4332968348404904, 12.1240964204462074 45.4327660488229697,' +
//       ' 12.1233454019220357 45.4327547554492526, 12.1234419614465718 45.4332215463475109))',
//     },
  containers: [],
  //   {
  //   uuid: 'c1',
  //   scenario: 's1',
  //   status: ContainerStatus.STATUS_VALIDATED,
  //   result: null,
  // },
  //   {
  //     uuid: 'c2',
  //     scenario: 's2',
  //     status: ContainerStatus.STATUS_STARTED,
  //     result: null,
  //   },
  // ],
  requestedAnalysis: [],
  reactData: {
    sidebarType: {
      operationType: OperationType.VIEW,
      elementType: ElementType.SCENARIO,
    },
    dialogVisibility: false,
    messageVisibility: false,
    message: 'Applicazione caricata',
    snackbarMessage: 'vuoto',
    snackbarDuration: 0,
    snackbarVisibility: false,
    selectedUuid: null,
    internetAvailable: true,
    isAnalyzing: false,
    yearToAnalyze: 2,
    centerTimestamp: Date.now(),
  },
};
