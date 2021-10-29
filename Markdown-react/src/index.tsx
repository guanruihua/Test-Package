import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import App from './modules/app'
import stores from './store'
import './index.less'

ReactDOM.render(
	<Provider {...stores}>
		<App />
	</Provider>,
	document.getElementById('root'))
