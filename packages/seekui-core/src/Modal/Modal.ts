import { loadPlyr } from '@yomarsanchez/utils';

type Provider = 'html5' | 'youtube' | 'vimeo';

interface PlayerOptions {
  src: string;
  provider: Provider;
  playerClassName: string;
}

interface ModalOptions {
  modalId: string;
  video?: PlayerOptions;
}

interface ModalInstance<T extends Event> {
  destroy: () => void;
}

class Modal<T extends Event> implements ModalInstance<T> {
  private static plyrLoaded = false;
  private static openModals: Modal<any>[] = [];

  private modal: HTMLElement;
  private backdrop: HTMLElement;
  private video?: PlayerOptions;
  private player: Plyr[] = [];

  constructor(private options: ModalOptions) {
    this.modal = this.getModalElement(options.modalId);
    this.backdrop = this.createBackdrop();
    this.video = options.video;
    this.backdrop.addEventListener("click", this.handleBackdropClick);
  }

  private getModalElement(modalId: string): HTMLElement {
    const modal = document.getElementById(modalId);
    if (!modal) throw new Error(`Modal with id '${modalId}' not found.`);
    return modal;
  }

  private createBackdrop(): HTMLElement {
    const backdrop = document.createElement("div");
    backdrop.classList.add("backdrop");
    return backdrop;
  }

  public async open() {
    if (Modal.openModals.includes(this)) return;
    this.showModal();
    this.addBackdrop();
    if (this.modalContainsVideo()) {
      try {
        await this.initializeVideoPlayer();
      } catch (error) {
        console.error('Error importing Plyr:', error);
      }
    }
  }

  private showModal(): void {
    this.modal.style.display = "block";
    this.modal.classList.add("modal-open");
    Modal.openModals.push(this);
  }

  private addBackdrop(): void {
    document.body.appendChild(this.backdrop);
  }


  private modalContainsVideo(): boolean {
    const videoElement = this.modal.querySelector(`.${this.video?.playerClassName || 'player'}`) as HTMLElement;
    return videoElement instanceof HTMLElement && !!this.video?.src && !!this.video?.provider;
  }

  private async initializeVideoPlayer(): Promise<void> {
    if (!Modal.plyrLoaded) {
      await loadPlyr();
      Modal.plyrLoaded = true;
    }
    const videoElement = this.modal.querySelector(`.${this.video!.playerClassName || 'player'}`) as HTMLElement;
    videoElement.setAttribute('data-plyr-provider', this.video!.provider);
    videoElement.setAttribute('data-plyr-embed-id', this.video!.src);
    this.player = window.Plyr.setup(`.${this.video!.playerClassName || 'player'}`, { autoplay: true });
    const player = this.player[0];
    player.source = {
      type: 'video',
      sources: [{ src: this.video!.src, provider: this.video!.provider }],
    };
  }

  public close(): void {
    this.hideModal();
    this.removeBackdrop();
    this.cleanupPlayer();
  }

  private hideModal(): void {
    this.modal.style.display = "none";
    this.modal.classList.remove("modal-open");
    const index = Modal.openModals.indexOf(this);
    if (index > -1) {
      Modal.openModals.splice(index, 1);
    }
  }

  private removeBackdrop(): void {
    this.backdrop.remove();
  }

  private cleanupPlayer(): void {
    this.player[0]?.pause();
    this.player[0]?.destroy();
  }

  private handleBackdropClick = (): void => {
    this.close();
  }

  public destroy(): void {
    this.backdrop.removeEventListener("click", this.handleBackdropClick);
    const index = Modal.openModals.indexOf(this);
    if (index > -1) {
      Modal.openModals.splice(index, 1);
    }
  }
}

export default Modal;
