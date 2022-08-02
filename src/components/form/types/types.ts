import { CSSProperties } from 'vue'
import { RuleItem } from './rule'

export interface FormOptions {
  // type 类型实际类型是枚举值，所有的表单子组件类型
  type: string
  value?: any
  label?: string
  prop?: string
  rules?: RuleItem[]
  placeholder?: string
  // 表单元素的特有属性
  attrs?: {
    style?: CSSProperties
    clearable?: boolean
    'show-password'?: boolean
    disabled?: boolean
  }
  children?: FormOptions[]
  // 上传组件的属性
  uploadAttrs?: {
    action?: string
    method?: 'post' | 'get' | 'put'
    multiple?: boolean
    data?: Object
    name?: string
    accept?: string
    disable?: boolean
    limit?: number
  }
}
