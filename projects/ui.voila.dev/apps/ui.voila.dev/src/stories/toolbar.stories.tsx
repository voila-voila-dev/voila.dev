import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "@voila.dev/ui/components/select";
import { Toggle } from "@voila.dev/ui/components/toggle";
import { ToggleGroup } from "@voila.dev/ui/components/toggle-group";
import { Toolbar } from "@voila.dev/ui/components/toolbar";
import {
	Bold,
	DollarSign,
	Italic,
	Link,
	Percent,
	TextAlignCenter,
	TextAlignEnd,
	TextAlignStart,
	Underline,
} from "@voila.dev/ui/icons";

const meta = {
	title: "UI/Toolbar",
	component: Toolbar.Root,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Toolbar.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Toolbar.Root>
			<Toolbar.Button render={<Toggle />} value="bold" aria-label="Bold">
				<Bold />
			</Toolbar.Button>
			<Toolbar.Button render={<Toggle />} value="italic" aria-label="Italic">
				<Italic />
			</Toolbar.Button>
			<Toolbar.Button
				render={<Toggle />}
				value="underline"
				aria-label="Underline"
			>
				<Underline />
			</Toolbar.Button>
			<Toolbar.Separator />
			<Toolbar.Button aria-label="Link">
				<Link />
			</Toolbar.Button>
		</Toolbar.Root>
	),
};

export const WithGroups: Story = {
	render: () => (
		<Toolbar.Root>
			<Toolbar.Group aria-label="Text formatting">
				<Toolbar.Button render={<Toggle />} value="bold" aria-label="Bold">
					<Bold />
				</Toolbar.Button>
				<Toolbar.Button render={<Toggle />} value="italic" aria-label="Italic">
					<Italic />
				</Toolbar.Button>
				<Toolbar.Button
					render={<Toggle />}
					value="underline"
					aria-label="Underline"
				>
					<Underline />
				</Toolbar.Button>
			</Toolbar.Group>
			<Toolbar.Separator />
			<ToggleGroup.Root aria-label="Alignment">
				<Toolbar.Button
					render={<Toggle />}
					aria-label="Align left"
					value="align-left"
				>
					<TextAlignStart />
				</Toolbar.Button>
				<Toolbar.Button
					render={<Toggle />}
					aria-label="Align center"
					value="align-center"
				>
					<TextAlignCenter />
				</Toolbar.Button>
				<Toolbar.Button
					render={<Toggle />}
					aria-label="Align right"
					value="align-right"
				>
					<TextAlignEnd />
				</Toolbar.Button>
			</ToggleGroup.Root>
			<Toolbar.Separator />
			<Toolbar.Group aria-label="Numerical format">
				<Toolbar.Button aria-label="Format as currency">
					<DollarSign />
				</Toolbar.Button>
				<Toolbar.Button aria-label="Format as percent">
					<Percent />
				</Toolbar.Button>
			</Toolbar.Group>
		</Toolbar.Root>
	),
};

export const WithToggleGroup: Story = {
	render: () => (
		<Toolbar.Root>
			<Toolbar.Button render={<Toggle />} value="bold" aria-label="Bold">
				<Bold />
			</Toolbar.Button>
			<Toolbar.Button render={<Toggle />} value="italic" aria-label="Italic">
				<Italic />
			</Toolbar.Button>
			<Toolbar.Button
				render={<Toggle />}
				value="underline"
				aria-label="Underline"
			>
				<Underline />
			</Toolbar.Button>
			<Toolbar.Separator />
			<ToggleGroup.Root aria-label="Alignment">
				<Toolbar.Button
					render={<Toggle />}
					aria-label="Align left"
					value="align-left"
				>
					<TextAlignStart />
				</Toolbar.Button>
				<Toolbar.Button
					render={<Toggle />}
					aria-label="Align center"
					value="align-center"
				>
					<TextAlignCenter />
				</Toolbar.Button>
				<Toolbar.Button
					render={<Toggle />}
					aria-label="Align right"
					value="align-right"
				>
					<TextAlignEnd />
				</Toolbar.Button>
			</ToggleGroup.Root>
		</Toolbar.Root>
	),
};

export const WithSelect: Story = {
	render: () => (
		<Toolbar.Root className="w-[400px]">
			<Toolbar.Group aria-label="Text formatting">
				<Toolbar.Button aria-label="Bold">
					<Bold />
				</Toolbar.Button>
				<Toolbar.Button aria-label="Italic">
					<Italic />
				</Toolbar.Button>
			</Toolbar.Group>
			<Toolbar.Separator />
			<Select.Root defaultValue="Arial">
				<Toolbar.Button
					render={<Select.Trigger className="min-w-[120px]" />}
					aria-label="Font family"
				>
					<Select.Value />
				</Toolbar.Button>
				<Select.Content>
					<Select.Item value="Arial">Arial</Select.Item>
					<Select.Item value="Helvetica">Helvetica</Select.Item>
					<Select.Item value="Times New Roman">Times New Roman</Select.Item>
					<Select.Item value="Georgia">Georgia</Select.Item>
				</Select.Content>
			</Select.Root>
			<Toolbar.Separator />
			<Toolbar.Link href="#" className="ml-auto px-2">
				Edited 51m ago
			</Toolbar.Link>
		</Toolbar.Root>
	),
};

