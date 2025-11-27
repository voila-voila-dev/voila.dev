import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@voila.dev/ui/components/badge";
import { Button } from "@voila.dev/ui/components/button";
import { Checkbox } from "@voila.dev/ui/components/checkbox";
import { DataTable } from "@voila.dev/ui/components/data-table";
import { DropdownMenu } from "@voila.dev/ui/components/dropdown-menu";
import { useCopyToClipboard } from "@voila.dev/ui/hooks/use-copy-to-clipboard";
import { Ellipsis, Plus } from "@voila.dev/ui/icons";
import * as React from "react";

const meta = {
	title: "UI/DataTable",
	component: DataTable.Root,
	parameters: {
		layout: "padded",
	},
} satisfies Meta<typeof DataTable.Root>;

export default meta;
type Story = StoryObj<typeof DataTable.Root>;

// Types
export type Payment = {
	id: string;
	amount: number;
	status: "pending" | "processing" | "success" | "failed";
	email: string;
};

// Actions Cell Component
function ActionsCell({ payment }: { payment: Payment }) {
	const { copyToClipboard } = useCopyToClipboard();

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				render={
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<Ellipsis className="h-4 w-4" />
					</Button>
				}
			/>
			<DropdownMenu.Positioner align="end">
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>Actions</DropdownMenu.Label>
						<DropdownMenu.Item onClick={() => copyToClipboard(payment.id)}>
							Copy payment ID
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>View customer</DropdownMenu.Item>
						<DropdownMenu.Item>View payment details</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Positioner>
		</DropdownMenu.Root>
	);
}

// Sample data
const generatePayments = (count: number): Payment[] => {
	const statuses: Payment["status"][] = [
		"pending",
		"processing",
		"success",
		"failed",
	];
	return Array.from({ length: count }, (_, i) => ({
		id: `m5gr84i${i}`,
		amount: Math.floor(Math.random() * 1000) + 100,
		status: statuses[
			Math.floor(Math.random() * statuses.length)
		] as Payment["status"],
		email: `user${i}@example.com`,
	}));
};

const payments: Payment[] = [
	{
		id: "m5gr84i9",
		amount: 316,
		status: "success",
		email: "ken99@example.com",
	},
	{
		id: "3u1reuv4",
		amount: 242,
		status: "success",
		email: "Abe45@example.com",
	},
	{
		id: "derv1ws0",
		amount: 837,
		status: "processing",
		email: "Monserrat44@example.com",
	},
	{
		id: "5kma53ae",
		amount: 874,
		status: "success",
		email: "Silas22@example.com",
	},
	{
		id: "bhqecj4p",
		amount: 721,
		status: "failed",
		email: "carmella@example.com",
	},
];

// Status options for SelectFilter
const statusOptions = [
	{ label: "Pending", value: "pending" },
	{ label: "Processing", value: "processing" },
	{ label: "Success", value: "success" },
	{ label: "Failed", value: "failed" },
];

// Basic columns (no features)
const basicColumns: ColumnDef<Payment>[] = [
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("status")}</div>
		),
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amount"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);
			return <div className="text-right font-medium">{formatted}</div>;
		},
	},
];

// Columns with row selection
const selectableColumns: ColumnDef<Payment>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				data-indeterminate={
					table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	...basicColumns,
];

// Columns with sorting
const sortableColumns: ColumnDef<Payment>[] = [
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTable.ColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const status = row.getValue("status") as Payment["status"];
			return (
				<Badge
					variant={
						status === "success"
							? "default"
							: status === "failed"
								? "destructive"
								: "secondary"
					}
					className="capitalize"
				>
					{status}
				</Badge>
			);
		},
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTable.ColumnHeader column={column} title="Email" />
		),
		cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
	},
	{
		accessorKey: "amount",
		header: ({ column }) => (
			<DataTable.ColumnHeader column={column} title="Amount" />
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amount"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);
			return <div className="text-right font-medium">{formatted}</div>;
		},
	},
];

