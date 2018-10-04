export default function getIdFromURL(url) {
	return url.split('/').pop();
}