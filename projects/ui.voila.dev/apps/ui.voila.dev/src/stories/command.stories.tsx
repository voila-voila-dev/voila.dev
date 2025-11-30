import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@voila.dev/ui/components/button";
import { Command } from "@voila.dev/ui/components/command";
import { Calendar, FileText, Inbox, Settings, User } from "@voila.dev/ui/icons";
import * as React from "react";

const meta = {
	title: "UI/Command",
	component: Command.Root,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Command.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className="w-[400px] rounded-lg border bg-background">
			<Command.Root>
				<Command.Input placeholder="Type a command or search..." />
				<Command.List>
					<Command.Empty>No results found.</Command.Empty>
					<Command.Group heading="Suggestions">
						<Command.Item>
							<Calendar />
							<span>Calendar</span>
						</Command.Item>
						<Command.Item>
							<User />
							<span>Profile</span>
						</Command.Item>
						<Command.Item>
							<Settings />
							<span>Settings</span>
						</Command.Item>
					</Command.Group>
					<Command.Separator />
					<Command.Group heading="Recent">
						<Command.Item>
							<FileText />
							<span>Documents</span>
						</Command.Item>
						<Command.Item>
							<Inbox />
							<span>Inbox</span>
						</Command.Item>
					</Command.Group>
				</Command.List>
			</Command.Root>
		</div>
	),
};

export const WithShortcuts: Story = {
	render: () => (
		<div className="w-[400px] rounded-lg border bg-background">
			<Command.Root>
				<Command.Input placeholder="Type a command or search..." />
				<Command.List>
					<Command.Empty>No results found.</Command.Empty>
					<Command.Group heading="Suggestions">
						<Command.Item>
							<Calendar />
							<span>Calendar</span>
							<Command.Shortcut>⌘C</Command.Shortcut>
						</Command.Item>
						<Command.Item>
							<User />
							<span>Profile</span>
							<Command.Shortcut>⌘P</Command.Shortcut>
						</Command.Item>
						<Command.Item>
							<Settings />
							<span>Settings</span>
							<Command.Shortcut>⌘S</Command.Shortcut>
						</Command.Item>
					</Command.Group>
				</Command.List>
			</Command.Root>
		</div>
	),
};

export const InDialog: Story = {
	render: () => {
		const [open, setOpen] = React.useState(false);

		return (
			<>
				<Button onClick={() => setOpen(true)}>Open Command Palette</Button>
				<Command.Dialog open={open} onOpenChange={setOpen}>
					<Command.Input placeholder="Type a command or search..." />
					<Command.List>
						<Command.Empty>No results found.</Command.Empty>
						<Command.Group heading="Suggestions">
							<Command.Item>
								<Calendar />
								<span>Calendar</span>
								<Command.Shortcut>⌘C</Command.Shortcut>
							</Command.Item>
							<Command.Item>
								<User />
								<span>Profile</span>
								<Command.Shortcut>⌘P</Command.Shortcut>
							</Command.Item>
							<Command.Item>
								<Settings />
								<span>Settings</span>
								<Command.Shortcut>⌘S</Command.Shortcut>
							</Command.Item>
						</Command.Group>
						<Command.Separator />
						<Command.Group heading="Recent">
							<Command.Item>
								<FileText />
								<span>Documents</span>
							</Command.Item>
							<Command.Item>
								<Inbox />
								<span>Inbox</span>
							</Command.Item>
						</Command.Group>
					</Command.List>
				</Command.Dialog>
			</>
		);
	},
};
