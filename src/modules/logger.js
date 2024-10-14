import {ERROR, LOG, MESSAGE, WARN} from "../common/constants.js";

const logger = (message, type) => {
  switch (type) {
    case ERROR: {
      console.error(`${ERROR}:   ${message}`)
      break;
    }
    case LOG: {
      console.log(`${LOG}:      ${message}`)
      break;
    }
    case WARN: {
      console.log(`${WARN}:     ${message}`)
      break;
    }
    case MESSAGE: {
      console.log(`${MESSAGE}: ${message}`)
      break;
    }
    default: {
      console.log(message)
    }
  }
}

export { logger }
