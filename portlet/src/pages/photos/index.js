import liferayConfig from '../../util/liferay-config';
import React from 'react';
import {axiosRequest} from '../../util/request';
import {Link} from 'react-router-dom';

export default class Photos extends React.Component {
	state = {
		photos: []
	};

	constructor(props) {
		super(props);

		this.fetchPhotos();
	}

	fetchPhotos = () => {
		window.Liferay.Service(
			'/dlapp/get-file-entries',
			{
				repositoryId: liferayConfig.contentSpaceId,
				folderId: 0,
				mimeTypes: ['image/jpeg']
			},
			items => {
				this.setState({
					photos: items
				});
			}
		);
	};

	render() {
		const {photos} = this.state;

		return (
			<div>
				<div className="jumbotron">
					<div className="container">
						<h1 className="display-4">Photos</h1>

						<Link
							className="btn btn-primary btn-lg"
							role="button"
							to="/photos/create"
						>
							Upload New Photo
						</Link>
					</div>
				</div>

				<div className="card-columns">
					{photos.map((photo, i) => {
						return (
							<div className="card" key={i}>
								<img
									className="card-img-top"
									src={`/documents/${photo.repositoryId}/0/${
										photo.fileName
									}/${photo.uuid}`}
								/>

								<div className="card-body">
									<h5 className="card-title">
										{photo.title}
									</h5>
									<p className="card-text">
										{photo.fileName}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
