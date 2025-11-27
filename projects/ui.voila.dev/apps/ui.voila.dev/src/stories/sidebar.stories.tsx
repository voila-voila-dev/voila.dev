import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@voila.dev/ui/components/button";
import { Collapsible } from "@voila.dev/ui/components/collapsible";
import { Dialog } from "@voila.dev/ui/components/dialog";
import { Sidebar, useSidebar } from "@voila.dev/ui/components/sidebar";
import {
	BookOpen,
	Bot,
	ChevronRight,
	Command,
	File,
	House,
	Inbox,
	LifeBuoy,
	Send,
	Settings,
	SquareTerminal,
} from "@voila.dev/ui/icons";
import * as React from "react";

const meta = {
	title: "UI/Sidebar",
	component: Sidebar.Root,
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof Sidebar.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

// Simple content area component
function ContentArea({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<Sidebar.Inset>
			<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<Sidebar.Trigger />
				<h1 className="text-lg font-semibold">{title}</h1>
			</header>
			<main className="flex flex-1 flex-col gap-4 p-4">
				<div className="rounded-lg border p-4">
					<h2 className="text-lg font-semibold">{title}</h2>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</main>
		</Sidebar.Inset>
	);
}

// Story 1: Simple sidebar with navigation grouped by section
export const SimpleNavigation: Story = {
	render: () => (
		<Sidebar.Provider>
			<Sidebar.Root>
				<Sidebar.Content>
					<Sidebar.Group>
						<Sidebar.GroupLabel>Main</Sidebar.GroupLabel>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton isActive>
										<House />
										<span>Home</span>
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<Inbox />
										<span>Inbox</span>
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
					<Sidebar.Group>
						<Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<Settings />
										<span>Settings</span>
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>
			</Sidebar.Root>
			<ContentArea
				title="Simple Navigation"
				description="A simple sidebar with navigation items grouped by section."
			/>
		</Sidebar.Provider>
	),
};

// Story 2: Sidebar with collapsible sections
export const CollapsibleSections: Story = {
	render: () => (
		<Sidebar.Provider>
			<Sidebar.Root>
				<Sidebar.Header>
					<Sidebar.Trigger />
				</Sidebar.Header>
				<Sidebar.Content>
					<Sidebar.Group>
						<Collapsible.Root defaultOpen>
							<Collapsible.Trigger
								render={
									<Sidebar.GroupLabel>
										<ChevronRight className="transition-transform duration-200 group-data-[state=open]:rotate-90" />
										Main
									</Sidebar.GroupLabel>
								}
							/>
							<Collapsible.Panel>
								<Sidebar.GroupContent>
									<Sidebar.Menu>
										<Sidebar.MenuItem>
											<Sidebar.MenuButton isActive>
												<House />
												<span>Home</span>
											</Sidebar.MenuButton>
										</Sidebar.MenuItem>
										<Sidebar.MenuItem>
											<Sidebar.MenuButton>
												<Inbox />
												<span>Inbox</span>
											</Sidebar.MenuButton>
										</Sidebar.MenuItem>
									</Sidebar.Menu>
								</Sidebar.GroupContent>
							</Collapsible.Panel>
						</Collapsible.Root>
					</Sidebar.Group>
					<Sidebar.Group>
						<Collapsible.Root>
							<Collapsible.Trigger
								render={
									<Sidebar.GroupLabel>
										<ChevronRight className="transition-transform duration-200 group-data-[state=open]:rotate-90" />
										Settings
									</Sidebar.GroupLabel>
								}
							/>
							<Collapsible.Panel>
								<Sidebar.GroupContent>
									<Sidebar.Menu>
										<Sidebar.MenuItem>
											<Sidebar.MenuButton>
												<Settings />
												<span>Settings</span>
											</Sidebar.MenuButton>
										</Sidebar.MenuItem>
									</Sidebar.Menu>
								</Sidebar.GroupContent>
							</Collapsible.Panel>
						</Collapsible.Root>
					</Sidebar.Group>
				</Sidebar.Content>
			</Sidebar.Root>
			<ContentArea
				title="Collapsible Sections"
				description="A sidebar with collapsible sections that can be expanded or collapsed."
			/>
		</Sidebar.Provider>
	),
};

// Story 3: Sidebar with submenus
export const WithSubmenus: Story = {
	render: () => (
		<Sidebar.Provider>
			<Sidebar.Root>
				<Sidebar.Header>
					<Sidebar.Trigger />
				</Sidebar.Header>
				<Sidebar.Content>
					<Sidebar.Group>
						<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton isActive>
										<SquareTerminal />
										<span>Playground</span>
									</Sidebar.MenuButton>
									<Sidebar.MenuSub>
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton isActive>
												<span>History</span>
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton>
												<span>Starred</span>
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton>
												<span>Settings</span>
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									</Sidebar.MenuSub>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<Bot />
										<span>Models</span>
									</Sidebar.MenuButton>
									<Sidebar.MenuSub>
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton>
												<span>Genesis</span>
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton>
												<span>Explorer</span>
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									</Sidebar.MenuSub>
								</Sidebar.MenuItem>
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>
			</Sidebar.Root>
			<ContentArea
				title="Submenus"
				description="A sidebar with submenus that appear under parent menu items."
			/>
		</Sidebar.Provider>
	),
};

// Story 4: Floating sidebar with submenus
export const FloatingWithSubmenus: Story = {
	render: () => (
		<Sidebar.Provider>
			<Sidebar.Root variant="floating">
				<Sidebar.Header>
					<Sidebar.Trigger />
				</Sidebar.Header>
				<Sidebar.Content>
					<Sidebar.Group>
						<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton isActive>
										<SquareTerminal />
										<span>Playground</span>
									</Sidebar.MenuButton>
									<Sidebar.MenuSub>
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton isActive>
												<span>History</span>
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton>
												<span>Starred</span>
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									</Sidebar.MenuSub>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<BookOpen />
										<span>Documentation</span>
									</Sidebar.MenuButton>
									<Sidebar.MenuSub>
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton>
												<span>Introduction</span>
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton>
												<span>Get Started</span>
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									</Sidebar.MenuSub>
								</Sidebar.MenuItem>
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>
			</Sidebar.Root>
			<ContentArea
				title="Floating Sidebar"
				description="A floating sidebar variant with rounded corners and shadow, featuring submenus."
			/>
		</Sidebar.Provider>
	),
};

// Story 5: Sidebar with collapsible submenus
export const CollapsibleSubmenus: Story = {
	render: () => (
		<Sidebar.Provider>
			<Sidebar.Root>
				<Sidebar.Content>
					<Sidebar.Group>
						<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								<Collapsible.Root defaultOpen>
									<Sidebar.MenuItem>
										<Sidebar.MenuButton>
											<SquareTerminal />
											<span>Playground</span>
										</Sidebar.MenuButton>
										<Collapsible.Trigger
											render={
												<Sidebar.MenuAction>
													<ChevronRight className="transition-transform duration-200 group-data-[state=open]:rotate-90" />
												</Sidebar.MenuAction>
											}
										/>
										<Collapsible.Panel>
											<Sidebar.MenuSub>
												<Sidebar.MenuSubItem>
													<Sidebar.MenuSubButton isActive>
														<span>History</span>
													</Sidebar.MenuSubButton>
												</Sidebar.MenuSubItem>
												<Sidebar.MenuSubItem>
													<Sidebar.MenuSubButton>
														<span>Starred</span>
													</Sidebar.MenuSubButton>
												</Sidebar.MenuSubItem>
												<Sidebar.MenuSubItem>
													<Sidebar.MenuSubButton>
														<span>Settings</span>
													</Sidebar.MenuSubButton>
												</Sidebar.MenuSubItem>
											</Sidebar.MenuSub>
										</Collapsible.Panel>
									</Sidebar.MenuItem>
								</Collapsible.Root>
								<Collapsible.Root>
									<Sidebar.MenuItem>
										<Sidebar.MenuButton>
											<Bot />
											<span>Models</span>
										</Sidebar.MenuButton>
										<Collapsible.Trigger
											render={
												<Sidebar.MenuAction>
													<ChevronRight className="transition-transform duration-200 group-data-[state=open]:rotate-90" />
												</Sidebar.MenuAction>
											}
										/>
										<Collapsible.Panel>
											<Sidebar.MenuSub>
												<Sidebar.MenuSubItem>
													<Sidebar.MenuSubButton>
														<span>Genesis</span>
													</Sidebar.MenuSubButton>
												</Sidebar.MenuSubItem>
												<Sidebar.MenuSubItem>
													<Sidebar.MenuSubButton>
														<span>Explorer</span>
													</Sidebar.MenuSubButton>
												</Sidebar.MenuSubItem>
											</Sidebar.MenuSub>
										</Collapsible.Panel>
									</Sidebar.MenuItem>
								</Collapsible.Root>
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>
			</Sidebar.Root>
			<ContentArea
				title="Collapsible Submenus"
				description="A sidebar with collapsible submenus that can be expanded or collapsed individually."
			/>
		</Sidebar.Provider>
	),
};

// Story 6: Sidebar that collapses to icons
export const IconOnly: Story = {
	render: () => (
		<Sidebar.Provider defaultOpen={false}>
			<Sidebar.Root collapsible="icon">
				<Sidebar.Content>
					<Sidebar.Group>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton tooltip="Home" isActive>
										<House />
										<span>Home</span>
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton tooltip="Inbox">
										<Inbox />
										<span>Inbox</span>
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton tooltip="Settings">
										<Settings />
										<span>Settings</span>
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>
				<Sidebar.Rail />
			</Sidebar.Root>
			<ContentArea
				title="Icon Only Sidebar"
				description="A sidebar that collapses to show only icons. Hover over icons to see tooltips."
			/>
		</Sidebar.Provider>
	),
};

// Story 7: Inset sidebar with secondary navigation
export const InsetSidebar: Story = {
	render: () => (
		<Sidebar.Provider>
			<Sidebar.Root variant="inset">
				<Sidebar.Header>
					<Sidebar.Menu>
						<Sidebar.MenuItem>
							<Sidebar.MenuButton size="lg">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Acme Inc</span>
									<span className="truncate text-xs">Enterprise</span>
								</div>
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					</Sidebar.Menu>
				</Sidebar.Header>
				<Sidebar.Content>
					<Sidebar.Group>
						<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton isActive>
										<SquareTerminal />
										<span>Playground</span>
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<Bot />
										<span>Models</span>
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
					<Sidebar.Group className="mt-auto">
						<Sidebar.GroupLabel>Support</Sidebar.GroupLabel>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<LifeBuoy />
										<span>Support</span>
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<Send />
										<span>Feedback</span>
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>
			</Sidebar.Root>
			<ContentArea
				title="Inset Sidebar"
				description="An inset sidebar variant with secondary navigation items at the bottom."
			/>
		</Sidebar.Provider>
	),
};

// Story 8: Collapsible nested sidebars
function NestedSidebarContent() {
	const { state } = useSidebar();
	const [activeItem, setActiveItem] = React.useState("Inbox");

	const items = [
		{ title: "Inbox", icon: Inbox },
		{ title: "Drafts", icon: File },
		{ title: "Sent", icon: Send },
	];

	return (
		<>
			<Sidebar.Root
				collapsible="none"
				className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
			>
				<Sidebar.Header>
					<Sidebar.Menu>
						<Sidebar.MenuItem>
							<Sidebar.MenuButton size="lg">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Command className="size-4" />
								</div>
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					</Sidebar.Menu>
				</Sidebar.Header>
				<Sidebar.Content>
					<Sidebar.Group>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								{items.map((item) => (
									<Sidebar.MenuItem key={item.title}>
										<Sidebar.MenuButton
											tooltip={item.title}
											isActive={activeItem === item.title}
											onClick={() => setActiveItem(item.title)}
										>
											<item.icon />
											<span>{item.title}</span>
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								))}
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>
			</Sidebar.Root>
			{state === "expanded" && (
				<Sidebar.Root collapsible="none" className="hidden flex-1 md:flex">
					<Sidebar.Header className="gap-3.5 border-b p-4">
						<div className="text-foreground text-base font-medium">
							{activeItem}
						</div>
						<Sidebar.Input placeholder="Type to search..." />
					</Sidebar.Header>
					<Sidebar.Content>
						<Sidebar.Group className="px-0">
							<Sidebar.GroupContent>
								{Array.from({ length: 10 }).map((_, i) => (
									<a
										key={i}
										href={`#email-${i + 1}`}
										className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight last:border-b-0"
									>
										<div className="flex w-full items-center gap-2">
											<span>Email {i + 1}</span>
											<span className="ml-auto text-xs">Today</span>
										</div>
										<span className="font-medium">Subject {i + 1}</span>
									</a>
								))}
							</Sidebar.GroupContent>
						</Sidebar.Group>
					</Sidebar.Content>
				</Sidebar.Root>
			)}
		</>
	);
}

export const NestedSidebars: Story = {
	render: () => (
		<Sidebar.Provider>
			<div className="flex">
				<NestedSidebarContent />
			</div>
			<ContentArea
				title="Nested Sidebars"
				description="A sidebar with nested sidebars that show additional content when expanded."
			/>
		</Sidebar.Provider>
	),
};

// Story 10: Sidebar in a dialog
export const InDialog: Story = {
	render: () => {
		const [open, setOpen] = React.useState(true);

		return (
			<div className="flex h-svh items-center justify-center">
				<Dialog.Root open={open} onOpenChange={setOpen}>
					<Dialog.Trigger render={<Button size="sm">Open Dialog</Button>} />
					<Dialog.Content className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px]">
						<Dialog.Title className="sr-only">Settings</Dialog.Title>
						<Dialog.Description className="sr-only">
							Customize your settings here.
						</Dialog.Description>
						<Sidebar.Provider className="items-start">
							<Sidebar.Root collapsible="none" className="hidden md:flex">
								<Sidebar.Content>
									<Sidebar.Group>
										<Sidebar.GroupContent>
											<Sidebar.Menu>
												<Sidebar.MenuItem>
													<Sidebar.MenuButton isActive>
														<Settings />
														<span>General</span>
													</Sidebar.MenuButton>
												</Sidebar.MenuItem>
												<Sidebar.MenuItem>
													<Sidebar.MenuButton>
														<LifeBuoy />
														<span>Support</span>
													</Sidebar.MenuButton>
												</Sidebar.MenuItem>
											</Sidebar.Menu>
										</Sidebar.GroupContent>
									</Sidebar.Group>
								</Sidebar.Content>
							</Sidebar.Root>
							<main className="flex h-[480px] flex-1 flex-col overflow-hidden">
								<header className="flex h-16 shrink-0 items-center gap-2 px-4">
									<h1 className="text-lg font-semibold">Settings</h1>
								</header>
								<div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
									{Array.from({ length: 5 }).map((_, i) => (
										<div
											key={i}
											className="bg-muted/50 aspect-video max-w-3xl rounded-xl"
										/>
									))}
								</div>
							</main>
						</Sidebar.Provider>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		);
	},
};
