import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@voila.dev/ui/components/button";
import { ButtonGroup } from "@voila.dev/ui/components/button-group";
import { DropdownMenu } from "@voila.dev/ui/components/dropdown-menu";
import { Input } from "@voila.dev/ui/components/input";
import { InputGroup } from "@voila.dev/ui/components/input-group";
import { Popover } from "@voila.dev/ui/components/popover";
import { Select } from "@voila.dev/ui/components/select";
import { Separator } from "@voila.dev/ui/components/separator";
import { Textarea } from "@voila.dev/ui/components/textarea";
import { Tooltip } from "@voila.dev/ui/components/tooltip";
import {
	Archive,
	ArrowLeft,
	ArrowRight,
	AudioLines,
	Bot,
	CalendarPlus,
	Check,
	ChevronDown,
	CircleArrowLeft,
	CircleArrowRight,
	CircleMinus,
	CirclePlus,
	Clock,
	Copy,
	Ellipsis,
	ListFilterPlus,
	MailCheck,
	Plus,
	Search,
	Share,
	Tag,
	Trash,
	Trash2,
	TriangleAlert,
	UserRoundX,
	VolumeOff,
} from "@voila.dev/ui/icons";
import * as React from "react";

const meta = {
	title: "UI/ButtonGroup",
	component: ButtonGroup.Root,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof ButtonGroup.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<ButtonGroup.Root>
			<Button variant="outline">Archive</Button>
			<Button variant="outline">Report</Button>
		</ButtonGroup.Root>
	),
};

export const Vertical: Story = {
	render: () => (
		<ButtonGroup.Root orientation="vertical" aria-label="Media controls">
			<Button variant="outline" size="icon">
				<CirclePlus />
			</Button>
			<Button variant="outline" size="icon">
				<CircleMinus />
			</Button>
		</ButtonGroup.Root>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="flex flex-col items-start gap-8">
			<ButtonGroup.Root>
				<Button variant="outline" size="sm">
					Small
				</Button>
				<Button variant="outline" size="sm">
					Button
				</Button>
				<Button variant="outline" size="sm">
					Group
				</Button>
				<Button variant="outline" size="icon-sm">
					<CirclePlus />
				</Button>
			</ButtonGroup.Root>
			<ButtonGroup.Root>
				<Button variant="outline">Default</Button>
				<Button variant="outline">Button</Button>
				<Button variant="outline">Group</Button>
				<Button variant="outline" size="icon">
					<CirclePlus />
				</Button>
			</ButtonGroup.Root>
			<ButtonGroup.Root>
				<Button variant="outline" size="lg">
					Large
				</Button>
				<Button variant="outline" size="lg">
					Button
				</Button>
				<Button variant="outline" size="lg">
					Group
				</Button>
				<Button variant="outline" size="icon-lg">
					<CirclePlus />
				</Button>
			</ButtonGroup.Root>
		</div>
	),
};

export const Nested: Story = {
	render: () => (
		<ButtonGroup.Root>
			<ButtonGroup.Root>
				<Button variant="outline" size="sm">
					1
				</Button>
				<Button variant="outline" size="sm">
					2
				</Button>
				<Button variant="outline" size="sm">
					3
				</Button>
				<Button variant="outline" size="sm">
					4
				</Button>
				<Button variant="outline" size="sm">
					5
				</Button>
			</ButtonGroup.Root>
			<ButtonGroup.Root>
				<Button variant="outline" size="icon-sm" aria-label="Previous">
					<CircleArrowLeft />
				</Button>
				<Button variant="outline" size="icon-sm" aria-label="Next">
					<CircleArrowRight />
				</Button>
			</ButtonGroup.Root>
		</ButtonGroup.Root>
	),
};

export const WithSeparator: Story = {
	render: () => (
		<ButtonGroup.Root>
			<Button variant="secondary" size="sm">
				Copy
			</Button>
			<ButtonGroup.Separator />
			<Button variant="secondary" size="sm">
				Paste
			</Button>
		</ButtonGroup.Root>
	),
};

