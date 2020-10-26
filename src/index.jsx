import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import App from './components/App'
import 'semantic-ui-css/semantic.min.css'
import './styles/App.css'

axios.defaults.baseURL = 'http://localhost:3001/api/v1/'

ReactDOM.render(<App />, document.getElementById('app'))
