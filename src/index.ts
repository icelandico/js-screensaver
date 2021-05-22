import {BaseConfig, IDimensions} from "./models";
import {baseConfig, speedOptions} from "./baseConfig";
import './index.css';

class ScreenSvr {
  private config: BaseConfig = baseConfig;
  private windowDimensions: IDimensions = {width : 0, height : 0};
  private playAnimation: boolean = true;
  private screensaverElement: HTMLElement = document.body;
  private eventsList: string[] = ['keydown', 'mousemove'];
  private defaultScreensaver: string = `
    <div class="screensaver__element-wrapper">
      <div class="screensaver__element-content">
        <p class="screensaver__element-text"></p>
      </div>
    </div>
  `

  constructor() {
  }

  start(config?: BaseConfig): void {
    this.config = {...baseConfig, ...config};
    this.setActionsListeners();
  }

  private createContainer(): void {
    const screenSaverContainer = document.createElement('div');
    screenSaverContainer.classList.add('screensaver__container');
    this.config.baseElement?.appendChild(screenSaverContainer);
    this.getWindowDimensions();

    screenSaverContainer.style.backgroundColor = <string>this.config.background;

    const screenSaverElement = this.getScreensaverElement() as HTMLElement;
    screenSaverContainer.appendChild(screenSaverElement);
    document.querySelector('.screensaver__element-text')!.innerHTML += this.config.text

    this.screensaverElement = screenSaverContainer;
    this.runAnimation(screenSaverElement);
    this.playAnimation && this.stopScreensaverListener();
  }

  private getWindowDimensions(): void {
    const screensaverContainer = <HTMLElement>document.querySelector(".screensaver__container");
    this.windowDimensions = {
      width : screensaverContainer.getBoundingClientRect().width,
      height : screensaverContainer.getBoundingClientRect().height,
    };
  }

  private runAnimation(element: HTMLElement): void {
    this.playAnimation = true;
    element.style.position = 'absolute';

    let positionX = this.windowDimensions.width / 2;
    let positionY = this.windowDimensions.height / 2;
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
    const screensaverWrapper = this.createScreensaverWrapper();
    if (!this.config.customElement) {
      return this.createElementFromText(this.defaultScreensaver)
    }
    return screensaverWrapper.appendChild(
      typeof this.config.customElement === 'string' ?
        this.createElementFromText(this.config.customElement)
        :
        this.config.customElement
    )
  }

  createScreensaverWrapper(): Element {
    const wrapper = document.createElement('div');
    wrapper.classList.add('screensaver__element-wrapper');
    wrapper.id = 'screensaver-element'
    return wrapper;
  }

  private stopScreensaverListener() {
    this.eventsList.forEach(event => window.addEventListener(event, (e) => {
      e.preventDefault();
      this.playAnimation = false;
      this.screensaverElement.remove();
    }));
  }

  private setActionsListeners() {
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
export {classInstance as ScreenSvr};
