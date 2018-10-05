import React from 'react';
import {
	NavLink,
	Redirect,
	Route,
	BrowserRouter as Router,
	Switch
} from 'react-router-dom';

function asyncComponent(importComponent) {
	class AsyncComponent extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				component: null
			};
		}

		async componentDidMount() {
			const {default: component} = await importComponent();

			this.setState({
				component: component
			});
		}

		render() {
			const C = this.state.component;

			return C ? <C {...this.props} /> : null;
		}
	}

	return AsyncComponent;
}

const BlogPost = asyncComponent(() => import('./pages/blogs/Post'));
const Blogs = asyncComponent(() => import('./pages/blogs'));
const EditBlogPost = asyncComponent(() => import('./pages/blogs/Edit'));
const EditPerson = asyncComponent(() => import('./pages/people/Edit'));
const Home = asyncComponent(() => import('./pages/index'));
const Login = asyncComponent(() => import('./pages/Login'));
const Logout = asyncComponent(() => import('./pages/Logout'));
const People = asyncComponent(() => import('./pages/people'));
const Person = asyncComponent(() => import('./pages/people/Person'));
const Photos = asyncComponent(() => import('./pages/photos'));
const Upload = asyncComponent(() => import('./pages/photos/Upload'));

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
