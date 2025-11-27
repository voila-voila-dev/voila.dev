import type { Meta, StoryObj } from "@storybook/react-vite";
import { Meter } from "@voila.dev/ui/components/meter";

const meta = {
	title: "UI/Meter",
	component: Meter.Root,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Meter.Root>;

export default meta;
type Story = StoryObj<typeof Meter.Root>;

export const Default: Story = {
	render: () => (
		<Meter.Root value={24} className="w-64">
			<Meter.Track>
				<Meter.Indicator />
			</Meter.Track>
		</Meter.Root>
	),
};

export const WithLabelAndValue: Story = {
	render: () => (
		<Meter.Root value={24} className="grid w-64 grid-cols-2 gap-y-2 text-sm">
			<Meter.Label className="font-medium">Storage Used</Meter.Label>
			<Meter.Value className="text-right" />
			<Meter.Track className="col-span-2">
				<Meter.Indicator />
			</Meter.Track>
		</Meter.Root>
	),
};

export const Empty: Story = {
	render: () => (
		<Meter.Root value={0} className="w-64">
			<Meter.Track>
				<Meter.Indicator />
			</Meter.Track>
		</Meter.Root>
	),
};

export const Half: Story = {
	render: () => (
		<Meter.Root value={50} className="w-64">
			<Meter.Track>
				<Meter.Indicator />
			</Meter.Track>
		</Meter.Root>
	),
};

export const Full: Story = {
	render: () => (
		<Meter.Root value={100} className="w-64">
			<Meter.Track>
				<Meter.Indicator />
			</Meter.Track>
		</Meter.Root>
	),
};
