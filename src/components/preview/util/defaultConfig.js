export const defaultConfigs = {
    // width: 500,
    // height: 500,
    // filter: {
    //     node,
    //     appearNode,
    //     stableNode,
    //     disappearNode,
    //     appearLink,
    //     stableLink,
    //     disappearLink
    // },
    layout: {
        vertical: {
            yDistance: 40,
            linkStyle: {
                overwrite: true,
                shape: 'curve'
            }
        }
    },
    time: {
        insert: {
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
            },
            bottomMargin: 20
        },
        color: {
            element: 'all',
            startColor: '#FD8F8F',
            endColor: '#90B5FB'
        },
        animation: {
            speed: 800
        },
        markLine: {
            overwrite: true,
            strokeColor: '#FD8F8F',
            strokeWidth: 1,
            strokeDasharray: '5,5'
            // xDistance: 100
            // yDistance: 40
        },
        timeLine: {
            overwrite: true,
            timeLineFlag: 1,
            eachMargin: 5,
            eachWidth: 180,
            eachHeight: 200,
            element: 'all',
            leftMargin: 180
        }
    },
    comparison: {
        color: {
            appearNode: {
                shape: 'circle',
                fillColor: '#FD8F8F',
                strokeColor: '#000000',
                strokeWidth: 1,
                strokeType: 'solid',
                textColor: 'white',
                radius: 6
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
                radius: 6,
                strokeType: 'solid',
                textColor: 'white'
            },
            appearLink: {
                strokeColor: '#FD8F8F',
                strokeType: 'solid',
                strokeWidth: 2
            },
            stableLink: {
                strokeColor: '#908F8F',
                strokeType: 'solid',
                strokeWidth: 2
            },
            disappearLink: {
                strokeColor: '#90B5FB',
                strokeType: 'solid',
                strokeWidth: 2
            }
        },
        nodeColor: {
            appearNode: {
                shape: 'circle',
                fillColor: '#FD8F8F',
                strokeColor: '#000000',
                strokeWidth: 1,
                strokeType: 'solid',
                textColor: 'white',
                radius: 6
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
                radius: 6,
                strokeType: 'solid',
                textColor: 'white'
            }
        },
        linkColor: {
            appearLink: {
                strokeColor: '#FD8F8F',
                strokeType: 'solid',
                strokeWidth: 2
            },
            stableLink: {
                strokeColor: '#908F8F',
                strokeType: 'solid',
                strokeWidth: 2
            },
            disappearLink: {
                strokeColor: '#90B5FB',
                strokeType: 'solid',
                strokeWidth: 2
            }
        }
    },
    basic: {
        width: 1010,
        height: 250,
        timeLineFlag: 0,
        eachWidth: 200,
        eachHeight: 250,
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
            shape: 'line',
            strokeColor: '#908F8F',
            strokeType: 'solid',
            strokeWidth: 2
        }
    }
}
