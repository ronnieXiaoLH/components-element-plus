import { App } from 'vue'
import MTrend from './src/index.vue'

export default {
  install(app: App) {
    app.component(MTrend.name, MTrend)
  },
}
