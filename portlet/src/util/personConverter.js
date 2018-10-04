import getIdFromURL from './getIdFromURL';

export default function personConverter(thing) {
	const {email, familyName, givenName, name} = thing.attributes;

	return {
		email,
		familyName,
		givenName,
		id: getIdFromURL(thing.id),
		name,
	};
}