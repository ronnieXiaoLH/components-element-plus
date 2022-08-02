import { App } from 'vue'
import MChooseIcon from './src/index.vue'

export default {
  install(app: App) {
    app.component(MChooseIcon.name, MChooseIcon)
  },
}
