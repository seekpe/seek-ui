import { Modal } from "../../../../packages/seekui-core/src/Modal";


document.querySelector('#modalBtn').addEventListener('click', () => {
  const modal = new Modal({
    modalId: 'modal',
    video: {
      src: '328991108',
      provider: 'vimeo'
    }
  });
  modal.open()

})