export const WithInput: Story = {
	render: () => (
		<Toolbar.Root className="w-[500px]">
			<Toolbar.Group aria-label="Text formatting">
				<Toolbar.Button aria-label="Bold">
					<Bold />
				</Toolbar.Button>
				<Toolbar.Button aria-label="Italic">
					<Italic />
				</Toolbar.Button>
				<Toolbar.Button aria-label="Underline">
					<Underline />
				</Toolbar.Button>
			</Toolbar.Group>
			<Toolbar.Separator />
			<Toolbar.Input placeholder="Search..." className="w-[200px]" />
		</Toolbar.Root>
	),
};

export const Vertical: Story = {
	render: () => (
		<Toolbar.Root orientation="vertical">
			<Toolbar.Button render={<Toggle />} value="bold" aria-label="Bold">
				<Bold />
			</Toolbar.Button>
			<Toolbar.Button render={<Toggle />} value="italic" aria-label="Italic">
				<Italic />
			</Toolbar.Button>
			<Toolbar.Button
				render={<Toggle />}
				value="underline"
				aria-label="Underline"
			>
				<Underline />
			</Toolbar.Button>
			<Toolbar.Separator orientation="vertical" />
			<ToggleGroup.Root aria-label="Alignment" className="flex-col gap-1">
				<Toolbar.Button
					render={<Toggle />}
					aria-label="Align left"
					value="align-left"
				>
					<TextAlignStart />
				</Toolbar.Button>
				<Toolbar.Button
					render={<Toggle />}
					aria-label="Align center"
					value="align-center"
				>
					<TextAlignCenter />
				</Toolbar.Button>
				<Toolbar.Button
					render={<Toggle />}
					aria-label="Align right"
					value="align-right"
				>
					<TextAlignEnd />
				</Toolbar.Button>
			</ToggleGroup.Root>
		</Toolbar.Root>
	),
};

export const Variants: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<Toolbar.Root variant="default">
				<Toolbar.Button aria-label="Bold">
					<Bold />
				</Toolbar.Button>
				<Toolbar.Button aria-label="Italic">
					<Italic />
				</Toolbar.Button>
				<Toolbar.Button aria-label="Underline">
					<Underline />
				</Toolbar.Button>
			</Toolbar.Root>
			<Toolbar.Root variant="ghost">
				<Toolbar.Button aria-label="Bold">
					<Bold />
				</Toolbar.Button>
				<Toolbar.Button aria-label="Italic">
					<Italic />
				</Toolbar.Button>
				<Toolbar.Button aria-label="Underline">
					<Underline />
				</Toolbar.Button>
			</Toolbar.Root>
			<Toolbar.Root variant="muted">
				<Toolbar.Button aria-label="Bold">
					<Bold />
				</Toolbar.Button>
				<Toolbar.Button aria-label="Italic">
					<Italic />
				</Toolbar.Button>
				<Toolbar.Button aria-label="Underline">
					<Underline />
				</Toolbar.Button>
			</Toolbar.Root>
		</div>
	),
};

export const ButtonVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<Toolbar.Root>
				<Toolbar.Button variant="default" aria-label="Bold">
					<Bold />
				</Toolbar.Button>
				<Toolbar.Button variant="default" aria-label="Italic">
					<Italic />
				</Toolbar.Button>
				<Toolbar.Separator />
				<Toolbar.Button variant="outline" aria-label="Underline">
					<Underline />
				</Toolbar.Button>
				<Toolbar.Button variant="outline" aria-label="Link">
					<Link />
				</Toolbar.Button>
			</Toolbar.Root>
		</div>
	),
};

export const ButtonSizes: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<Toolbar.Root>
				<Toolbar.Button size="sm" aria-label="Bold">
					<Bold />
				</Toolbar.Button>
				<Toolbar.Button size="default" aria-label="Italic">
					<Italic />
				</Toolbar.Button>
				<Toolbar.Button size="lg" aria-label="Underline">
					<Underline />
				</Toolbar.Button>
			</Toolbar.Root>
			<Toolbar.Root>
				<Toolbar.Button size="icon-sm" aria-label="Bold">
					<Bold />
				</Toolbar.Button>
				<Toolbar.Button size="icon" aria-label="Italic">
					<Italic />
				</Toolbar.Button>
				<Toolbar.Button size="icon-lg" aria-label="Underline">
					<Underline />
				</Toolbar.Button>
			</Toolbar.Root>
		</div>
	),
};

export const Disabled: Story = {
	render: () => (
		<Toolbar.Root disabled>
			<Toolbar.Button aria-label="Bold">
				<Bold />
			</Toolbar.Button>
			<Toolbar.Button aria-label="Italic">
				<Italic />
			</Toolbar.Button>
			<Toolbar.Button aria-label="Underline">
				<Underline />
			</Toolbar.Button>
		</Toolbar.Root>
	),
};
