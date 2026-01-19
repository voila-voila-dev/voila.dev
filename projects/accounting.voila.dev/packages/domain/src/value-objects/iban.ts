import { Schema } from "effect";

/**
 * IBAN country specifications: country code -> expected length
 * Based on IBAN registry maintained by SWIFT
 */
const IBAN_COUNTRY_LENGTHS: Record<string, number> = {
	AD: 24, // Andorra
	AE: 23, // United Arab Emirates
	AL: 28, // Albania
	AT: 20, // Austria
	AZ: 28, // Azerbaijan
	BA: 20, // Bosnia and Herzegovina
	BE: 16, // Belgium
	BG: 22, // Bulgaria
	BH: 22, // Bahrain
	BI: 27, // Burundi
	BR: 29, // Brazil
	BY: 28, // Belarus
	CH: 21, // Switzerland
	CR: 22, // Costa Rica
	CY: 28, // Cyprus
	CZ: 24, // Czech Republic
	DE: 22, // Germany
	DJ: 27, // Djibouti
	DK: 18, // Denmark
	DO: 28, // Dominican Republic
	EE: 20, // Estonia
	EG: 29, // Egypt
	ES: 24, // Spain
	FI: 18, // Finland
	FK: 18, // Falkland Islands
	FO: 18, // Faroe Islands
	FR: 27, // France
	GB: 22, // United Kingdom
	GE: 22, // Georgia
	GI: 23, // Gibraltar
	GL: 18, // Greenland
	GR: 27, // Greece
	GT: 28, // Guatemala
	HR: 21, // Croatia
	HU: 28, // Hungary
	IE: 22, // Ireland
	IL: 23, // Israel
	IQ: 23, // Iraq
	IS: 26, // Iceland
	IT: 27, // Italy
	JO: 30, // Jordan
	KW: 30, // Kuwait
	KZ: 20, // Kazakhstan
	LB: 28, // Lebanon
	LC: 32, // Saint Lucia
	LI: 21, // Liechtenstein
	LT: 20, // Lithuania
	LU: 20, // Luxembourg
	LV: 21, // Latvia
	LY: 25, // Libya
	MC: 27, // Monaco
	MD: 24, // Moldova
	ME: 22, // Montenegro
	MK: 19, // North Macedonia
	MN: 20, // Mongolia
	MR: 27, // Mauritania
	MT: 31, // Malta
	MU: 30, // Mauritius
	NI: 28, // Nicaragua
	NL: 18, // Netherlands
	NO: 15, // Norway
	PK: 24, // Pakistan
	PL: 28, // Poland
	PS: 29, // Palestine
	PT: 25, // Portugal
	QA: 29, // Qatar
	RO: 24, // Romania
	RS: 22, // Serbia
	RU: 33, // Russia
	SA: 24, // Saudi Arabia
	SC: 31, // Seychelles
	SD: 18, // Sudan
	SE: 24, // Sweden
	SI: 19, // Slovenia
	SK: 24, // Slovakia
	SM: 27, // San Marino
	SO: 23, // Somalia
	ST: 25, // São Tomé and Príncipe
	SV: 28, // El Salvador
	TL: 23, // Timor-Leste
	TN: 24, // Tunisia
	TR: 26, // Turkey
	UA: 29, // Ukraine
	VA: 22, // Vatican City
	VG: 24, // British Virgin Islands
	XK: 20, // Kosovo
};

function normalize(value: string) {
	return value.replace(/\s/g, "").toUpperCase();
}

function isAlphanumeric(value: string) {
	return /^[A-Z0-9]+$/.test(value);
}

function hasValidStructure(value: string) {
	return /^[A-Z]{2}[0-9]{2}/.test(value);
}

function getCountryCode(value: string) {
	return value.slice(0, 2);
}

function isSupportedCountry(value: string) {
	return IBAN_COUNTRY_LENGTHS[getCountryCode(value)] !== undefined;
}

function hasValidLength(value: string) {
	const expectedLength = IBAN_COUNTRY_LENGTHS[getCountryCode(value)];
	return value.length === expectedLength;
}

/**
 * Validates IBAN checksum using MOD-97 algorithm (ISO 7064)
 */
function hasValidChecksum(iban: string) {
	// Move first 4 characters to end
	const rearranged = iban.slice(4) + iban.slice(0, 4);

	// Convert letters to numbers (A=10, B=11, ..., Z=35)
	const numericString = rearranged
		.split("")
		.map((char) => {
			const code = char.charCodeAt(0);
			if (code >= 65 && code <= 90) {
				return (code - 55).toString();
			}
			return char;
		})
		.join("");

	// Calculate MOD 97 using chunked approach
	let remainder = numericString;
	while (remainder.length > 2) {
		const chunk = remainder.slice(0, 9);
		remainder = (parseInt(chunk, 10) % 97).toString() + remainder.slice(9);
	}

	return parseInt(remainder, 10) % 97 === 1;
}

export const IBAN = Schema.String.pipe(
	Schema.transform(Schema.String, {
		strict: true,
		decode: normalize,
		encode: (value) => value,
	}),
	Schema.filter(isAlphanumeric, {
		message: () => "IBAN must contain only letters and digits",
	}),
	Schema.filter(hasValidStructure, {
		message: () =>
			"IBAN must start with a 2-letter country code followed by 2 check digits",
	}),
	Schema.filter(isSupportedCountry, {
		message: (issue) =>
			`Invalid IBAN country code: ${getCountryCode(issue.actual as string)}`,
	}),
	Schema.filter(hasValidLength, {
		message: (issue) => {
			const value = issue.actual as string;
			const countryCode = getCountryCode(value);
			const expectedLength = IBAN_COUNTRY_LENGTHS[countryCode];
			return `IBAN for ${countryCode} must be ${expectedLength} characters, got ${value.length}`;
		},
	}),
	Schema.filter(hasValidChecksum, {
		message: () => "Invalid IBAN checksum",
	}),
	Schema.brand("IBAN"),
);

export type IBAN = typeof IBAN.Type;

/**
 * List of supported IBAN country codes
 */
export const SUPPORTED_IBAN_COUNTRIES = Object.keys(
	IBAN_COUNTRY_LENGTHS,
) as (keyof typeof IBAN_COUNTRY_LENGTHS)[];
