import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertDialog } from "@voila.dev/ui/components/alert-dialog";
import { Button } from "@voila.dev/ui/components/button";

const meta = {
	title: "UI/AlertDialog",
	component: AlertDialog.Root,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof AlertDialog.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button>Open Alert Dialog</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
					<AlertDialog.Description>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<AlertDialog.Action>Continue</AlertDialog.Action>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	),
};

export const Destructive: Story = {
	render: () => (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button variant="destructive">Delete Account</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Delete Account</AlertDialog.Title>
					<AlertDialog.Description>
						Are you sure you want to delete your account? This action cannot be
						undone and all your data will be permanently removed.
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<AlertDialog.Action variant="destructive">Delete</AlertDialog.Action>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	),
};
