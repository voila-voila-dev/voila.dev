import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@voila.dev/ui/components/label";
import { TimeInput } from "@voila.dev/ui/components/time-input";

const meta = {
	title: "UI/TimeInput",
	component: TimeInput,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof TimeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		return (
			<div className="flex flex-col gap-3">
				<Label htmlFor="time-input">Time</Label>
				<TimeInput id="time-input" defaultValue="10:30:00" className="w-64" />
			</div>
		);
	},
};

export const WithSeconds: Story = {
	render: () => {
		return (
			<div className="flex flex-col gap-3">
				<Label htmlFor="time-input-seconds">Time (with seconds)</Label>
				<TimeInput
					id="time-input-seconds"
					step={1}
					defaultValue="10:30:00"
					className="w-64"
				/>
			</div>
		);
	},
};
