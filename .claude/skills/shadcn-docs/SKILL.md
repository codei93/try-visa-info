### Add components and dependencies using shadcn add

Source: https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/(root)/cli.mdx

Use the `add` command to add components and dependencies to your project.

```bash
npx shadcn@latest add [component]
```

--------------------------------

### `add` — Add components

Source: https://github.com/shadcn-ui/ui/blob/main/skills/shadcn/cli.md

> **IMPORTANT:** To compare local components against upstream or to preview changes, ALWAYS use `npx shadcn@latest add <component> --dry-run`, `--diff`, or `--view`. NEVER fetch raw files from GitHub or other sources manually. The CLI handles registry resolution, file paths, and CSS diffing automatically.

Accepts component names, registry-prefixed names (`@magicui/shimmer-button`),
GitHub item addresses (`owner/repo/item`), URLs, or local paths.

| Flag            | Short | Description                                                                                                          | Default |
| --------------- | ----- | -------------------------------------------------------------------------------------------------------------------- | ------- |
| `--yes`         | `-y`  | Skip confirmation prompt                                                                                             | `false` |
| `--overwrite`   | `-o`  | Overwrite existing files                                                                                             | `false` |
| `--cwd <cwd>`   | `-c`  | Working directory                                                                                                    | current |
| `--all`         | `-a`  | Add all available components                                                                                         | `false` |
| `--path <path>` | `-p`  | Target path for the component                                                                                        | —       |
| `--silent`      | `-s`  | Mute output                                                                                                          | `false` |
| `--dry-run`     |       | Preview all changes without writing files                                                                            | `false` |
| `--diff [path]` |       | Show diffs. Without a path, shows the first 5 files. With a path, shows that file only (implies `--dry-run`)         | —       |
| `--view [path]` |       | Show file contents. Without a path, shows the first 5 files. With a path, shows that file only (implies `--dry-run`) | —       |

--------------------------------

### shadcn > add

Source: https://github.com/shadcn-ui/ui/blob/main/packages/shadcn/README.md

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

--------------------------------

### Monorepo > Getting started > Add components to your project

Source: https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/(root)/monorepo.mdx

To add components to your project, run the `add` command **in the path of your app**.

The CLI will figure out what type of component you are adding and install the
correct files to the correct path.

For example, if you run `npx shadcn@latest add button`, the CLI will install the button component under `packages/ui` and update the import path for components in `apps/web`.

If you run `npx shadcn@latest add login-01`, the CLI will install the `button`, `label`, `input` and `card` components under `packages/ui` and the `login-form` component under `apps/web/components`.

--------------------------------

### Add components using shadcn CLI

Source: https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/changelog/2023-06-new-cli.mdx

Resolves and installs UI components and their dependencies according to custom project configuration.

```bash
npx shadcn@latest add
```
