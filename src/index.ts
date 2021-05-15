import { BaseConfig } from "./models";
import './index.css';

const baseConfig: BaseConfig = {
    text: 'ScreenSaver',
    background: '#2c3e50',
    textColor: '#dbdbdb',
    textSize: 34,
    baseElement: document.body,
    animationSpeed: 'regular',
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

        screenSaverText.innerText = <string>this.config.text;
        screenSaverText.style.color = <string>this.config.textColor;
        screenSaverText.style.fontSize = `${this.config.textSize}px`;

        screenSaverElem.classList.add('screensaver__bg');
        screenSaverText.classList.add('screensaver__text');

        this.config.baseElement?.appendChild(screenSaverElem);
        screenSaverElem.style.backgroundColor = <string>this.config.background;
        screenSaverElem.appendChild(screenSaverText);

        this.runAnimation();
    }

    runAnimation(): void {
      const screensaverText = <HTMLElement>document.querySelector(".screensaver__text");
      const screensaverBg = <HTMLElement>document.querySelector(".screensaver__bg");
      const dimensions = {
        width: screensaverBg.getBoundingClientRect().width,
        height: screensaverBg.getBoundingClientRect().height,
      };
      let positionY = 0;
      let positionX = 0;
      let movementY = 3;
      let movementX = 3;
      const animateElements = () => {
        positionY += movementY
        positionX += movementX

        if (positionY < 0 || positionY >= dimensions.height - (screensaverText.offsetHeight * 2)) {
          movementY = -movementY;
        }
        if (positionX <= 0 || positionX >= dimensions.width - screensaverText.clientWidth) {
          movementX = -movementX;
        }

        screensaverText.style.top = positionY + 'px';
        screensaverText.style.left = positionX + 'px';

        requestAnimationFrame(animateElements)
      }
      requestAnimationFrame(animateElements)
    }

}

const classInstance = new ScreenSvr();
export { classInstance as ScreenSvr };
