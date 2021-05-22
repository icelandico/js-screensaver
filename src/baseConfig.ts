import { BaseConfig } from "./models";

export const speedOptions = {
  slow: 1,
  regular: 3,
  fast: 5,
}

export const baseConfig: BaseConfig = {
  text: 'Default, boring screensaver.',
  background: '#2c3e50',
  baseElement: document.body,
  animationSpeed: 'regular',
  triggerTime: 2000,
}
