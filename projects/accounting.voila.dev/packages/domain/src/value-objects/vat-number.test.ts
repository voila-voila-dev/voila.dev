import { describe, expect, test } from "bun:test";
import { Either, Schema } from "effect";
import { VATNumber } from "./vat-number";

function expectSuccess(input: string, expected: string) {
	const result = Schema.decodeUnknownEither(VATNumber)(input);
	expect(Either.isRight(result)).toBe(true);
	if (Either.isRight(result)) {
		expect(result.right).toBe(expected as VATNumber);
	}
}

function expectFailure(input: string) {
	expect(Either.isLeft(Schema.decodeUnknownEither(VATNumber)(input))).toBe(
		true,
	);
}

describe("VATNumber", () => {
	describe("valid VAT numbers", () => {
		test.each([
			["DE129273398", "German VAT (9 digits)"],
			["FR40303265045", "French VAT (2+9 digits)"],
			["GB123456789", "UK VAT (9 digits)"],
			["GB123456789012", "UK VAT (12 digits)"],
			["ES12345678A", "Spanish VAT"],
			["BE0123456749", "Belgian VAT"],
			["NL123456789B01", "Dutch VAT"],
			["IT12345670017", "Italian VAT"],
			["PL5252248481", "Polish VAT (10 digits)"],
			["ATU12345678", "Austrian VAT"],
			["DK12345678", "Danish VAT"],
			["FI12345678", "Finnish VAT"],
			["SE123456789012", "Swedish VAT (12 digits)"],
			["LU12345678", "Luxembourg VAT"],
			["IE1234567FA", "Irish VAT"],
			["PT123456789", "Portuguese VAT"],
			["EL123456789", "Greek VAT"],
			["CZ12345678", "Czech VAT (8 digits)"],
			["CZ123456789", "Czech VAT (9 digits)"],
			["CZ1234567890", "Czech VAT (10 digits)"],
			["HU12345678", "Hungarian VAT"],
			["RO12", "Romanian VAT (2 digits - min)"],
			["RO1234567890", "Romanian VAT (10 digits - max)"],
			["BG123456789", "Bulgarian VAT (9 digits)"],
			["BG1234567890", "Bulgarian VAT (10 digits)"],
			["SK1234567890", "Slovak VAT"],
			["SI12345678", "Slovenian VAT"],
			["LT123456789", "Lithuanian VAT (9 digits)"],
			["LT123456789012", "Lithuanian VAT (12 digits)"],
			["LV12345678901", "Latvian VAT"],
			["EE123456789", "Estonian VAT"],
			["CY12345678A", "Cypriot VAT"],
			["MT12345678", "Maltese VAT"],
			["HR12345678901", "Croatian VAT"],
			["CHE123456789MWST", "Swiss VAT (German)"],
			["CHE123456789TVA", "Swiss VAT (French)"],
			["CHE123456789IVA", "Swiss VAT (Italian)"],
			["NO123456789MVA", "Norwegian VAT"],
		])("%s - %s", (vat) => {
			expectSuccess(vat, vat);
		});
	});

	describe("normalization", () => {
		test.each([
			["de129273398", "DE129273398", "lowercase"],
			["DE 129 273 398", "DE129273398", "spaces"],
			["DE.129.273.398", "DE129273398", "dots"],
			["DE-129-273-398", "DE129273398", "hyphens"],
			["de 129.273-398", "DE129273398", "mixed separators"],
			["fr40303265045", "FR40303265045", "lowercase French"],
			["be 0123 456 749", "BE0123456749", "Belgian with spaces"],
		])("normalizes %s to %s (%s)", (input, expected) => {
			expectSuccess(input, expected);
		});
	});

	describe("invalid VAT numbers", () => {
		test.each([
			["12DE9273398", "starts with digits"],
			["XX123456789", "unknown country code"],
			["US123456789", "non-VAT country (US)"],
			["DE12345678", "too short for Germany"],
			["DE1234567890", "too long for Germany"],
			["FR1234567890", "wrong format for France"],
			["GB12345678", "too short for UK"],
			["BE123456789", "wrong format for Belgium (no leading 0/1)"],
			["NL12345678901", "wrong format for Netherlands (no B)"],
			["IT1234567890", "too short for Italy"],
			["PL123456789", "too short for Poland"],
			["ATU1234567", "too short for Austria"],
			["ATU123456789", "too long for Austria"],
			["", "empty string"],
			["   ", "whitespace only"],
			["DE", "too short"],
			["DE1", "way too short"],
			["DEABCDEFGHI", "letters instead of digits"],
		])("rejects %s - %s", (input) => {
			expectFailure(input);
		});
	});

	describe("checksum validation", () => {
		test.each([
			["DE000000000", "German VAT with invalid checksum"],
			["IT12345678901", "Italian VAT with invalid checksum"],
			["BE0123456700", "Belgian VAT with invalid checksum"],
			["NL123456788B01", "Dutch VAT with invalid checksum"],
			["PL1234567890", "Polish VAT with invalid checksum"],
			["FR00303265045", "French VAT with invalid checksum"],
		])("rejects %s - %s", (input) => {
			expectFailure(input);
		});
	});
});
