# Nuwa

## Start for the prototype system

```code
npm i
npm run start
```

-   Data Selection
    ![Alt text](image-1.png)

-   Record
    ![Alt text](image.png)

-   Pattern
    ![Alt text](image-4.png)
-   Encoding
    ![Alt text](image-5.png)

## Description

The specification of Nuwa consists of four major primitives _data_, _entity_, _change_, and _encoding_, which are abstracted from concepts of typical graph models.

![image-20210401050932284](Numa.assets/image-20210401050932284.png)

## Gallery

![image-20210401051740051](Numa.assets/image-20210401051740051.png)

```json
{
    "data": "graph.json",
    "entity": "graph",
    "change": ["unchanged", "appeared"],
    "encoding": {
        "graphLayout": "force-directed",
        "timeLayout": "merged"
    }
}
```

![image-20210401051934186](Numa.assets/image-20210401051934186.png)

```json
{
    "data": "graph.json",
    "entity": "graph",
    "change": ["unchanged", "appeared"],
    "encoding": {
        "graphLayout": "force-directed",
        "timeLayout": {
            "x": 3,
            "y": 3
        }
    }
}
```

![image-20210401052040508](Numa.assets/image-20210401052040508.png)

```json
{
    "data": "graph.json",
    "entity": "graph",
    "change": "all",
    "encoding": {
        "graphLayout": "grid",
        "timeLayout": "juxtaposed",
        "color": "change"
    }
}
```

![image-20210401052213081](Numa.assets/image-20210401052213081.png)

```json
{
    "data": "graph.json",
    "entity": "graph",
    "change": ["unchanged", "appeared"],
    "encoding": {
        "graphLayout": "matrix",
        "timeLayout": "merged"
    }
}
```

<img src="Numa.assets/image-20210401052402315.png" alt="image-20210401052402315" style="zoom: 50%;" />

```json
{
    "data": "graph.json",
    "entity": "graph",
    "change": ["unchanged", "appeared"],
    "encoding": {
        "graphLayout": "square-matrix",
        "timeLayout": "merged"
    }
}
```

![image-20210401052436570](Numa.assets/image-20210401052436570.png)

```json
{
    "data": "graph.json",
    "entity": "graph",
    "combination": [
        {
            "change": ["unchanged", "appeared"],
            "encoding": {
                "graphLayout": "square-matrix(time % 4 * 45)",
                "timeLayout": "juxtaposed"
            }
        },
        {
            "change": "unchangedNode",
            "encoding": {
                "markLins": "curve"
            }
        }
    ]
}
```

![image-20210401051135537](Numa.assets/image-20210401051135537.png)

```json
{
    "data": "graph.json",
    "combination": [
        {
            "entity": "graph",
            "change": "all",
            "encoding": {
                "graphLayout": "matrix",
                "timeLayout": "juxtaposed"
            }
        },
        {
            "entity": "links",
            "change": ["all", "disappear(frame='next')"],
            "encoding": {
                "color": "change"
            }
        }
    ]
}
```

![image-20210401051520398](Numa.assets/image-20210401051520398.png)

```json
{
    "data": "graph.json",
    "combination": [
        {
            "entity": "graph",
            "change": "all",
            "encoding": {
                "graphLayout": "matrix",
                "timeLayout": "juxtaposed"
            }
        },
        {
            "entity": "links",
            "change": "all",
            "encoding": {
                "color": "change"
            }
        }
    ]
}
```

![image-20210401053831199](Numa.assets/image-20210401053831199.png)

```json
{
    "data": "graph.json",
    "entity": "graph",
    "combination": [
        {
            "change": "all",
            "encoding": {
                "timeLayout": "merged",
                "graphLayout": "circular",
                "color": {
                    "field": "time",
                    "scale": "ordinal"
                }
            }
        },
        {
            "change": ["unchangedNode", "appearNode", "disappearNode"],
            "encoding": {
                "chart": {
                    "name": "lineChart",
                    "field": "change==disappeared?0:1",
                    "scale": "bin-ordinal"
                }
            }
        }
    ]
}
```

![image-20210401062428268](Numa.assets/image-20210401062428268.png)

```json
{
    "data": "graph.json",
    "entity": "graph",
    "combination": [
        {
            "change": "all",
            "encoding": {
                "timeLayout": "merged",
                "graphLayout": "force-directed",
                "color": {
                    "field": "time",
                    "scale": "ordinal"
                }
            }
        },
        {
            "change": ["unchangedNode", "appearNode", "disappearNode"],
            "encoding": {
                "chart": {
                    "name": "pieChart",
                    "field": "time",
                    "scale": "ordinal"
                }
            }
        }
    ]
}
```

![image-20210401061700444](Numa.assets/image-20210401061700444.png)

```json
{
    "data": "graph.json",
    "entity": "graph",
    "change": "all",
    "encoding": {
        "graphLayout": "matrix",
        "timeLayout": "merged",
        "chart": {
            "name": "lineChart",
            "field": "change==disappeared?0:1",
            "scale": "bin-ordinal"
        }
    }
}
```

<img src="Numa.assets/image-20210401053846356.png" alt="image-20210401053846356" style="zoom:50%;" />

```json
{
    "data": "graph.json",
    "entity": "graph",
    "change": "all",
    "encoding": {
        "graphLayout": "matrix",
        "timeLayout": "merged",
        "chart": {
            "name": "barChart",
            "field": "time",
            "scale": "ordinal"
        }
    }
}
```

![image-20210401054751863](Numa.assets/image-20210401054751863.png)

