export interface Bindings {
  [key: string]: string;
}

export interface RotorType {
  type?: string;
  pos: number;
  globalRotations: number;
  ringOffset: number;
}

export interface EventType {
  target: {
    value: string
  }
}