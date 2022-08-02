import { App } from 'vue'
import MChooseTime from './src/index.vue'

export default {
  install(app: App) {
    app.component(MChooseTime.name, MChooseTime)
  },
}
