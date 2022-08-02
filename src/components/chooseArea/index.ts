import { App } from 'vue'
import MChooseArea from './src/index.vue'

export default {
  install(app: App) {
    app.component(MChooseArea.name, MChooseArea)
  },
}
