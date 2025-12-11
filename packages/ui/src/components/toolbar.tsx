"use client";

import { Toolbar as ToolbarPrimitive } from "@base-ui-components/react/toolbar";
import type { ComponentProps } from "react";
import { cva, cx, type VariantProps } from "../index";
import { Separator as SeparatorComponent } from "./separator";

const rootVariants = cva({
	base: [
		"flex items-center gap-1 rounded-lg border bg-background p-1",
		"data-[orientation=vertical]:flex-col data-[orientation=vertical]:w-fit",
		"data-[orientation=horizontal]:h-fit",
	],
	variants: {
		variant: {
			default: "border-border bg-background",
			ghost: "border-transparent bg-transparent",
			muted: "border-border bg-muted",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

function Root({
	className,
	variant,
	...props
}: ComponentProps<typeof ToolbarPrimitive.Root> &
	VariantProps<typeof rootVariants>) {
	return (
		<ToolbarPrimitive.Root
			data-slot="toolbar"
			className={cx(rootVariants({ variant }), className)}
			{...props}
		/>
	);
}

const buttonVariants = cva({
	base: [
		"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
		"transition-[color,box-shadow]",
		"disabled:pointer-events-none disabled:opacity-50",
		"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		"outline-none",
		"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
		"hover:bg-accent hover:text-accent-foreground",
		"data-[pressed]:bg-accent data-[pressed]:text-accent-foreground",
	],
	variants: {
		variant: {
			default: "bg-transparent text-foreground",
			outline: "border border-input bg-background shadow-xs",
		},
		size: {
			default: "h-8 px-3 min-w-8",
			sm: "h-7 px-2 min-w-7 text-xs",
			lg: "h-9 px-4 min-w-9",
			icon: "h-8 w-8",
			"icon-sm": "h-7 w-7",
			"icon-lg": "h-9 w-9",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

function Button({
	className,
	variant,
	size,
	...props
}: ComponentProps<typeof ToolbarPrimitive.Button> &
	VariantProps<typeof buttonVariants>) {
	return (
		<ToolbarPrimitive.Button
			data-slot="toolbar-button"
			className={cx(buttonVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

function Link({
	className,
	...props
}: ComponentProps<typeof ToolbarPrimitive.Link>) {
	return (
		<ToolbarPrimitive.Link
			data-slot="toolbar-link"
			className={cx(
				"inline-flex items-center justify-center text-sm font-medium text-muted-foreground",
				"no-underline",
				"hover:text-foreground",
				"focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]",
				"transition-colors",
				className,
			)}
			{...props}
		/>
	);
}

function Separator({
	className,
	...props
}: ComponentProps<typeof SeparatorComponent>) {
	return (
		<SeparatorComponent
			data-slot="toolbar-separator"
			className={cx(
				"bg-border",
				"data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-px",
				"data-[orientation=vertical]:h-px data-[orientation=vertical]:w-4",
				"mx-1 my-0.5",
				"data-[orientation=horizontal]:my-1 data-[orientation=horizontal]:mx-0.5",
				className,
			)}
			{...props}
		/>
	);
}

function Group({
	className,
	...props
}: ComponentProps<typeof ToolbarPrimitive.Group>) {
	return (
		<ToolbarPrimitive.Group
			data-slot="toolbar-group"
			className={cx("flex items-center gap-1", className)}
			{...props}
		/>
	);
}

function Input({
	className,
	...props
}: ComponentProps<typeof ToolbarPrimitive.Input>) {
	return (
		<ToolbarPrimitive.Input
			data-slot="toolbar-input"
			className={cx(
				"flex h-8 min-w-0 rounded-md border border-input bg-transparent px-2 py-1",
				"text-sm",
				"placeholder:text-muted-foreground",
				"dark:bg-input/30",
				"outline-none transition-[color,box-shadow]",
				"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
				"disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

export const Toolbar = {
	Root,
	Button,
	Link,
	Separator,
	Group,
	Input,
};

export { buttonVariants as toolbarButtonVariants };
