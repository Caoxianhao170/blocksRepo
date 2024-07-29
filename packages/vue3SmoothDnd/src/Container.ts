import type { SmoothDnD } from 'smooth-dnd';
import { dropHandlers, smoothDnD } from 'smooth-dnd';
import { defineComponent, h, PropType } from "vue";

import { getTagProps, validateTagProp } from './utils';

smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler;
smoothDnD.wrapChild = false;

type EventKey = 'drag-start' | 'drag-end' | 'drop' | 'drag-enter' | 'drag-leave' | 'drop-ready';
type tag = 'string' | 'function' | 'object';

// 事件发射映射表
const eventEmitterMap: Record<EventKey, string> = {
  'drag-start': 'onDragStart',
  'drag-end': 'onDragEnd',
  'drop': 'onDrop',
  'drag-enter': 'onDragEnter',
  'drag-leave': 'onDragLeave',
  'drop-ready': 'onDropReady',
};

// @ts-ignore
export default defineComponent({
  name: 'container',
  setup() {
    return {
      container: null as SmoothDnD | null,
    };
  },
  mounted() {
    const options: any = Object.assign({}, this.$props);
    for (const key in eventEmitterMap) {
      const eventKey = key as EventKey;
      options[eventEmitterMap[eventKey]] = (props: any) => {
        this.$emit(eventKey, props);
      }
    }
    const containerElement = this.$refs.container || this.$el;
    this.container = smoothDnD(containerElement, options);
  },
  unmounted() {
    if (this.container) {
      try {
        this.container.dispose();
      } catch {
        // ignore
      }
    }
  },
  emits: ['drop', 'drag-start', 'drag-end', 'drag-enter', 'drag-leave', 'drop-ready'],
  props: {
    // 拖拽的方向
    orientation: { type: String, default: 'vertical'},
    // 设置为true时，如果将元素从任何相关容器中删除，则使用removedIndex调用onDrop
    removeOnDropOut: {type: Boolean, default: false },
    //
    autoScrollEnabled: { type: Boolean, default: true },
    //
    animationDuration: { type: Number, default: 250 },
    behaviour: { type: String },
    // 物体可在同组名容器之间移动
    groupName: { type: String },
    // css选择器可拖拽
    dragHandleSelector: String,
    nonDragAreaSelector: String,
    lockAxis: String,
    dragClass: String,
    dropClass: String,
    // 设置按压后的演示属性，然后开始拖拽
    dragBeginDelay: Number,
    // 这个被调用的函数 是来获取onDrop传递参数
    getChildPayload: Function,
    shouldAnimationDrop: Function,
    shouldAcceptDrop: Function,
    getGhostParent: Function,
    dropPlaceholder: [Object, Boolean],
    tag: {
      validator: validateTagProp,
      default: 'div'
    }
  },
  render() {
    const tagProps = getTagProps(this);
    return h(
      tagProps.value,
      Object.assign({}, { ref: 'container' }, tagProps),
      this.$slots.defaul?.()
    )
  }
});