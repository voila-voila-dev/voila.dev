import { describe, expect, test } from "bun:test";
import { Either, Schema } from "effect";
import { extractNIC, extractSIREN, SIRET } from "./siret";

function expectSuccess(input: string, expected: string) {
	const result = Schema.decodeUnknownEither(SIRET)(input);
	expect(Either.isRight(result)).toBe(true);
	if (Either.isRight(result)) {
		expect(result.right).toBe(expected as SIRET);
	}
}

function expectFailure(input: string) {
	expect(Either.isLeft(Schema.decodeUnknownEither(SIRET)(input))).toBe(true);
}

describe("SIRET", () => {
	describe("valid SIRETs", () => {
		test.each([
			["44306184100047", "LVMH headquarters"],
			["55203253400000", "Total Energies headquarters"],
			["54205118000066", "BNP Paribas headquarters"],
			["57201524600000", "Renault headquarters"],
			["54210765101969", "Société Générale headquarters"],
		])("%s - %s", (siret) => {
			expectSuccess(siret, siret);
		});
	});

	describe("normalization", () => {
		test.each([
			["443 061 841 00047", "44306184100047", "spaces"],
			["443  061  841  00047", "44306184100047", "multiple spaces"],
			["443 061 841 00047 ", "44306184100047", "trailing space"],
		])("normalizes %s to %s (%s)", (input, expected) => {
			expectSuccess(input, expected);
		});
	});

	describe("invalid SIRETs", () => {
		test.each([
			["4430618410004A", "contains letter"],
			["443-061-841-00047", "contains hyphens"],
			["443_061_841_00047", "contains underscores"],
			["4430618410004", "too short (13 digits)"],
			["443061841000470", "too long (15 digits)"],
			["44306184100048", "invalid checksum"],
			["12345678901234", "invalid checksum (sequential)"],
			["", "empty string"],
			["              ", "whitespace only"],
		])("rejects %s - %s", (input) => {
			expectFailure(input);
		});
	});

	describe("extractSIREN", () => {
		test("extracts SIREN from SIRET", () => {
			const result = Schema.decodeUnknownEither(SIRET)("44306184100047");
			expect(Either.isRight(result)).toBe(true);
			if (Either.isRight(result)) {
				expect(extractSIREN(result.right)).toBe("443061841");
			}
		});
	});

	describe("extractNIC", () => {
		test("extracts NIC from SIRET", () => {
			const result = Schema.decodeUnknownEither(SIRET)("44306184100047");
			expect(Either.isRight(result)).toBe(true);
			if (Either.isRight(result)) {
				expect(extractNIC(result.right)).toBe("00047");
			}
		});
	});
});
