import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {refreshToken} from '../util/request';

export default class Login extends React.Component {
	constructor(props) {
		super(props);

		refreshToken().catch(() => {
			sessionStorage.removeItem('auth');

			this.forceUpdate();
		});
	}

	render() {
		return (
			<div className="jumbotron">
				<div className="container">
					<h1 className="display-4">Hello, world!</h1>

					<p className="lead">
						This is a simple <strong>React</strong> application that
						uses Liferay's headless APIs
					</p>

					<hr className="my-4" />

					{!sessionStorage.auth && (
						<Fragment>
							<p>
								Use the following Liferay credentials
								<br />
								<strong>Username: </strong> test@liferay.com
								<br />
								<strong>Password: </strong> test
							</p>

							<Link
								className="btn btn-primary btn-lg"
								role="button"
								to="/login"
							>
								Sign In
							</Link>
						</Fragment>
					)}

					{sessionStorage.auth && (
						<Link
							className="btn btn-primary btn-lg"
							role="button"
							to="/logout"
						>
							Sign Out
						</Link>
					)}
				</div>
			</div>
		);
	}
}