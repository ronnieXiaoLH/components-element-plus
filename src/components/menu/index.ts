import { App } from 'vue'
import MMenu from './src/index.vue'
import MMenu2 from './src/menu'

export default {
  install(app: App) {
    app.component(MMenu.name, MMenu)
    app.component(MMenu2.name, MMenu2)
  },
}
