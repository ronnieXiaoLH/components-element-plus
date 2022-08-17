import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons'
import { toLine } from './utils'
// import Mui from './components'
import Mui from '../lib/m-element-plus-components.js'
import '../lib/style.css'
// import ChooseIcon from '../lib/chooseIcon/index.js'
// import '../lib/chooseIcon/style.css'
import './mock'

const app = createApp(App)

for (let i in Icons) {
  app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}

app
  .use(router)
  .use(ElementPlus)
  // .use(ChooseIcon)
  .use(Mui)
app.mount('#app')
