<!-- markdownlint-disable-next-line -->
<p align="center">
  <!-- markdownlint-disable-next-line -->
  <a href="https://mui.com/" rel="noopener" target="_blank"><picture><source media="(prefers-color-scheme: dark)" srcset="./apps/docs/public/static/seek-white-logo.svg"><img alt="Logo Seek" src="./apps/docs/public/static/seek-black-logo.svg" width="320"></picture></a>
</p>

# Seek UI

Seek UI contiene bibliotecas de componentes fundamentales de Vanilla JS y React para crear nuevos features más rápido.

Este Monorepo está configurado con las siguientes herramientas:

- 🚀 [Turborepo](https://turbo.build/repo) — Turborepo es un sistema de compilación de JavaScript y TypeScript para Monorepos.
- ⚛️ [React](https://react.dev/) — Librería de JavaScript para construir interfaces de usuario.
- ⚙️ [Tsup](https://github.com/egoist/tsup) — Tsup es un empaquetador de módulos de TypeScript que utiliza esbuild para una compilación increíblemente rápida.
- 📚 [Storybook](https://storybook.js.org/) — Para desarrollo de interfaz de usuario con componentes de React, Vue, Angular y más.

Además de algunas otras herramientas preconfiguradas:

- [TypeScript](https://www.typescriptlang.org/) para comprobación estática de tipos.
- [ESLint](https://eslint.org/) para linting de código.
- [Prettier](https://prettier.io) para formateo de código.
- [Changesets](https://github.com/changesets/changesets) para gestionar versiones y registros de cambios.
- [GitHub Actions](https://github.com/changesets/action) para publicación de paquetes totalmente automatizada.

## Instalación

Clona el proyecto seek-ui desde tu terminal o [desde GitHub](https://github.com/seekpe/seek-ui):

```bash
git clone git@github.com:seekpe/seek-ui.git

cd seek-ui

## Instalar dependencias
yarn install

## Ejecutar Storybook
yarn dev
```

### Comandos útiles

- `yarn build` - Construir todos los paquetes, incluyendo el sitio Storybook.
- `yarn dev` - Ejecutar todos los paquetes localmente y previsualizar con Storybook.
- `yarn lint` - Linting de todos los paquetes.
- `yarn changeset` - Generar un registro de cambios.
- `yarn clean` - Eliminar todas las carpetas `node_modules` y `dist` (ejecuta el script `clean` de cada paquete).

## Turborepo

[Turborepo](https://turborepo.org) es un sistema de compilación de alto rendimiento para código JavaScript y TypeScript. Fue diseñado siguiendo los flujos de trabajo utilizados por grandes organizaciones de ingeniería de software para enviar código a gran escala. Turborepo abstrae la compleja configuración necesaria para los Monorepos y proporciona construcciones rápidas e incrementales con caché remoto sin configuración.

Utilizar Turborepo simplifica la gestión de tu Monorepo de sistema de diseño, ya que puedes tener un único proceso de lint, construcción, prueba y lanzamiento para todos los paquetes. [Aprende más](https://vercel.com/blog/monorepos) sobre cómo los Monorepos mejoran tu flujo de trabajo de desarrollo.

## Aplicaciones y paquetes

Este Monorepo incluye los siguientes paquetes y aplicaciones:

- [`apps/docs`](/apps/docs/): Sitio de documentación de componentes con Storybook.
- [`packages/@seekpe/core`](/packages/seekui-core/): Componentes de diseño de UI.
- [`packages/@seekpe/utils`](/packages/seekui-utils/): Utilidades compartidas de JavaScript.
- [`packages/@seekpe/eslint-config-seek`](/packages/seekui-utils/): ESLint preset compartido.
- [`packages/ts-config-seek-ui`](/packages/ts-config-seek-ui/): `tsconfig.json`s compartidos utilizados en todo el Monorepo.

Cada paquete y aplicación es 100% [TypeScript](https://www.typescriptlang.org/). Workspaces nos permite "hoist" las dependencias que son compartidas entre los paquetes al `package.json` raíz. Esto significa carpetas más pequeñas de `node_modules` y una mejor experiencia de desarrollo local. Para instalar una dependencia para todo el monorepo, use la bandera `-W` con `yarn add`.

Este proyecto incluye `.gitignore` para excluir todos los archivos generados, otras carpetas como `node_modules` que se usan para almacenar tus dependencias.

### Compilar paquetes

Para hacer que el código de la biblioteca principal funcione en todos los navegadores, necesitamos compilar el TypeScript y el código de React en bruto a JavaScript plano. Podemos lograr esto con `tsup`, que utiliza `esbuild` para mejorar enormemente el rendimiento.

Ejecutar `yarn build` desde la raíz de Turborepo ejecutará el comando `build` definido en el archivo `package.json` de cada paquete. Turborepo ejecuta cada `build` en paralelo y almacena en caché y hash el resultado para acelerar las compilaciones futuras.

Para `seekui-core`, el comando build es el siguiente:

```bash
tsup \"src/**/*.{ts,tsx,js,jsx}\" --format esm,cjs --dts --external react
```

`tsup` compila `\"src/**/*.{ts,tsx,js,jsx}\"`, que exporta todos los componentes en el sistema de diseño, en formatos tanto de ES Modules como de CommonJS, así como en sus tipos de TypeScript. El `package.json` de `seekui-core` luego instruye al consumidor que seleccione el formato correcto:

```json:seekui-core/package.json
{
  "name": "@seekpe/core",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "sideEffects": false,
}
```

Ejecute `yarn build` para confirmar que la compilación está funcionando correctamente. Debería ver una carpeta `seekui-core/dist` que contiene el resultado compilado.

```bash
seekui-core
└── dist
    ├── index.d.ts  <-- Tipos
    ├── index.js    <-- Versión CommonJS
    └── index.mjs   <-- Versión de ES Modules
```

## Componentes

Cada archivo dentro de `seekui-core/src` es un componente dentro de nuestro sistema de diseño. Por ejemplo:

```tsx:seekui-core/src/components/Button/Button.tsx
import * as React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  return <button>{props.children}</button>;
}

Button.displayName = 'Button';
```

Al agregar un nuevo archivo, asegúrese de que el componente también se exporte desde el archivo de entrada `index.tsx`:

```tsx:seekui-core/src/components/Button/index.tsx
import * as React from "react";
export { Button, type ButtonProps } from "./Button";
```

## Documentación

El sitio de documentación de Seek UI se encuentra en [`apps/docs`](apps/docs/). Storybook es una herramienta de documentación de componentes que permite a los desarrolladores explorar los componentes de su biblioteca, ver ejemplos de uso y editar los componentes en vivo.

## Versionado y Publicación de Paquetes

Este proyecto utiliza [Changesets](https://github.com/changesets/changesets) para gestionar versiones, crear registros de cambios y publicar en GitHub Packages.

### Generar el Changelog

Para generar tu registro de cambios, ejecuta `pnpm changeset` localmente:

1. **¿Qué paquetes deseas incluir?** – Esto muestra qué paquetes han cambiado y cuáles han permanecido iguales. Por defecto, no se incluyen paquetes. Presiona la tecla `space` para seleccionar los paquetes que deseas incluir en el `changeset`.
1. **¿Qué paquetes deberían tener un gran incremento de versión?** – Presiona la tecla `space` para seleccionar los paquetes para los que deseas aumentar la versión.
1. Si estás haciendo la primera versión mayor, confirma que deseas publicar.
1. Escribe un resumen de los cambios.
1. Confirma que el changeset se ve como se espera.
1. Se creará un nuevo archivo Markdown en la carpeta `changeset` con el resumen y una lista de los paquetes incluidos.

### Publicar los cambios

Cuando creas un nuevo release, [GitHub Action](https://github.com/changesets/action) publicará automáticamente los paquetes en GitHub Packages.

Asegúrese que el package.json de cada paquete tenga un nombre de paquete de GitHub Packages, ademas ´publishConfig´ y `repository`

```json:seekui-core/package.json
{
  "name": "@seekpe/core",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "sideEffects": false,
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/seekpe/seek-ui.git",
    "directory": "packages/seekui-core"
  },
}
```

Para publicar los cambios desde tu máquina local, ejecuta el siguiente comando:

```bash
turbo run build --filter=docs^... && changeset publish
```

Turborepo ejecuta el script `build` para todos los paquetes publicables (excluyendo docs) y publica los paquetes en GitHub Packages.

## Instalar paquetes

Para instalar un paquete de GitHub Packages en un proyecto de JavaScript o TypeScript, debes agregar el alcance `@seekpe` y el registro `https://npm.pkg.github.com` a tu archivo `.npmrc`:

El archivo `.npmrc` se encuentra en la raíz de tu proyecto. Si no existe, crea uno.

```bash
@seekpe:registry=https://npm.pkg.github.com
```

Además, debes agregar un token de acceso a tu archivo `.npmrc`:

```bash
//npm.pkg.github.com/:_authToken=GITHUB_TOKEN
@seekpe:registry=https://npm.pkg.github.com
```

Los paquetes de GitHub Packages están disponible para todos los que forman parte de la organización Seekpe, por lo que no es necesario agregar ningún token de acceso personal. El token de acceso se te proveerá cuando te unes a la organización.

Finalmente, instala el paquete que deseas usar:

```bash
npm install @seekpe/package-name

## o con yarn
yarn add @seekpe/package-name
```
