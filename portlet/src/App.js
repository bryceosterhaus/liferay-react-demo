import React from 'react';
import {
	NavLink,
	Redirect,
	Route,
	HashRouter as Router,
	Switch
} from 'react-router-dom';

import EditPerson from './pages/people/Edit';
import Home from './pages/index';
import People from './pages/people/index';
import Person from './pages/people/Person';
import Photos from './pages/photos/index';
import Upload from './pages/photos/Upload';

class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<ul className="navbar-nav">
							<li className="nav-item">
								<NavLink
									activeClassName="active"
									className="nav-link"
									exact
									to="/"
								>
									Home
								</NavLink>
							</li>

							<li className="nav-item">
								<NavLink
									activeClassName="active"
									className="nav-link"
									to="/people"
								>
									People
								</NavLink>
							</li>

							<li className="nav-item">
								<NavLink
									activeClassName="active"
									className="nav-link"
									to="/photos"
								>
									Photos
								</NavLink>
							</li>
						</ul>
					</nav>

					<Route component={Home} exact path="/" />

					<Route component={People} exact path="/people" />

					<Route component={Photos} exact path="/photos" />

					<Route component={Upload} exact path="/photos/create" />

					<Switch>
						<Route
							component={EditPerson}
							exact
							path="/people/create"
						/>

						<Route
							component={EditPerson}
							exact
							path="/people/:id/edit"
						/>

						<Route component={Person} exact path="/people/:id" />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
