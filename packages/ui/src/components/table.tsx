import type { ComponentProps } from "react";

import { cx } from "../index";

function Root({ className, ...props }: ComponentProps<"table">) {
	return (
		<div
			data-slot="table-container"
			className="relative w-full overflow-x-auto"
		>
			<table
				data-slot="table"
				className={cx("w-full caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	);
}

function Header({ className, ...props }: ComponentProps<"thead">) {
	return (
		<thead
			data-slot="table-header"
			className={cx("[&_tr]:border-b", className)}
			{...props}
		/>
	);
}

function Body({ className, ...props }: ComponentProps<"tbody">) {
	return (
		<tbody
			data-slot="table-body"
			className={cx("[&_tr:last-child]:border-0", className)}
			{...props}
		/>
	);
}

function Footer({ className, ...props }: ComponentProps<"tfoot">) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cx(
				"bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
				className,
			)}
			{...props}
		/>
	);
}

function Row({ className, ...props }: ComponentProps<"tr">) {
	return (
		<tr
			data-slot="table-row"
			className={cx(
				"hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
				className,
			)}
			{...props}
		/>
	);
}

function Head({ className, ...props }: ComponentProps<"th">) {
	return (
		<th
			data-slot="table-head"
			className={cx(
				"text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	);
}

function Cell({ className, ...props }: ComponentProps<"td">) {
	return (
		<td
			data-slot="table-cell"
			className={cx(
				"p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	);
}

function Caption({ className, ...props }: React.ComponentProps<"caption">) {
	return (
		<caption
			data-slot="table-caption"
			className={cx("text-muted-foreground mt-4 text-sm", className)}
			{...props}
		/>
	);
}

export const Table = {
	Root,
	Header,
	Body,
	Footer,
	Row,
	Head,
	Cell,
	Caption,
};
