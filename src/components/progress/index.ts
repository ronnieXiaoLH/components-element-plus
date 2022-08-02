import { App } from 'vue'
import MProgress from './src/index.vue'

export default {
  install(app: App) {
    app.component(MProgress.name, MProgress)
  },
}
