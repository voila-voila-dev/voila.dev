import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateInput } from "@voila.dev/ui/components/date-input";
import { Label } from "@voila.dev/ui/components/label";
import * as React from "react";

const meta = {
	title: "UI/DateInput",
	component: DateInput,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		return (
			<div className="flex flex-col gap-3">
				<Label htmlFor="date-input">Date</Label>
				<DateInput id="date-input" placeholder="Select date" />
			</div>
		);
	},
};

export const WithInitialValue: Story = {
	render: () => {
		const [date, setDate] = React.useState<Date | undefined>(
			new Date(2025, 5, 12),
		);

		return (
			<div className="flex flex-col gap-3">
				<Label htmlFor="date-input-initial">Date</Label>
				<DateInput
					id="date-input-initial"
					value={date}
					onChange={setDate}
					placeholder="Select date"
				/>
			</div>
		);
	},
};

export const CustomFormat: Story = {
	render: () => {
		const [date, setDate] = React.useState<Date | undefined>(undefined);

		return (
			<div className="flex flex-col gap-3">
				<Label htmlFor="date-input-custom">Date</Label>
				<DateInput
					id="date-input-custom"
					value={date}
					onChange={setDate}
					placeholder="Select date"
					dateFormat={(date) =>
						date.toLocaleDateString("en-US", {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})
					}
				/>
			</div>
		);
	},
};

export const WithCalendarProps: Story = {
	render: () => {
		const [date, setDate] = React.useState<Date | undefined>(undefined);

		return (
			<div className="flex flex-col gap-3">
				<Label htmlFor="date-input-calendar">Date</Label>
				<DateInput
					id="date-input-calendar"
					value={date}
					onChange={setDate}
					placeholder="Select date"
					calendarProps={{
						disabled: [
							{ before: new Date() },
							{ after: new Date(2025, 11, 31) },
						],
					}}
				/>
			</div>
		);
	},
};
