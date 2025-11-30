"use client";

import type { ComponentProps } from "react";
import { cx } from "../index";
import { Input } from "./input";

export interface Props extends Omit<ComponentProps<typeof Input>, "type"> {}

export function TimeInput({ className, ...props }: Props) {
	return (
		<Input
			type="time"
			className={cx(
				"bg-background appearance-none",
				"[&::-webkit-calendar-picker-indicator]:hidden",
				"[&::-webkit-calendar-picker-indicator]:appearance-none",
				className,
			)}
			{...props}
		/>
	);
}
