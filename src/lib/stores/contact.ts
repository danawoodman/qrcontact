import kebab from "just-kebab-case";
import { derived, writable } from "svelte/store";

export const contact = writable<Partial<ContactInfo>>({
	title: "Mr.",
	first_name: "John",
	middle_name: "H",
	last_name: "Smith",
	nicknames: ["Jon", "Johnny"],
	emails: [
		{ label: "work", address: "work@example.com" },
		{ label: "home", address: "home@example.com" },
		{ label: "cell", address: "cell@example.com" },
	],
	phone_numbers: [
		{ label: "work", number: "+1 (555) 555-5555" },
		{ label: "home", number: "+1 (666) 666-6666" },
		{ label: "cell", number: "+1 (777) 777-7777" },
	],
	addresses: [
		{
			label: "home",
			street: "123 Main St.",
			street_2: "Apt. 1",
			city: "New York",
			state_province: "NY",
			postal_code: "10001",
			country_region: "USA",
		},
	],
	urls: [
		{ label: "homepage", href: "https://mysite.com" },
		{ label: "work", href: "https://google.com" },
	],
});

export const file_name = derived(contact, ($contact) => {
	const parts: string[] = [];
	if ($contact?.first_name) parts.push($contact.first_name);
	if ($contact?.last_name) parts.push($contact.last_name);
	return kebab(parts.join("-"));
});

export const vcard = derived(contact, ($contact) => {
	const parts: string[] = ["BEGIN:VCARD", "VERSION:4.0"];
	if ($contact.first_name || $contact.last_name || $contact.title) {
		parts.push(
			`N:${$contact.last_name};${$contact.first_name};${$contact.title}`,
			`FN:${$contact.first_name} ${$contact.last_name}`
		);
	}
	if ($contact.title) parts.push(`TITLE:${$contact.title}`);
	if ($contact?.nicknames?.length)
		parts.push(`NICKNAME:${$contact.nicknames.join(",")}`);

	// ORG:Example Organisation

	if ($contact?.emails?.length) {
		parts.push(
			...$contact.emails.map(
				(email) => `EMAIL;${email.label};PREF:${email.address}`
			)
		);
	}

	if ($contact?.phone_numbers?.length) {
		parts.push(
			...$contact.phone_numbers.map(
				(phone) => `TEL;${phone.label};VOICE;PREF:${phone.number}`
			)
		);
	}

	// https://datatracker.ietf.org/doc/id/draft-ietf-vcarddav-vcardrev-02.html#ADR
	if ($contact?.addresses?.length) {
		parts.push(
			...$contact.addresses.map(
				// to the post office box; the extended address (e.g. apartment or suite number); the street address; the locality (e.g., city); the region (e.g., state or province); the postal code; the country name
				(address) => {
					const addr = [
						address.po_box,
						address.street_2,
						address.street,
						address.city,
						address.stateProvince,
						address.postalCode,
						address.countryRegion,
					];
					return `ADR;${address.label};POSTAL;PARCEL;DOM;PREF:${addr.join(
						";"
					)}`;
				}
			)
		);
	}
	if ($contact?.urls?.length) {
		parts.push(
			...$contact.urls.map((url) => `URL;${url.label};PREF:${url.href}`)
		);
	}

	parts.push(`REV:${new Date().toISOString()}`, "END:VCARD");
	return parts.join("\n");
});
