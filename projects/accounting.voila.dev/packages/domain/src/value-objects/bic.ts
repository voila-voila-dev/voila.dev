import { Schema } from "effect";

export const BIC = Schema.String.pipe(
	Schema.minLength(8),
	Schema.maxLength(11),
	Schema.pattern(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/),
	Schema.brand("BIC"),
);

export type BIC = typeof BIC.Type;
