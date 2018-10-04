import getIdFromURL from '../../util/getIdFromURL';
import React from 'react';
import {doOperation, fetch} from '../../util/request';

export default class Edit extends React.Component {
	state = {error: false, person: {}};

	constructor(props) {
		super(props);

		const {id} = this.props.match.params;

		if (id) {
			this.fetchPerson(id);
		}
	}

	fetchPerson(id) {
		fetch(`/api-proxy/o/api/p/user-account/${id}`).then(person => {
			this.setState({person});
		});
	}

	handleSubmit = event => {
		event.preventDefault();

		const {id} = this.props.match.params;

		const data = new FormData(event.target);

		this.setState({error: false});

		doOperation(
			{
				method: id ? 'put' : 'post',
				target: `${
					window.location.origin
				}/api-proxy/o/api/p/user-account${id ? `/${id}` : ''}`,
			},
			{
				email: data.get('email'),
				familyName: data.get('familyName'),
				givenName: data.get('givenName'),
				password: data.get('password'),
			}
		)
			.then(person => {
				this.props.history.push(
					`/people/${getIdFromURL(person['@id'])}`
				);
			})
			.catch(() => {
				this.setState({error: true});
			});
	};

	render() {
		const {error, person} = this.state;
		const {id} = this.props.match.params;

		return (
			<div className="container" style={{marginTop: 64}}>
				<div>
					<h2>{person ? 'Edit Person' : 'Create New Person'}</h2>

					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="username">Email address</label>

							<input
								className={`form-control ${
									error ? 'is-invalid' : ''
								}`}
								defaultValue={person.email}
								name="email"
								placeholder="Enter email"
								type="email"
							/>

							<div class="invalid-feedback">
								User with email aready exists
							</div>
						</div>

						{id && (
							<div className="form-group">
								<label htmlFor="password">Password</label>

								<input
									className="form-control"
									defaultValue={person.password}
									name="password"
									placeholder="Password"
									type="password"
								/>
							</div>
						)}

						<div className="form-group">
							<label htmlFor="givenName">First Name</label>

							<input
								className="form-control"
								defaultValue={person.givenName}
								name="givenName"
								placeholder="First Name"
								type="text"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="familyName">Last Name</label>

							<input
								className="form-control"
								defaultValue={person.familyName}
								name="familyName"
								placeholder="Last Name"
								type="text"
							/>
						</div>

						<button className="btn btn-primary" type="submit">
							{this.props.match.params.id ? 'Update' : 'Create'}
						</button>
					</form>
				</div>
			</div>
		);
	}
}