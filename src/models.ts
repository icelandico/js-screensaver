export interface BaseConfig {
  text?: string
  background?: string
  baseElement?: HTMLElement | Element
  backgroundImg?: string
  animationSpeed?: 'slow' | 'regular' | 'fast'
  customElement?: HTMLElement | Element | string,
  triggerTime?: number,
}

export interface IDimensions {
  height: number
  width: number
}
