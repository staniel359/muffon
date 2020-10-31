import { createStore } from 'redux'
import main from './reducers/main'

const store = createStore(main, window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
