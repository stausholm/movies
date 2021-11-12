import { Directive } from '@vue/runtime-core';

export const clickOutside: Directive = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (ev: Event) {
      // check that click was outside the el and its children
      if (!(el == ev.target || el.contains(ev.target))) {
        // if it was, call method provided in attribute value
        binding.value(ev, el);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
};
