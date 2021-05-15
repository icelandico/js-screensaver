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

const speedOptions = {
  slow: 1,
  regular: 3,
  fast: 5,
}

class ScreenSvr {
    private config = baseConfig;

    constructor() { }

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
        screenSaverElem.appendChild(this.config.customHTML || screenSaverText);

        this.runAnimation();
    }

    runAnimation(): void {
      const screensaverElement = this.config.customHTML ? this.config.customHTML : <HTMLElement>document.querySelector(".screensaver__text");
      screensaverElement.style.position = 'absolute';

      const screensaverBg = <HTMLElement>document.querySelector(".screensaver__bg");
      const dimensions = {
        width: screensaverBg.getBoundingClientRect().width,
        height: screensaverBg.getBoundingClientRect().height,
      };
      let positionY = dimensions.width / 2;
      let positionX = dimensions.height / 2;
      let movementX = this.config.animationSpeed ? speedOptions[this.config.animationSpeed] : 3;
      let movementY = this.config.animationSpeed ? speedOptions[this.config.animationSpeed] : 3;
      const animateElements = () => {
        positionY += movementY
        positionX += movementX

        if (positionY < 0 || positionY >= dimensions.height - screensaverElement.offsetHeight) {
          movementY = -movementY;
        }
        if (positionX <= 0 || positionX >= dimensions.width - screensaverElement.clientWidth) {
          movementX = -movementX;
        }

        screensaverElement.style.top = positionY + 'px';
        screensaverElement.style.left = positionX + 'px';

        requestAnimationFrame(animateElements)
      }
      requestAnimationFrame(animateElements)
    }

}

const classInstance = new ScreenSvr();
export { classInstance as ScreenSvr };
