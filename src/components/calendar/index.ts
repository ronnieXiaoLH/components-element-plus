import { App } from 'vue'
import MCalendar from './src/index.vue'

export default {
  install(app: App) {
    app.component(MCalendar.name, MCalendar)
  },
}
