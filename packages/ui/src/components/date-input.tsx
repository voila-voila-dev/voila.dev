"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { cx } from "../index";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover } from "./popover";

export interface DateInputProps
	extends Omit<React.ComponentProps<"button">, "onChange" | "value"> {
	value?: Date;
	onChange?: (date: Date | undefined) => void;
	placeholder?: string;
	dateFormat?: (date: Date) => string;
	calendarProps?: Omit<
		React.ComponentProps<typeof Calendar>,
		"mode" | "selected" | "onSelect"
	>;
	className?: string;
}

export function DateInput({
	value,
	onChange,
	placeholder = "Select date",
	dateFormat = (date) => date.toLocaleDateString(),
	calendarProps,
	className,
	...props
}: DateInputProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover.Root open={open} onOpenChange={setOpen}>
			<Popover.Trigger
				render={<Button variant="outline" />}
				className={cx("w-full justify-between font-normal", className)}
				{...props}
			>
				{value ? dateFormat(value) : placeholder}
				<ChevronDownIcon />
			</Popover.Trigger>
			<Popover.Positioner align="start">
				<Popover.Content className="w-auto overflow-hidden p-0">
					<Calendar
						{...calendarProps}
						mode="single"
						selected={value}
						captionLayout="dropdown"
						onSelect={(date) => {
							onChange?.(date);
							setOpen(false);
						}}
					/>
				</Popover.Content>
			</Popover.Positioner>
		</Popover.Root>
	);
}
