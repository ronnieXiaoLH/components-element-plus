import { App } from 'vue'
import MTable from './src/index.vue'

export default {
  install(app: App) {
    app.component(MTable.name, MTable)
  },
}
