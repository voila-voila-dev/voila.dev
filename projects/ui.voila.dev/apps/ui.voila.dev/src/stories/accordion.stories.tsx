import { Accordion as AccordionPrimitive } from "@base-ui-components/react/accordion";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "@voila.dev/ui/components/accordion";
import { Box, Minus, Plus, Truck, Undo2 } from "@voila.dev/ui/icons";

const meta = {
	title: "UI/Accordion",
	component: Accordion.Root,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Accordion.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const accordionItems = [
	{
		value: "item-1",
		title: "Product Information",
		content:
			"Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.",
	},
	{
		value: "item-2",
		title: "Shipping Details",
		content:
			"We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days, while express shipping ensures delivery within 1-2 business days.",
	},
	{
		value: "item-3",
		title: "Return Policy",
		content:
			"We stand behind our products with a comprehensive 30-day return policy. If you're not completely satisfied, simply return the item in its original condition.",
	},
];

export const Default: Story = {
	render: () => (
		<Accordion.Root className="w-lg">
			<Accordion.Item>
				<Accordion.HeaderTrigger>
					What is your return policy?
				</Accordion.HeaderTrigger>
				<Accordion.Panel>
					If you're not satisfied with your purchase, you can return it within
					30 days for a full refund.
				</Accordion.Panel>
			</Accordion.Item>
			<Accordion.Item>
				<Accordion.HeaderTrigger>
					How long does shipping take?
				</Accordion.HeaderTrigger>
				<Accordion.Panel>
					Standard shipping typically takes 3–5 business days, depending on your
					location.
				</Accordion.Panel>
			</Accordion.Item>
			<Accordion.Item>
				<Accordion.HeaderTrigger>
					Do you offer customer support?
				</Accordion.HeaderTrigger>
				<Accordion.Panel>
					Yes, our team is available 7 days a week to help with any questions.
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion.Root>
	),
};

export const SingleSelection: Story = {
	render: () => (
		<Accordion.Root
			className="w-lg space-y-2"
			defaultValue={[accordionItems[0].value]}
			multiple={false}
		>
			{accordionItems.map((item) => (
				<Accordion.Item
					key={item.value}
					value={item.value}
					className="last:border-b border rounded-md"
				>
					<Accordion.HeaderTrigger className="py-3 px-5 text-base items-center">
						{item.title}
					</Accordion.HeaderTrigger>
					<Accordion.Panel className="flex flex-col gap-4 px-5">
						<p>{item.content}</p>
					</Accordion.Panel>
				</Accordion.Item>
			))}
		</Accordion.Root>
	),
};

export const WithIcons: Story = {
	render: () => {
		const itemsWithIcons = [
			{ ...accordionItems[0], icon: Box },
			{ ...accordionItems[1], icon: Truck },
			{ ...accordionItems[2], icon: Undo2 },
		];

		return (
			<Accordion.Root
				className="w-lg space-y-2"
				defaultValue={[itemsWithIcons[0].value]}
				multiple={false}
			>
				{itemsWithIcons.map((item) => (
					<Accordion.Item
						key={item.value}
						value={item.value}
						className="last:border-b border rounded-md"
					>
						<Accordion.HeaderTrigger className="py-3 px-5 text-base items-center">
							<div className="flex items-center gap-3">
								<item.icon className="size-5 text-muted-foreground" />
								{item.title}
							</div>
						</Accordion.HeaderTrigger>
						<Accordion.Panel className="relative flex flex-col gap-4 px-5 pl-13">
							<p>{item.content}</p>
							<div className="w-px h-full absolute left-7.5 inset-y-0 border-l border-dashed" />
						</Accordion.Panel>
					</Accordion.Item>
				))}
			</Accordion.Root>
		);
	},
};

export const WithCustomIcons: Story = {
	render: () => (
		<Accordion.Root
			className="w-lg space-y-2"
			defaultValue={[accordionItems[0].value]}
			multiple={false}
		>
			{accordionItems.map((item) => (
				<Accordion.Item
					key={item.value}
					value={item.value}
					className="last:border-b border rounded-md"
				>
					<Accordion.Header className="flex items-center">
						<AccordionPrimitive.Trigger
							data-slot="accordion-trigger"
							className="group focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-3 px-5 text-left text-base font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
						>
							{item.title}
							<Plus className="group-data-panel-open:hidden text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
							<Minus className="group-data-panel-open:block hidden text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
						</AccordionPrimitive.Trigger>
					</Accordion.Header>
					<Accordion.Panel className="flex flex-col gap-4 px-5">
						<p>{item.content}</p>
					</Accordion.Panel>
				</Accordion.Item>
			))}
		</Accordion.Root>
	),
};

export const MultipleOpen: Story = {
	render: () => (
		<Accordion.Root
			className="w-lg space-y-2"
			defaultValue={[accordionItems[0].value]}
		>
			{accordionItems.map((item) => (
				<Accordion.Item
					key={item.value}
					value={item.value}
					className="last:border-b border rounded-md"
				>
					<Accordion.HeaderTrigger className="py-3 px-5 text-base items-center">
						{item.title}
					</Accordion.HeaderTrigger>
					<Accordion.Panel className="flex flex-col gap-4 px-5">
						<p>{item.content}</p>
					</Accordion.Panel>
				</Accordion.Item>
			))}
		</Accordion.Root>
	),
};
