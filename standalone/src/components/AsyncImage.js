import React from 'react';
import {axiosRequest} from '../util/request';

export default class Image extends React.Component {
	state = {
		loadedImage: '',
	};

	componentWillMount() {
		axiosRequest({
			method: 'get',
			responseType: 'arraybuffer',
			url: this.props.src,
		}).then(response => {
			const imgBase64 = new Buffer(response.data, 'binary').toString(
				'base64'
			);

			this.setState({loadedImage: `data:image/jpeg;base64,${imgBase64}`});
		});
	}

	render() {
		return this.state.loadedImage ? (
			<img className="card-img-top" src={this.state.loadedImage} />
		) : (
			'loading...'
		);
	}
}