import getIdFromURL from './getIdFromURL';

export default function blogConverter(thing) {
	const {
		alternativeHeadline,
		articleBody,
		creator,
		headline,
	} = thing.attributes;

	return {
		alternativeHeadline,
		articleBody,
		creator,
		headline,
		id: getIdFromURL(thing.id),
	};
}