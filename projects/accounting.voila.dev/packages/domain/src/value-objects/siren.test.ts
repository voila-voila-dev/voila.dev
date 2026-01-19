import { describe, expect, test } from "bun:test";
import { Either, Schema } from "effect";
import { SIREN } from "./siren";

function expectSuccess(input: string, expected: string) {
	const result = Schema.decodeUnknownEither(SIREN)(input);
	expect(Either.isRight(result)).toBe(true);
	if (Either.isRight(result)) {
		expect(result.right).toBe(expected as SIREN);
	}
}

function expectFailure(input: string) {
	expect(Either.isLeft(Schema.decodeUnknownEither(SIREN)(input))).toBe(true);
}

describe("SIREN", () => {
	describe("valid SIRENs", () => {
		test.each([
			["443061841", "LVMH"],
			["552032534", "Total Energies"],
			["542051180", "BNP Paribas"],
			["572015246", "Renault"],
			["542107651", "Société Générale"],
		])("%s - %s", (siren) => {
			expectSuccess(siren, siren);
		});
	});

	describe("normalization", () => {
		test.each([
			["443 061 841", "443061841", "spaces"],
			["443  061  841", "443061841", "multiple spaces"],
			["443 061 841 ", "443061841", "trailing space"],
		])("normalizes %s to %s (%s)", (input, expected) => {
			expectSuccess(input, expected);
		});
	});

	describe("invalid SIRENs", () => {
		test.each([
			["44306184A", "contains letter"],
			["443-061-841", "contains hyphens"],
			["443_061_841", "contains underscores"],
			["44306184", "too short (8 digits)"],
			["4430618410", "too long (10 digits)"],
			["443061842", "invalid checksum"],
			["123456789", "invalid checksum (sequential)"],
			["", "empty string"],
			["         ", "whitespace only"],
		])("rejects %s - %s", (input) => {
			expectFailure(input);
		});
	});
});
