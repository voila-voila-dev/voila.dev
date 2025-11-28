"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui-components/react/alert-dialog";
import type { ComponentProps } from "react";

import { cx } from "../index";
import { Button } from "./button";

function Root(props: AlertDialogPrimitive.Root.Props) {
	return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function Trigger(props: AlertDialogPrimitive.Trigger.Props) {
	return (
		<AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
	);
}

function Portal(props: AlertDialogPrimitive.Portal.Props) {
	return (
		<AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
	);
}

function Overlay({ className, ...props }: AlertDialogPrimitive.Backdrop.Props) {
	return (
		<AlertDialogPrimitive.Backdrop
			data-slot="alert-dialog-overlay"
			className={cx(
				"fixed inset-0 z-50 bg-black/50",
				"data-open:animate-in data-open:fade-in-0",
				"data-closed:animate-out data-closed:fade-out-0 data-closed:animation-duration-[200ms]",
				className,
			)}
			{...props}
		/>
	);
}

function Content({ className, ...props }: AlertDialogPrimitive.Popup.Props) {
	return (
		<Portal>
			<Overlay />
			<AlertDialogPrimitive.Popup
				data-slot="alert-dialog-content"
				className={cx(
					"fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)]",
					"translate-x-[-50%] translate-y-[-50%]",
					"gap-4 rounded-lg border bg-background p-6 shadow-lg",
					"data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
					"data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
					"duration-200 sm:max-w-lg",
					className,
				)}
				{...props}
			/>
		</Portal>
	);
}

function Header({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			className={cx("flex flex-col gap-2 text-center sm:text-left", className)}
			{...props}
		/>
	);
}

function Footer({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			className={cx(
				"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
				className,
			)}
			{...props}
		/>
	);
}

function Title({ className, ...props }: AlertDialogPrimitive.Title.Props) {
	return (
		<AlertDialogPrimitive.Title
			className={cx("text-lg font-semibold", className)}
			{...props}
		/>
	);
}

function Description({
	className,
	...props
}: AlertDialogPrimitive.Description.Props) {
	return (
		<AlertDialogPrimitive.Description
			className={cx("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}

function Action({
	...props
}: ComponentProps<typeof AlertDialogPrimitive.Close> &
	ComponentProps<typeof Button>) {
	return <AlertDialogPrimitive.Close render={<Button {...props} />} />;
}

function Cancel({
	...props
}: ComponentProps<typeof AlertDialogPrimitive.Close> &
	ComponentProps<typeof Button>) {
	return (
		<AlertDialogPrimitive.Close
			render={<Button variant="outline" {...props} />}
		/>
	);
}

export const AlertDialog = {
	Root,
	Trigger,
	Content,
	Header,
	Footer,
	Title,
	Description,
	Action,
	Cancel,
};
