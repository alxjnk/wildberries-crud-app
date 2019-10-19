import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListArticleComponent from './article/ListArticleComponent';
import AddArticleComponent from './article/AddArticleComponent';

const AppRouter = () => {
	return (
		<div style={style}>
			<Router>
				<Switch>
					<Route path="/" exact component={ListArticleComponent} />
					<Route
						path="/articles/:id"
						exact
						component={(obj) => <AddArticleComponent match={obj.match} history={obj.history} obj={obj} />}
					/>
				</Switch>
			</Router>
		</div>
	);
};

const style = {
	marginTop: '20px'
};

export default AppRouter;
