export const SHOW_MSG = 'show-msg'

function createEventEmitter() {
  const listenersMap = {}
  return {
    on(evName, listener) {
      listenersMap[evName] = listenersMap[evName]
        ? [...listenersMap[evName], listener]
        : [listener]
      return () => {
        listenersMap[evName] = listenersMap[evName].filter(
          (func) => func !== listener
        )
      }
    },
    emit(evName, data) {
      if (!listenersMap[evName]) return
      listenersMap[evName].forEach((listener) => listener(data))
    },
  }
}

export const eventBus = createEventEmitter()

export function showUserMsg(msg) {
  eventBus.emit('show-msg', msg)
}

export function showSuccessMsg(txt, delay = 2000) {
  showUserMsg({ txt, type: 'success', delay })
}
export function showErrorMsg(txt, delay = 2000) {
  showUserMsg({ txt, type: 'error', delay })
}
