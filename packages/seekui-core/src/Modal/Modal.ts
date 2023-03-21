type Provider = 'html5' | 'youtube' | 'vimeo';
interface VideoOptions {
  src?: string;
  provider?: Provider;
}

interface ModalOptions {
  modalId: string;
  video?: VideoOptions;
}

interface ModalInstance<T extends Event> {
  destroy: () => void;
}

class Modal<T extends Event> implements ModalInstance<T> {
  private readonly modal: HTMLElement;
  private readonly backdrop: HTMLElement;
  private readonly modalId: string;
  private readonly video?: VideoOptions;
  private player: Plyr[] = [];
  private static openModals: Modal<any>[] = [];

  constructor(options: ModalOptions) {
    const { modalId, video } = options;
    this.modalId = modalId;
    this.modal = document.getElementById(this.modalId)!;
    this.backdrop = document.createElement("div");
    this.backdrop.classList.add("backdrop");
    this.video = video;
    this.handleWindowClick = this.handleWindowClick.bind(this);
    window.addEventListener("click", this.handleWindowClick);
  }

  private async open(): Promise<void> {
    if (Modal.openModals.includes(this)) return;

    this.modal.style.display = "block";
    document.body.appendChild(this.backdrop);
    this.modal.classList.add("modal-open");
    Modal.openModals.push(this);

    const videoElement = this.modal.querySelector('.player') as HTMLVideoElement;
    if (videoElement && this.video?.src && this.video?.provider) {
      videoElement.setAttribute('data-plyr-provider', this.video.provider);
      videoElement.setAttribute('data-plyr-embed-id', this.video.src);
      try {
        const { default: Plyr } = await import('plyr');
        this.player = Plyr.setup('.player', { autoplay: true });
        const player = this.player[0];
        player.source = {
          type: 'video',
          title: 'Video title',
          sources: [{ src: this.video.src, provider: this.video.provider }],
        };
      } catch (error) {
        console.error('Error importing Plyr:', error);
      }
    }
  }

  private close(): void {
    this.modal.style.display = "none";
    this.backdrop.remove();
    this.modal.classList.remove("modal-open");

    const index = Modal.openModals.indexOf(this);
    if (index > -1) {
      Modal.openModals.splice(index, 1);
    }

    this.player[0]?.pause();
    this.player[0]?.destroy();
  }

  private handleWindowClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    if (clickedElement === this.backdrop) {
      Modal.openModals.forEach((modal) => modal.close());
    }
  }

  public destroy(): void {
    window.removeEventListener("click", this.handleWindowClick);

    const index = Modal.openModals.indexOf(this);
    if (index > -1) {
      Modal.openModals.splice(index, 1);
    }
  }
}

export default Modal;
