# Brand files

Drop the supplied logo files here. `<Logo />` (src/components/brand/Logo.tsx)
uses them automatically and falls back to the text wordmark until they exist.

| File                | Used for                                  | Variant      |
| ------------------- | ----------------------------------------- | ------------ |
| `logo.svg`          | Primary logo, for ivory backgrounds       | `on-ivory`   |
| `logo-reversed.svg` | Reversed logo, for ink backgrounds        | `on-ink`     |
| `logo-icon.svg`     | Icon / favicon source (not wired up yet)  | —            |

The presence check runs when the config loads (next.config.ts), so **restart
`npm run dev`** after adding or removing a file. Match the `--signal` token in
src/app/globals.css to the logo's red once the file arrives.
