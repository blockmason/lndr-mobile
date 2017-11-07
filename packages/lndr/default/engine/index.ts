import User from 'lndr/user'

export interface EngineState {
  user?: User,
  hasStoredUser: Boolean
}

interface EngineStateListener {
  (engineState: EngineState): void
}

export default class Engine {
  engineState: EngineState
  listeners: EngineStateListener[]

  constructor () {
    this.listeners = []
    this.engineState = {
      hasStoredUser: false
    }
  }

  subscribe (listener: EngineStateListener) {
    this.listeners.push(listener)
  }

  get state(): EngineState {
    return { ...this.engineState }
  }
}
