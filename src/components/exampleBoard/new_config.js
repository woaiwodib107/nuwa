export const new_configSet = [
    {
        time: ['timeLine', 'color', 'insert'],
        renderType: 'position'
    },
    {
        time: ['timeLine', 'insert'],
        renderType: 'position'
    },
    {
        time: [
            'timeLine',
            {
                insert: {
                    position: 'bottom', //目前就实现这一个。。。
                    linkStyle: {
                        shape: 'curve'
                    }
                }
            }
        ],
        renderType: 'position'
    },
    {
        renderType: 'position'
    },
    {
        time: 'timeLine',
        renderType: 'position'
    },
    {
        comparison: 'color',
        renderType: 'position'
    },

    {
        time: 'timeLine',
        comparison: 'color',
        renderType: 'position'
    },
    {
        time: {
            timeLine: {
                element: 'node'
            }
        },
        comparison: 'color',
        renderType: 'position'
    },
    {
        time: {
            position: {
                element: 'link'
            }
        },
        comparison: 'color',
        renderType: 'position'
    },

    {
        time: 'animation',
        renderType: 'animation'
    },
    {
        time: 'animation',
        comparison: 'color',
        renderType: 'animation'
    },
    {
        time: ['animation', 'timeLine'],
        comparison: 'color',
        renderType: 'animation'
    },
    {
        time: [
            'animation',
            {
                timeLine: {
                    element: 'node'
                }
            }
        ],
        comparison: 'color',
        renderType: 'animation'
    },
    {
        time: [
            'animation',
            {
                timeLine: {
                    element: 'link'
                }
            }
        ],
        comparison: 'color',
        renderType: 'animation'
    },
    {
        layout: 'vertical',
        time: {
            timeLine: {
                element: 'link'
            }
        },
        renderType: 'position'
    },
    {
        layout: 'vertical',
        time: {
            timeLine: {
                element: 'node'
            }
        },
        renderType: 'position'
    },
    {
        time: ['timeLine', 'insert'],
        renderType: 'position'
    },
    {
        time: [
            'timeLine',
            {
                insert: {
                    position: 'bottom', //目前就实现这一个。。。
                    linkStyle: {
                        shape: 'curve'
                    }
                }
            }
        ],
        renderType: 'position'
    }
]
