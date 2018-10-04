import getIdFromURL from '../../util/getIdFromURL';
import liferayConfig from '../../util/liferay-config';
import React from 'react';
import {fetch} from '../../util/request';
import {Link} from 'react-router-dom';

function getDistFromBottom() {
	const scrollPosition = window.pageYOffset;
	const windowSize = window.innerHeight;
	const bodyHeight = document.body.offsetHeight;

	return Math.max(bodyHeight - (scrollPosition + windowSize), 0);
}

export default class Blogs extends React.Component {
	state = {
		blogs: [],
		nextPageURL: `/api-proxy/o/api/p/content-space/${
			liferayConfig.contentSpaceId
		}/blog-posting`,
		total: 0,
	};

	constructor(props) {
		super(props);

		this.listElement = React.createRef();

		this._isFetching = false;

		this.fetchBlogs();
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = () => {
		if (
			!this._isFetching &&
			this.state.nextPageURL &&
			getDistFromBottom() < 250
		) {
			this.fetchBlogs();
		}
	};

	fetchBlogs = () => {
		this._isFetching = true;

		fetch(this.state.nextPageURL, {
			embedded: ['creator'],
		}).then(({items, nextPageURL, total}) => {
			this._isFetching = false;

			this.setState({
				blogs: [...this.state.blogs, ...items],
				nextPageURL,
				total,
			});
		});
	};

	render() {
		const {blogs, total} = this.state;

		return (
			<div>
				<div className="jumbotron">
					<div className="container">
						<h1 className="display-4">Blogs</h1>

						<p className="lead">
							There are {total} blog posts on the Liferay instance
						</p>

						<Link
							className="btn btn-primary btn-lg"
							role="button"
							to="/blogs/create"
						>
							Create New Blog
						</Link>
					</div>
				</div>

				<div
					className="d-flex flex-column"
					ref={this.listElement}
					style={{margin: '0 auto', maxWidth: 700}}
				>
					{blogs.map((blog, i) => (
						<div
							className="card p-2"
							key={i}
							style={{marginBottom: 48}}
						>
							<div className="card-body">
								<h5 className="card-title">{blog.headline}</h5>

								<h6 className="card-subtitle mb-2 text-muted">
									{blog.alternativeHeadline}
								</h6>

								{blog.creator &&
									blog.creator.thing && (
									<p className="card-text">
											By:{' '}
										<Link
											to={`/people/${getIdFromURL(
												blog.creator.thing.id
											)}`}
										>
											{
												blog.creator.thing
													.attributes.name
											}
										</Link>
									</p>
								)}

								<Link
									className="card-link"
									to={`blogs/${blog.id}`}
								>
									See Post
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}