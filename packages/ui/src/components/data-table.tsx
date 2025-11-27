"use client";

import type {
	ColumnDef,
	ColumnFiltersState,
	Row,
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
type DataTableContextValue<TData> = {
	table: TanStackTable<TData>;
	enableRowSelection: boolean;
};

// Context
const DataTableContext =
	React.createContext<DataTableContextValue<unknown> | null>(null);

function useDataTable<TData>() {
	const context = React.useContext(
		DataTableContext,
	) as DataTableContextValue<TData> | null;
	if (!context) {
		throw new Error("useDataTable must be used within DataTable.Provider");
	}
	return context;
}

// Provider Component
interface ProviderProps<TData, TValue> {
	children: React.ReactNode;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	enableRowSelection?: boolean;
	enableSorting?: boolean;
	enableFiltering?: boolean;
	enableColumnVisibility?: boolean;
	enablePagination?: boolean;
	initialSorting?: SortingState;
	initialColumnFilters?: ColumnFiltersState;
	initialColumnVisibility?: VisibilityState;
	initialRowSelection?: Record<string, boolean>;
	pageSize?: number;
	onRowSelectionChange?: (selection: Record<string, boolean>) => void;
}

function Provider<TData, TValue>({
	children,
	columns,
	data,
	enableRowSelection = false,
	enableSorting = false,
	enableFiltering = false,
	enableColumnVisibility = false,
	enablePagination = true,
	initialSorting = [],
	initialColumnFilters = [],
	initialColumnVisibility = {},
	initialRowSelection = {},
	pageSize = 10,
	onRowSelectionChange,
}: ProviderProps<TData, TValue>) {
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

	const contextValue = React.useMemo(
		() => ({
			table,
			enableRowSelection,
		}),
		[table, enableRowSelection],
	);

	return (
		<DataTableContext.Provider
			value={contextValue as DataTableContextValue<unknown>}
		>
			{children}
		</DataTableContext.Provider>
	);
}

// Root Component
function Root({ className, children, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="data-table"
			className={cx("w-full space-y-4", className)}
			{...props}
		>
			{children}
		</div>
	);
}

// Header Component (toolbar container)
function Header({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="data-table-header"
			className={cx("flex items-center justify-between gap-4 py-4", className)}
			{...props}
		>
			{children}
		</div>
	);
}

// HeaderGroup Component
function HeaderGroup({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="data-table-header-group"
			className={cx("flex items-center gap-2", className)}
			{...props}
		>
			{children}
		</div>
	);
}

// SearchInput Component
interface SearchInputProps
	extends Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> {
	columnId: string;
}

function SearchInput({ columnId, className, ...props }: SearchInputProps) {
	const { table } = useDataTable();
	const column = table.getColumn(columnId);

	if (!column) {
		return null;
	}

	return (
		<Input
			data-slot="data-table-search-input"
			value={(column.getFilterValue() as string) ?? ""}
			onChange={(event) => column.setFilterValue(event.target.value)}
			className={cx("max-w-sm", className)}
			{...props}
		/>
	);
}

// ColumnToggle Component
function ColumnToggle({
	className,
	...props
}: React.ComponentProps<typeof Button>) {
	const { table } = useDataTable();

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				render={
					<Button
						data-slot="data-table-column-toggle"
						variant="outline"
						className={cx("ml-auto", className)}
						{...props}
					>
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

// Content Component (table wrapper)
function Content({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="data-table-content"
			className={cx("overflow-hidden rounded-md border", className)}
			{...props}
		>
			{children}
		</div>
	);
}

// Body Component (renders the actual table)
interface BodyProps<TData>
	extends Omit<React.ComponentProps<"div">, "children"> {
	children?: (row: Row<TData>) => React.ReactNode;
	emptyState?: React.ReactNode;
}

function Body<TData>({
	className,
	children,
	emptyState,
	...props
}: BodyProps<TData>) {
	const { table, enableRowSelection } = useDataTable<TData>();
	const rows = table.getRowModel().rows;
	const columns = table.getAllColumns();

	return (
		<div data-slot="data-table-body" className={className} {...props}>
			<Table.Root>
				<Table.Header>
					{table.getHeaderGroups().map((headerGroup) => (
						<Table.Row key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<Table.Head key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</Table.Head>
							))}
						</Table.Row>
					))}
				</Table.Header>
				<Table.Body>
					{rows.length > 0 ? (
						rows.map((row) => (
							<Table.Row
								key={row.id}
								data-state={
									enableRowSelection && row.getIsSelected()
										? "selected"
										: undefined
								}
							>
								{children
									? children(row)
									: row
											.getVisibleCells()
											.map((cell) => (
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
							<Table.Cell colSpan={columns.length} className="h-24 text-center">
								{emptyState ?? "No results."}
							</Table.Cell>
						</Table.Row>
					)}
				</Table.Body>
			</Table.Root>
		</div>
	);
}

// DataTablePagination Component
function DataTablePagination({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { table, enableRowSelection } = useDataTable();

	return (
		<div
			data-slot="data-table-pagination"
			className={cx("flex items-center justify-between px-2", className)}
			{...props}
		>
			{enableRowSelection ? (
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
			) : (
				<div className="flex-1" />
			)}
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

// ColumnHeader Component (for sortable headers)
interface ColumnHeaderProps<TData> extends React.ComponentProps<"div"> {
	column: ReturnType<TanStackTable<TData>["getAllColumns"]>[number];
	title: string;
}

function ColumnHeader<TData>({
	column,
	title,
	className,
	...props
}: ColumnHeaderProps<TData>) {
	if (!column.getCanSort()) {
		return (
			<div
				data-slot="data-table-column-header"
				className={cx(className)}
				{...props}
			>
				{title}
			</div>
		);
	}

	return (
		<div
			data-slot="data-table-column-header"
			className={cx("flex items-center space-x-2", className)}
			{...props}
		>
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

// EmptyState Component
function EmptyState({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="data-table-empty-state"
			className={cx(
				"flex flex-col items-center justify-center py-10 text-center",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

// SelectedCount Component (shows selection count)
function SelectedCount({ className, ...props }: React.ComponentProps<"div">) {
	const { table } = useDataTable();

	return (
		<div
			data-slot="data-table-selected-count"
			className={cx("text-sm text-muted-foreground", className)}
			{...props}
		>
			{table.getFilteredSelectedRowModel().rows.length} of{" "}
			{table.getFilteredRowModel().rows.length} row(s) selected.
		</div>
	);
}

export const DataTable = {
	Provider,
	Root,
	Header,
	HeaderGroup,
	SearchInput,
	ColumnToggle,
	Content,
	Body,
	Pagination: DataTablePagination,
	ColumnHeader,
	EmptyState,
	SelectedCount,
};

export { useDataTable };
