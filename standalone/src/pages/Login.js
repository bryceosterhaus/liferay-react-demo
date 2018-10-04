import React from 'react';
import {Link} from 'react-router-dom';
import {login} from '../util/request';

export default class Login extends React.Component {
	state = {error: false};

	handleSubmit = event => {
		event.preventDefault();

		const data = new FormData(event.target);

		this.setState({error: false});

		login(data.get('username'), data.get('password'))
			.then(() => {
				this.props.history.push(
					this.props.location.state
						? this.props.location.state.from
						: '/'
				);
			})
			.catch(() => {
				this.setState({error: true});
			});
	};

	render() {
		const {error} = this.state;

		return (
			<div className="container" style={{marginTop: 64}}>
				{!sessionStorage.auth && (
					<div>
						<h2>Log In</h2>

						<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<label htmlFor="username">Email address</label>

								<input
									className={`form-control ${
										error ? 'is-invalid' : ''
									}`}
									name="username"
									placeholder="Enter email"
									type="email"
								/>
							</div>

							<div className="form-group">
								<label htmlFor="password">Password</label>

								<input
									className={`form-control ${
										error ? 'is-invalid' : ''
									}`}
									name="password"
									placeholder="Password"
									type="password"
								/>

								<div className="invalid-feedback">
									Invalid Credentials
								</div>
							</div>

							<button className="btn btn-primary" type="submit">
								Submit
							</button>
						</form>
					</div>
				)}

				{sessionStorage.auth && (
					<div className="alert alert-success" role="alert">
						<h4 className="alert-heading">
							You are already signed in!
						</h4>

						<hr />

						<p className="mb-0">
							<Link to="/logout">sign out here.</Link>
						</p>
					</div>
				)}
			</div>
		);
	}
}