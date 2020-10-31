import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import App from './components/App'
import 'semantic-ui-css/semantic.min.css'
import './styles/App.css'
import { Provider } from 'react-redux'
import store from './redux/store'

axios.defaults.baseURL = 'http://localhost:3001/api/v1/'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
