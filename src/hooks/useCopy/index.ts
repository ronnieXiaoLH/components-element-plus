import { ElMessage } from 'element-plus'

export default function useCopy(text: string) {
  const input = document.createElement('input')
  input.value = text
  document.body.appendChild(input)
  input.select()
  try {
    document.execCommand('Copy')
    ElMessage.success('复制成功')
  } catch (error) {
    console.warn('copy failed', error)
  } finally {
    document.body.removeChild(input)
  }
}
