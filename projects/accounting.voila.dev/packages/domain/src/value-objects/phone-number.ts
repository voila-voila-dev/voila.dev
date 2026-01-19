import { Schema } from "effect";

/**
 * Phone number country specifications: calling code -> [min national digits, max national digits]
 * Based on ITU-T E.164 and national numbering plans
 */
const PHONE_COUNTRY_SPECS: Record<string, [min: number, max: number]> = {
	// North America (NANP)
	"1": [10, 10], // USA, Canada, Caribbean nations

	// Europe
	"30": [10, 10], // Greece
	"31": [9, 9], // Netherlands
	"32": [8, 9], // Belgium
	"33": [9, 9], // France
	"34": [9, 9], // Spain
	"36": [8, 9], // Hungary
	"39": [9, 11], // Italy
	"40": [9, 9], // Romania
	"41": [9, 9], // Switzerland
	"43": [10, 13], // Austria
	"44": [10, 10], // United Kingdom
	"45": [8, 8], // Denmark
	"46": [7, 13], // Sweden
	"47": [8, 8], // Norway
	"48": [9, 9], // Poland
	"49": [10, 11], // Germany

	// Eastern Europe
	"350": [8, 8], // Gibraltar
	"351": [9, 9], // Portugal
	"352": [8, 11], // Luxembourg
	"353": [9, 9], // Ireland
	"354": [7, 9], // Iceland
	"355": [9, 9], // Albania
	"356": [8, 8], // Malta
	"357": [8, 8], // Cyprus
	"358": [9, 11], // Finland
	"359": [8, 9], // Bulgaria
	"370": [8, 8], // Lithuania
	"371": [8, 8], // Latvia
	"372": [7, 8], // Estonia
	"373": [8, 8], // Moldova
	"374": [8, 8], // Armenia
	"375": [9, 9], // Belarus
	"376": [6, 9], // Andorra
	"377": [8, 9], // Monaco
	"378": [10, 10], // San Marino
	"380": [9, 9], // Ukraine
	"381": [8, 9], // Serbia
	"382": [8, 8], // Montenegro
	"383": [8, 8], // Kosovo
	"385": [8, 9], // Croatia
	"386": [8, 8], // Slovenia
	"387": [8, 8], // Bosnia and Herzegovina
	"389": [8, 8], // North Macedonia

	// Russia & CIS
	"7": [10, 10], // Russia, Kazakhstan

	// Middle East
	"90": [10, 10], // Turkey
	"91": [10, 10], // India
	"92": [10, 10], // Pakistan
	"93": [9, 9], // Afghanistan
	"94": [9, 9], // Sri Lanka
	"95": [8, 10], // Myanmar
	"98": [10, 10], // Iran
	"960": [7, 7], // Maldives
	"961": [7, 8], // Lebanon
	"962": [8, 9], // Jordan
	"963": [9, 9], // Syria
	"964": [10, 10], // Iraq
	"965": [8, 8], // Kuwait
	"966": [9, 9], // Saudi Arabia
	"967": [9, 9], // Yemen
	"968": [8, 8], // Oman
	"970": [9, 9], // Palestine
	"971": [9, 9], // United Arab Emirates
	"972": [9, 9], // Israel
	"973": [8, 8], // Bahrain
	"974": [8, 8], // Qatar

	// Asia
	"60": [9, 10], // Malaysia
	"61": [9, 9], // Australia
	"62": [9, 12], // Indonesia
	"63": [10, 10], // Philippines
	"64": [8, 10], // New Zealand
	"65": [8, 8], // Singapore
	"66": [9, 9], // Thailand
	"81": [10, 10], // Japan
	"82": [9, 10], // South Korea
	"84": [9, 10], // Vietnam
	"86": [11, 11], // China
	"852": [8, 8], // Hong Kong
	"853": [8, 8], // Macau
	"855": [8, 9], // Cambodia
	"856": [8, 10], // Laos
	"880": [10, 10], // Bangladesh
	"886": [9, 9], // Taiwan

	// Africa
	"20": [10, 10], // Egypt
	"211": [9, 9], // South Sudan
	"212": [9, 9], // Morocco
	"213": [9, 9], // Algeria
	"216": [8, 8], // Tunisia
	"218": [9, 9], // Libya
	"220": [7, 7], // Gambia
	"221": [9, 9], // Senegal
	"222": [8, 8], // Mauritania
	"223": [8, 8], // Mali
	"224": [9, 9], // Guinea
	"225": [10, 10], // Ivory Coast
	"226": [8, 8], // Burkina Faso
	"227": [8, 8], // Niger
	"228": [8, 8], // Togo
	"229": [8, 8], // Benin
	"230": [8, 8], // Mauritius
	"231": [7, 8], // Liberia
	"232": [8, 8], // Sierra Leone
	"233": [9, 9], // Ghana
	"234": [10, 10], // Nigeria
	"235": [8, 8], // Chad
	"236": [8, 8], // Central African Republic
	"237": [9, 9], // Cameroon
	"238": [7, 7], // Cape Verde
	"239": [7, 7], // São Tomé and Príncipe
	"240": [9, 9], // Equatorial Guinea
	"241": [7, 8], // Gabon
	"242": [9, 9], // Republic of the Congo
	"243": [9, 9], // Democratic Republic of the Congo
	"244": [9, 9], // Angola
	"245": [7, 7], // Guinea-Bissau
	"246": [7, 7], // Diego Garcia
	"247": [4, 4], // Ascension Island
	"248": [7, 7], // Seychelles
	"249": [9, 9], // Sudan
	"250": [9, 9], // Rwanda
	"251": [9, 9], // Ethiopia
	"252": [8, 9], // Somalia
	"253": [8, 8], // Djibouti
	"254": [9, 9], // Kenya
	"255": [9, 9], // Tanzania
	"256": [9, 9], // Uganda
	"257": [8, 8], // Burundi
	"258": [9, 9], // Mozambique
	"260": [9, 9], // Zambia
	"261": [9, 9], // Madagascar
	"262": [9, 9], // Réunion, Mayotte
	"263": [9, 9], // Zimbabwe
	"264": [9, 9], // Namibia
	"265": [9, 9], // Malawi
	"266": [8, 8], // Lesotho
	"267": [8, 8], // Botswana
	"268": [8, 8], // Eswatini
	"269": [7, 7], // Comoros
	"27": [9, 9], // South Africa
	"290": [4, 4], // Saint Helena
	"291": [7, 7], // Eritrea
	"297": [7, 7], // Aruba
	"298": [6, 6], // Faroe Islands
	"299": [6, 6], // Greenland

	// South America
	"51": [9, 9], // Peru
	"52": [10, 10], // Mexico
	"53": [8, 8], // Cuba
	"54": [10, 10], // Argentina
	"55": [10, 11], // Brazil
	"56": [9, 9], // Chile
	"57": [10, 10], // Colombia
	"58": [10, 10], // Venezuela
	"591": [8, 8], // Bolivia
	"592": [7, 7], // Guyana
	"593": [9, 9], // Ecuador
	"594": [9, 9], // French Guiana
	"595": [9, 9], // Paraguay
	"596": [9, 9], // Martinique
	"597": [7, 7], // Suriname
	"598": [8, 8], // Uruguay
	"599": [7, 8], // Curaçao, Caribbean Netherlands

	// Central America & Caribbean
	"500": [5, 5], // Falkland Islands
	"501": [7, 7], // Belize
	"502": [8, 8], // Guatemala
	"503": [8, 8], // El Salvador
	"504": [8, 8], // Honduras
	"505": [8, 8], // Nicaragua
	"506": [8, 8], // Costa Rica
	"507": [8, 8], // Panama
	"508": [6, 6], // Saint Pierre and Miquelon
	"509": [8, 8], // Haiti

	// Pacific
	"670": [7, 8], // Timor-Leste
	"672": [6, 6], // Norfolk Island
	"673": [7, 7], // Brunei
	"674": [7, 7], // Nauru
	"675": [8, 8], // Papua New Guinea
	"676": [7, 7], // Tonga
	"677": [7, 7], // Solomon Islands
	"678": [7, 7], // Vanuatu
	"679": [7, 7], // Fiji
	"680": [7, 7], // Palau
	"681": [6, 6], // Wallis and Futuna
	"682": [5, 5], // Cook Islands
	"683": [4, 4], // Niue
	"685": [7, 7], // Samoa
	"686": [8, 8], // Kiribati
	"687": [6, 6], // New Caledonia
	"688": [5, 5], // Tuvalu
	"689": [8, 8], // French Polynesia
	"690": [4, 4], // Tokelau
	"691": [7, 7], // Micronesia
	"692": [7, 7], // Marshall Islands
};

