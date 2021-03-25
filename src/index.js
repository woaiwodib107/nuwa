import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Board from './board.js'
import reducers from './redux/index.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(reducers)

let script = document.createElement('script')
script.type = 'text/javascript'
script.src = 'http://at.alicdn.com/t/font_2104982_fxuicqlij3m.js'
document.getElementById('root').appendChild(script)

ReactDOM.render(
    <Provider store={store}>
        <Board />
    </Provider>,
    document.getElementById('root')
)
