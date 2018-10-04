import React from 'react';
import {doOperation, fetch} from '../../util/request';
import {Link} from 'react-router-dom';

export default class Person extends React.Component {
	state = {
		person: {}
	};

	constructor(props) {
		super(props);

		this.fetchPerson();
	}

	fetchPerson = () => {
		fetch(`/o/api/p/user-account/${this.props.match.params.id}`).then(
			response => {
				this.setState({
					person: response
				});
			}
		);
	};

	handleDeleteUser = () => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			const {person} = this.state;

			doOperation({
				method: 'delete',
				target: `/o/api/p/user-account/${person.id}`
			})
				.then(() => this.props.history.push('/people'))
				.catch(() => this.props.history.push('/people')); // Needed because apio-consumer has a js error
		}
	};

	render() {
		const {person} = this.state;

		return (
			<div className="jumbotron">
				<div className="container">
					<h1 className="display-4 d-flex justify-content-between">
						{person.name}

						<div className="btn-group" style={{display: 'block'}}>
							<Link
								className="btn btn-light"
								title="Edit"
								to={`/people/${person.id}/edit`}
							>
								️️✏️
							</Link>
							<button
								className="btn btn-light"
								onClick={this.handleDelete}
								title="Delete"
							>
								🗑
							</button>
						</div>
					</h1>

					<hr className="my-4" />

					<p>
						<strong>Username: </strong> {person.email}
					</p>
				</div>
			</div>
		);
	}
}
