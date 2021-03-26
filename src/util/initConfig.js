export const COMPARISON_CONFIG = [
    'shape',
    'fillColor',
    'strokeColor',
    'strokeWidth',
    'strokeType',
    'radius',
    'strokeDasharray',
    'textColor'
]
export const initConfig = {
    graph: {
        eachWidth: 300,
        eachHeight: 300,
        margin: 30,
        layout: {
            chooseType: 'bipartite',
            vertical: {
                yDistance: 40,
                linkStyle: {
                    shape: 'curve'
                }
            },
            offLine:{

            },
            onLine: {
    
            },
            bipartite: {
    
            },
            circular: {
    
            },
            dagre: {

            },
            mds: {

            },
            grid: {
                rows: 4
            },
            matrix: {
                
            }
        },
        nodeStyle: {
            shape: 'rect',
            fillColor: '#ffffff',
            strokeColor: '#000000',
            strokeWidth: 1,
            radius: 8,
            strokeType: 'solid',
            textColor: 'white',
            opacity: 1
        },
        linkStyle: {
            shape: 'line',
            strokeColor: '#908F8F',
            strokeType: 'solid',
            strokeWidth: 2,
            opacity: 1,
            strokeDasharray: '3,3',
            pointShape: 'rect',
            pointFillColor: '#98F3E3',
            pointOpacity: 1,
            pointRadius: 8,
            pointStrokeWidth:1,
            pointStrokeColor: '#000000',
            pointStrokeType: 'solid',
        }
    },
    time: {
        chooseTypes:[],
        timeLine: {
            xDistance: 300,
            yDistance: 0,
            // 有可能只对节点进行该操作
            element: 'all',
            // 表示位置变换的函数，还有就是环状。。circular
            type: 'linear'
        },
        insert: {
            position:'bottom',
            margin: 10,
            nodeStyle: {
                shape: 'circle',
                fillColor: '#FF5F00',
                strokeColor: '#000000',
                strokeWidth: 1,
                radius: 6,
                strokeType: 'solid',
                textColor: 'white',
                opacity: 1
            },
            linkStyle: {
                shape: 'curve',
                strokeColor: '#FF5F00',
                strokeType: 'solid',
                strokeWidth: 1,
                opacity: 1,
                strokeDasharray: '3,3',
                fillColor: '#ffffff',
                radius: 8,
            }
        },
        color: {
            element: 'all',
            startColor: '#ECAA7B',
            endColor: '#98F3E3'
        },
        animation: {
            speed: 1800
        },
        markLine: {
            shape: 'line',
            strokeType: 'dashed',
            strokeColor: '#FD8F8F',
            strokeWidth: 1,
            strokeDasharray: '5,5',
            opacity:1,
        },
        chart: {
            type:'line'
        }
    },
    task: {
        // 任务类型有：comparison\find\filter
        taskType: 'find',
        basedType: 'attr',
        find:{
            attr:'degree',
            relation: '>=',
            value: 3
        },
        comparison: {
            chooseItem: 'stable-Node',
            chooseTypes: COMPARISON_CONFIG,
            attr: '',
            // keyFrame可为上一帧、下一帧、具体某一帧
            keyFrame: 'next',
            elements: 'all',
            appearNode: {
                shape: 'rect',
                fillColor: '#ECAA7B',
                strokeColor: '#000000',
                strokeWidth: 1,
                strokeType: 'solid',
                textColor: 'white',
                radius: 8,
                opacity: 1
            },
            stableNode: {
                shape: 'circle',
                fillColor: '#DAD5D5',
                strokeColor: '#000000',
                strokeWidth: 1,
                radius: 6,
                strokeType: 'solid',
                textColor: 'white',
                opacity: 1
            },
            disappearNode: {
                shape: 'circle',
                fillColor: '#98F3E3',
                strokeColor: '#000000',
                strokeWidth: 1,
                radius: 8,
                strokeType: 'solid',
                textColor: 'white',
                opacity: 1
            },
            appearLink: {
                shape: 'curve',
                strokeColor: '#ECAA7B',
                strokeType: 'solid',
                strokeWidth: 3,
                opacity: 1,
                strokeDasharray: '3,3',
                fillColor: '#ffffff',
                radius: 8,
            },
            stableLink: {
                shape: 'line',
                strokeColor: '#908F8F',
                strokeType: 'solid',
                strokeWidth: 1,
                opacity: 1,
                strokeDasharray: '3,3',
                fillColor: '#ffffff',
                radius: 8,
            },
            disappearLink: {
                shape: 'curve',
                strokeColor: '#98F3E3',
                strokeType: 'solid',
                strokeWidth: 3,
                opacity: 1,
                strokeDasharray: '3,3',
                fillColor: '#ffffff',
                radius: 8,
            }
        }
    }
}