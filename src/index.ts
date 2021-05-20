import { BaseConfig, IDimensions } from "./models";
import './index.css';

const baseConfig: BaseConfig = {
    text: 'ScreenSaver',
    background: '#2c3e50',
    textColor: '#dbdbdb',
    textSize: 34,
    baseElement: document.body,
    animationSpeed: 'regular',
    triggerTime: 5000,
}

const speedOptions = {
  slow: 1,
  regular: 3,
  fast: 5,
}

class ScreenSvr {
    private config = baseConfig;
    private windowDimensions: IDimensions = { width: 0, height: 0};
    private playAnimation: boolean = true;
    private screensaverElement: HTMLElement = document.body;
    private eventsList: string[] = ['keydown', 'mousemove'];

    constructor() { }

    start(config?: BaseConfig): void {
        this.config = { ...baseConfig, ...config };
        this.noActionListener();
        // this.createContainer();
        // this.stopScreensaver();
    }

    private createContainer(): void {
        const screenSaverContainer = document.createElement('div');
        screenSaverContainer.classList.add('screensaver__container');
        this.config.baseElement?.appendChild(screenSaverContainer);
        this.getWindowDimensions();

        screenSaverContainer.style.backgroundColor = <string>this.config.background;

        const screenSaverElement = this.getScreensaverElement() as HTMLElement;
        screenSaverContainer.appendChild(screenSaverElement);
        this.screensaverElement = screenSaverContainer;
        this.runAnimation(screenSaverElement);
        this.playAnimation && this.stopScreensaverListener();
    }

    private getWindowDimensions(): void {
      const screensaverContainer = <HTMLElement>document.querySelector(".screensaver__container");
      this.windowDimensions = {
        width: screensaverContainer.getBoundingClientRect().width,
        height: screensaverContainer.getBoundingClientRect().height,
      };
    }

    private runAnimation(element: HTMLElement): void {
      this.playAnimation = true;
      element.style.position = 'absolute';

      let positionY = this.windowDimensions.width / 2;
      let positionX = this.windowDimensions.height / 2;
      let movementX = this.config.animationSpeed ? speedOptions[this.config.animationSpeed] : speedOptions.regular;
      let movementY = this.config.animationSpeed ? speedOptions[this.config.animationSpeed] : speedOptions.regular;

      const animateElements = () => {
        positionY += movementY
        positionX += movementX

        if (positionY < 0 || positionY >= this.windowDimensions.height - element.offsetHeight) {
          movementY = -movementY;
        }
        if (positionX <= 0 || positionX >= this.windowDimensions.width - element.clientWidth) {
          movementX = -movementX;
        }

        element.style.top = positionY + 'px';
        element.style.left = positionX + 'px';

        if (this.playAnimation) {
          requestAnimationFrame(animateElements);
        }
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

    private stopScreensaverListener() {
      window.addEventListener('keydown', (e) => {
        e.preventDefault();
        this.playAnimation = false;
        this.screensaverElement.remove();
      })
      window.addEventListener('mousemove', (e) => {
        e.preventDefault();
        this.playAnimation = false;
        this.screensaverElement.remove();
      })
    }

    private noActionListener() {
      let mouseMoveTimer: ReturnType<typeof setTimeout>;
      this.eventsList.forEach(event => window.addEventListener(event, () => {
        clearTimeout(mouseMoveTimer);
        mouseMoveTimer = setTimeout(() => {
          this.createContainer();
        }, this.config.triggerTime)
      }))
    }

}

const classInstance = new ScreenSvr();
export { classInstance as ScreenSvr };
