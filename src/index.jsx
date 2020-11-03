import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import App from './components/App'
import { Provider } from 'react-redux'
import store from './redux/store'

axios.defaults.baseURL = 'http://localhost:3001/api/v1/'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