export const Split: Story = {
	render: () => (
		<ButtonGroup.Root>
			<Button variant="secondary">Button</Button>
			<ButtonGroup.Separator />
			<Button size="icon" variant="secondary">
				<Plus />
			</Button>
		</ButtonGroup.Root>
	),
};

export const WithText: Story = {
	render: () => (
		<ButtonGroup.Root>
			<ButtonGroup.Text>View</ButtonGroup.Text>
			<Button variant="outline">List</Button>
			<Button variant="outline">Grid</Button>
		</ButtonGroup.Root>
	),
};

export const WithInput: Story = {
	render: () => (
		<ButtonGroup.Root>
			<Input placeholder="Search..." />
			<Button variant="outline" aria-label="Search">
				<Search />
			</Button>
		</ButtonGroup.Root>
	),
};

export const WithInputGroup: Story = {
	render: () => {
		const [voiceEnabled, setVoiceEnabled] = React.useState(false);

		return (
			<ButtonGroup.Root className="[--radius:9999rem]">
				<ButtonGroup.Root>
					<Button variant="outline" size="icon">
						<Plus />
					</Button>
				</ButtonGroup.Root>
				<ButtonGroup.Root>
					<InputGroup.Root>
						<InputGroup.Input
							placeholder={
								voiceEnabled ? "Record and send audio..." : "Send a message..."
							}
							disabled={voiceEnabled}
						/>
						<InputGroup.Addon align="inline-end">
							<Tooltip.Root>
								<Tooltip.Trigger
									render={
										<InputGroup.Button
											onClick={() => setVoiceEnabled(!voiceEnabled)}
											size="icon-xs"
											data-active={voiceEnabled}
											className="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
											aria-pressed={voiceEnabled}
										/>
									}
								>
									<AudioLines />
								</Tooltip.Trigger>
								<Tooltip.Positioner>
									<Tooltip.Content>Voice Mode</Tooltip.Content>
								</Tooltip.Positioner>
							</Tooltip.Root>
						</InputGroup.Addon>
					</InputGroup.Root>
				</ButtonGroup.Root>
			</ButtonGroup.Root>
		);
	},
};

export const WithDropdown: Story = {
	render: () => (
		<ButtonGroup.Root>
			<Button variant="outline">Follow</Button>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger render={<Button variant="outline" />}>
					<ChevronDown />
				</DropdownMenu.Trigger>
				<DropdownMenu.Positioner align="end">
					<DropdownMenu.Content className="[--radius:1rem]">
						<DropdownMenu.Group>
							<DropdownMenu.Item>
								<VolumeOff />
								Mute Conversation
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<Check />
								Mark as Read
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<TriangleAlert />
								Report Conversation
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<UserRoundX />
								Block User
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<Share />
								Share Conversation
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<Copy />
								Copy Conversation
							</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Item variant="destructive">
								<Trash />
								Delete Conversation
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Positioner>
			</DropdownMenu.Root>
		</ButtonGroup.Root>
	),
};

