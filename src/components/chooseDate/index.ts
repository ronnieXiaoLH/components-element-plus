import { App } from 'vue'
import MChooseDate from './src/index.vue'

export default {
  install(app: App) {
    app.component(MChooseDate.name, MChooseDate)
  },
}
