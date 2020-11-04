import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import App from './components/App'

axios.defaults.baseURL = 'http://localhost:3001/api/v1/'

ReactDOM.render(<App />, document.getElementById('app'))