// Columns with row actions
const columnsWithActions: ColumnDef<Payment>[] = [
	...selectableColumns,
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const payment = row.original;
			return <ActionsCell payment={payment} />;
		},
	},
];

// Full featured columns
const fullFeaturedColumns: ColumnDef<Payment>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				data-indeterminate={
					table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTable.ColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const status = row.getValue("status") as Payment["status"];
			return (
				<Badge
					variant={
						status === "success"
							? "default"
							: status === "failed"
								? "destructive"
								: "secondary"
					}
					className="capitalize"
				>
					{status}
				</Badge>
			);
		},
		filterFn: (row, id, value) => {
			return value === row.getValue(id);
		},
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTable.ColumnHeader column={column} title="Email" />
		),
		cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
	},
	{
		accessorKey: "amount",
		header: ({ column }) => (
			<DataTable.ColumnHeader column={column} title="Amount" />
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amount"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);
			return <div className="text-right font-medium">{formatted}</div>;
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const payment = row.original;
			return <ActionsCell payment={payment} />;
		},
	},
];

export const Basic: Story = {
	render: () => (
		<DataTable.Root columns={basicColumns} data={payments}>
			<DataTable.Body />
		</DataTable.Root>
	),
};

export const WithPagination: Story = {
	render: () => (
		<DataTable.Root
			columns={basicColumns}
			data={generatePayments(25)}
			pageSize={10}
		>
			<DataTable.Body />
			<DataTable.Footer>
				<DataTable.Pagination />
			</DataTable.Footer>
		</DataTable.Root>
	),
};

export const WithSorting: Story = {
	render: () => (
		<DataTable.Root
			columns={sortableColumns}
			data={payments}
			enableSorting={true}
		>
			<DataTable.Body />
		</DataTable.Root>
	),
};

export const WithFiltering: Story = {
	render: () => (
		<DataTable.Root columns={basicColumns} data={payments}>
			<DataTable.Header>
				<DataTable.HeaderGroup>
					<DataTable.SearchInput
						columnId="email"
						placeholder="Filter emails..."
					/>
				</DataTable.HeaderGroup>
			</DataTable.Header>
			<DataTable.Body />
		</DataTable.Root>
	),
};

export const WithSelectFilter: Story = {
	render: () => (
		<DataTable.Root
			columns={fullFeaturedColumns}
			data={payments}
			enableSorting={true}
		>
			<DataTable.Header>
				<DataTable.HeaderGroup>
					<DataTable.SelectFilter
						columnId="status"
						options={statusOptions}
						placeholder="All statuses"
					/>
				</DataTable.HeaderGroup>
			</DataTable.Header>
			<DataTable.Body />
		</DataTable.Root>
	),
};

export const WithMultipleFilters: Story = {
	render: () => (
		<DataTable.Root
			columns={fullFeaturedColumns}
			data={generatePayments(30)}
			enableSorting={true}
		>
			<DataTable.Header>
				<DataTable.HeaderGroup>
					<DataTable.SearchInput
						columnId="email"
						placeholder="Search emails..."
					/>
					<DataTable.SelectFilter
						columnId="status"
						options={statusOptions}
						placeholder="All statuses"
					/>
				</DataTable.HeaderGroup>
			</DataTable.Header>
			<DataTable.Body />
			<DataTable.Footer>
				<DataTable.Pagination />
			</DataTable.Footer>
		</DataTable.Root>
	),
};

export const WithColumnVisibility: Story = {
	render: () => (
		<DataTable.Root
			columns={basicColumns}
			data={payments}
			enableColumnVisibility={true}
		>
			<DataTable.Header>
				<DataTable.HeaderGroup />
				<DataTable.HeaderGroup>
					<DataTable.ColumnToggle />
				</DataTable.HeaderGroup>
			</DataTable.Header>
			<DataTable.Body />
		</DataTable.Root>
	),
};

export const WithRowSelection: Story = {
	render: () => (
		<DataTable.Root
			columns={selectableColumns}
			data={payments}
			enableRowSelection={true}
		>
			<DataTable.Body />
		</DataTable.Root>
	),
};

