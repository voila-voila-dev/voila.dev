import { Autocomplete as AutocompletePrimitive } from "@base-ui-components/react/autocomplete";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Autocomplete } from "@voila.dev/ui/components/autocomplete";
import { Label } from "@voila.dev/ui/components/label";
import * as React from "react";

const meta = {
	title: "UI/Autocomplete",
	component: Autocomplete.Root,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Autocomplete.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

interface Tag {
	id: string;
	value: string;
}

const tags: Tag[] = [
	{ id: "t1", value: "feature" },
	{ id: "t2", value: "fix" },
	{ id: "t3", value: "bug" },
	{ id: "t4", value: "docs" },
	{ id: "t5", value: "internal" },
	{ id: "t6", value: "mobile" },
	{ id: "t7", value: "frontend" },
	{ id: "t8", value: "backend" },
	{ id: "t9", value: "performance" },
	{ id: "t10", value: "accessibility" },
];

export const Default: Story = {
	render: () => (
		<div className="w-full max-w-xs">
			<Autocomplete.Root items={tags}>
				<Label htmlFor="tags">Tags</Label>
				<Autocomplete.Input
					id="tags"
					placeholder="e.g. feature"
					className="mt-2"
				/>
				<Autocomplete.Body>
					<Autocomplete.Empty>No tags found.</Autocomplete.Empty>
					<Autocomplete.List>
						{(tag) => (
							<Autocomplete.Item key={tag.id} value={tag.value}>
								{tag.value}
							</Autocomplete.Item>
						)}
					</Autocomplete.List>
				</Autocomplete.Body>
			</Autocomplete.Root>
		</div>
	),
};

export const WithClear: Story = {
	render: () => (
		<div className="w-full max-w-xs">
			<Autocomplete.Root items={tags}>
				<Label htmlFor="tags">Tags</Label>
				<div className="mt-2 flex items-center gap-2 relative">
					<Autocomplete.Input
						id="tags"
						placeholder="e.g. feature"
						className="pe-8"
					/>
					<Autocomplete.Clear className="absolute right-2 top-1/2 -translate-y-1/2" />
				</div>
				<Autocomplete.Body>
					<Autocomplete.Empty>No tags found.</Autocomplete.Empty>
					<Autocomplete.List>
						{(tag) => (
							<Autocomplete.Item key={tag.id} value={tag.value}>
								{tag.value}
							</Autocomplete.Item>
						)}
					</Autocomplete.List>
				</Autocomplete.Body>
			</Autocomplete.Root>
		</div>
	),
};

export const AutoHighlight: Story = {
	render: () => (
		<div className="w-full max-w-xs">
			<Autocomplete.Root items={tags} autoHighlight>
				<Label htmlFor="tags">Tags</Label>
				<Autocomplete.Input
					id="tags"
					placeholder="e.g. feature"
					className="mt-2"
				/>
				<Autocomplete.Body>
					<Autocomplete.Empty>No tags found.</Autocomplete.Empty>
					<Autocomplete.List>
						{(tag) => (
							<Autocomplete.Item key={tag.id} value={tag.value}>
								{tag.value}
							</Autocomplete.Item>
						)}
					</Autocomplete.List>
				</Autocomplete.Body>
			</Autocomplete.Root>
		</div>
	),
};

interface TagGroup {
	value: string;
	items: Tag[];
}

const groupedTags: TagGroup[] = [
	{
		value: "Type",
		items: [
			{ id: "t1", value: "feature" },
			{ id: "t2", value: "fix" },
			{ id: "t3", value: "bug" },
			{ id: "t4", value: "docs" },
			{ id: "t5", value: "internal" },
			{ id: "t6", value: "mobile" },
		],
	},
	{
		value: "Component",
		items: [
			{ id: "c-accordion", value: "component: accordion" },
			{ id: "c-alert-dialog", value: "component: alert dialog" },
			{ id: "c-autocomplete", value: "component: autocomplete" },
			{ id: "c-avatar", value: "component: avatar" },
			{ id: "c-button", value: "component: button" },
		],
	},
];

export const Grouped: Story = {
	render: () => (
		<div className="w-full max-w-xs">
			<Autocomplete.Root items={groupedTags}>
				<Label htmlFor="tags">Tags</Label>
				<Autocomplete.Input
					id="tags"
					placeholder="e.g. feature"
					className="mt-2"
				/>
				<Autocomplete.Body>
					<Autocomplete.Empty>No tags found.</Autocomplete.Empty>
					<Autocomplete.List>
						{(group: TagGroup) => (
							<Autocomplete.Group key={group.value} items={group.items}>
								<Autocomplete.GroupLabel className="sticky top-0 z-1 uppercase">
									{group.value}
								</Autocomplete.GroupLabel>
								<Autocomplete.Collection>
									{(tag: Tag) => (
										<Autocomplete.Item key={tag.id} value={tag.value}>
											{tag.value}
										</Autocomplete.Item>
									)}
								</Autocomplete.Collection>
							</Autocomplete.Group>
						)}
					</Autocomplete.List>
				</Autocomplete.Body>
			</Autocomplete.Root>
		</div>
	),
};

interface Movie {
	id: string;
	title: string;
	year: number;
}

const top100Movies: Movie[] = [
	{ id: "1", title: "The Shawshank Redemption", year: 1994 },
	{ id: "2", title: "The Godfather", year: 1972 },
	{ id: "3", title: "The Dark Knight", year: 2008 },
	{ id: "4", title: "The Godfather Part II", year: 1974 },
	{ id: "5", title: "12 Angry Men", year: 1957 },
	{
		id: "6",
		title: "The Lord of the Rings: The Return of the King",
		year: 2003,
	},
	{ id: "7", title: "Schindler's List", year: 1993 },
	{ id: "8", title: "Pulp Fiction", year: 1994 },
	{
		id: "9",
		title: "The Lord of the Rings: The Fellowship of the Ring",
		year: 2001,
	},
	{ id: "10", title: "The Good, the Bad and the Ugly", year: 1966 },
	{ id: "11", title: "Forrest Gump", year: 1994 },
	{ id: "12", title: "The Lord of the Rings: The Two Towers", year: 2002 },
	{ id: "13", title: "Fight Club", year: 1999 },
	{ id: "14", title: "Inception", year: 2010 },
	{
		id: "15",
		title: "Star Wars: Episode V – The Empire Strikes Back",
		year: 1980,
	},
	{ id: "16", title: "The Matrix", year: 1999 },
	{ id: "17", title: "Goodfellas", year: 1990 },
	{ id: "18", title: "Interstellar", year: 2014 },
	{ id: "19", title: "One Flew Over the Cuckoo's Nest", year: 1975 },
	{ id: "20", title: "Se7en", year: 1995 },
];

async function searchMovies(
	query: string,
	filter: (item: string, query: string) => boolean,
): Promise<Movie[]> {
	// Simulate network delay
	await new Promise((resolve) => {
		setTimeout(resolve, Math.random() * 500 + 100);
	});

	// Simulate occasional network errors (1% chance)
	if (Math.random() < 0.01 || query === "will_error") {
		throw new Error("Network error");
	}

	return top100Movies.filter(
		(movie) =>
			filter(movie.title, query) || filter(movie.year.toString(), query),
	);
}

export const AsyncSearch: Story = {
	render: () => {
		const [searchValue, setSearchValue] = React.useState("");
		const [isLoading, setIsLoading] = React.useState(false);
		const [searchResults, setSearchResults] = React.useState<Movie[]>([]);
		const [error, setError] = React.useState<string | null>(null);
		const { contains } = AutocompletePrimitive.useFilter({
			sensitivity: "base",
		});

		React.useEffect(() => {
			if (!searchValue) {
				setSearchResults([]);
				setIsLoading(false);
				return undefined;
			}

			setIsLoading(true);
			setError(null);

			let ignore = false;

			async function fetchMovies() {
				try {
					const results = await searchMovies(searchValue, contains);
					if (!ignore) {
						setSearchResults(results);
					}
				} catch {
					if (!ignore) {
						setError("Failed to fetch movies. Please try again.");
						setSearchResults([]);
					}
				} finally {
					if (!ignore) {
						setIsLoading(false);
					}
				}
			}

			const timeoutId = setTimeout(fetchMovies, 300);

			return () => {
				clearTimeout(timeoutId);
				ignore = true;
			};
		}, [searchValue, contains]);

		let status: React.ReactNode = `${searchResults.length} result${searchResults.length === 1 ? "" : "s"} found`;

		if (isLoading) {
			status = (
				<React.Fragment>
					<div
						className="size-4 rounded-full border-2 border-gray-200 border-t-gray-600 animate-spin"
						aria-hidden
					/>
					Searching...
				</React.Fragment>
			);
		} else if (error) {
			status = error;
		} else if (searchResults.length === 0 && searchValue) {
			status = `Movie or year "${searchValue}" does not exist in the Top 100 IMDb movies`;
		}

		const shouldRenderPopup = searchValue !== "";

		return (
			<div className="w-full max-w-xs">
				<Autocomplete.Root
					items={searchResults}
					value={searchValue}
					onValueChange={setSearchValue}
					itemToStringValue={(item) => (item as Movie).title}
					filter={null}
				>
					<Label htmlFor="movies">Search movies by name or year</Label>
					<Autocomplete.Input
						id="movies"
						placeholder="e.g. Pulp Fiction or 1994"
						className="mt-2"
					/>
					{shouldRenderPopup && (
						<Autocomplete.Body>
							<Autocomplete.Status className="flex items-center gap-2">
								{status}
							</Autocomplete.Status>
							<Autocomplete.List>
								{(movie: Movie) => (
									<Autocomplete.Item key={movie.id} value={movie}>
										<div className="flex w-full flex-col gap-1">
											<div className="font-medium leading-5">{movie.title}</div>
											<div className="text-sm leading-4 opacity-80">
												{movie.year}
											</div>
										</div>
									</Autocomplete.Item>
								)}
							</Autocomplete.List>
						</Autocomplete.Body>
					)}
				</Autocomplete.Root>
			</div>
		);
	},
};

export const InlineAutocomplete: Story = {
	render: () => (
		<div className="w-full max-w-xs">
			<Autocomplete.Root items={tags} mode="both">
				<Label htmlFor="tags-inline">Search tags</Label>
				<Autocomplete.Input
					id="tags-inline"
					placeholder="e.g. feature"
					className="mt-2"
				/>
				<Autocomplete.Body>
					<Autocomplete.Empty>No tags found.</Autocomplete.Empty>
					<Autocomplete.List>
						{(tag) => (
							<Autocomplete.Item key={tag.id} value={tag.value}>
								{tag.value}
							</Autocomplete.Item>
						)}
					</Autocomplete.List>
				</Autocomplete.Body>
			</Autocomplete.Root>
		</div>
	),
};

interface FuzzyItem {
	title: string;
	description: string;
	category: string;
}

const fuzzyItems: FuzzyItem[] = [
	{
		title: "React Hooks Guide",
		description:
			"Learn how to use React Hooks like useState, useEffect, and custom hooks",
		category: "React",
	},
	{
		title: "JavaScript Array Methods",
		description:
			"Master array methods like map, filter, reduce, and forEach in JavaScript",
		category: "JavaScript",
	},
	{
		title: "CSS Flexbox Layout",
		description: "Complete guide to CSS Flexbox for responsive web design",
		category: "CSS",
	},
	{
		title: "TypeScript Interfaces",
		description: "Understanding TypeScript interfaces and type definitions",
		category: "TypeScript",
	},
	{
		title: "React Performance Optimization",
		description:
			"Tips and techniques for optimizing React application performance",
		category: "React",
	},
	{
		title: "HTML Semantic Elements",
		description:
			"Using semantic HTML elements for better accessibility and SEO",
		category: "HTML",
	},
	{
		title: "Node.js Express Server",
		description: "Building RESTful APIs with Node.js and Express framework",
		category: "Node.js",
	},
	{
		title: "Vue Composition API",
		description: "Modern Vue.js development using the Composition API",
		category: "Vue.js",
	},
	{
		title: "Angular Components",
		description: "Creating reusable Angular components with TypeScript",
		category: "Angular",
	},
	{
		title: "Python Django Framework",
		description: "Web development with Python Django framework",
		category: "Python",
	},
];

function highlightText(text: string, query: string): React.ReactNode {
	const trimmed = query.trim();
	if (!trimmed) {
		return text;
	}

	const limited = trimmed.slice(0, 100);
	const escaped = limited.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const regex = new RegExp(`(${escaped})`, "gi");

	return text.split(regex).map((part, idx) =>
		regex.test(part) ? (
			<mark key={idx} className="text-blue-800 bg-transparent font-bold">
				{part}
			</mark>
		) : (
			part
		),
	);
}

// Note: This example requires 'match-sorter' package
// Install with: bun add match-sorter
export const FuzzyMatching: Story = {
	render: () => {
		const [searchValue, setSearchValue] = React.useState("");

		function fuzzyFilter(itemValue: unknown, query: string): boolean {
			if (!query) {
				return true;
			}

			const item = itemValue as FuzzyItem;
			// Simple implementation - in production use match-sorter
			const queryLower = query.toLowerCase();
			return (
				item.title.toLowerCase().includes(queryLower) ||
				item.description.toLowerCase().includes(queryLower) ||
				item.category.toLowerCase().includes(queryLower)
			);
		}

		return (
			<div className="w-full max-w-xs">
				<Autocomplete.Root
					items={fuzzyItems}
					filter={fuzzyFilter}
					itemToStringValue={(item) => (item as FuzzyItem).title}
					value={searchValue}
					onValueChange={setSearchValue}
				>
					<Label htmlFor="fuzzy">Fuzzy search documentation</Label>
					<Autocomplete.Input
						id="fuzzy"
						placeholder="e.g. React"
						className="mt-2"
					/>
					<Autocomplete.Body>
						<Autocomplete.Empty>
							No results found for "{searchValue}"
						</Autocomplete.Empty>
						<Autocomplete.List>
							{(item: FuzzyItem) => (
								<Autocomplete.Item key={item.title} value={item}>
									<div className="flex w-full flex-col gap-1">
										<div className="flex items-center justify-between gap-3">
											<div className="flex-1 font-medium leading-5">
												{highlightText(item.title, searchValue)}
											</div>
										</div>
										<div className="text-sm leading-4 opacity-80">
											{highlightText(item.description, searchValue)}
										</div>
									</div>
								</Autocomplete.Item>
							)}
						</Autocomplete.List>
					</Autocomplete.Body>
				</Autocomplete.Root>
			</div>
		);
	},
};

const allTags: Tag[] = [
	...tags,
	{ id: "t11", value: "design" },
	{ id: "t12", value: "research" },
	{ id: "t13", value: "testing" },
	{ id: "t14", value: "infrastructure" },
	{ id: "t15", value: "documentation" },
	{ id: "c-accordion", value: "component: accordion" },
	{ id: "c-alert-dialog", value: "component: alert dialog" },
	{ id: "c-autocomplete", value: "component: autocomplete" },
	{ id: "c-avatar", value: "component: avatar" },
	{ id: "c-checkbox", value: "component: checkbox" },
	{ id: "c-checkbox-group", value: "component: checkbox group" },
	{ id: "c-collapsible", value: "component: collapsible" },
	{ id: "c-combobox", value: "component: combobox" },
	{ id: "c-context-menu", value: "component: context menu" },
	{ id: "c-dialog", value: "component: dialog" },
	{ id: "c-field", value: "component: field" },
	{ id: "c-fieldset", value: "component: fieldset" },
	{ id: "c-filterable-menu", value: "component: filterable menu" },
	{ id: "c-form", value: "component: form" },
	{ id: "c-input", value: "component: input" },
	{ id: "c-menu", value: "component: menu" },
	{ id: "c-menubar", value: "component: menubar" },
	{ id: "c-meter", value: "component: meter" },
	{ id: "c-navigation-menu", value: "component: navigation menu" },
	{ id: "c-number-field", value: "component: number field" },
	{ id: "c-popover", value: "component: popover" },
	{ id: "c-preview-card", value: "component: preview card" },
	{ id: "c-progress", value: "component: progress" },
	{ id: "c-radio", value: "component: radio" },
	{ id: "c-scroll-area", value: "component: scroll area" },
	{ id: "c-select", value: "component: select" },
	{ id: "c-separator", value: "component: separator" },
	{ id: "c-slider", value: "component: slider" },
	{ id: "c-switch", value: "component: switch" },
	{ id: "c-tabs", value: "component: tabs" },
	{ id: "c-toast", value: "component: toast" },
	{ id: "c-toggle", value: "component: toggle" },
	{ id: "c-toggle-group", value: "component: toggle group" },
	{ id: "c-toolbar", value: "component: toolbar" },
	{ id: "c-tooltip", value: "component: tooltip" },
];

export const LimitResults: Story = {
	render: () => {
		const [value, setValue] = React.useState("");
		const limit = 8;
		const { contains } = AutocompletePrimitive.useFilter({
			sensitivity: "base",
		});

		const totalMatches = React.useMemo(() => {
			const trimmed = value.trim();
			if (!trimmed) {
				return allTags.length;
			}
			return allTags.filter((t) => contains(t.value, trimmed)).length;
		}, [value, contains]);

		const moreCount = Math.max(0, totalMatches - limit);

		return (
			<div className="w-full max-w-xs">
				<Autocomplete.Root
					items={allTags}
					value={value}
					onValueChange={setValue}
					limit={limit}
				>
					<Label htmlFor="tags-limit">Limit results to 8</Label>
					<Autocomplete.Input
						id="tags-limit"
						placeholder="e.g. component"
						className="mt-2"
					/>
					<Autocomplete.Body>
						<Autocomplete.Empty>
							No results found for "{value}"
						</Autocomplete.Empty>
						<Autocomplete.List>
							{(tag) => (
								<Autocomplete.Item key={tag.id} value={tag.value}>
									{tag.value}
								</Autocomplete.Item>
							)}
						</Autocomplete.List>
						<Autocomplete.Status>
							{moreCount > 0
								? `Hiding ${moreCount} results (type a more specific query to narrow results)`
								: null}
						</Autocomplete.Status>
					</Autocomplete.Body>
				</Autocomplete.Root>
			</div>
		);
	},
};
