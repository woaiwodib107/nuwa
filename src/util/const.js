export const TIME_PANEL_INPUT_WIDTH = 125
export const SAMPLE_LINK_SOURCE = {
  x: 5,
  y: 5
}
export const SAMPLE_LINK_TARGET = {
  x: 57,
  y: 57
}

export const MARK_LINK_SOURCE = {
  x: 10,
  y: 21
}

export const MARK_LINK_TARGET = {
  x: 248,
  y: 21
}

export const MARK_POINT_RADIUS = 6

export const DNET_SAMPLE_WIDTH = 400
export const DNET_SAMPLE_HEIGHT = 65


export const SAMPLE_ITEM_WIDTH = 62
export const SAMPLE_ITEM_HEIGHT = 62
export const TASK_FIND_ATTR = ['degree']
export const TASK_FIND_STRUCTURE = ['shortest-path','dumb-bell']
export const TASK_FIND_RELATION = ['>=','=','<=']

export const TASK_PATTERN_TYPES = ['graph', 'compare-structure','shortest-path', 'frequent-structure','dumb-bell', 'compare-degree', 'find-degree', 'anomaly-detection']
export const TASK_CHANGE_TYPES = ['appeared','disappeared','unchanged', 'appearedNode', 'appearedEdge', 'disappearedNode', 'disappearedEdge','unchangedNode']

export const TIME_TIMELINE_ELEMENT = ['node', 'link', 'all']
export const TIME_CHART_TYPE = ['line', 'bar']
export const TIME_TIMELINE_TYPE = ['merged','circular','juxtaposed']
export const GRAPH_LAYOUT_TYPE = ['matrix','grid','forceDirect','bipartite', 'vertical','circular','dagre','mds','oneMds']

export const KEYFRAM_OPTIONS = ['next', 'last']


export const ROW_BUTTON_STYLE = {
  boxSizing: 'border-box',
  width: '64px',
  padding: '0px',
  fontSize: '12px',
  height: '64px',
  lineHeight: '64px',
  alighItems: 'center'
}

export const PATTERN_TO_CHANGE = {
  'graph': ['unchanged','appeared'],
  'compare-structure': [...TASK_CHANGE_TYPES],
  'shortest-path': ['unchanged','appeared'],
  'dumb-bell': ['unchanged','appeared'],
  'compare-degree': [...TASK_CHANGE_TYPES],
  'find-degree': ['unchanged','appeared']
}

export const TIME_BUTTON_STYLE = {
  boxSizing: 'border-box',
  width: '252px',
  padding: '0px',
  fontSize: '12px',
  height: '30px',
  lineHeight: '32px',
  alighItems: 'center'
}

export const REACT_JSON_OPTIONS = {
  displayDataTypes: false,
  name: null,
  indentWidth: 2,
  fontFamily: 'consola',
  theme:"summerfruit:inverted",
  style:{
    fontFamily: 'consola'
  },
  collapseStringsAfterLength: 20,
  // iconStyle: "circle",
  enableClipboard: false,
  displayObjectSize: false
}