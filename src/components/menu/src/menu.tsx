import { defineComponent, PropType, useAttrs } from 'vue'
import { MenuItem } from './types'
import { toLine } from '../../../utils'

export default defineComponent({
  name: 'm-menu2',
  props: {
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true,
    },
    defaultActive: {
      type: String,
      default: '',
    },
    router: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const renderMenu = (data: MenuItem[]) => {
      return data.map((item) => {
        item.i = `el-icon-${toLine(item.icon!)}`
        const slots = {
          title: () => (
            <>
              <item.i />
              <span>{item.name}</span>
            </>
          ),
        }
        if (!item.children?.length) {
          return (
            <el-menu-item index={item.index} v-slots={slots}></el-menu-item>
          )
        }
        return (
          <el-sub-menu index={item.index} v-slots={slots}>
            {renderMenu(item.children)}
          </el-sub-menu>
        )
      })
    }
    return () => (
      <el-menu
        default-active={props.defaultActive}
        router={props.router}
        {...useAttrs()}
      >
        {renderMenu(props.data)}
      </el-menu>
    )
  },
})
