
interface ModalOptions {
  modalId: string;
}

interface ModalInstance<T extends Event> {
  destroy: () => void;
}

class Modal<T extends Event> implements ModalInstance<T> {
  private readonly modal: HTMLElement;
  private readonly backdrop: HTMLElement;
  private readonly modalId: string;
  private static openModals: Modal<any>[] = [];

  constructor(options: ModalOptions) {
    const { modalId } = options;
    this.modalId = modalId;
    this.modal = document.getElementById(this.modalId)!;
    this.backdrop = document.createElement("div");
    this.backdrop.classList.add("backdrop");
    this.handleWindowClick = this.handleWindowClick.bind(this);
    window.addEventListener("click", this.handleWindowClick);
  }

  private open(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if the modal is already open
      if (Modal.openModals.includes(this)) {
        resolve();
        return;
      }

      // Open this modal
      this.modal.style.display = "block";
      document.body.appendChild(this.backdrop);
      this.modal.classList.add("modal-open");

      // Add this modal to the list of open modals
      Modal.openModals.push(this);

      // Resolve the promise after the modal has been opened
      resolve();
    });
  }


  private close(): void {

    // Close this modal
    this.modal.style.display = "none";
    this.backdrop.remove();
    this.modal.classList.remove("modal-open");

    // Remove this modal from the list of open modals
    const index = Modal.openModals.indexOf(this);
    if (index > -1) {
      Modal.openModals.splice(index, 1);
    }
  }

  private handleWindowClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;

    // Close all open modals when clicking on the backdrop
    if (clickedElement === this.backdrop) {
      Modal.openModals.forEach((modal) => {
        modal.close();
      });
    }
  }

  public destroy(): void {
    window.removeEventListener("click", this.handleWindowClick);

    // Remove this modal from the list of open modals
    const index = Modal.openModals.indexOf(this);
    if (index > -1) {
      Modal.openModals.splice(index, 1);
    }
  }


}

export default Modal;