export const Complex: Story = {
	render: () => {
		const [label, setLabel] = React.useState("personal");

		return (
			<ButtonGroup.Root>
				<ButtonGroup.Root className="hidden sm:flex">
					<Button variant="outline" size="icon" aria-label="Go Back">
						<ArrowLeft />
					</Button>
				</ButtonGroup.Root>
				<ButtonGroup.Root>
					<Button variant="outline">Archive</Button>
					<Button variant="outline">Report</Button>
				</ButtonGroup.Root>
				<ButtonGroup.Root>
					<Button variant="outline">Snooze</Button>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger
							render={
								<Button
									variant="outline"
									size="icon"
									aria-label="More Options"
								/>
							}
						>
							<Ellipsis />
						</DropdownMenu.Trigger>
						<DropdownMenu.Positioner align="end">
							<DropdownMenu.Content className="w-52">
								<DropdownMenu.Group>
									<DropdownMenu.Item>
										<MailCheck />
										Mark as Read
									</DropdownMenu.Item>
									<DropdownMenu.Item>
										<Archive />
										Archive
									</DropdownMenu.Item>
								</DropdownMenu.Group>
								<DropdownMenu.Separator />
								<DropdownMenu.Group>
									<DropdownMenu.Item>
										<Clock />
										Snooze
									</DropdownMenu.Item>
									<DropdownMenu.Item>
										<CalendarPlus />
										Add to Calendar
									</DropdownMenu.Item>
									<DropdownMenu.Item>
										<ListFilterPlus />
										Add to List
									</DropdownMenu.Item>
									<DropdownMenu.Sub>
										<DropdownMenu.SubTrigger>
											<Tag />
											Label As...
										</DropdownMenu.SubTrigger>
										<DropdownMenu.Positioner>
											<DropdownMenu.SubContent>
												<DropdownMenu.RadioGroup
													value={label}
													onValueChange={setLabel}
												>
													<DropdownMenu.RadioItem value="personal">
														Personal
													</DropdownMenu.RadioItem>
													<DropdownMenu.RadioItem value="work">
														Work
													</DropdownMenu.RadioItem>
													<DropdownMenu.RadioItem value="other">
														Other
													</DropdownMenu.RadioItem>
												</DropdownMenu.RadioGroup>
											</DropdownMenu.SubContent>
										</DropdownMenu.Positioner>
									</DropdownMenu.Sub>
								</DropdownMenu.Group>
								<DropdownMenu.Separator />
								<DropdownMenu.Group>
									<DropdownMenu.Item variant="destructive">
										<Trash2 />
										Trash
									</DropdownMenu.Item>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Positioner>
					</DropdownMenu.Root>
				</ButtonGroup.Root>
			</ButtonGroup.Root>
		);
	},
};

export const WithSelect: Story = {
	render: () => {
		const [currency, setCurrency] = React.useState("$");

		const currencies = [
			{ value: "$", label: "US Dollar" },
			{ value: "€", label: "Euro" },
			{ value: "£", label: "British Pound" },
		];

		return (
			<ButtonGroup.Root>
				<ButtonGroup.Root>
					<Select.Root
						items={currencies}
						value={currency}
						onValueChange={(value) => setCurrency(value as string)}
					>
						<Select.Trigger className="font-mono text-xs">
							{currency}
						</Select.Trigger>
						<Select.Content>
							{currencies.map((curr) => (
								<Select.Item key={curr.value} value={curr.value}>
									{curr.value}{" "}
									<span className="text-muted-foreground text-xs">
										{curr.label}
									</span>
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>
					<Input placeholder="10.00" pattern="[0-9]*" />
				</ButtonGroup.Root>
				<ButtonGroup.Root>
					<Button aria-label="Send" size="icon" variant="outline">
						<ArrowRight />
					</Button>
				</ButtonGroup.Root>
			</ButtonGroup.Root>
		);
	},
};

export const WithPopover: Story = {
	render: () => (
		<ButtonGroup.Root>
			<Button variant="outline">
				<Bot /> Copilot
			</Button>
			<Popover.Root>
				<Popover.Trigger
					render={
						<Button variant="outline" size="icon" aria-label="Open Popover" />
					}
				>
					<ChevronDown />
				</Popover.Trigger>
				<Popover.Positioner align="end">
					<Popover.Content className="rounded-xl p-0 text-sm">
						<div className="px-4 py-3">
							<div className="text-sm font-medium">Agent Tasks</div>
						</div>
						<Separator />
						<div className="p-4 text-sm *:[p:not(:last-child)]:mb-2">
							<Textarea
								placeholder="Describe your task in natural language."
								className="mb-4 resize-none"
							/>
							<p className="font-medium">Start a new task with Copilot</p>
							<p className="text-muted-foreground">
								Describe your task in natural language. Copilot will work in the
								background and open a pull request for your review.
							</p>
						</div>
					</Popover.Content>
				</Popover.Positioner>
			</Popover.Root>
		</ButtonGroup.Root>
	),
};
