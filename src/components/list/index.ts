import { App } from 'vue'
import MList from './src/index.vue'

export default {
  install(app: App) {
    app.component(MList.name, MList)
  },
}
