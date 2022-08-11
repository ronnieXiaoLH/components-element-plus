export interface TableOptions {
  label: string
  prop?: string
  width?: string | number
  align?: 'left' | 'center' | 'right'
  // 自定义列的插槽名
  slotName?: string
  // 是否是操作列
  action?: boolean
  // 是否可编辑
  editable?: boolean
}
