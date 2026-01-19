import { Schema } from "effect";

/**
 * VAT number country specifications: country code -> regex pattern
 * Based on EU VAT number formats and common international formats
 */
const VAT_COUNTRY_PATTERNS: Record<string, RegExp> = {
	AT: /^ATU\d{8}$/, // Austria
	BE: /^BE[01]\d{9}$/, // Belgium
	BG: /^BG\d{9,10}$/, // Bulgaria
	CY: /^CY\d{8}[A-Z]$/, // Cyprus
	CZ: /^CZ\d{8,10}$/, // Czech Republic
	DE: /^DE\d{9}$/, // Germany
	DK: /^DK\d{8}$/, // Denmark
	EE: /^EE\d{9}$/, // Estonia
	EL: /^EL\d{9}$/, // Greece
	ES: /^ES[A-Z0-9]\d{7}[A-Z0-9]$/, // Spain
	FI: /^FI\d{8}$/, // Finland
	FR: /^FR[A-Z0-9]{2}\d{9}$/, // France
	GB: /^GB(\d{9}|\d{12}|GD\d{3}|HA\d{3})$/, // United Kingdom
	HR: /^HR\d{11}$/, // Croatia
	HU: /^HU\d{8}$/, // Hungary
	IE: /^IE(\d{7}[A-Z]{1,2}|\d[A-Z+*]\d{5}[A-Z])$/, // Ireland
	IT: /^IT\d{11}$/, // Italy
	LT: /^LT(\d{9}|\d{12})$/, // Lithuania
	LU: /^LU\d{8}$/, // Luxembourg
	LV: /^LV\d{11}$/, // Latvia
	MT: /^MT\d{8}$/, // Malta
	NL: /^NL\d{9}B\d{2}$/, // Netherlands
	PL: /^PL\d{10}$/, // Poland
	PT: /^PT\d{9}$/, // Portugal
	RO: /^RO\d{2,10}$/, // Romania
	SE: /^SE\d{12}$/, // Sweden
	SI: /^SI\d{8}$/, // Slovenia
	SK: /^SK\d{10}$/, // Slovakia
	CH: /^CHE\d{9}(MWST|TVA|IVA)$/, // Switzerland
	NO: /^NO\d{9}MVA$/, // Norway
};

function normalize(value: string) {
	return value.replace(/[\s.-]/g, "").toUpperCase();
}

function hasValidPrefix(value: string) {
	return /^[A-Z]{2}/.test(value);
}

function getCountryCode(value: string) {
	return value.slice(0, 2);
}

function isSupportedCountry(value: string) {
	return VAT_COUNTRY_PATTERNS[getCountryCode(value)] !== undefined;
}

function matchesCountryPattern(value: string) {
	const pattern = VAT_COUNTRY_PATTERNS[getCountryCode(value)];
	return pattern.test(value);
}

/**
 * Validates German VAT number checksum
 */
function validateGermanChecksum(vatNumber: string) {
	const digits = vatNumber.slice(2).split("").map(Number);
	const checkDigit = digits.pop()!;

	let product = 10;
	for (const digit of digits) {
		let sum = (digit + product) % 10;
		if (sum === 0) sum = 10;
		product = (2 * sum) % 11;
	}

	const calculated = 11 - product;
	return calculated === 10 ? checkDigit === 0 : checkDigit === calculated;
}

/**
 * Validates French VAT number checksum (SIREN-based)
 */
function validateFrenchChecksum(vatNumber: string) {
	const keyPart = vatNumber.slice(2, 4);
	const siren = vatNumber.slice(4);

	// If key contains letters, skip checksum validation (valid format but complex algorithm)
	if (/[A-Z]/.test(keyPart)) {
		return true;
	}

	const key = parseInt(keyPart, 10);
	const sirenNum = parseInt(siren, 10);
	const calculated = (12 + 3 * (sirenNum % 97)) % 97;

	return key === calculated;
}

/**
 * Validates Italian VAT number checksum (Luhn-like algorithm)
 */
function validateItalianChecksum(vatNumber: string) {
	const digits = vatNumber.slice(2).split("").map(Number);
	const checkDigit = digits.pop()!;

	let sum = 0;
	for (let i = 0; i < digits.length; i++) {
		if (i % 2 === 0) {
			sum += digits[i];
		} else {
			const doubled = digits[i] * 2;
			sum += doubled > 9 ? doubled - 9 : doubled;
		}
	}

	const calculated = (10 - (sum % 10)) % 10;
	return checkDigit === calculated;
}

/**
 * Validates Belgian VAT number checksum
 */
function validateBelgianChecksum(vatNumber: string) {
	const number = vatNumber.slice(2, 10);
	const checkDigits = parseInt(vatNumber.slice(10), 10);
	const calculated = 97 - (parseInt(number, 10) % 97);

	return checkDigits === calculated;
}

/**
 * Validates Dutch VAT number checksum
 */
function validateDutchChecksum(vatNumber: string) {
	const digits = vatNumber.slice(2, 11).split("").map(Number);
	const weights = [9, 8, 7, 6, 5, 4, 3, 2, 1];

	let sum = 0;
	for (let i = 0; i < 9; i++) {
		sum += digits[i] * weights[i];
	}

	return sum % 11 === 0;
}

/**
 * Validates Polish VAT number checksum
 */
function validatePolishChecksum(vatNumber: string) {
	const digits = vatNumber.slice(2).split("").map(Number);
	const checkDigit = digits.pop()!;
	const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];

	let sum = 0;
	for (let i = 0; i < 9; i++) {
		sum += digits[i] * weights[i];
	}

	const calculated = sum % 11;
	return calculated === 10 ? false : checkDigit === calculated;
}

/**
 * Validates VAT number checksum based on country
 */
function hasValidChecksum(vatNumber: string) {
	const countryCode = getCountryCode(vatNumber);

	switch (countryCode) {
		case "DE":
			return validateGermanChecksum(vatNumber);
		case "FR":
			return validateFrenchChecksum(vatNumber);
		case "IT":
			return validateItalianChecksum(vatNumber);
		case "BE":
			return validateBelgianChecksum(vatNumber);
		case "NL":
			return validateDutchChecksum(vatNumber);
		case "PL":
			return validatePolishChecksum(vatNumber);
		default:
			// For countries without implemented checksum validation, accept if format is valid
			return true;
	}
}

export const VATNumber = Schema.String.pipe(
	Schema.transform(Schema.String, {
		strict: true,
		decode: normalize,
		encode: (value) => value,
	}),
	Schema.filter(hasValidPrefix, {
		message: () => "VAT number must start with a 2-letter country code",
	}),
	Schema.filter(isSupportedCountry, {
		message: (issue) =>
			`Invalid VAT number country code: ${getCountryCode(issue.actual as string)}`,
	}),
	Schema.filter(matchesCountryPattern, {
		message: (issue) => {
			const value = issue.actual as string;
			const countryCode = getCountryCode(value);
			return `Invalid VAT number format for ${countryCode}`;
		},
	}),
	Schema.filter(hasValidChecksum, {
		message: () => "Invalid VAT number checksum",
	}),
	Schema.brand("VATNumber"),
);

export type VATNumber = typeof VATNumber.Type;

/**
 * List of supported VAT number country codes
 */
export const SUPPORTED_VAT_COUNTRIES = Object.keys(
	VAT_COUNTRY_PATTERNS,
) as (keyof typeof VAT_COUNTRY_PATTERNS)[];
