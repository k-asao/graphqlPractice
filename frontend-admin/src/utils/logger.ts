/* eslint-disable no-console */
class Logger {
  private _debug = false

  enableDebug() {
    this._debug = true
  }

  debug(...msg: any) {
    if (!this._debug) {
      return
    }

    console.debug(...msg)
  }

  info(...msg: any) {
    if (!this._debug) {
      return
    }

    console.info(...msg)
  }

  error(...msg: any) {
    if (!this._debug) {
      return
    }

    console.error(...msg)
  }
}

export const logger = new Logger()
