"use client";

import type {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	Table as TanStackTable,
	VisibilityState,
} from "@tanstack/react-table";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	ArrowDownIcon,
	ArrowUpDownIcon,
	ArrowUpIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";
import * as React from "react";
import { cx } from "../index";
import { Button } from "./button";
import { DropdownMenu } from "./dropdown-menu";
import { Input } from "./input";
import { Pagination } from "./pagination";
import { Table } from "./table";

// Types
interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	enableRowSelection?: boolean;
	enableColumnVisibility?: boolean;
	enableFiltering?: boolean;
	enablePagination?: boolean;
	enableSorting?: boolean;
	initialSorting?: SortingState;
	initialColumnFilters?: ColumnFiltersState;
	initialColumnVisibility?: VisibilityState;
	initialRowSelection?: Record<string, boolean>;
	pageSize?: number;
	filterPlaceholder?: string;
	onRowSelectionChange?: (selection: Record<string, boolean>) => void;
	createButton?: React.ReactNode;
	onCreateButtonClick?: () => void;
	createButtonText?: string;
}

// Column Header Component
interface DataTableColumnHeaderProps<TData>
	extends React.ComponentProps<"div"> {
	column: ReturnType<TanStackTable<TData>["getAllColumns"]>[number];
	title: string;
}

function ColumnHeader<TData>({
	column,
	title,
	className,
	...props
}: DataTableColumnHeaderProps<TData>) {
	if (!column.getCanSort()) {
		return (
			<div className={cx(className)} {...props}>
				{title}
			</div>
		);
	}

	return (
		<div className={cx("flex items-center space-x-2", className)} {...props}>
			<Button
				variant="ghost"
				size="sm"
				className={cx("-ml-3 h-8 data-state:bg-accent", "hover:bg-accent")}
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				<span>{title}</span>
				{column.getIsSorted() === "desc" ? (
					<ArrowDownIcon className="ml-2 size-4" />
				) : column.getIsSorted() === "asc" ? (
					<ArrowUpIcon className="ml-2 size-4" />
				) : (
					<ArrowUpDownIcon className="ml-2 size-4 opacity-50" />
				)}
			</Button>
		</div>
	);
}

// Pagination Component
interface DataTablePaginationProps<TData> {
	table: TanStackTable<TData>;
}

function DataTablePagination<TData>({
	table,
}: DataTablePaginationProps<TData>) {
	const rowSelectionEnabled = table.getState().rowSelection !== undefined;

	return (
		<div className="flex items-center justify-between px-2">
			{rowSelectionEnabled && (
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
			)}
			{!rowSelectionEnabled && <div className="flex-1" />}
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium">Rows per page</p>
					<select
						value={table.getState().pagination.pageSize}
						onChange={(e) => {
							table.setPageSize(Number(e.target.value));
						}}
						className={cx(
							"flex h-8 w-[70px] items-center justify-center rounded-md border border-input",
							"bg-background px-3 py-1 text-sm",
							"outline-none transition-colors",
							"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
							"disabled:cursor-not-allowed disabled:opacity-50",
						)}
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								{pageSize}
							</option>
						))}
					</select>
				</div>
				<div className="flex w-[100px] items-center justify-center text-sm font-medium">
					Page {table.getState().pagination.pageIndex + 1} of{" "}
					{table.getPageCount()}
				</div>
				<Pagination.Root className="mx-0 w-auto">
					<Pagination.Content>
						<Pagination.Item>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => table.setPageIndex(0)}
								disabled={!table.getCanPreviousPage()}
								className="h-9 w-9"
							>
								<span className="sr-only">Go to first page</span>
								<ChevronsLeftIcon className="size-4" />
							</Button>
						</Pagination.Item>
						<Pagination.Item>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
								className="h-9 w-9"
							>
								<span className="sr-only">Go to previous page</span>
								<ChevronLeftIcon className="size-4" />
							</Button>
						</Pagination.Item>
						<Pagination.Item>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
								className="h-9 w-9"
							>
								<span className="sr-only">Go to next page</span>
								<ChevronRightIcon className="size-4" />
							</Button>
						</Pagination.Item>
						<Pagination.Item>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => table.setPageIndex(table.getPageCount() - 1)}
								disabled={!table.getCanNextPage()}
								className="h-9 w-9"
							>
								<span className="sr-only">Go to last page</span>
								<ChevronsRightIcon className="size-4" />
							</Button>
						</Pagination.Item>
					</Pagination.Content>
				</Pagination.Root>
			</div>
		</div>
	);
}

