import { App } from 'vue'
import MModalForm from './src/index.vue'

export default {
  install(app: App) {
    app.component(MModalForm.name, MModalForm)
  },
}