```json
{
    "data": "graph.json",
    "entity": "graph",
    "change": "all",
    "encoding": {
        "graphLayout": "matrix",
        "timeLayout": "merged",
        "chart": {
            "name": "linechart",
            "field": "change==disappeared?0:1",
            "scale": "bin-ordinal"
        }
    }
}
```

![image-20210401062531531](Numa.assets/image-20210401062531531.png)

```json
{
    "data": "graph.json",
    "entity": "graph",
    "combination": [
        {
            "change": ["appeared", "disappeared"],
            "encoding": {
                "timeLayout": "juxtaposed",
                "graphLayout": "bipartite",
                "color": {
                    "field": "time",
                    "scale": "quantitative"
                }
            }
        },
        {
            "change": ["unchangedNode", "appearedNode"],
            "encoding": {
                "chart": {
                    "name": "lineChart",
                    "field": "change==disappeared?0:1",
                    "scale": "bin-ordinal"
                },
                "markLine": "dotted"
            }
        }
    ]
}
```

![image-20210401054840388](Numa.assets/image-20210401054840388.png)

```json
{
    "data": "graph.json",
    "combination": [
        {
            "entity": "graph",
            "change": ["unchanged", "appeared"],
            "encoding": {
                "timeLayout": "juxtaposed",
                "graphLayout": "grid"
            }
        },
        {
            "entity": "shortestPath(start='A', end='E', time='1')",
            "change": "unchanged",
            "encoding": {
                "color": "green"
            }
        }
    ]
}
```

![image-20210401060251041](Numa.assets/image-20210401060251041.png)

```json
{
    "data": "graph.json",
    "combination": [
        {
            "entity": "graph",
            "change": ["unchanged", "appeared"],
            "encoding": {
                "timeLayout": "juxtaposed",
                "graphLayout": "circular",
                "link": "curve"
            }
        },
        {
            "entity": "shortestPath(start='A', end='E', time='1')",
            "change": "unchanged",
            "encoding": {
                "color": "green"
            }
        }
    ]
}
```

![image-20210401060800097](Numa.assets/image-20210401060800097.png)

```json
{
    "data": "graph.json",
    "combination": [
        {
            "entity": "graph",
            "change": ["unchanged", "appeared"],
            "encoding": {
                "timeLayout": "juxtaposed",
                "graphLayout": "matrix"
            }
        },
        {
            "entity": "shortestPath(start='A', end='E', time='1')",
            "change": "unchanged",
            "encoding": {
                "color": "green"
            }
        }
    ]
}
```

![image-20210401060911966](Numa.assets/image-20210401060911966.png)

```json
{
    "data": "large-dynamic.json",
    "combination": [
        {
            "entity": "graph",
            "change": ["unchanged", "appeared"],
            "encoding": {
                "timeLayout": "juxtaposed",
                "graphLayout": "force-directed",
                "shape": "node.role=='people'?circle:cross"
            }
        },
        {
            "entity": "frequent-structure",
            "combination": [
                {
                    "change": ["unchangedNode", "appearedNode"],
                    "encoding": {
                        "color": "red"
                    }
                },
                {
                    "change": "unchangedNode",
                    "encoding": {
                        "markLine": {
                            "name": "curve",
                            "color": "red"
                        }
                    }
                }
            ]
        },
        {
            "entity": "anomaly-detection",
            "combination": [
                {
                    "change": ["unchangedNode", "appearedNode"],
                    "encoding": {
                        "color": "purple"
                    }
                },
                {
                    "change": "unchangedNode",
                    "encoding": {
                        "markLine": ["curve", "purple"]
                    }
                }
            ]
        }
    ]
}
```

![image-20210401061806394](Numa.assets/image-20210401061806394.png)

```json
{
    "data": "graph.json",
    "entity": "graph",
    "change": ["unchanged", "appeared"],
    "encoding": {
        "graphLayout": "force-directed",
        "timeLayout": "juxtaposed",
        "link": "curve"
    }
}
```

![image-20210401061906664](Numa.assets/image-20210401061906664.png)

```json
{
    "data": "graph.json",
    "entity": "graph",
    "change": ["unchanged", "appeared"],
    "encoding": {
        "graphLayout": "Bipartite",
        "timeLayout": "juxtaposed",
        "color": "change",
        "markLine": "line"
    }
}
```

![image-20210401062052963](Numa.assets/image-20210401062052963.png)

```json
{
    "data": "graph.json",
    "entity": "graph",
    "change": ["unchanged", "appeared"],
    "encoding": {
        "graphLayout": "one-MDS",
        "timeLayout": "juxtaposed",
        "markLine": {
            "type": "line",
            "color": "time"
        },
        "show": false
    }
}
```

![image-20210401062247954](Numa.assets/image-20210401062247954.png)

```json
{
    "data": "graph.json",
    "entity": "graph",
    "change": ["unchanged", "appeared"],
    "encoding": {
        "graphLayout": "MDS",
        "timeLayout": "juxtaposed",
        "shape": "Voronoi",
        "color": "id",
        "animation": 300
    }
}
```

![image-20210401063329584](Numa.assets/image-20210401063329584.png)

```json
{
    "data": "graph.json",
    "combination": [
        {
            "entity": "graph",
            "change": "all",
            "encoding": {
                "graphLayout": "circular",
                "timeLayout": "circular"
            }
        },
        {
            "entity": ["unchangedNode", "appearedNode", "disappearNode"],
            "change": "all",
            "encoding": {
                "color": "change",
                "markLine": "curve",
                "timeInsert": {
                    "connect": "node",
                    "type": "curve"
                }
            }
        }
    ]
}
```