/**
 * Sorted country codes by length (longest first) for proper matching
 */
const SORTED_COUNTRY_CODES = Object.keys(PHONE_COUNTRY_SPECS).sort(
	(a, b) => b.length - a.length,
);

function normalize(value: string) {
	return value.replace(/\s/g, "");
}

function startsWithPlus(value: string) {
	return value.startsWith("+");
}

function hasOnlyDigitsAfterPlus(value: string) {
	return /^\+[0-9]+$/.test(value);
}

function getCountryCode(value: string): string | undefined {
	const digits = value.slice(1); // Remove the +
	for (const code of SORTED_COUNTRY_CODES) {
		if (digits.startsWith(code)) {
			return code;
		}
	}
	return undefined;
}

function isSupportedCountry(value: string) {
	return getCountryCode(value) !== undefined;
}

function hasValidLength(value: string) {
	const countryCode = getCountryCode(value);
	if (!countryCode) return false;

	const nationalNumber = value.slice(1 + countryCode.length);
	const [min, max] = PHONE_COUNTRY_SPECS[countryCode];

	return nationalNumber.length >= min && nationalNumber.length <= max;
}

export const PhoneNumber = Schema.String.pipe(
	Schema.transform(Schema.String, {
		strict: true,
		decode: normalize,
		encode: (value) => value,
	}),
	Schema.filter(startsWithPlus, {
		message: () => "Phone number must start with + followed by country code",
	}),
	Schema.filter(hasOnlyDigitsAfterPlus, {
		message: () =>
			"Phone number must contain only digits after the + country code prefix",
	}),
	Schema.filter(isSupportedCountry, {
		message: (issue) => {
			const value = issue.actual as string;
			const digits = value.slice(1, 4); // Show first few digits for context
			return `Unsupported country calling code: +${digits}...`;
		},
	}),
	Schema.filter(hasValidLength, {
		message: (issue) => {
			const value = issue.actual as string;
			const countryCode = getCountryCode(value);
			if (!countryCode) return "Invalid phone number";
			const nationalNumber = value.slice(1 + countryCode.length);
			const [min, max] = PHONE_COUNTRY_SPECS[countryCode];
			if (min === max) {
				return `Phone number for +${countryCode} must have ${min} digits after country code, got ${nationalNumber.length}`;
			}
			return `Phone number for +${countryCode} must have ${min}-${max} digits after country code, got ${nationalNumber.length}`;
		},
	}),
	Schema.brand("PhoneNumber"),
);

export type PhoneNumber = typeof PhoneNumber.Type;

/**
 * List of supported phone country calling codes
 */
export const SUPPORTED_PHONE_COUNTRIES = Object.keys(PHONE_COUNTRY_SPECS);
