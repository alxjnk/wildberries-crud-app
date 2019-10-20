import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import './App.css';
import Routes from './Routes';

function App() {
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<div className="App">
				<Routes />
			</div>
		</MuiPickersUtilsProvider>
	);
}

export default App;
