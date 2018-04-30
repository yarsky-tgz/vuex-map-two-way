import dot from 'dot-prop';

export function mapStateTwoWay(targetPath, action, props) {
  let result = {};
  ((typeof props === 'string') ? [props] : props).forEach(function (prop) {
    result[prop] = {
      get() {
        return dot.get(this.$store.state, target)[prop];
      },
      set(value) {
        this.$store.dispatch(action, (typeof props === 'string') ? value : { [prop]: value });
      }
    };
  });
  return result;
}
export function mapArrayItemTwoWay(targetItem, action, props) {
  let result = {};
  props.forEach(function (prop) {
    result[prop] = {
      get() {
        return this[targetItem][prop];
      },
      set(value) {
        this.$store.dispatch(action, {
          item: this[targetItem],
          field: prop,
          value
        });
      }
    };
  });
  return result;
}
