import { Schema } from "effect";

const SIREN_LENGTH = 9;

function normalize(value: string) {
	return value.replace(/\s/g, "");
}

function isNumeric(value: string) {
	return /^[0-9]+$/.test(value);
}

function hasValidLength(value: string) {
	return value.length === SIREN_LENGTH;
}

/**
 * Validates SIREN checksum using Luhn algorithm
 * The sum of all digits (with every second digit from the right doubled) must be divisible by 10
 */
function hasValidChecksum(siren: string) {
	let sum = 0;

	for (let i = 0; i < siren.length; i++) {
		let digit = parseInt(siren[i], 10);

		// Double every second digit (positions 1, 3, 5, 7 - 0-indexed)
		if (i % 2 === 1) {
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

export const SIREN = Schema.String.pipe(
	Schema.transform(Schema.String, {
		strict: true,
		decode: normalize,
		encode: (value) => value,
	}),
	Schema.filter(isNumeric, {
		message: () => "SIREN must contain only digits",
	}),
	Schema.filter(hasValidLength, {
		message: (issue) =>
			`SIREN must be ${SIREN_LENGTH} digits, got ${(issue.actual as string).length}`,
	}),
	Schema.filter(hasValidChecksum, {
		message: () => "Invalid SIREN checksum",
	}),
	Schema.brand("SIREN"),
);

export type SIREN = typeof SIREN.Type;
