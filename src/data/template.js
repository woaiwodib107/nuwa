export const defaultTemplates =  [
  {
    name:"oneMds",
    template: {
      "graph": {
        "eachWidth": 300,
        "eachHeight": 300,
        "margin": 30,
        "layout": {
          "chooseType": "oneMds",
          "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
          "offLine": {},
          "onLine": {},
          "bipartite": {},
          "circular": {},
          "dagre": {},
          "mds": {},
          "grid": { "rows": 4 },
          "matrix": {}
        },
        "nodeStyle": {
          "shape": "circle",
          "fillColor": "none",
          "strokeColor": "#000000",
          "strokeWidth": 0,
          "radius": 2,
          "strokeType": "solid",
          "textColor": "white",
          "opacity": 1
        },
        "linkStyle": {
          "shape": "line",
          "strokeColor": "#908F8F",
          "strokeType": "solid",
          "strokeWidth": 0,
          "opacity": 1,
          "strokeDasharray": "3,3",
          "pointShape": "rect",
          "pointFillColor": "#98F3E3",
          "pointOpacity": 1,
          "pointRadius": 8,
          "pointStrokeWidth": 1,
          "pointStrokeColor": "#000000",
          "pointStrokeType": "solid"
        }
      },
      "time": {
        "chooseTypes": ["timeLine", "markLine"],
        "timeLine": {
          "xDistance": 5,
          "yDistance": 0,
          "element": "all",
          "type": "linear"
        },
        "insert": {
          "position": "bottom",
          "margin": 10,
          "nodeStyle": {
            "shape": "circle",
            "fillColor": "#FF5F00",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "linkStyle": {
            "shape": "curve",
            "strokeColor": "#FF5F00",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3",
            "fillColor": "#ffffff",
            "radius": 8
          }
        },
        "color": {
          "element": "all",
          "startColor": "#ECAA7B",
          "endColor": "#98F3E3"
        },
        "animation": { "speed": 1800 },
        "markLine": {
          "shape": "line",
          "strokeType": "solid",
          "strokeColor": "#FD8F8F",
          "strokeWidth": 1,
          "strokeDasharray": "5,5",
          "opacity": 1
        },
        "chart": { "type": "line" }
      },
      "task": {
        "taskType": "none",
        "basedType": "attr",
        "find": { "attr": "degree", "relation": ">=", "value": 3 },
        "comparison": {
          "chooseItem": "stable-Node",
          "chooseTypes": [
            "shape",
            "fillColor",
            "strokeColor",
            "strokeWidth",
            "strokeType",
            "radius",
            "strokeDasharray",
            "textColor"
          ],
          "attr": "",
          "keyFrame": "next",
          "elements": "all",
          "appearNode": {
            "shape": "rect",
            "fillColor": "#ECAA7B",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "strokeType": "solid",
            "textColor": "white",
            "radius": 8,
            "opacity": 1
          },
          "stableNode": {
            "shape": "circle",
            "fillColor": "#DAD5D5",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "disappearNode": {
            "shape": "circle",
            "fillColor": "#98F3E3",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 8,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "appearLink": {
            "shape": "curve",
            "strokeColor": "#ECAA7B",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3",
            "fillColor": "#ffffff",
            "radius": 8
          },
          "stableLink": {
            "shape": "line",
            "strokeColor": "#908F8F",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3",
            "fillColor": "#ffffff",
            "radius": 8
          },
          "disappearLink": {
            "shape": "curve",
            "strokeColor": "#98F3E3",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3",
            "fillColor": "#ffffff",
            "radius": 8
          }
        }
      }
    }    
  },
  {
    name: "vertical-color",
    template: {
      "graph": {
        "eachWidth": 350,
        "eachHeight": 350,
        "margin": 10,
        "layout": {
          "chooseType": "vertical",
          "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
          "offLine": {},
          "onLine": {},
          "bipartite": {},
          "circular": {},
          "dagre": {}
        },
        "nodeStyle": {
          "shape": "circle",
          "fillColor": "#DAD5D5",
          "strokeColor": "#000000",
          "strokeWidth": 1,
          "radius": 6,
          "strokeType": "solid",
          "textColor": "white",
          "opacity": 1
        },
        "linkStyle": {
          "shape": "curve",
          "strokeColor": "#908F8F",
          "strokeType": "solid",
          "strokeWidth": 2,
          "opacity": 1,
          "strokeDasharray": "3,3"
        }
      },
      "task": {
        "taskType": "comparison",
        "basedType": "structure",
        "comparison": {
          "chooseItem": "stable-Node",
          "chooseTypes": [
            "shape",
            "fillColor",
            "strokeColor",
            "strokeWidth",
            "strokeType",
            "radius",
            "strokeDasharray",
            "textColor"
          ],
          "keyFrame": "next",
          "elements": "all",
          "appearNode": {
            "shape": "rect",
            "fillColor": "#FD8F8F",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "strokeType": "solid",
            "textColor": "white",
            "radius": 8,
            "opacity": 1
          },
          "stableNode": {
            "shape": "circle",
            "fillColor": "#DAD5D5",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "disappearNode": {
            "shape": "circle",
            "fillColor": "#90B5FB",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 8,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "appearLink": {
            "shape": "curve",
            "strokeColor": "#FD8F8F",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "stableLink": {
            "shape": "line",
            "strokeColor": "#908F8F",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "disappearLink": {
            "shape": "curve",
            "strokeColor": "#90B5FB",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        }
      },
      "time": {
        "chooseTypes": ["color"],
        "timeLine": { "xDistance": 270, "yDistance": 0, "element": "all" },
        "insert": {
          "position": "bottom",
          "margin": 10,
          "nodeStyle": {
            "shape": "circle",
            "fillColor": "#ffcc00",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "linkStyle": {
            "shape": "curve",
            "strokeColor": "#FF5F00",
            "strokeType": "solid",
            "strokeWidth": 2,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        },
        "color": {
          "element": "all",
          "startColor": "#FD8F8F",
          "endColor": "#90B5FB"
        },
        "animation": { "speed": 1800 },
        "markLine": {
          "shape": "line",
          "strokeType": "dashed",
          "strokeColor": "#FD8F8F",
          "strokeWidth": 2,
          "strokeDasharray": "5,5",
          "opacity": 1
        }
      }
    }    
  },
  {
    name:"vertical-color",
    template: {
      "graph": {
        "eachWidth": 250,
        "eachHeight": 350,
        "margin": 30,
        "layout": {
          "chooseType": "vertical",
          "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
          "offLine": {},
          "onLine": {},
          "bipartite": {},
          "circular": {},
          "dagre": {}
        },
        "nodeStyle": {
          "shape": "circle",
          "fillColor": "#DAD5D5",
          "strokeColor": "#000000",
          "strokeWidth": 1,
          "radius": 6,
          "strokeType": "solid",
          "textColor": "white",
          "opacity": 1
        },
        "linkStyle": {
          "shape": "curve",
          "strokeColor": "#908F8F",
          "strokeType": "solid",
          "strokeWidth": 2,
          "opacity": 1,
          "strokeDasharray": "3,3"
        }
      },
      "task": {
        "taskType": "comparison",
        "basedType": "structure",
        "comparison": {
          "chooseItem": "stable-Node",
          "chooseTypes": [
            "shape",
            "fillColor",
            "strokeColor",
            "strokeWidth",
            "strokeType",
            "radius",
            "strokeDasharray",
            "textColor"
          ],
          "keyFrame": "next",
          "elements": "all",
          "appearNode": {
            "shape": "rect",
            "fillColor": "#FD8F8F",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "strokeType": "solid",
            "textColor": "white",
            "radius": 8,
            "opacity": 1
          },
          "stableNode": {
            "shape": "circle",
            "fillColor": "#DAD5D5",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "disappearNode": {
            "shape": "circle",
            "fillColor": "#90B5FB",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 8,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "appearLink": {
            "shape": "curve",
            "strokeColor": "#FD8F8F",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "stableLink": {
            "shape": "line",
            "strokeColor": "#908F8F",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "disappearLink": {
            "shape": "curve",
            "strokeColor": "#90B5FB",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        }
      },
      "time": {
        "chooseTypes": ["color"],
        "timeLine": { "xDistance": 270, "yDistance": 0, "element": "all" },
        "insert": {
          "position": "bottom",
          "margin": 10,
          "nodeStyle": {
            "shape": "circle",
            "fillColor": "#ffcc00",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "linkStyle": {
            "shape": "curve",
            "strokeColor": "#FF5F00",
            "strokeType": "solid",
            "strokeWidth": 2,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        },
        "color": {
          "element": "all",
          "startColor": "#FD8F8F",
          "endColor": "#90B5FB"
        },
        "animation": { "speed": 1800 },
        "markLine": {
          "shape": "line",
          "strokeType": "dashed",
          "strokeColor": "#FD8F8F",
          "strokeWidth": 2,
          "strokeDasharray": "5,5",
          "opacity": 1
        }
      }
    }
    
  },
  {
    name:"force-color",
    template: {
      "graph": {
        "eachWidth": 350,
        "eachHeight": 350,
        "margin": 30,
        "layout": {
          "chooseType": "forceDirect",
          "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
          "offLine": {},
          "onLine": {},
          "bipartite": {},
          "circular": {},
          "dagre": {}
        },
        "nodeStyle": {
          "shape": "circle",
          "fillColor": "#DAD5D5",
          "strokeColor": "#000000",
          "strokeWidth": 1,
          "radius": 6,
          "strokeType": "solid",
          "textColor": "white",
          "opacity": 1
        },
        "linkStyle": {
          "shape": "line",
          "strokeColor": "#908F8F",
          "strokeType": "solid",
          "strokeWidth": 2,
          "opacity": 1,
          "strokeDasharray": "3,3"
        }
      },
      "task": {
        "taskType": "comparison",
        "basedType": "structure",
        "comparison": {
          "chooseItem": "stable-Node",
          "chooseTypes": [
            "shape",
            "fillColor",
            "strokeColor",
            "strokeWidth",
            "strokeType",
            "radius",
            "strokeDasharray",
            "textColor"
          ],
          "keyFrame": "next",
          "elements": "all",
          "appearNode": {
            "shape": "rect",
            "fillColor": "#FD8F8F",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "strokeType": "solid",
            "textColor": "white",
            "radius": 8,
            "opacity": 1
          },
          "stableNode": {
            "shape": "circle",
            "fillColor": "#DAD5D5",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "disappearNode": {
            "shape": "circle",
            "fillColor": "#90B5FB",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 8,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "appearLink": {
            "shape": "curve",
            "strokeColor": "#FD8F8F",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "stableLink": {
            "shape": "line",
            "strokeColor": "#908F8F",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "disappearLink": {
            "shape": "curve",
            "strokeColor": "#90B5FB",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        }
      },
      "time": {
        "chooseTypes": ["color"],
        "timeLine": { "xDistance": 270, "yDistance": 0, "element": "all" },
        "insert": {
          "position": "bottom",
          "margin": 10,
          "nodeStyle": {
            "shape": "circle",
            "fillColor": "#ffcc00",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "linkStyle": {
            "shape": "curve",
            "strokeColor": "#FF5F00",
            "strokeType": "solid",
            "strokeWidth": 2,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        },
        "color": {
          "element": "all",
          "startColor": "#FD8F8F",
          "endColor": "#90B5FB"
        },
        "animation": { "speed": 1800 },
        "markLine": {
          "shape": "line",
          "strokeType": "dashed",
          "strokeColor": "#FD8F8F",
          "strokeWidth": 2,
          "strokeDasharray": "5,5",
          "opacity": 1
        }
      }
    }    
  },
  {
    name:"dagre-color",
    template: {
      "graph": {
        "eachWidth": 350,
        "eachHeight": 350,
        "margin": 30,
        "layout": {
          "chooseType": "dagre",
          "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
          "offLine": {},
          "onLine": {},
          "bipartite": {},
          "circular": {},
          "dagre": {}
        },
        "nodeStyle": {
          "shape": "circle",
          "fillColor": "#DAD5D5",
          "strokeColor": "#000000",
          "strokeWidth": 1,
          "radius": 6,
          "strokeType": "solid",
          "textColor": "white",
          "opacity": 1
        },
        "linkStyle": {
          "shape": "line",
          "strokeColor": "#908F8F",
          "strokeType": "solid",
          "strokeWidth": 2,
          "opacity": 1,
          "strokeDasharray": "3,3"
        }
      },
      "task": {
        "taskType": "comparison",
        "basedType": "structure",
        "comparison": {
          "chooseItem": "stable-Node",
          "chooseTypes": [
            "shape",
            "fillColor",
            "strokeColor",
            "strokeWidth",
            "strokeType",
            "radius",
            "strokeDasharray",
            "textColor"
          ],
          "keyFrame": "next",
          "elements": "all",
          "appearNode": {
            "shape": "rect",
            "fillColor": "#FD8F8F",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "strokeType": "solid",
            "textColor": "white",
            "radius": 8,
            "opacity": 1
          },
          "stableNode": {
            "shape": "circle",
            "fillColor": "#DAD5D5",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "disappearNode": {
            "shape": "circle",
            "fillColor": "#90B5FB",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 8,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "appearLink": {
            "shape": "curve",
            "strokeColor": "#FD8F8F",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "stableLink": {
            "shape": "line",
            "strokeColor": "#908F8F",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "disappearLink": {
            "shape": "curve",
            "strokeColor": "#90B5FB",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        }
      },
      "time": {
        "chooseTypes": ["color"],
        "timeLine": { "xDistance": 270, "yDistance": 0, "element": "all" },
        "insert": {
          "position": "bottom",
          "margin": 10,
          "nodeStyle": {
            "shape": "circle",
            "fillColor": "#ffcc00",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "linkStyle": {
            "shape": "curve",
            "strokeColor": "#FF5F00",
            "strokeType": "solid",
            "strokeWidth": 2,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        },
        "color": {
          "element": "all",
          "startColor": "#FD8F8F",
          "endColor": "#90B5FB"
        },
        "animation": { "speed": 1800 },
        "markLine": {
          "shape": "line",
          "strokeType": "dashed",
          "strokeColor": "#FD8F8F",
          "strokeWidth": 2,
          "strokeDasharray": "5,5",
          "opacity": 1
        }
      }
    }    
  },
  {
    name: 'timeLine',
    template: {
      "graph": {
        "eachWidth": 250,
        "eachHeight": 250,
        "margin": 30,
        "layout": {
          "chooseType": "forceDirect",
          "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
          "offLine": {},
          "onLine": {},
          "bipartite": {},
          "circle": {},
          "dagre": {
    
          },
          "mds": {

          },
          "grid": {
              "rows": 4
          }
        },
        "nodeStyle": {
          "shape": "circle",
          "fillColor": "#DAD5D5",
          "strokeColor": "#000000",
          "strokeWidth": 1,
          "radius": 6,
          "strokeType": "solid",
          "textColor": "white",
          "opacity": 1
        },
        "linkStyle": {
          "shape": "curve",
          "strokeColor": "#908F8F",
          "strokeType": "solid",
          "strokeWidth": 2,
          "opacity": 1,
          "strokeDasharray": "3,3"
        }
      },
      "task": {
          "taskType": 'comparison',
          "basedType": 'structure',
          "comparison": {
            "chooseItem": "stable-Node",
            "chooseTypes": [
              "shape",
              "fillColor",
              "strokeColor",
              "strokeWidth",
              "strokeType",
              "radius",
              "strokeDasharray",
              "textColor"
            ],
            "keyFrame": "next",
            "elements": "all",
            "appearNode": {
              "shape": "rect",
              "fillColor": "#FD8F8F",
              "strokeColor": "#000000",
              "strokeWidth": 1,
              "strokeType": "solid",
              "textColor": "white",
              "radius": 8,
              "opacity": 1
            },
            "stableNode": {
              "shape": "circle",
              "fillColor": "#DAD5D5",
              "strokeColor": "#000000",
              "strokeWidth": 1,
              "radius": 6,
              "strokeType": "solid",
              "textColor": "white",
              "opacity": 1
            },
            "disappearNode": {
              "shape": "circle",
              "fillColor": "#90B5FB",
              "strokeColor": "#000000",
              "strokeWidth": 1,
              "radius": 8,
              "strokeType": "solid",
              "textColor": "white",
              "opacity": 1
            },
            "appearLink": {
              "shape": "curve",
              "strokeColor": "#FD8F8F",
              "strokeType": "solid",
              "strokeWidth": 3,
              "opacity": 1,
              "strokeDasharray": "3,3"
            },
            "stableLink": {
              "shape": "line",
              "strokeColor": "#908F8F",
              "strokeType": "solid",
              "strokeWidth": 1,
              "opacity": 1,
              "strokeDasharray": "3,3"
            },
            "disappearLink": {
              "shape": "curve",
              "strokeColor": "#90B5FB",
              "strokeType": "solid",
              "strokeWidth": 3,
              "opacity": 1,
              "strokeDasharray": "3,3"
            }
          },
      },
      
      "time": {
        "chooseTypes": ["timeLine"],
        "timeLine": { "xDistance": 250, "yDistance": 0, "element": "all" },
        "insert": {
          "position": "bottom",
          "margin": 10,
          "nodeStyle": {
            "shape": "circle",
            "fillColor": "#ffcc00",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "linkStyle": {
            "shape": "curve",
            "strokeColor": "#FF5F00",
            "strokeType": "solid",
            "strokeWidth": 2,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        },
        "color": {
          "element": "all",
          "startColor": "#FD8F8F",
          "endColor": "#90B5FB"
        },
        "animation": { "speed": 1800 },
        "markLine": {
          "shape": "line",
          "strokeType": "dashed",
          "strokeColor": "#FD8F8F",
          "strokeWidth": 2,
          "strokeDasharray": "5,5",
          "opacity": 1
        }
      }
    }    
  },
  {
    name: 'timeLine-animation',
    template: {
      "graph": {
        "width": 250,
        "height": 250,
        "eachWidth": 250,
        "eachHeight": 250,
        "margin": 30,
        "layout": {
          "chooseType": "forceDirect",
          "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
          "offLine": {},
          "onLine": {},
          "bipartite": {},
          "circle": {},
          "dagre": {
    
          },
          "mds": {

          },
          "grid": {
              "rows": 4
          }
        },
        "nodeStyle": {
          "shape": "circle",
          "fillColor": "#DAD5D5",
          "strokeColor": "#000000",
          "strokeWidth": 1,
          "radius": 6,
          "strokeType": "solid",
          "textColor": "white",
          "opacity": 1
        },
        "linkStyle": {
          "shape": "curve",
          "strokeColor": "#908F8F",
          "strokeType": "solid",
          "strokeWidth": 2,
          "opacity": 1,
          "strokeDasharray": "3,3"
        }
      },
      "task": {
        "taskType": 'comparison',
        "basedType": 'structure',
        "comparison": {
          "chooseItem": "stable-Node",
          "chooseTypes": [
            "shape",
            "fillColor",
            "strokeColor",
            "strokeWidth",
            "strokeType",
            "radius",
            "strokeDasharray",
            "textColor"
          ],
          "keyFrame": "next",
          "elements": "all",
          "appearNode": {
            "shape": "rect",
            "fillColor": "#FD8F8F",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "strokeType": "solid",
            "textColor": "white",
            "radius": 8,
            "opacity": 1
          },
          "stableNode": {
            "shape": "circle",
            "fillColor": "#DAD5D5",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "disappearNode": {
            "shape": "circle",
            "fillColor": "#90B5FB",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 8,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "appearLink": {
            "shape": "curve",
            "strokeColor": "#FD8F8F",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "stableLink": {
            "shape": "line",
            "strokeColor": "#908F8F",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "disappearLink": {
            "shape": "curve",
            "strokeColor": "#90B5FB",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        },
    },
      
      "time": {
        "chooseTypes": ["timeLine", "animation"],
        "timeLine": { "xDistance": 250, "yDistance": 0, "element": "all" },
        "insert": {
          "position": "bottom",
          "margin": 10,
          "nodeStyle": {
            "shape": "circle",
            "fillColor": "#ffcc00",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "linkStyle": {
            "shape": "curve",
            "strokeColor": "#FF5F00",
            "strokeType": "solid",
            "strokeWidth": 2,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        },
        "color": {
          "element": "all",
          "startColor": "#FD8F8F",
          "endColor": "#90B5FB"
        },
        "animation": { "speed": 1800 },
        "markLine": {
          "shape": "line",
          "strokeType": "dashed",
          "strokeColor": "#FD8F8F",
          "strokeWidth": 2,
          "strokeDasharray": "5,5",
          "opacity": 1
        }
      }
    }    
  },
  {
    name: 'timeLine-markLine',
    template: {
      "graph": {
        "width": 250,
        "height": 250,
        "eachWidth": 250,
        "eachHeight": 250,
        "margin": 30,
        "layout": {
          "chooseType": "forceDirect",
          "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
          "offLine": {},
          "onLine": {},
          "bipartite": {},
          "circle": {},
          "dagre": {
    
          },
          "mds": {

          },
          "grid": {
              "rows": 4
          }
        },
        "nodeStyle": {
          "shape": "circle",
          "fillColor": "#DAD5D5",
          "strokeColor": "#000000",
          "strokeWidth": 1,
          "radius": 6,
          "strokeType": "solid",
          "textColor": "white",
          "opacity": 1
        },
        "linkStyle": {
          "shape": "curve",
          "strokeColor": "#908F8F",
          "strokeType": "solid",
          "strokeWidth": 2,
          "opacity": 1,
          "strokeDasharray": "3,3"
        }
      },
      "task": {
        "taskType": 'comparison',
        "basedType": 'structure',
        "comparison": {
          "chooseItem": "stable-Node",
          "chooseTypes": [
            "shape",
            "fillColor",
            "strokeColor",
            "strokeWidth",
            "strokeType",
            "radius",
            "strokeDasharray",
            "textColor"
          ],
          "keyFrame": "next",
          "elements": "all",
          "appearNode": {
            "shape": "rect",
            "fillColor": "#FD8F8F",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "strokeType": "solid",
            "textColor": "white",
            "radius": 8,
            "opacity": 1
          },
          "stableNode": {
            "shape": "circle",
            "fillColor": "#DAD5D5",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "disappearNode": {
            "shape": "circle",
            "fillColor": "#90B5FB",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 8,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "appearLink": {
            "shape": "curve",
            "strokeColor": "#FD8F8F",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "stableLink": {
            "shape": "line",
            "strokeColor": "#908F8F",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "disappearLink": {
            "shape": "curve",
            "strokeColor": "#90B5FB",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        },
    },
      
      "time": {
        "chooseTypes": ["timeLine", "markLine"],
        "timeLine": { "xDistance": 250, "yDistance": 0, "element": "all" },
        "insert": {
          "position": "bottom",
          "margin": 10,
          "nodeStyle": {
            "shape": "circle",
            "fillColor": "#ffcc00",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "linkStyle": {
            "shape": "curve",
            "strokeColor": "#FF5F00",
            "strokeType": "solid",
            "strokeWidth": 2,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        },
        "color": {
          "element": "all",
          "startColor": "#FD8F8F",
          "endColor": "#90B5FB"
        },
        "animation": { "speed": 1800 },
        "markLine": {
          "shape": "line",
          "strokeType": "dashed",
          "strokeColor": "#FD8F8F",
          "strokeWidth": 2,
          "strokeDasharray": "5,5",
          "opacity": 1
        }
      }
    }    
  },
  {
    name: 'timeLine-insert',
    template: {
      "graph": {
        "width": 250,
        "height": 250,
        "eachWidth": 250,
        "eachHeight": 250,
        "margin": 30,
        "layout": {
          "chooseType": "forceDirect",
          "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
          "offLine": {},
          "onLine": {},
          "bipartite": {},
          "circle": {},
          "dagre": {
    
          },
          "mds": {

          },
          "grid": {
              "rows": 4
          }
        },
        "nodeStyle": {
          "shape": "circle",
          "fillColor": "#DAD5D5",
          "strokeColor": "#000000",
          "strokeWidth": 1,
          "radius": 6,
          "strokeType": "solid",
          "textColor": "white",
          "opacity": 1
        },
        "linkStyle": {
          "shape": "curve",
          "strokeColor": "#908F8F",
          "strokeType": "solid",
          "strokeWidth": 2,
          "opacity": 1,
          "strokeDasharray": "3,3"
        }
      },
      "task": {
        "taskType": 'comparison',
        "basedType": 'structure',
        "comparison": {
          "isOn": true,
          "chooseItem": "stable-Node",
          "chooseTypes": [
            "shape",
            "fillColor",
            "strokeColor",
            "strokeWidth",
            "strokeType",
            "radius",
            "strokeDasharray",
            "textColor"
          ],
          "keyFrame": "next",
          "elements": "all",
          "appearNode": {
            "shape": "rect",
            "fillColor": "#FD8F8F",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "strokeType": "solid",
            "textColor": "white",
            "radius": 8,
            "opacity": 1
          },
          "stableNode": {
            "shape": "circle",
            "fillColor": "#DAD5D5",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "disappearNode": {
            "shape": "circle",
            "fillColor": "#90B5FB",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 8,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "appearLink": {
            "shape": "curve",
            "strokeColor": "#FD8F8F",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "stableLink": {
            "shape": "line",
            "strokeColor": "#908F8F",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "disappearLink": {
            "shape": "curve",
            "strokeColor": "#90B5FB",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        },
    },
      
      "time": {
        "chooseTypes": ["timeLine", "markLine", "insert"],
        "timeLine": { "xDistance": 250, "yDistance": 0, "element": "all" },
        "insert": {
          "position": "center",
          "margin": 10,
          "nodeStyle": {
            "shape": "circle",
            "fillColor": "#ffcc00",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "linkStyle": {
            "shape": "curve",
            "strokeColor": "#FF5F00",
            "strokeType": "solid",
            "strokeWidth": 2,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        },
        "color": {
          "element": "all",
          "startColor": "#FD8F8F",
          "endColor": "#90B5FB"
        },
        "animation": { "speed": 1800 },
        "markLine": {
          "shape": "line",
          "strokeType": "dashed",
          "strokeColor": "#FD8F8F",
          "strokeWidth": 2,
          "strokeDasharray": "5,5",
          "opacity": 1
        }
      }
    }    
  },
  {
    name: 'no-comparison',
    template: {
      "graph": {
        "width": 250,
        "height": 250,
        "eachWidth": 250,
        "eachHeight": 250,
        "margin": 30,
        "layout": {
          "chooseType": "forceDirect",
          "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
          "offLine": {},
          "onLine": {},
          "bipartite": {},
          "circle": {},
          "dagre": {
    
          },
          "mds": {

          },
          "grid": {
              "rows": 4
          }
        },
        "nodeStyle": {
          "shape": "circle",
          "fillColor": "#DAD5D5",
          "strokeColor": "#000000",
          "strokeWidth": 1,
          "radius": 6,
          "strokeType": "solid",
          "textColor": "white",
          "opacity": 1
        },
        "linkStyle": {
          "shape": "curve",
          "strokeColor": "#908F8F",
          "strokeType": "solid",
          "strokeWidth": 2,
          "opacity": 1,
          "strokeDasharray": "3,3"
        }
      },
      "task": {
        "taskType": 'find',
        "basedType": 'structure',
        "comparison": {
          "chooseItem": "stable-Node",
          "chooseTypes": [
            "shape",
            "fillColor",
            "strokeColor",
            "strokeWidth",
            "strokeType",
            "radius",
            "strokeDasharray",
            "textColor"
          ],
          "keyFrame": "next",
          "elements": "all",
          "appearNode": {
            "shape": "rect",
            "fillColor": "#FD8F8F",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "strokeType": "solid",
            "textColor": "white",
            "radius": 8,
            "opacity": 1
          },
          "stableNode": {
            "shape": "circle",
            "fillColor": "#DAD5D5",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "disappearNode": {
            "shape": "circle",
            "fillColor": "#90B5FB",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 8,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "appearLink": {
            "shape": "curve",
            "strokeColor": "#FD8F8F",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "stableLink": {
            "shape": "line",
            "strokeColor": "#908F8F",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "disappearLink": {
            "shape": "curve",
            "strokeColor": "#90B5FB",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        },
    },
     
      "time": {
        "chooseTypes": ["timeLine", "markLine", "insert"],
        "timeLine": { "xDistance": 250, "yDistance": 0, "element": "all" },
        "insert": {
          "position": "center",
          "margin": 10,
          "nodeStyle": {
            "shape": "circle",
            "fillColor": "#ffcc00",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "linkStyle": {
            "shape": "curve",
            "strokeColor": "#8a6ef5",
            "strokeType": "dashed",
            "strokeWidth": 2,
            "opacity": 0.6,
            "strokeDasharray": "3,3"
          }
        },
        "color": {
          "element": "all",
          "startColor": "#FD8F8F",
          "endColor": "#90B5FB"
        },
        "animation": { "speed": 1800 },
        "markLine": {
          "shape": "line",
          "strokeType": "dashed",
          "strokeColor": "#FD8F8F",
          "strokeWidth": 2,
          "strokeDasharray": "5,5",
          "opacity": 1
        }
      }
    }
  },
  {
    name: 'vertical-layout',
    template: {
      "graph": {
        "width": 250,
        "height": 250,
        "eachWidth": 250,
        "eachHeight": 250,
        "margin": 30,
        "layout": {
          "chooseType": "vertical",
          "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
          "offLine": {},
          "onLine": {},
          "bipartite": {},
          "circle": {},
          "dagre": {
    
          },
          "mds": {

          },
          "grid": {
              "rows": 4
          }
        },
        "nodeStyle": {
          "shape": "circle",
          "fillColor": "#DAD5D5",
          "strokeColor": "#000000",
          "strokeWidth": 1,
          "radius": 6,
          "strokeType": "solid",
          "textColor": "white",
          "opacity": 1
        },
        "linkStyle": {
          "shape": "curve",
          "strokeColor": "#908F8F",
          "strokeType": "solid",
          "strokeWidth": 2,
          "opacity": 1,
          "strokeDasharray": "3,3"
        }
      },
      "task": {
        "taskType": 'comparison',
        "basedType": 'structure',
        "comparison": {
          "isOn": true,
          "chooseItem": "stable-Node",
          "chooseTypes": [
            "shape",
            "fillColor",
            "strokeColor",
            "strokeWidth",
            "strokeType",
            "radius",
            "strokeDasharray",
            "textColor"
          ],
          "keyFrame": "next",
          "elements": "all",
          "appearNode": {
            "shape": "rect",
            "fillColor": "#FD8F8F",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "strokeType": "solid",
            "textColor": "white",
            "radius": 8,
            "opacity": 1
          },
          "stableNode": {
            "shape": "circle",
            "fillColor": "#DAD5D5",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "disappearNode": {
            "shape": "circle",
            "fillColor": "#90B5FB",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 8,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "appearLink": {
            "shape": "curve",
            "strokeColor": "#FD8F8F",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "stableLink": {
            "shape": "line",
            "strokeColor": "#908F8F",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "disappearLink": {
            "shape": "curve",
            "strokeColor": "#90B5FB",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        },
    },
     
      "time": {
        "chooseTypes": ["timeLine", "markLine"],
        "timeLine": { "xDistance": 250, "yDistance": 0, "element": "all" },
        "insert": {
          "position": "center",
          "margin": 10,
          "nodeStyle": {
            "shape": "circle",
            "fillColor": "#ffcc00",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "linkStyle": {
            "shape": "curve",
            "strokeColor": "#8a6ef5",
            "strokeType": "dashed",
            "strokeWidth": 2,
            "opacity": 0.6,
            "strokeDasharray": "3,3"
          }
        },
        "color": {
          "element": "all",
          "startColor": "#FD8F8F",
          "endColor": "#90B5FB"
        },
        "animation": { "speed": 1800 },
        "markLine": {
          "shape": "line",
          "strokeType": "dashed",
          "strokeColor": "#FD8F8F",
          "strokeWidth": 2,
          "strokeDasharray": "5,5",
          "opacity": 1
        }
      }
    }
  },
  {
    name:"find-structure",
    template: {
      "graph": {
        "eachWidth": 160,
        "eachHeight": 290,
        "margin": 20,
        "layout": {
          "chooseType": "vertical",
          "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
          "offLine": {},
          "onLine": {},
          "bipartite": {},
          "circular": {},
          "dagre": {},
          "mds": {},
          "grid": { "rows": 4 }
        },
        "nodeStyle": {
          "shape": "circle",
          "fillColor": "#DAD5D5",
          "strokeColor": "#000000",
          "strokeWidth": 1,
          "radius": 4,
          "strokeType": "solid",
          "textColor": "white",
          "opacity": 1
        },
        "linkStyle": {
          "shape": "curve",
          "strokeColor": "#908F8F",
          "strokeType": "solid",
          "strokeWidth": 1,
          "opacity": 1,
          "strokeDasharray": "3,3"
        }
      },
      "task": {
        "taskType": "find",
        "basedType": "structure",
        "comparison": {
          "chooseItem": "appear-Link",
          "chooseTypes": [
            "shape",
            "fillColor",
            "strokeColor",
            "strokeWidth",
            "strokeType",
            "radius",
            "strokeDasharray",
            "textColor"
          ],
          "keyFrame": "next",
          "elements": "all",
          "appearNode": {
            "shape": "rect",
            "fillColor": "#FD8F8F",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "strokeType": "solid",
            "textColor": "white",
            "radius": 6,
            "opacity": 1
          },
          "stableNode": {
            "shape": "circle",
            "fillColor": "#DAD5D5",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "disappearNode": {
            "shape": "circle",
            "fillColor": "#90B5FB",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 8,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "appearLink": {
            "shape": "curve",
            "strokeColor": "#FD8F8F",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "stableLink": {
            "shape": "line",
            "strokeColor": "#908F8F",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "disappearLink": {
            "shape": "curve",
            "strokeColor": "#90B5FB",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        }
      },
      "time": {
        "chooseTypes": ["timeLine"],
        "timeLine": { "xDistance": 160, "yDistance": 0, "element": "all" },
        "insert": {
          "position": "bottom",
          "margin": 10,
          "nodeStyle": {
            "shape": "circle",
            "fillColor": "#FF5F00",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "linkStyle": {
            "shape": "curve",
            "strokeColor": "#FF5F00",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        },
        "color": {
          "element": "all",
          "startColor": "#FD8F8F",
          "endColor": "#90B5FB"
        },
        "animation": { "speed": 1800 },
        "markLine": {
          "shape": "line",
          "strokeType": "dashed",
          "strokeColor": "#FD8F8F",
          "strokeWidth": 1,
          "strokeDasharray": "5,5",
          "opacity": 1
        }
      }
    }    
  },
  {
    name:"find-attr",
    template: {
      "graph": {
        "eachWidth": 200,
        "eachHeight": 200,
        "margin": 30,
        "layout": {
          "chooseType": "circular",
          "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
          "offLine": {},
          "onLine": {},
          "bipartite": {},
          "circular": {},
          "dagre": {}
        },
        "nodeStyle": {
          "shape": "circle",
          "fillColor": "#DAD5D5",
          "strokeColor": "#000000",
          "strokeWidth": 1,
          "radius": 6,
          "strokeType": "solid",
          "textColor": "white",
          "opacity": 1
        },
        "linkStyle": {
          "shape": "curve",
          "strokeColor": "#908F8F",
          "strokeType": "solid",
          "strokeWidth": 1,
          "opacity": 1,
          "strokeDasharray": "3,3"
        }
      },
      "task": {
        "taskType": "comparison",
        "basedType": "structure",
        "comparison": {
          "chooseItem": "stable-Node",
          "chooseTypes": [
            "shape",
            "fillColor",
            "strokeColor",
            "strokeWidth",
            "strokeType",
            "radius",
            "strokeDasharray",
            "textColor"
          ],
          "keyFrame": "next",
          "elements": "all",
          "appearNode": {
            "shape": "rect",
            "fillColor": "#FD8F8F",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "strokeType": "solid",
            "textColor": "white",
            "radius": 8,
            "opacity": 1
          },
          "stableNode": {
            "shape": "circle",
            "fillColor": "#DAD5D5",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "disappearNode": {
            "shape": "circle",
            "fillColor": "#90B5FB",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 8,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "appearLink": {
            "shape": "curve",
            "strokeColor": "#FD8F8F",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "stableLink": {
            "shape": "line",
            "strokeColor": "#908F8F",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "disappearLink": {
            "shape": "curve",
            "strokeColor": "#90B5FB",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        }
      },
      "time": {
        "chooseTypes": ["insert", "animation", "markLine"],
        "timeLine": { "xDistance": 270, "yDistance": 0, "element": "all" },
        "insert": {
          "position": "center",
          "margin": 10,
          "nodeStyle": {
            "shape": "circle",
            "fillColor": "#ff5f00",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "linkStyle": {
            "shape": "line",
            "strokeColor": "#FF5F00",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        },
        "color": {
          "element": "all",
          "startColor": "#FD8F8F",
          "endColor": "#90B5FB"
        },
        "animation": { "speed": 1800 },
        "markLine": {
          "shape": "line",
          "strokeType": "dashed",
          "strokeColor": "#FD8F8F",
          "strokeWidth": 2,
          "strokeDasharray": "5,5",
          "opacity": 1
        }
      }
    }    
  },
  {
    name:"find-structure",
    template: {
      "graph": {
        "eachWidth": 160,
        "eachHeight": 290,
        "margin": 20,
        "layout": {
          "chooseType": "circular",
          "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
          "offLine": {},
          "onLine": {},
          "bipartite": {},
          "circular": {},
          "dagre": {},
          "mds": {},
          "grid": { "rows": 4 }
        },
        "nodeStyle": {
          "shape": "circle",
          "fillColor": "#DAD5D5",
          "strokeColor": "#000000",
          "strokeWidth": 1,
          "radius": 4,
          "strokeType": "solid",
          "textColor": "white",
          "opacity": 1
        },
        "linkStyle": {
          "shape": "line",
          "strokeColor": "#908F8F",
          "strokeType": "solid",
          "strokeWidth": 1,
          "opacity": 1,
          "strokeDasharray": "3,3"
        }
      },
      "task": {
        "taskType": "comparison",
        "basedType": "attr",
        "comparison": {
          "chooseItem": "disappear-Link",
          "chooseTypes": [
            "shape",
            "fillColor",
            "strokeColor",
            "strokeWidth",
            "strokeType",
            "radius",
            "strokeDasharray",
            "textColor"
          ],
          "keyFrame": "last",
          "elements": "all",
          "appearNode": {
            "shape": "rect",
            "fillColor": "#FD8F8F",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "strokeType": "solid",
            "textColor": "white",
            "radius": 6,
            "opacity": 1
          },
          "stableNode": {
            "shape": "circle",
            "fillColor": "#DAD5D5",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "disappearNode": {
            "shape": "circle",
            "fillColor": "#90B5FB",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 8,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "appearLink": {
            "shape": "line",
            "strokeColor": "#FD8F8F",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "stableLink": {
            "shape": "line",
            "strokeColor": "#908F8F",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3"
          },
          "disappearLink": {
            "shape": "line",
            "strokeColor": "#90B5FB",
            "strokeType": "solid",
            "strokeWidth": 3,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        }
      },
      "time": {
        "chooseTypes": ["timeLine"],
        "timeLine": { "xDistance": 160, "yDistance": 0, "element": "all" },
        "insert": {
          "position": "bottom",
          "margin": 10,
          "nodeStyle": {
            "shape": "circle",
            "fillColor": "#FF5F00",
            "strokeColor": "#000000",
            "strokeWidth": 1,
            "radius": 6,
            "strokeType": "solid",
            "textColor": "white",
            "opacity": 1
          },
          "linkStyle": {
            "shape": "curve",
            "strokeColor": "#FF5F00",
            "strokeType": "solid",
            "strokeWidth": 1,
            "opacity": 1,
            "strokeDasharray": "3,3"
          }
        },
        "color": {
          "element": "all",
          "startColor": "#FD8F8F",
          "endColor": "#90B5FB"
        },
        "animation": { "speed": 1800 },
        "markLine": {
          "shape": "line",
          "strokeType": "dashed",
          "strokeColor": "#FD8F8F",
          "strokeWidth": 1,
          "strokeDasharray": "5,5",
          "opacity": 1
        }
      }
    }
  }
]
  
