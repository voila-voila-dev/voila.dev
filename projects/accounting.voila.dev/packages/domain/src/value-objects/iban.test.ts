import { describe, expect, test } from "bun:test";
import { Either, Schema } from "effect";
import { IBAN } from "./iban";

function expectSuccess(input: string, expected: string) {
	const result = Schema.decodeUnknownEither(IBAN)(input);
	expect(Either.isRight(result)).toBe(true);
	if (Either.isRight(result)) {
		expect(result.right).toBe(expected as IBAN);
	}
}

function expectFailure(input: string) {
	expect(Either.isLeft(Schema.decodeUnknownEither(IBAN)(input))).toBe(true);
}

describe("IBAN", () => {
	describe("valid IBANs", () => {
		test.each([
			["DE89370400440532013000", "German IBAN (22 chars)"],
			["FR7630006000011234567890189", "French IBAN (27 chars)"],
			["GB82WEST12345698765432", "UK IBAN (22 chars)"],
			["ES9121000418450200051332", "Spanish IBAN (24 chars)"],
			["BE68539007547034", "Belgian IBAN (16 chars)"],
			["NO9386011117947", "Norwegian IBAN (15 chars - shortest)"],
			["MT84MALT011000012345MTLCAST001S", "Maltese IBAN (31 chars)"],
			["CH9300762011623852957", "Swiss IBAN (21 chars)"],
			["NL91ABNA0417164300", "Dutch IBAN (18 chars)"],
			["IT60X0542811101000000123456", "Italian IBAN (27 chars)"],
		])("%s - %s", (iban) => {
			expectSuccess(iban, iban);
		});
	});

	describe("normalization", () => {
		test.each([
			["de89370400440532013000", "DE89370400440532013000", "lowercase"],
			["DE89 3704 0044 0532 0130 00", "DE89370400440532013000", "spaces"],
			["de89 3704 0044 0532 0130 00", "DE89370400440532013000", "mixed"],
		])("normalizes %s to %s (%s)", (input, expected) => {
			expectSuccess(input, expected);
		});
	});

	describe("invalid IBANs", () => {
		test.each([
			["DE89-3704-0044-0532-0130-00", "special characters (hyphens)"],
			["DE89_370400440532013000", "underscores"],
			["1234567890123456", "starts with digits"],
			["12DE370400440532013000", "digits in country code position"],
			["DEAB370400440532013000", "letters in check digit position"],
			["XX89370400440532013000", "unknown country code"],
			["US89370400440532013000", "non-IBAN country (US)"],
			["DE8937040044053201300", "too short for country"],
			["DE893704004405320130001", "too long for country"],
			["FR76300060000112345678901", "wrong length for France"],
			["DE00370400440532013000", "invalid check digits (00)"],
			["DE89370400440532013001", "transposed digit"],
			["DE12370400440532013000", "wrong check digits"],
			["", "empty string"],
			["   ", "whitespace only"],
			["DE89", "too short"],
		])("rejects %s - %s", (input) => {
			expectFailure(input);
		});
	});
});
