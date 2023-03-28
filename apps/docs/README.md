<!-- markdownlint-disable-next-line -->
<p align="center">
  <!-- markdownlint-disable-next-line -->
  <a href="https://mui.com/" rel="noopener" target="_blank"><img width="260" height="auto" src="public/static/seek-white-logo.svg" alt="MUI logo"></a>
</p>

# Seek UI - Documentación

Este proyecto es una documentación de los componentes de Seek UI.

## Storybook

Storybook provides us with an interactive UI playground for our components. This allows us to preview our components in the browser and instantly see changes when developing locally. This example preconfigures Storybook to:

- Use Vite to bundle stories instantly (in milliseconds)
- Automatically find any stories inside the `stories/` folder
- Support using module path aliases like `@acme-core` for imports
- Write MDX for component documentation pages

For example, here's the included Story for our `Button` component:

```js:apps/docs/stories/button.stories.mdx
import { Button } from '@acme-core/src';
import { Meta, Story, Preview, Props } from '@storybook/addon-docs/blocks';

<Meta title="Components/Button" component={Button} />

# Button

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur tempor, nisl nunc egestas nisi, euismod aliquam nisl nunc euismod.

## Props

<Props of={Box} />

## Examples

<Preview>
  <Story name="Default">
    <Button>Hello</Button>
  </Story>
</Preview>
```

This example includes a few helpful Storybook scripts:

- `pnpm dev`: Starts Storybook in dev mode with hot reloading at `localhost:6006`
- `pnpm build`: Builds the Storybook UI and generates the static HTML files
- `pnpm preview-storybook`: Starts a local server to view the generated Storybook UI
