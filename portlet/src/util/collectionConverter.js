import getIdFromURL from './getIdFromURL';

export default function collectionConverter(thing) {
	const {member, totalItems, view} = thing.attributes;

	let nextPageURL;

	if (view.thing.attributes.next) {
		const url = new URL(view.thing.attributes.next);

		nextPageURL = `${url.pathname}${url.search}`;
	}

	return {
		items: member.map(item => ({
			...item.thing.attributes,
			id: getIdFromURL(item.id)
		})),
		nextPageURL,
		total: totalItems
	};
}
