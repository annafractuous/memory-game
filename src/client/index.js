import React from 'react'
import { render } from 'react-dom'
import App from '../components/App/App'
import store from '../redux/store/index'
import { Provider } from 'react-redux'

const root = document.querySelector('#root')
render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
)
