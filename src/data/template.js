export const defaultTemplates =  [
  {
    name: 'timeLine',
    template: {
      "basic": {
        "width": 250,
        "height": 250,
        "eachWidth": 250,
        "eachHeight": 250,
        "margin": 30,
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
      "layout": {
        "chooseType": "offLine",
        "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
        "offLine": {},
        "onLine": {},
        "bipartite": {},
        "circle": {}
      },
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
      "basic": {
        "width": 250,
        "height": 250,
        "eachWidth": 250,
        "eachHeight": 250,
        "margin": 30,
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
      "layout": {
        "chooseType": "offLine",
        "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
        "offLine": {},
        "onLine": {},
        "bipartite": {},
        "circle": {}
      },
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
      "basic": {
        "width": 250,
        "height": 250,
        "eachWidth": 250,
        "eachHeight": 250,
        "margin": 30,
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
      "layout": {
        "chooseType": "offLine",
        "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
        "offLine": {},
        "onLine": {},
        "bipartite": {},
        "circle": {}
      },
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
      "basic": {
        "width": 250,
        "height": 250,
        "eachWidth": 250,
        "eachHeight": 250,
        "margin": 30,
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
      "layout": {
        "chooseType": "offLine",
        "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
        "offLine": {},
        "onLine": {},
        "bipartite": {},
        "circle": {}
      },
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
      "basic": {
        "width": 250,
        "height": 250,
        "eachWidth": 250,
        "eachHeight": 250,
        "margin": 30,
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
      "layout": {
        "chooseType": "offLine",
        "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
        "offLine": {},
        "onLine": {},
        "bipartite": {},
        "circle": {}
      },
      "comparison": {
        "isOn": false,
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
      "basic": {
        "width": 250,
        "height": 250,
        "eachWidth": 250,
        "eachHeight": 250,
        "margin": 30,
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
      "layout": {
        "chooseType": "vertical",
        "vertical": { "yDistance": 40, "linkStyle": { "shape": "curve" } },
        "offLine": {},
        "onLine": {},
        "bipartite": {},
        "circle": {}
      },
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
  }
]
  