export const WithRowActions: Story = {
	render: () => (
		<DataTable.Root
			columns={columnsWithActions}
			data={payments}
			enableRowSelection={true}
		>
			<DataTable.Body />
		</DataTable.Root>
	),
};

export const FullFeatured: Story = {
	render: () => (
		<DataTable.Root
			columns={fullFeaturedColumns}
			data={generatePayments(50)}
			enableRowSelection={true}
			enableColumnVisibility={true}
			enableSorting={true}
			pageSize={10}
		>
			<DataTable.Header>
				<DataTable.HeaderGroup>
					<DataTable.SearchInput
						columnId="email"
						placeholder="Filter emails..."
					/>
					<DataTable.SelectFilter
						columnId="status"
						options={statusOptions}
						placeholder="All statuses"
					/>
				</DataTable.HeaderGroup>
				<DataTable.HeaderGroup>
					<DataTable.ColumnToggle />
				</DataTable.HeaderGroup>
			</DataTable.Header>
			<DataTable.Body />
			<DataTable.Footer>
				<DataTable.Pagination />
			</DataTable.Footer>
		</DataTable.Root>
	),
};

export const CustomCellFormatting: Story = {
	render: () => {
		const customColumns: ColumnDef<Payment>[] = [
			{
				accessorKey: "status",
				header: "Status",
				cell: ({ row }) => {
					const status = row.getValue("status") as Payment["status"];
					return (
						<Badge
							variant={
								status === "success"
									? "default"
									: status === "failed"
										? "destructive"
										: "secondary"
							}
							className="capitalize"
						>
							{status}
						</Badge>
					);
				},
			},
			{
				accessorKey: "email",
				header: "Email",
				cell: ({ row }) => (
					<div className="lowercase font-mono text-sm">
						{row.getValue("email")}
					</div>
				),
			},
			{
				accessorKey: "amount",
				header: () => <div className="text-right">Amount</div>,
				cell: ({ row }) => {
					const amount = parseFloat(row.getValue("amount"));
					const formatted = new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(amount);
					return <div className="text-right font-medium">{formatted}</div>;
				},
			},
		];

		return (
			<DataTable.Root columns={customColumns} data={payments}>
				<DataTable.Body />
			</DataTable.Root>
		);
	},
};

export const EmptyState: Story = {
	render: () => (
		<DataTable.Root columns={basicColumns} data={[]}>
			<DataTable.Body
				emptyState={
					<DataTable.EmptyState>
						<p className="text-muted-foreground">No payments found.</p>
					</DataTable.EmptyState>
				}
			/>
		</DataTable.Root>
	),
};

export const LargeDataset: Story = {
	render: () => (
		<DataTable.Root
			columns={fullFeaturedColumns}
			data={generatePayments(100)}
			enableRowSelection={true}
			enableColumnVisibility={true}
			enableSorting={true}
			pageSize={20}
		>
			<DataTable.Header>
				<DataTable.HeaderGroup>
					<DataTable.SearchInput
						columnId="email"
						placeholder="Filter emails..."
					/>
					<DataTable.SelectFilter
						columnId="status"
						options={statusOptions}
						placeholder="All statuses"
					/>
				</DataTable.HeaderGroup>
				<DataTable.HeaderGroup>
					<DataTable.ColumnToggle />
				</DataTable.HeaderGroup>
			</DataTable.Header>
			<DataTable.Body />
			<DataTable.Footer>
				<DataTable.Pagination />
			</DataTable.Footer>
		</DataTable.Root>
	),
};

export const WithoutPagination: Story = {
	render: () => (
		<DataTable.Root
			columns={sortableColumns}
			data={payments}
			enableSorting={true}
		>
			<DataTable.Body />
		</DataTable.Root>
	),
};

export const WithInitialSorting: Story = {
	render: () => (
		<DataTable.Root
			columns={sortableColumns}
			data={payments}
			enableSorting={true}
			initialSorting={[{ id: "amount", desc: true }]}
		>
			<DataTable.Body />
		</DataTable.Root>
	),
};

