import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@voila.dev/ui/components/button";
import { Loader, SendHorizontal, Trash } from "@voila.dev/ui/icons";

const meta = {
	title: "UI/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap gap-4">
				<Button variant="default">Default</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="secondary">Secondary</Button>
			</div>
			<div className="flex flex-wrap gap-4">
				<Button variant="destructive">Destructive</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="link">Link</Button>
			</div>
		</div>
	),
};

export const Disabled: Story = {
	render: () => (
		<div className="flex flex-wrap gap-4">
			<Button disabled>Disabled</Button>
		</div>
	),
};

export const Shape: Story = {
	render: () => (
		<div className="flex flex-wrap gap-4">
			<Button className="rounded-none">Rectangular</Button>
			<Button>Square</Button>
			<Button className="rounded-full">Rounded</Button>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-4">
				<Button size="sm">Small</Button>
				<Button size="default">Default</Button>
				<Button size="lg">Large</Button>
			</div>
			<div className="flex items-center gap-4">
				<Button size="icon-sm">
					<SendHorizontal />
				</Button>
				<Button size="icon">
					<SendHorizontal />
				</Button>
				<Button size="icon-lg">
					<SendHorizontal />
				</Button>
			</div>
		</div>
	),
};

export const WithIcons: Story = {
	render: () => (
		<div className="flex flex-wrap gap-4">
			<Button size="icon">
				<SendHorizontal />
			</Button>
			<Button>
				Send <SendHorizontal />
			</Button>
			<Button variant="destructive">
				<Trash /> Delete
			</Button>
		</div>
	),
};

export const WithLoading: Story = {
	render: () => (
		<div className="flex flex-wrap gap-4">
			<Button size="icon">
				<Loader className="animate-spin" />
			</Button>
			<Button>
				<Loader className="animate-spin" />
				Please wait
			</Button>
		</div>
	),
};

export const Group: Story = {
	render: () => (
		<div className="flex *:not-first:not-last:rounded-none *:first:rounded-r-none *:last:rounded-l-none divide-x divide-primary-foreground/20">
			<Button>Button 1</Button>
			<Button>Button 2</Button>
			<Button>Button 3</Button>
			<Button>Button 4</Button>
		</div>
	),
};
