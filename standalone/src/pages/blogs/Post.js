import React from 'react';
import {doOperation, fetch} from '../../util/request';
import {Link} from 'react-router-dom';

export default class Post extends React.Component {
	state = {
		blog: {},
	};

	constructor(props) {
		super(props);

		this.fetchBlogs();
	}

	fetchBlogs = () => {
		fetch(
			`/api-proxy/o/api/p/blog-posting/${this.props.match.params.id}`,
			['creator'],
			{
				BlogPosting: [
					'alternativeHeadline',
					'articleBody',
					'creator',
					'headline',
				],
				Person: ['name'],
			}
		).then(response => {
			this.setState({blog: response});
		});
	};

	handleDelete = () => {
		if (window.confirm('Are you sure you want to delete this post?')) {
			const {blog} = this.state;

			doOperation({
				method: 'delete',
				target: `/api-proxy/o/api/p/blog-posting/${blog.id}`,
			})
				.then(() => this.props.history.push('/blogs'))
				.catch(() => this.props.history.push('/blogs')); // Needed because apio-consumer has a js error
		}
	};

	render() {
		const {
			alternativeHeadline,
			articleBody,
			headline,
			id,
		} = this.state.blog;

		return (
			<div
				className="d-flex flex-column"
				style={{margin: '0 auto', maxWidth: 700}}
			>
				<div
					className="d-flex justify-content-end btn-group"
					style={{marginTop: 12}}
				>
					<Link
						className="btn btn-info"
						title="Edit"
						to={`/blogs/${id}/edit`}
					>
						️️✏️
					</Link>

					<button
						className="btn btn-info"
						onClick={this.handleDelete}
						title="Delete"
					>
						🗑
					</button>
				</div>

				<div className="card p-2" style={{marginTop: 12}}>
					<div className="card-body">
						<h5 className="card-title">{headline}</h5>

						<h6 className="card-subtitle mb-2 text-muted">
							{alternativeHeadline}
						</h6>

						<p className="card-text" style={{whiteSpace: 'pre'}}>
							{articleBody}
						</p>
					</div>
				</div>
			</div>
		);
	}
}