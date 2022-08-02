import { App } from 'vue'
import MChooseCity from './src/index.vue'

export default {
  install(app: App) {
    app.component(MChooseCity.name, MChooseCity)
  },
}
