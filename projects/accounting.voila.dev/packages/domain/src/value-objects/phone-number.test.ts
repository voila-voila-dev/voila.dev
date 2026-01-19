import { describe, expect, test } from "bun:test";
import { Either, Schema } from "effect";
import { PhoneNumber } from "./phone-number";

function expectSuccess(input: string, expected: string) {
	const result = Schema.decodeUnknownEither(PhoneNumber)(input);
	expect(Either.isRight(result)).toBe(true);
	if (Either.isRight(result)) {
		expect(result.right).toBe(expected as PhoneNumber);
	}
}

function expectFailure(input: string) {
	expect(Either.isLeft(Schema.decodeUnknownEither(PhoneNumber)(input))).toBe(
		true,
	);
}

describe("PhoneNumber", () => {
	describe("valid phone numbers by country", () => {
		describe("North America (NANP)", () => {
			test.each([
				["+14155551234", "US number"],
				["+12025551234", "US Washington DC"],
				["+14165551234", "Canada Toronto"],
				["+18095551234", "Dominican Republic"],
			])("%s - %s", (phone) => {
				expectSuccess(phone, phone);
			});
		});

		describe("Europe", () => {
			test.each([
				["+33612345678", "France mobile (9 digits)"],
				["+442071234567", "UK London (10 digits)"],
				["+4915123456789", "Germany mobile (11 digits)"],
				["+491512345678", "Germany mobile (10 digits)"],
				["+34612345678", "Spain mobile (9 digits)"],
				["+31612345678", "Netherlands (9 digits)"],
				["+3261234567", "Belgium (8 digits)"],
				["+32612345678", "Belgium (9 digits)"],
				["+41791234567", "Switzerland (9 digits)"],
				["+4745123456", "Norway (8 digits)"],
				["+4512345678", "Denmark (8 digits)"],
				["+46701234567", "Sweden (9 digits)"],
				["+48123456789", "Poland (9 digits)"],
				["+393123456789", "Italy (10 digits)"],
			])("%s - %s", (phone) => {
				expectSuccess(phone, phone);
			});
		});

		describe("Eastern Europe", () => {
			test.each([
				["+351912345678", "Portugal (9 digits)"],
				["+353871234567", "Ireland (9 digits)"],
				["+35412345678", "Iceland (8 digits)"],
				["+355912345678", "Albania (9 digits)"],
				["+37061234567", "Lithuania (8 digits)"],
				["+37112345678", "Latvia (8 digits)"],
				["+3725123456", "Estonia (7 digits)"],
				["+37212345678", "Estonia (8 digits)"],
				["+380501234567", "Ukraine (9 digits)"],
				["+38112345678", "Serbia (8 digits)"],
				["+385912345678", "Croatia (9 digits)"],
			])("%s - %s", (phone) => {
				expectSuccess(phone, phone);
			});
		});

		describe("Russia & CIS", () => {
			test.each([
				["+79161234567", "Russia mobile (10 digits)"],
				["+77012345678", "Kazakhstan (10 digits)"],
			])("%s - %s", (phone) => {
				expectSuccess(phone, phone);
			});
		});

		describe("Middle East", () => {
			test.each([
				["+905321234567", "Turkey mobile (10 digits)"],
				["+971501234567", "UAE mobile (9 digits)"],
				["+972541234567", "Israel mobile (9 digits)"],
				["+966123456789", "Saudi Arabia (9 digits)"],
				["+96512345678", "Kuwait (8 digits)"],
				["+97412345678", "Qatar (8 digits)"],
				["+989123456789", "Iran (10 digits)"],
			])("%s - %s", (phone) => {
				expectSuccess(phone, phone);
			});
		});

		describe("Asia", () => {
			test.each([
				["+813123456789", "Japan (10 digits)"],
				["+8613012345678", "China mobile (11 digits)"],
				["+85212345678", "Hong Kong (8 digits)"],
				["+886912345678", "Taiwan (9 digits)"],
				["+821012345678", "South Korea (9 digits)"],
				["+82101234567", "South Korea (10 digits)"],
				["+6591234567", "Singapore (8 digits)"],
				["+66812345678", "Thailand (9 digits)"],
				["+84912345678", "Vietnam (9 digits)"],
				["+60123456789", "Malaysia (9 digits)"],
				["+61412345678", "Australia (9 digits)"],
				["+6421234567", "New Zealand (8 digits)"],
				["+6281234567890", "Indonesia (10 digits)"],
				["+639123456789", "Philippines (10 digits)"],
				["+919123456789", "India (10 digits)"],
			])("%s - %s", (phone) => {
				expectSuccess(phone, phone);
			});
		});

		describe("Africa", () => {
			test.each([
				["+27821234567", "South Africa (9 digits)"],
				["+2348012345678", "Nigeria (10 digits)"],
				["+254712345678", "Kenya (9 digits)"],
				["+212612345678", "Morocco (9 digits)"],
				["+201012345678", "Egypt (10 digits)"],
				["+233241234567", "Ghana (9 digits)"],
				["+21612345678", "Tunisia (8 digits)"],
			])("%s - %s", (phone) => {
				expectSuccess(phone, phone);
			});
		});

		describe("South America", () => {
			test.each([
				["+5511912345678", "Brazil mobile (11 digits)"],
				["+551112345678", "Brazil landline (10 digits)"],
				["+541112345678", "Argentina (10 digits)"],
				["+56912345678", "Chile (9 digits)"],
				["+573001234567", "Colombia (10 digits)"],
				["+51912345678", "Peru (9 digits)"],
				["+521234567890", "Mexico (10 digits)"],
				["+584121234567", "Venezuela (10 digits)"],
			])("%s - %s", (phone) => {
				expectSuccess(phone, phone);
			});
		});

		describe("Central America & Caribbean", () => {
			test.each([
				["+50212345678", "Guatemala (8 digits)"],
				["+50612345678", "Costa Rica (8 digits)"],
				["+50712345678", "Panama (8 digits)"],
				["+50912345678", "Haiti (8 digits)"],
				["+5011234567", "Belize (7 digits)"],
			])("%s - %s", (phone) => {
				expectSuccess(phone, phone);
			});
		});

		describe("Pacific", () => {
			test.each([
				["+6791234567", "Fiji (7 digits)"],
				["+67512345678", "Papua New Guinea (8 digits)"],
				["+6761234567", "Tonga (7 digits)"],
				["+6851234567", "Samoa (7 digits)"],
			])("%s - %s", (phone) => {
				expectSuccess(phone, phone);
			});
		});
	});

	describe("normalization", () => {
		test.each([
			["+33 6 12 34 56 78", "+33612345678", "French with spaces"],
			["+1 415 555 1234", "+14155551234", "US format with spaces"],
			["+44 20 7123 4567", "+442071234567", "UK format with spaces"],
			["+49 151 2345 6789", "+4915123456789", "German with spaces"],
			["+86 130 1234 5678", "+8613012345678", "Chinese with spaces"],
		])("normalizes %s to %s (%s)", (input, expected) => {
			expectSuccess(input, expected);
		});
	});

	describe("invalid phone numbers", () => {
		describe("format errors", () => {
			test.each([
				["33612345678", "missing + prefix"],
				["0033612345678", "00 prefix instead of +"],
				["+33-6-12-34-56-78", "hyphens"],
				["+33.6.12.34.56.78", "dots"],
				["+33(6)12345678", "parentheses"],
				["+33 6 12 34 56 78 ext 123", "extension"],
				["+33ABC12345678", "letters in number"],
				["", "empty string"],
				["   ", "whitespace only"],
				["+", "only plus sign"],
				["++33612345678", "double plus"],
				["phone: +33612345678", "text before number"],
			])("rejects %s - %s", (input) => {
				expectFailure(input);
			});
		});

		describe("unsupported country codes", () => {
			test.each([
				["+99912345678", "invalid country code 999"],
				["+0123456789", "country code starting with 0"],
			])("rejects %s - %s", (input) => {
				expectFailure(input);
			});
		});

		describe("wrong length for country", () => {
			test.each([
				["+3361234567", "France too short (8 digits, needs 9)"],
				["+336123456789", "France too long (10 digits, needs 9)"],
				["+1415555123", "US too short (9 digits, needs 10)"],
				["+141555512345", "US too long (11 digits, needs 10)"],
				["+44207123456", "UK too short (9 digits, needs 10)"],
				["+4420712345678", "UK too long (11 digits, needs 10)"],
				["+861301234567", "China too short (10 digits, needs 11)"],
				["+86130123456789", "China too long (12 digits, needs 11)"],
				["+491512345", "Germany too short (7 digits, needs 10-11)"],
				["+49151234567890", "Germany too long (12 digits, needs 10-11)"],
				["+4745123", "Norway too short (5 digits, needs 8)"],
				["+47451234567", "Norway too long (9 digits, needs 8)"],
			])("rejects %s - %s", (input) => {
				expectFailure(input);
			});
		});
	});
});
