import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@voila.dev/ui/components/button";
import { Calendar, type DateRange } from "@voila.dev/ui/components/calendar";
import { Input } from "@voila.dev/ui/components/input";
import { Label } from "@voila.dev/ui/components/label";
import { Popover } from "@voila.dev/ui/components/popover";
import { Select } from "@voila.dev/ui/components/select";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

const meta = {
	title: "UI/Calendar",
	component: Calendar,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [date, setDate] = React.useState<Date | undefined>(
			new Date(2025, 5, 12),
		);

		return (
			<Calendar
				mode="single"
				defaultMonth={date}
				selected={date}
				onSelect={setDate}
				className="rounded-lg border shadow-sm"
			/>
		);
	},
};

export const Range: Story = {
	render: () => {
		const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
			from: new Date(2025, 5, 12),
			to: new Date(2025, 6, 15),
		});

		return (
			<Calendar
				mode="range"
				defaultMonth={dateRange?.from}
				selected={dateRange}
				onSelect={setDateRange}
				numberOfMonths={2}
				className="rounded-lg border shadow-sm"
			/>
		);
	},
};

export const MonthYearSelector: Story = {
	render: () => {
		const dropdownOptions = [
			{ label: "Month and Year", value: "dropdown" },
			{ label: "Month Only", value: "dropdown-months" },
			{ label: "Year Only", value: "dropdown-years" },
		];

		const [dropdown, setDropdown] =
			React.useState<React.ComponentProps<typeof Calendar>["captionLayout"]>(
				"dropdown",
			);
		const [date, setDate] = React.useState<Date | undefined>(
			new Date(2025, 5, 12),
		);

		return (
			<div className="flex flex-col gap-4">
				<Calendar
					mode="single"
					defaultMonth={date}
					selected={date}
					onSelect={setDate}
					captionLayout={dropdown}
					className="rounded-lg border shadow-sm"
				/>
				<div className="flex flex-col gap-3">
					<Label htmlFor="dropdown" className="px-1">
						Dropdown
					</Label>
					<Select.Root
						items={dropdownOptions}
						value={dropdown}
						onValueChange={(value) =>
							setDropdown(
								value as React.ComponentProps<typeof Calendar>["captionLayout"],
							)
						}
					>
						<Select.Trigger
							id="dropdown"
							size="sm"
							className="bg-background w-full"
						>
							<Select.Value placeholder="Dropdown" />
						</Select.Trigger>
						<Select.Content>
							{dropdownOptions.map((option) => (
								<Select.Item key={option.value} value={option.value}>
									{option.label}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>
				</div>
			</div>
		);
	},
};

export const DateOfBirthPicker: Story = {
	render: () => {
		const [open, setOpen] = React.useState(false);
		const [date, setDate] = React.useState<Date | undefined>(undefined);

		return (
			<div className="flex flex-col gap-3">
				<Label htmlFor="date" className="px-1">
					Date of birth
				</Label>
				<Popover.Root open={open} onOpenChange={setOpen}>
					<Popover.Trigger
						render={<Button variant="outline" />}
						id="date"
						className="w-48 justify-between font-normal"
					>
						{date ? date.toLocaleDateString() : "Select date"}
						<ChevronDownIcon />
					</Popover.Trigger>
					<Popover.Positioner align="start">
						<Popover.Content className="w-auto overflow-hidden p-0">
							<Calendar
								mode="single"
								selected={date}
								captionLayout="dropdown"
								onSelect={(date) => {
									setDate(date);
									setOpen(false);
								}}
							/>
						</Popover.Content>
					</Popover.Positioner>
				</Popover.Root>
			</div>
		);
	},
};

export const DateAndTimePicker: Story = {
	render: () => {
		const [open, setOpen] = React.useState(false);
		const [date, setDate] = React.useState<Date | undefined>(undefined);

		return (
			<div className="flex gap-4">
				<div className="flex flex-col gap-3">
					<Label htmlFor="date-picker" className="px-1">
						Date
					</Label>
					<Popover.Root open={open} onOpenChange={setOpen}>
						<Popover.Trigger
							render={<Button variant="outline" />}
							id="date-picker"
							className="w-32 justify-between font-normal"
						>
							{date ? date.toLocaleDateString() : "Select date"}
							<ChevronDownIcon />
						</Popover.Trigger>
						<Popover.Positioner align="start">
							<Popover.Content className="w-auto overflow-hidden p-0">
								<Calendar
									mode="single"
									selected={date}
									captionLayout="dropdown"
									onSelect={(date) => {
										setDate(date);
										setOpen(false);
									}}
								/>
							</Popover.Content>
						</Popover.Positioner>
					</Popover.Root>
				</div>
				<div className="flex flex-col gap-3">
					<Label htmlFor="time-picker" className="px-1">
						Time
					</Label>
					<Input
						type="time"
						id="time-picker"
						step="1"
						defaultValue="10:30:00"
						className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
					/>
				</div>
			</div>
		);
	},
};
