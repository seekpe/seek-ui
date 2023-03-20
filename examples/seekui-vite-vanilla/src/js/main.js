import { Modal } from "../../../../packages/seekui-core/src/Modal";


document.querySelector('#modalBtn').addEventListener('click', () => {
  const modal = new Modal({
    modalId: 'modal'
  });
  modal.open().then(() => {
    console.log('cerrando.......');
  })

})


