export const configSet = [
    {},
    {
        time: 'timeLine'
    },
    {
        layout: 'vertical',
        time: ['timeLine', 'markLine']
    },
    {
        time: 'animation',
        comparison: {
            isOn: true,
            chooseTypes: ['fillColor']
        }
    },
    {
        time: ['animation', 'timeLine'],
        comparison: 'color'
    },
    {
        time: {
            chooseTypes: ['timeLine','insert'],
            insert: {
                timeLine: 'bottom', //目前就实现这一个。。。
                linkStyle: {
                    shape: 'line'
                }
            }
        }
    },
    /*
    
    
    
    
    
    
    {
        time: [
            'timeLine',
            {
                insert: {
                    timeLine: 'bottom', //目前就实现这一个。。。
                    linkStyle: {
                        shape: 'curve'
                    }
                }
            }
        ]
    },
    {
        time: 'timeLine'
    },
    {
        comparison: 'color'
    },

    {
        time: 'timeLine',
        comparison: 'color'
    },
    {
        time: {
            timeLine: {
                element: 'node'
            }
        },
        comparison: 'color'
    },
    {
        time: {
            timeLine: {
                element: 'link'
            }
        },
        comparison: 'color'
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
        comparison: 'color'
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
        comparison: 'color'
    },
    {
        layout: 'vertical',
        time: {
            timeLine: {
                element: 'link'
            }
        }
    },
    {
        layout: 'vertical',
        time: {
            timeLine: {
                element: 'node'
            }
        }
    },
    {
        layout: 'vertical',
        time: {
            timeLine: {
                element: 'node'
            }
        },
        comparison: 'color'
    },
    {
        time: ['timeLine', 'insert']
    },
    
    {
        time: [
            'timeLine',
            'color',
            {
                insert: {
                    timeLine: 'bottom', //目前就实现这一个。。。
                    linkStyle: {
                        shape: 'curve'
                    }
                }
            }
        ]
    }
    */
]
