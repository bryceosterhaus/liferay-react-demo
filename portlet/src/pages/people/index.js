import React from 'react';
import {fetch} from '../../util/request';
import {Link} from 'react-router-dom';

export default class People extends React.Component {
	state = {
		people: [],
		total: 0
	};

	constructor(props) {
		super(props);

		this.fetchPeople();
	}

	fetchPeople = () => {
		fetch('/o/api/p/user-account').then(({items, total}) => {
			this.setState({
				people: items,
				total
			});
		});
	};

	render() {
		const {people, total} = this.state;

		return (
			<div>
				<div className="jumbotron">
					<div className="container">
						<h1 className="display-4">People</h1>

						<p className="lead">
							There are {total} users on the Liferay instance
						</p>

						<Link
							className="btn btn-primary btn-lg"
							role="button"
							to="/people/create"
						>
							Create New User
						</Link>
					</div>
				</div>

				{!!people.length && (
					<div className="card-columns">
						{people.map((person, i) => {
							return (
								<div className="card" key={i}>
									<Link to={`/people/${person.id}`}>
										<div className="card-body">
											<h5 className="card-title">
												{person.name}
											</h5>

											<p className="card-text">
												<small className="text-muted">
													{person.email}
												</small>
											</p>
										</div>
									</Link>
								</div>
							);
						})}
					</div>
				)}
			</div>
		);
	}
}
