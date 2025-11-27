import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputGroup } from "@voila.dev/ui/components/input-group";
import { Eye, Search } from "@voila.dev/ui/icons";

const meta = {
	title: "UI/InputGroup",
	component: InputGroup.Root,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof InputGroup.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<InputGroup.Root>
			<InputGroup.Input placeholder="Enter text..." />
		</InputGroup.Root>
	),
};

export const WithAddonStart: Story = {
	render: () => (
		<InputGroup.Root>
			<InputGroup.Addon>
				<Search />
			</InputGroup.Addon>
			<InputGroup.Input placeholder="Search..." />
		</InputGroup.Root>
	),
};

export const WithAddonEnd: Story = {
	render: () => (
		<InputGroup.Root>
			<InputGroup.Input placeholder="Password" type="password" />
			<InputGroup.Addon align="inline-end">
				<InputGroup.Button aria-label="Toggle password visibility">
					<Eye />
				</InputGroup.Button>
			</InputGroup.Addon>
		</InputGroup.Root>
	),
};

export const WithText: Story = {
	render: () => (
		<InputGroup.Root>
			<InputGroup.Addon>
				<InputGroup.Text>https://</InputGroup.Text>
			</InputGroup.Addon>
			<InputGroup.Input placeholder="example.com" />
		</InputGroup.Root>
	),
};

export const WithTextarea: Story = {
	render: () => (
		<InputGroup.Root>
			<InputGroup.Addon align="block-start">
				<InputGroup.Text>Description</InputGroup.Text>
			</InputGroup.Addon>
			<InputGroup.Textarea placeholder="Enter description..." />
		</InputGroup.Root>
	),
};

export const Invalid: Story = {
	render: () => (
		<InputGroup.Root>
			<InputGroup.Addon>
				<Search />
			</InputGroup.Addon>
			<InputGroup.Input
				placeholder="Search..."
				aria-invalid="true"
				defaultValue="Invalid value"
			/>
		</InputGroup.Root>
	),
};

export const Disabled: Story = {
	render: () => (
		<InputGroup.Root data-disabled="true">
			<InputGroup.Addon>
				<Search />
			</InputGroup.Addon>
			<InputGroup.Input placeholder="Search..." disabled />
		</InputGroup.Root>
	),
};
