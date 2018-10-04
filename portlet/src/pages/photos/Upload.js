import liferayConfig from '../../util/liferay-config';
import React from 'react';
import axios from 'axios';

export default class Upload extends React.Component {
	state = {
		file: null,
		preview: null
	};

	handleSubmit = event => {
		event.preventDefault();

		const data = new FormData(event.target);

		data.set('file', this.state.file);
		data.set('folderId', 0);
		data.set('repositoryId', liferayConfig.contentSpaceId);
		data.set('sourceFileName', this.state.file.name);
		data.set('mimeType', 'image/jpeg');
		data.set('description', '');
		data.set('changeLog', '');
		data.set('p_auth', window.Liferay.authToken);

		axios(
			{
				data,
				method: 'post',
				url: '/api/jsonws/dlapp/add-file-entry'
			},
			{
				'Content-Type': 'multipart/form-data'
			}
		).then(() => {
			this.props.history.push('/photos');
		});
	};

	handleFileChange = event => {
		const reader = new FileReader();

		const file = event.target.files[0];

		reader.onload = e => {
			this.setState({
				file,
				preview: e.target.result
			});
		};

		reader.readAsDataURL(file);
	};

	handleRemovePhoto = () => {
		this.setState({file: null, preview: null});
	};

	render() {
		const {file, preview} = this.state;

		return (
			<div className="container" style={{marginTop: 64}}>
				<div>
					<h2>Upload Photo</h2>

					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="title">Title</label>

							<input
								className="form-control"
								name="title"
								placeholder="Name"
								type="text"
							/>
						</div>

						<div className="custom-file">
							<input
								className="custom-file-input"
								id="customFile"
								onChange={this.handleFileChange}
								type="file"
							/>

							<label
								className="custom-file-label"
								for="customFile"
							>
								{file ? file.name : 'Choose file'}
							</label>
						</div>

						{preview &&
							file && (
								<div
									className="card"
									style={{marginTop: 24, width: '18rem'}}
								>
									<img
										className="card-img-top"
										src={preview}
									/>
									<div className="card-body">
										<p className="card-text">{file.name}</p>

										<button
											className="btn btn-primary btn-lg"
											onClick={this.handleRemovePhoto}
										>
											Cancel
										</button>
									</div>
								</div>
							)}

						<button
							className="btn btn-primary"
							style={{marginTop: 24}}
							type="submit"
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	}
}
