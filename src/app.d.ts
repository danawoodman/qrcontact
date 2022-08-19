// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
}

interface ContactAddress {
	label: string;
	po_box?: string;
	street: string;
	street_2?: string;
	city?: string;
	state_province?: string;
	postal_code?: string;
	country_region?: string;
}

interface ContactPhoneNumber {
	label: string;
	number: string;
}

interface ContactEmail {
	label: string;
	address: string;
}

interface ContactURL {
	label: string;
	href: string;
}

interface ContactInfo {
	title: string;
	first_name: string;
	middle_name: string;
	last_name: string;
	nicknames?: string[];
	phone_numbers: ContactPhoneNumber[];
	emails: ContactEmail[];
	addresses: ContactAddress[];
	urls: ContactURL[];
	birthday: string;
	nickname: string;
	// photo: {
	// 	url: string;
	// 	media_type: string;
	// 	base64: boolean;
	// };

	// name_prefix: string;
	// name_suffix: string;
	// gender: string;
	// anniversary: string;
	// logo: {
	// 	url: string;
	// 	mediaType: string;
	// 	base64: boolean;
	// };
	// role: string;
	// organization: string;
	// note: string;
	// source: string;

	// homeFax: string[] | string;
	// workFax: string[] | string;
}