export const WithInitialFilters: Story = {
	render: () => (
		<DataTable.Root
			columns={basicColumns}
			data={payments}
			initialColumnFilters={[{ id: "email", value: "ken" }]}
		>
			<DataTable.Header>
				<DataTable.HeaderGroup>
					<DataTable.SearchInput
						columnId="email"
						placeholder="Filter emails..."
					/>
				</DataTable.HeaderGroup>
			</DataTable.Header>
			<DataTable.Body />
		</DataTable.Root>
	),
};

export const WithInitialColumnVisibility: Story = {
	render: () => (
		<DataTable.Root
			columns={basicColumns}
			data={payments}
			enableColumnVisibility={true}
			initialColumnVisibility={{ amount: false }}
		>
			<DataTable.Header>
				<DataTable.HeaderGroup />
				<DataTable.HeaderGroup>
					<DataTable.ColumnToggle />
				</DataTable.HeaderGroup>
			</DataTable.Header>
			<DataTable.Body />
		</DataTable.Root>
	),
};

export const WithInitialRowSelection: Story = {
	render: () => (
		<DataTable.Root
			columns={selectableColumns}
			data={payments}
			enableRowSelection={true}
			initialRowSelection={{ "0": true, "2": true }}
		>
			<DataTable.Body />
		</DataTable.Root>
	),
};

export const WithRowSelectionCallback: Story = {
	render: () => {
		const [selectedRows, setSelectedRows] = React.useState<
			Record<string, boolean>
		>({});

		return (
			<div className="space-y-4">
				<DataTable.Root
					columns={selectableColumns}
					data={payments}
					enableRowSelection={true}
					onRowSelectionChange={setSelectedRows}
				>
					<DataTable.Body />
				</DataTable.Root>
				<div className="rounded-md border p-4">
					<h3 className="font-semibold mb-2">Selected Rows:</h3>
					<pre className="text-sm">{JSON.stringify(selectedRows, null, 2)}</pre>
				</div>
			</div>
		);
	},
};

export const WithHeaderActions: Story = {
	render: () => (
		<DataTable.Root columns={basicColumns} data={payments}>
			<DataTable.Header>
				<DataTable.HeaderGroup>
					<DataTable.SearchInput
						columnId="email"
						placeholder="Search payments..."
					/>
				</DataTable.HeaderGroup>
				<DataTable.HeaderGroup>
					<Button>
						<Plus className="mr-2 h-4 w-4" />
						Add Payment
					</Button>
				</DataTable.HeaderGroup>
			</DataTable.Header>
			<DataTable.Body />
		</DataTable.Root>
	),
};

export const WithSelectedCount: Story = {
	render: () => (
		<DataTable.Root
			columns={selectableColumns}
			data={payments}
			enableRowSelection={true}
		>
			<DataTable.Header>
				<DataTable.HeaderGroup>
					<DataTable.SelectedCount />
				</DataTable.HeaderGroup>
			</DataTable.Header>
			<DataTable.Body />
		</DataTable.Root>
	),
};

export const FullComposable: Story = {
	render: () => (
		<DataTable.Root
			columns={fullFeaturedColumns}
			data={generatePayments(30)}
			enableRowSelection={true}
			enableColumnVisibility={true}
			enableSorting={true}
			pageSize={10}
		>
			<DataTable.Header>
				<DataTable.HeaderGroup>
					<DataTable.SearchInput
						columnId="email"
						placeholder="Search by email..."
					/>
					<DataTable.SelectFilter
						columnId="status"
						options={statusOptions}
						placeholder="All statuses"
					/>
					<DataTable.SelectedCount />
				</DataTable.HeaderGroup>
				<DataTable.HeaderGroup>
					<DataTable.ColumnToggle />
					<Button>
						<Plus className="mr-2 h-4 w-4" />
						Create
					</Button>
				</DataTable.HeaderGroup>
			</DataTable.Header>
			<DataTable.Body />
			<DataTable.Footer>
				<DataTable.Pagination />
			</DataTable.Footer>
		</DataTable.Root>
	),
};
