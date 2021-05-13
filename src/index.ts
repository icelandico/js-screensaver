import { BaseConfig } from "./models";
import './index.css';

const baseConfig: BaseConfig = {
    text: 'ScreenSaver',
    background: '#2c3e50',
    textColor: '#dbdbdb',
    baseElement: document.body
}

class ScreenSvr {
    private config = baseConfig;

    constructor() {
    }

    start(config?: BaseConfig): void {
        this.config = { ...baseConfig, ...config };
        this.createContainer();
    }

    private createContainer(): void {
        const screenSaverElem = document.createElement('div');
        const screenSaverText = document.createElement('p');

        screenSaverText.innerText = <string>this.config.text
        screenSaverText.style.color = <string>this.config.textColor

        screenSaverElem.classList.add('screensaver__bg');
        screenSaverText.classList.add('screensaver__text');

        this.config.baseElement?.appendChild(screenSaverElem);
        screenSaverElem.style.backgroundColor = <string>this.config.background;
        screenSaverElem.appendChild(screenSaverText);

        this.animateText();
    }

    animateText(): void {
      const screensaverText = <HTMLElement>document.querySelector(".screensaver__text");
      let topPosition = 0;
      let leftPosition = 0;
        setInterval(() => {
          topPosition++
          leftPosition++
          screensaverText.style.top = topPosition + 'px' ;
          screensaverText.style.left = leftPosition + 'px';
        }, 500)
    }
}

const classInstance = new ScreenSvr();
export { classInstance as ScreenSvr };
