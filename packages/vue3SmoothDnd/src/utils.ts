import type { Ref } from 'vue';


// 校验tag属性合法性
export function validateTagProp(tag?: Ref) {
  if (tag) {
    if (typeof tag === 'string') return true;
    if (typeof tag === 'object') {
      if (typeof tag.value === 'string' ||
        typeof tag.value === 'object' ||
        typeof tag.value === 'function'
      ) {
        return true;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
interface TagProps {
  value: string,
  props?: any,
}

// 获取Tag的属性
export function getTagProps(ctx: any, tagClass?: string): TagProps {
  const tag = ctx.$props.tag;
  if (tag) {
    if (typeof tag === 'string') {
      const res: TagProps = { value: tag };
      if (tagClass) {
        res.props = {class: tagClass};
      }
      return res;
    } else if (typeof tag === 'object') {
      const res = {value: tag.value || 'div', props: tag.props};
      if (tagClass) {
        if (tag.props.class) {
          if (Array.isArray(tag.props.class)) {
            res.props.class.push(tagClass);
          } else {
            res.props.class = [res.props.class, tagClass];
          }
        } else {
          res.props.class = tagClass
        }
      }
      return res
    }
  }
  return { value: 'div'};
}