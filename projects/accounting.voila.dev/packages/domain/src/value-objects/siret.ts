import { Schema } from "effect";

const SIRET_LENGTH = 14;
const SIREN_LENGTH = 9;

function normalize(value: string) {
	return value.replace(/\s/g, "");
}

function isNumeric(value: string) {
	return /^[0-9]+$/.test(value);
}

function hasValidLength(value: string) {
	return value.length === SIRET_LENGTH;
}

/**
 * Validates SIRET checksum using Luhn algorithm
 * The sum of all 14 digits (with every second digit from the right doubled) must be divisible by 10
 * For 14 digits (even length), this means doubling positions 0, 2, 4, 6, 8, 10, 12 (0-indexed from left)
 */
function hasValidChecksum(siret: string) {
	let sum = 0;

	for (let i = 0; i < siret.length; i++) {
		let digit = parseInt(siret[i], 10);

		// Double every second digit from the right (even positions when counting from left for 14 digits)
		if (i % 2 === 0) {
			digit *= 2;
			// If doubling results in > 9, subtract 9 (equivalent to summing digits)
			if (digit > 9) {
				digit -= 9;
			}
		}

		sum += digit;
	}

	return sum % 10 === 0;
}

function getSIREN(siret: string) {
	return siret.slice(0, SIREN_LENGTH);
}

function getNIC(siret: string) {
	return siret.slice(SIREN_LENGTH);
}

export const SIRET = Schema.String.pipe(
	Schema.transform(Schema.String, {
		strict: true,
		decode: normalize,
		encode: (value) => value,
	}),
	Schema.filter(isNumeric, {
		message: () => "SIRET must contain only digits",
	}),
	Schema.filter(hasValidLength, {
		message: (issue) =>
			`SIRET must be ${SIRET_LENGTH} digits, got ${(issue.actual as string).length}`,
	}),
	Schema.filter(hasValidChecksum, {
		message: () => "Invalid SIRET checksum",
	}),
	Schema.brand("SIRET"),
);

export type SIRET = typeof SIRET.Type;

/**
 * Extracts the SIREN (first 9 digits) from a SIRET
 */
export function extractSIREN(siret: SIRET): string {
	return getSIREN(siret);
}

/**
 * Extracts the NIC (last 5 digits) from a SIRET
 */
export function extractNIC(siret: SIRET): string {
	return getNIC(siret);
}
