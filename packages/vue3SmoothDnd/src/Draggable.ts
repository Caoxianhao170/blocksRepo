import { constants } from 'smooth-dnd';
import { defineComponent, h } from 'vue';
import { getTagProps } from './utils';

export default defineComponent({
  name: 'Draggable',
  props: {
    tag: {
      type: [String, Object, Function],
      default: 'div',
    },
  },
  render() {
    const tagProps = getTagProps(this, constants.wrapperClass)
    return h(tagProps.value, Object.assign({}, tagProps.props), this.$slots?.default?.())
  }
})