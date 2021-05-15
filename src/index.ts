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
        const screenSaverContainer = document.createElement('div');

        screenSaverContainer.classList.add('screensaver__bg');

        this.config.baseElement?.appendChild(screenSaverContainer);
        screenSaverContainer.style.backgroundColor = <string>this.config.background;

        const screenSaverElement = this.getScreensaverElement() as HTMLElement;
        console.log('element', screenSaverElement)
        screenSaverContainer.appendChild(screenSaverElement);

        this.runAnimation(screenSaverElement);
    }

    runAnimation(element: HTMLElement): void {
      element.style.position = 'absolute';
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

        if (positionY < 0 || positionY >= dimensions.height - element.offsetHeight) {
          movementY = -movementY;
        }
        if (positionX <= 0 || positionX >= dimensions.width - element.clientWidth) {
          movementX = -movementX;
        }

        element.style.top = positionY + 'px';
        element.style.left = positionX + 'px';

        requestAnimationFrame(animateElements)
      }
      requestAnimationFrame(animateElements)
    }

    createElementFromText(stringHtml: string): HTMLElement {
      const element = document.createElement('div');
      element.innerHTML = stringHtml.trim();

      return element.firstChild as HTMLElement
    }

    getScreensaverElement() {
      if (!this.config.customHTML) {
        return this.createScreensaverBaseElement();
      }
      return typeof this.config.customHTML === 'string' ? this.createElementFromText(this.config.customHTML) :  this.config.customHTML
    }

    createScreensaverBaseElement(): Element {
      const screenSaverText = document.createElement('p');
      screenSaverText.innerText = <string>this.config.text;
      screenSaverText.style.color = <string>this.config.textColor;
      screenSaverText.style.fontSize = `${this.config.textSize}px`;
      screenSaverText.classList.add('screensaver__content');

      return screenSaverText
    }

}

const classInstance = new ScreenSvr();
export { classInstance as ScreenSvr };
