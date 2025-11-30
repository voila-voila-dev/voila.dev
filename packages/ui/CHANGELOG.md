# @voila.dev/ui

## 1.0.15

- Remove data-table component

## 1.0.14

### Minor Changes

- Refactor DataTable component to be fully composable with a cleaner API structure:
  - Merge `Provider` and `Root` into single `Root` component
  - Merge `Content` and `Body` into single `Body` component
  - Add `Footer` component for pagination and footer content
  - Add `SelectFilter` component for filtering by predefined options
  - Remove `enableFiltering` and `enablePagination` props (now implicit based on component usage)
  - Consistent structure: `Root` → `Header` → `Body` → `Footer`
- New sub-components: `SelectFilter`, `Footer`
- Export `useDataTable` hook for custom integrations

## 1.0.13

### Patch Changes

- Add `onCreateButtonClick` and `createButtonText` props to DataTable component for better create button handling
- Use Button component internally for create button instead of custom React.ReactNode

## 1.0.12

### Patch Changes

- Fix select props

## 1.0.11

### Patch Changes

- Refac field components

## 1.0.10

- Icons name fix
- Button type fix

## 1.0.9

- Revert and publish typescript files

## 1.0.8

### Patch Changes

- Build artifacts

## 1.0.7

Refactor icons in the sidebar

## 1.0.6

### Patch Changes

- Refactor icon imports to use consistent naming (XIcon -> X, Loader2Icon -> Loader, etc.) in autocomplete, dialog, sheet, spinner, and toast components.

## 1.0.5

### Patch Changes

- Enable tree-shaking for icon exports by replacing `export *` with explicit named exports. Only imported icons will be bundled, significantly reducing bundle size.
- Remove sidebar cookie management

## 1.0.4

### Patch Changes

- Fix the exports

## 1.0.3

### Patch Changes

- Fix building artifacts

## 1.0.2

### Patch Changes

- Fix tsconfig

## 1.0.1

### Patch Changes

- Update utils imports
