import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {refreshToken} from '../util/request';

export default class Login extends React.Component {
	render() {
		return (
			<div className="jumbotron">
				<div className="container">
					<h1 className="display-4">Hello, world!</h1>

					<p className="lead">
						This is a simple <strong>React</strong> application in a
						Liferay portlet
					</p>

					<hr className="my-4" />
				</div>
			</div>
		);
	}
}
