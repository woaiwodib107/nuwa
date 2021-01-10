export const defaultConfigs = {
    basic: {
        width: 250,
        height: 250,
        eachWidth: 250,
        eachHeight: 250,
        margin: 30,
        nodeStyle: {
            shape: 'circle',
            fillColor: '#DAD5D5',
            strokeColor: '#000000',
            strokeWidth: 1,
            radius: 6,
            strokeType: 'solid',
            textColor: 'white'
        },
        linkStyle: {
            shape: 'curve',
            strokeColor: '#908F8F',
            strokeType: 'solid',
            strokeWidth: 2
        }
    },
    layout: {
        chooseType: 'offLine',
        vertical: {
            yDistance: 40,
            linkStyle: {
                overwrite: true,
                shape: 'curve'
            }
        },
        offLine:{

        },
        onLine: {

        },
        bipartite: {

        },
        circle: {

        }  
    },
    time: {
        chooseTypes:[],
        insert: {
            position:'bottom',
            margin: 10,
            nodeStyle: {
                shape: 'circle',
                fillColor: '#ffcc00',
                strokeColor: '#000000',
                strokeWidth: 1,
                radius: 6,
                strokeType: 'solid',
                textColor: 'white'
            },
            linkStyle: {
                shape: 'curve',
                strokeColor: '#ffcc00',
                strokeType: 'solid',
                strokeWidth: 2
            }
        },
        color: {
            element: 'all',
            startColor: '#FD8F8F',
            endColor: '#90B5FB'
        },
        animation: {
            speed: 1800
        },
        markLine: {
            strokeType: 'solid',
            strokeColor: '#FD8F8F',
            strokeWidth: 1,
            strokeDasharray: '5,5'
        },
        timeLine: {
            horizonDistance: 250,
            verticalDistance: 0,
            // 有可能只对节点进行该操作
            element: 'all',
        }
    },
    comparison: {
        isOn: true,
        chooseTypes:['shape', 'fillColor', 'strokeColor', 'strokeWidth', 'strokeType', 'color', 'radius'],
        // keyFrame可为上一帧、下一帧、具体某一帧
        keyFrame: 'next',
        elements: 'all',
        node: {
            appearNode: {
                shape: 'circle',
                fillColor: '#FD8F8F',
                strokeColor: '#000000',
                strokeWidth: 1,
                strokeType: 'solid',
                textColor: 'white',
                radius: 8
            },
            stableNode: {
                shape: 'circle',
                fillColor: '#DAD5D5',
                strokeColor: '#000000',
                strokeWidth: 1,
                radius: 6,
                strokeType: 'solid',
                textColor: 'white'
            },
            disappearNode: {
                shape: 'circle',
                fillColor: '#90B5FB',
                strokeColor: '#000000',
                strokeWidth: 1,
                radius: 8,
                strokeType: 'solid',
                textColor: 'white'
            }
        },
        link: {
            appearLink: {
                shape: 'curve',
                strokeColor: '#FD8F8F',
                strokeType: 'solid',
                strokeWidth: 3
            },
            stableLink: {
                shape: 'line',
                strokeColor: '#908F8F',
                strokeType: 'solid',
                strokeWidth: 1
            },
            disappearLink: {
                shape: 'curve',
                strokeColor: '#90B5FB',
                strokeType: 'solid',
                strokeWidth: 3
            }
        }
    }
}
