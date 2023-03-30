<!-- markdownlint-disable-next-line -->
<p align="center">
  <!-- markdownlint-disable-next-line -->
  <a href="https://mui.com/" rel="noopener" target="_blank"><picture><source media="(prefers-color-scheme: dark)" srcset="./apps/docs/public/static/seek-white-logo.svg"><img alt="Logo Seek" src="./../../apps/docs/public/static/seek-black-logo.svg" width="320"></picture></a>
</p>

# Seek UI Core

Seek UI Core es una biblioteca de componentes para JavaScript diseñada para ayudar en los proyectos a crear interfaces de usuario de alta calidad y con facilidad. Esta biblioteca cuenta con una gran variedad de componentes que se pueden utilizar para crear interfaces modernas y atractivas.

## Instalación

Se puede instalar la biblioteca utilizando los siguientes comandos:

```bash
npm install @seekpe/core --save

## o con yarn
yarn add @seekpe/core --save
```

Nota: Antes de instalar la biblioteca, debes tener configurado el archivo `.npmrc` en la raíz del proyecto. Ír a la sección [Usar la biblioteca](#usar-la-biblioteca)

## Estructura de la Biblioteca

Todos los componentes de la biblioteca se encuentran en la carpeta `src` y se dividen en las siguientes carpetas:

```bash
seekui-core
└── src
    ├── Modal
      ├── index.ts   <-- Exporta el componente
      └── Modal.ts   <-- Contiene el componente
    ├── index.d.ts   <-- Tipos Genericos
    └── index.ts     <-- Exportación de componentes
```

## Componentes

La biblioteca cuenta con los siguientes componentes:

- [Modal](./src/Modal/MODAL.ts): Es un componente que permite mostrar información de forma modal.

## Crear un Componente

Para crear un componente se debe seguir los siguientes pasos:

1. Crear una carpeta con el nombre del componente dentro de la carpeta `src`.
2. Crear un archivo `index.ts` dentro de la carpeta del componente. Este archivo debe exportar el componente.
3. Crear un archivo de TypeScript con el nombre del componente. Este archivo debe contener el componente.

Al terminar de crear el componente, se debe exportar el componente en el archivo `index.ts` de la carpeta `src`.

## Ejemplo de un componente

```typescript
// src/Dialog/index.ts

export { default } from './Dialog';
```

```typescript
// src/Dialog/Dialog.ts

interface DialogProps {
  element: HTMLElement;
}

class Dialog {
  private element: HTMLElement;

  constructor({ element }: DialogProps) {
    this.element = element;
  }

  open() {
    this.element.classList.add('is-open');
  }

  close() {
    this.element.classList.remove('is-open');
  }
}

export default Dialog;
```

## Usar la Biblioteca

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

Luego instala el paquete:

```bash
npm install @seekpe/core --save
```

## Ejemplo de uso

```typescript
// src/pages/index.js or .ts

import { Modal } from '@seekpe/core';

// or 

import Modal from '@seekpe/core/Modal';


// Uso del componente

const modalId = 'modal-alert';
const modalAlert = new Modal({ modalId });

const $btnOpenModal =  document.querySelector('#btn-open-modal');

$btnOpenModal.addEventListener('click', () => {
  modalAlert.open();
});

```

## Licencia

Seek UI Core se distribuye bajo la Licencia MIT. Consulte [LICENSE](LICENSE) para obtener más información.
