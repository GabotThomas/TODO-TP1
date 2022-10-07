
<script setup>
import { defineProps, ref, watch } from "@vue/runtime-core";

const props = defineProps({
  data: Array,
  attribute: String,
  handleCallback: Function,
  defaultValue: {
    type: String,
    default: "",
  },
});

const dataSearch = ref(props.data);
const value = ref(props.defaultValue);
const activeResult = ref(false);
const valueSelected = ref();

const setValue = ({ target }) => {
  value.value = target.value;
  const valueExistedIndex = filteredList();
  if (valueExistedIndex >= 0) {
    valueSelected.value = valueExistedIndex;
    props.handleCallback(props.data[valueExistedIndex]);
    return;
  }
  valueSelected.value = null;
  props.handleCallback({ [props.attribute]: value.value });
};

const handleFocus = () => {
  activeResult.value = true;
  const valueExistedIndex = filteredList();
  if (valueExistedIndex >= 0) {
    valueSelected.value = valueExistedIndex;
  }
};

const handleBlur = () => {
  activeResult.value = false;
};

const handleClick = (index) => {
  value.value = dataSearch.value[index][props.attribute];
  props.handleCallback(dataSearch.value[index]);
};

watch(props, (currentValue, oldValue) => {
  dataSearch.value = props.data;
});

const filteredList = () => {
  return props.data.findIndex(
    (search) =>
      search[props.attribute].toLowerCase() == value.value.toLowerCase()
  );
};
</script>

<template>
  <div class="select-input">
    <input
      @input="setValue"
      :value="value"
      type="text"
      name="message"
      class="form-control"
      v-on:focus="handleFocus"
      v-on:blur="handleBlur"
      autocomplete="off"
    />
    <div class="select-list">
      <ul v-if="activeResult" class="list-group">
        <li
          v-for="(property, index) in dataSearch"
          :key="property.id"
          :value="property.id"
          v-on:mousedown="(e) => handleClick(index)"
          v-bind:class="{
            selected: valueSelected == index,
            'list-group-item': true,
          }"
        >
          {{ property[attribute] }}
        </li>
      </ul>
    </div>
  </div>
</template>
