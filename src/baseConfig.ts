import { BaseConfig } from "./models";

export const speedOptions = {
  slow: 1,
  regular: 3,
  fast: 5,
}

export const baseConfig: BaseConfig = {
  background: '#2c3e50',
  textColor: '#dbdbdb',
  textSize: 34,
  baseElement: document.body,
  animationSpeed: 'regular',
  triggerTime: 2000,
}
