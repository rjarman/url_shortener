import { link } from '../config.pages.json';

export class IndexEvents {
  // private landingSlideLeft = Array.from(
  //   document.getElementsByClassName(
  //     'landing_slide_left'
  //   ) as HTMLCollectionOf<HTMLElement>
  // )[0];
  // private landingSlideRight = Array.from(
  //   document.getElementsByClassName(
  //     'landing_slide_right'
  //   ) as HTMLCollectionOf<HTMLElement>
  // )[0];

  private hostLink: string;

  private card = document.getElementById('card');
  private inputFld = <HTMLInputElement>document.getElementById('insertedURL');
  private copyBtn = document.getElementById('copyBtn');
  private toast = document.getElementById('toast');
  private toastText = document.getElementById('toastText');
  private genURL = document.getElementById('genURL');
  private shortBtn = document.getElementById('shortBtn');

  constructor() {
    this.hostLink =
      process.env.NODE_ENV === 'production'
        ? link.production
        : link.development;
    this.copyEvents();
    this.shortBtnEvents();
  }

  private setCookie(name: string, value: string) {
    if (!this.getCookie(name)) {
      const _date = new Date();
      _date.setTime(_date.getTime() + 365 * 24 * 60 * 60 * 1000);
      let expires = 'expires=' + _date.toUTCString();
      document.cookie = name + '=' + value + ';' + expires + ';path=/';
    }
  }

  private getCookie(name: string): string | null {
    try {
      const cookieName = name + '=';
      let cookie = document.cookie.split(cookieName)[1];
      cookie = cookie.split(';')[0];
      return cookie;
    } catch (error) {
      return null;
    }
  }

  private copyEvents() {
    this.copyBtn?.addEventListener('click', () => {
      if (this.genURL) navigator.clipboard.writeText(this.genURL.innerHTML);
      this.toast?.classList.add('active');
      setTimeout(() => {
        this.toast?.classList.remove('active');
      }, 2000);
    });
  }

  private _fetch(
    val: string,
    id: string | null,
    callback: (data: { shortURL: string; id: string }) => void
  ) {
    fetch(this.hostLink + 'url_shortener', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ longURL: val, id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      });
  }

  private sendToServer() {
    const inputFldValue: string = this.inputFld.value;
    let protocol: string = inputFldValue.split('://')[0];

    const _dataHandler = () => {
      if (this.getCookie('_i'))
        this._fetch(
          this.inputFld.value,
          this.getCookie('_i'),
          (data: { shortURL: string; id: string }) => {
            if (this.genURL) this.genURL.innerHTML = data.shortURL;
            this.card?.classList.add('active');
          }
        );
      else
        this._fetch(
          this.inputFld.value,
          null,
          (data: { shortURL: string; id: string }) => {
            if (this.genURL) this.genURL.innerHTML = data.shortURL;
            this.card?.classList.add('active');
            this.setCookie('_i', data.id);
          }
        );
    };

    if (protocol === 'https' || protocol === 'http') _dataHandler();
    else {
      protocol = inputFldValue.split('.')[0];
      if (protocol === 'www') _dataHandler();
      else {
        if (this.toastText)
          this.toastText.innerHTML = 'Please, insert correct url!';
        this.toast?.classList.add('active');
        setTimeout(() => {
          this.toast?.classList.remove('active');
        }, 2000);
      }
    }
  }

  private shortBtnEvents() {
    this.shortBtn?.addEventListener('click', () => {
      this.sendToServer();
    });
    this.inputFld?.addEventListener('click', () => {
      this.card?.classList.remove('active');
    });
    this.inputFld?.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key == 'Enter') {
        this.sendToServer();
      }
    });
  }
}
