import { notificationType, notificationOptions } from '../constants/defaultValues'

const notification = {
  warning: (toastManager, message) => {
    toastManager.add(message, {
      appearance: notificationType.warning,
      ...notificationOptions
    })
  },
  success: (toastManager, message) => {
    toastManager.add(message, {
      appearance: notificationType.success,
      ...notificationOptions
    })
  }
}

export {
  notification
}
