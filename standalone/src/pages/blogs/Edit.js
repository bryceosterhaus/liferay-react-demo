import getIdFromURL from '../../util/getIdFromURL';
import liferayConfig from '../../util/liferay-config';
import React from 'react';
import {doOperation, fetch} from '../../util/request';

export default class Edit extends React.Component {
	state = {blog: {}, content: ''};

	constructor(props) {
		super(props);

		const {id} = this.props.match.params;

		if (id) {
			this.fetchBlog(id);
		}
	}

	fetchBlog(id) {
		fetch(`/api-proxy/o/api/p/blog-posting/${id}`).then(blog => {
			this.setState({blog, content: blog.articleBody});
		});
	}

	handleContentChange = event => {
		this.setState({content: event.target.value});
	};

	handleSubmit = event => {
		event.preventDefault();

		const {id} = this.props.match.params;

		const data = new FormData(event.target);

		doOperation(
			{
				method: id ? 'put' : 'post',
				target: id
					? `/api-proxy/o/api/p/blog-posting/${id}`
					: `/api-proxy/o/api/p/content-space/${
						liferayConfig.contentSpaceId
					  }/blog-posting`, //eslint-disable-line
			},
			{
				alternativeHeadline: data.get('alternativeHeadline'),
				articleBody: data.get('articleBody'),
				headline: data.get('headline'),
			}
		).then(blog => {
			this.props.history.push(`/blogs/${getIdFromURL(blog['@id'])}`);
		});
	};

	render() {
		const {alternativeHeadline, headline} = this.state.blog;

		return (
			<div className="container" style={{marginTop: 64}}>
				<div>
					<h2>Create New Post</h2>

					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="headline">Title</label>
							<input
								className="form-control"
								defaultValue={headline}
								name="headline"
								placeholder="Title..."
								type="text"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="alternativeHeadline">
								Subtitle
							</label>
							<input
								className="form-control"
								defaultValue={alternativeHeadline}
								name="alternativeHeadline"
								placeholder="Subtitle..."
								type="text"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="articleBody">Content</label>
							<textarea
								className="form-control"
								name="articleBody"
								onChange={this.handleContentChange}
								placeholder="Write..."
								style={{minHeight: 400}}
								value={this.state.content}
							/>
						</div>

						<button className="btn btn-primary" type="submit">
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	}
}