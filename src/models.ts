export interface BaseConfig {
  text?: string
  background?: string
  textColor?: string
  textSize?: number
  baseElement?: HTMLElement | Element
  backgroundImg?: string
  animationSpeed?: 'slow' | 'regular' | 'fast'
  customHTML?: Element | string
}

export interface IDimensions {
  height: number
  width: number
}
