import React from 'react';
import {
	NavLink,
	Redirect,
	Route,
	BrowserRouter as Router,
	Switch
} from 'react-router-dom';

import BlogPost from './pages/blogs/Post';
import Blogs from './pages/blogs';
import EditBlogPost from './pages/blogs/Edit';
import EditPerson from './pages/people/Edit';
import Home from './pages/index';
import Login from './pages/Login';
import Logout from './pages/Logout';
import People from './pages/people';
import Person from './pages/people/Person';
import Photos from './pages/photos';
import Upload from './pages/photos/Upload';

const AuthRoute = ({component: ComponentName, ...other}) => (
	<Route
		{...other}
		// eslint-disable-next-line react/jsx-no-bind
		render={props =>
			!sessionStorage.auth ? (
				<Redirect to="/login" {...props} />
			) : (
				<ComponentName {...props} />
			)
		}
	/>
);

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
									to="/blogs"
								>
									Blogs
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

					<Route component={Login} exact path="/login" />

					<Route component={Logout} exact path="/logout" />

					<AuthRoute component={People} exact path="/people" />

					<AuthRoute component={Blogs} exact path="/blogs" />

					<AuthRoute component={Photos} exact path="/photos" />

					<AuthRoute component={Upload} exact path="/photos/create" />

					<Switch>
						<AuthRoute
							component={EditBlogPost}
							exact
							path="/blogs/create"
						/>

						<AuthRoute
							component={EditBlogPost}
							exact
							path="/blogs/:id/edit"
						/>

						<AuthRoute
							component={BlogPost}
							exact
							path="/blogs/:id"
						/>
					</Switch>

					<Switch>
						<AuthRoute
							component={EditPerson}
							exact
							path="/people/create"
						/>

						<AuthRoute
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
