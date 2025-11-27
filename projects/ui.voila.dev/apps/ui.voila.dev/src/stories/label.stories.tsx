import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "@voila.dev/ui/components/checkbox";
import { Label } from "@voila.dev/ui/components/label";

const meta = {
	title: "UI/Label",
	component: Label,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <Label>Label text</Label>,
};

export const WithCheckbox: Story = {
	render: () => (
		<div className="flex items-center gap-2">
			<Checkbox id="terms" defaultChecked />
			<Label htmlFor="terms">Accept terms and conditions</Label>
		</div>
	),
};

export const Disabled: Story = {
	render: () => (
		<div className="flex items-center gap-2">
			<Checkbox id="terms-disabled" disabled />
			<Label htmlFor="terms-disabled">Accept terms and conditions</Label>
		</div>
	),
};
