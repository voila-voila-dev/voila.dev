import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "@voila.dev/ui/components/textarea";

const meta = {
	title: "UI/Textarea",
	component: Textarea,
	parameters: {
		layout: "centered",
	},
	render: (args) => <Textarea {...args} className="w-sm" />,
	argTypes: {
		placeholder: {
			control: "text",
			defaultValue: "Enter your message...",
		},
		value: {
			control: "text",
			defaultValue: "",
		},
		disabled: {
			control: "boolean",
			defaultValue: false,
		},
		required: {
			control: "boolean",
			defaultValue: false,
		},
		"aria-invalid": {
			control: "select",
			options: ["true", "false"],
		},
		rows: {
			control: "number",
			defaultValue: 4,
		},
	},
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: "Enter your message...",
	},
};

export const WithValue: Story = {
	args: {
		defaultValue:
			"This is a longer message that demonstrates how the textarea looks with content.",
	},
};

export const WithRows: Story = {
	args: {
		rows: 8,
		placeholder: "Enter a longer message...",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		value: "This textarea is disabled",
	},
};

export const Invalid: Story = {
	args: {
		"aria-invalid": "true",
		value: "This textarea has an error",
	},
};
