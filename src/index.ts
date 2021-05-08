import { BaseConfig } from "./models";
import './index.css';

const baseConfig = {
    text: 'ScreenSaver',
    style: {
        background: '#2c3e50',
        color: '#2980b9',
    },
    baseElement: 'body'
}

class ScreenSvr {

    start(config: BaseConfig = baseConfig) {
        console.log('new screensaver')
        this.createMarkup()
    }

    private createMarkup(): void {
        const screenSaverElem = document.createElement('div');
        screenSaverElem.classList.add('js-screensaver-bg');
        document.body.appendChild(screenSaverElem);
    }
}

const classInstance = new ScreenSvr();
export { classInstance as ScreenSvr };
