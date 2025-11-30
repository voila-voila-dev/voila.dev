import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "@voila.dev/ui/components/avatar";
import { AvatarGroup } from "@voila.dev/ui/components/avatar-group";
import { BadgeCheck, BadgeMinus, BadgeX } from "@voila.dev/ui/icons";
import avatar1 from "../assets/avatar-1.png";
import avatar2 from "../assets/avatar-2.png";
import avatar3 from "../assets/avatar-3.png";

const meta = {
	title: "UI/Avatar",
	component: Avatar.Root,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Avatar.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Avatar.Root>
			<Avatar.Image src={avatar1} />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
	),
};

export const Fallback: Story = {
	render: () => (
		<Avatar.Root>
			<Avatar.Image src="https://invalid-url.png" alt="Invalid" />
			<Avatar.Fallback>EB</Avatar.Fallback>
		</Avatar.Root>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Avatar.Root className="size-8">
				<Avatar.Image src={avatar1} />
				<Avatar.Fallback>EB</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root className="size-12">
				<Avatar.Image src={avatar1} />
				<Avatar.Fallback>EB</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root className="size-16">
				<Avatar.Image src={avatar1} />
				<Avatar.Fallback>EB</Avatar.Fallback>
			</Avatar.Root>
		</div>
	),
};

export const Group: Story = {
	render: () => (
		<AvatarGroup>
			<Avatar.Root>
				<Avatar.Image src={avatar1} />
				<Avatar.Fallback>EB</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root>
				<Avatar.Image src={avatar2} />
				<Avatar.Fallback>JD</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root>
				<Avatar.Image src="https://invalid-url.png" alt="Invalid" />
				<Avatar.Fallback>AB</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root>
				<Avatar.Image src={avatar3} />
				<Avatar.Fallback>CD</Avatar.Fallback>
			</Avatar.Root>
		</AvatarGroup>
	),
};

export const Ring: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Avatar.Root className="size-10 ring-2 ring-ring ring-offset-2 ring-offset-background">
				<Avatar.Image src={avatar1} />
				<Avatar.Fallback className="rounded-none">ER</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root className="size-10 ring-2 ring-green-500 ring-offset-2 ring-offset-background">
				<Avatar.Image src={avatar2} />
				<Avatar.Fallback className="rounded-md">LR</Avatar.Fallback>
			</Avatar.Root>
			<div className="bg-linear-to-b from-red-500 to-blue-500 rounded-full p-1">
				<Avatar.Root className="size-10 ring-2 ring-background">
					<Avatar.Image src={avatar3} />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
			</div>
		</div>
	),
};

export const Status: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<div className="relative">
				<Avatar.Root>
					<Avatar.Image src={avatar1} />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<div className="absolute bottom-0 right-0 size-2 ring-2 ring-background rounded-full bg-gray-400"></div>
			</div>
			<div className="relative">
				<Avatar.Root>
					<Avatar.Image src={avatar1} />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<div className="absolute bottom-0 right-0 size-2 ring-2 ring-background rounded-full bg-green-500"></div>
			</div>
			<div className="relative">
				<Avatar.Root>
					<Avatar.Image src={avatar1} />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<div className="absolute bottom-0 right-0 size-2 ring-2 ring-background rounded-full bg-amber-500"></div>
			</div>
			<div className="relative">
				<Avatar.Root>
					<Avatar.Image src={avatar1} />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<div className="absolute bottom-0 right-0 size-2 ring-2 ring-background rounded-full bg-red-500"></div>
			</div>
		</div>
	),
};

export const Badge: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<div className="relative">
				<Avatar.Root className="size-10">
					<Avatar.Image src={avatar1} />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<div className="absolute -bottom-0.5 -right-0.5 size-3.5 ring-2 ring-background rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center leading-none">
					3
				</div>
			</div>
			<div className="relative">
				<Avatar.Root className="size-10">
					<Avatar.Image src={avatar1} />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<BadgeCheck className="absolute -bottom-1 -right-1 size-4.5 rounded-full fill-blue-500 text-background"></BadgeCheck>
			</div>
			<div className="relative">
				<Avatar.Root className="size-10">
					<Avatar.Image src={avatar1} />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<BadgeMinus className="absolute -bottom-1 -right-1 size-4.5 rounded-full fill-amber-500 text-background"></BadgeMinus>
			</div>
			<div className="relative">
				<Avatar.Root className="size-10">
					<Avatar.Image src={avatar1} />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<BadgeX className="absolute -bottom-1 -right-1 size-4.5 rounded-full fill-red-500 text-background"></BadgeX>
			</div>
		</div>
	),
};
