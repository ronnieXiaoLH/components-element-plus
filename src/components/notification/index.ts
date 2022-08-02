import { App } from 'vue'
import MNotification from './src/index.vue'

export default {
  install(app: App) {
    app.component(MNotification.name, MNotification)
  },
}