// View Options Component
interface DataTableViewOptionsProps<TData> {
	table: TanStackTable<TData>;
}

function ViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				render={
					<Button variant="outline" className="ml-auto">
						Columns <ChevronDownIcon className="ml-2 size-4" />
					</Button>
				}
			/>
			<DropdownMenu.Positioner align="end">
				<DropdownMenu.Content>
					{table
						.getAllColumns()
						.filter((column) => column.getCanHide())
						.map((column) => {
							return (
								<DropdownMenu.CheckboxItem
									key={column.id}
									className="capitalize"
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(!!value)}
								>
									{column.id}
								</DropdownMenu.CheckboxItem>
							);
						})}
				</DropdownMenu.Content>
			</DropdownMenu.Positioner>
		</DropdownMenu.Root>
	);
}

// Main DataTable Component
function Root<TData, TValue>({
	columns,
	data,
	enableRowSelection = false,
	enableColumnVisibility = false,
	enableFiltering = false,
	enablePagination = true,
	enableSorting = false,
	initialSorting = [],
	initialColumnFilters = [],
	initialColumnVisibility = {},
	initialRowSelection = {},
	pageSize = 10,
	filterPlaceholder = "Filter...",
	onRowSelectionChange,
	createButton,
	onCreateButtonClick,
	createButtonText = "Create",
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>(initialSorting);
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>(initialColumnFilters);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>(initialColumnVisibility);
	const [rowSelection, setRowSelection] = React.useState<
		Record<string, boolean>
	>(enableRowSelection ? initialRowSelection : {});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: enablePagination
			? getPaginationRowModel()
			: undefined,
		getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
		getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: enableRowSelection
			? (updater) => {
					const newSelection =
						typeof updater === "function" ? updater(rowSelection) : updater;
					setRowSelection(newSelection);
					onRowSelectionChange?.(newSelection);
				}
			: undefined,
		enableRowSelection: enableRowSelection,
		state: {
			sorting: enableSorting ? sorting : undefined,
			columnFilters: enableFiltering ? columnFilters : undefined,
			columnVisibility: enableColumnVisibility ? columnVisibility : undefined,
			rowSelection: enableRowSelection ? rowSelection : undefined,
		},
		initialState: {
			pagination: {
				pageSize,
			},
			...(enableRowSelection && {
				rowSelection: initialRowSelection,
			}),
		},
	});

	// Get filterable column (first column with accessorKey)
	const filterableColumn = React.useMemo(() => {
		const firstColumn = columns.find(
			(col) => "accessorKey" in col && col.accessorKey,
		);
		return firstColumn && "accessorKey" in firstColumn
			? (firstColumn.accessorKey as string)
			: null;
	}, [columns]);

	return (
		<div className="w-full space-y-4">
			{(enableFiltering ||
				enableColumnVisibility ||
				createButton ||
				onCreateButtonClick) && (
				<div className="flex items-center justify-between py-4">
					<div className="flex items-center space-x-2">
						{enableFiltering && filterableColumn && (
							<Input
								placeholder={filterPlaceholder}
								value={
									(table
										.getColumn(filterableColumn)
										?.getFilterValue() as string) ?? ""
								}
								onChange={(event) =>
									table
										.getColumn(filterableColumn)
										?.setFilterValue(event.target.value)
								}
								className="max-w-sm"
							/>
						)}
					</div>
					<div className="flex items-center space-x-2">
						{enableColumnVisibility && <ViewOptions table={table} />}
						{createButton}
						{onCreateButtonClick && (
							<Button onClick={onCreateButtonClick}>{createButtonText}</Button>
						)}
					</div>
				</div>
			)}
			<div className="overflow-hidden rounded-md border">
				<Table.Root>
					<Table.Header>
						{table.getHeaderGroups().map((headerGroup) => (
							<Table.Row key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Table.Head key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</Table.Head>
									);
								})}
							</Table.Row>
						))}
					</Table.Header>
					<Table.Body>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<Table.Row
									key={row.id}
									data-state={
										enableRowSelection && row.getIsSelected()
											? "selected"
											: undefined
									}
								>
									{row.getVisibleCells().map((cell) => (
										<Table.Cell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</Table.Cell>
									))}
								</Table.Row>
							))
						) : (
							<Table.Row>
								<Table.Cell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</Table.Cell>
							</Table.Row>
						)}
					</Table.Body>
				</Table.Root>
			</div>
			{enablePagination && <DataTablePagination table={table} />}
		</div>
	);
}

export const DataTable = {
	Root,
	ColumnHeader,
	Pagination: DataTablePagination,
	ViewOptions,
};
