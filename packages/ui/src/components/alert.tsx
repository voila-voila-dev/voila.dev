"use client";

import { useRender } from "@base-ui-components/react/use-render";
import { cva, cx, type VariantProps } from "../index";

const variants = cva({
	base: "group relative bg-card w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
	variants: {
		variant: {
			default: "text-card-foreground",
			destructive:
				"text-destructive [&>svg]:text-current bg-destructive/10 border-destructive/20",
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
}: useRender.ComponentProps<"div"> & VariantProps<typeof variants>) {
	return useRender({
		defaultTagName: "div",
		props: {
			role: "alert",
			"data-variant": variant,
			className: cx(variants({ variant }), className),
			...props,
		},
	});
}

function Title({ className, ...props }: useRender.ComponentProps<"div">) {
	return useRender({
		defaultTagName: "div",
		props: {
			className: cx(
				"col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
				className,
			),
			...props,
		},
	});
}

function Description({ className, ...props }: useRender.ComponentProps<"div">) {
	return useRender({
		defaultTagName: "div",
		props: {
			className: cx(
				"text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm leading-relaxed group-data-[variant=destructive]:text-destructive/90",
				className,
			),
			...props,
		},
	});
}

export const Alert = {
	Root,
	Title,
	Description,
};
