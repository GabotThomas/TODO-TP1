

<script setup>
import { ref, watch, defineProps, reactive } from "@vue/runtime-core";
import { DELETE, POST, PUT } from "../methods.js";
import useFetch from "../useFetch.js";
import useState from "../useState.js";
import LoadingButton from "./LoadingButtonComponent.vue";
import Loader from "./LoaderComponent.vue";
import SelectInput from "./SelectInputComponent.vue";

const props = defineProps({
  todoList: Object,
  index: Number,
  handleDeleteCallBack: Function,
  categories: Array,
});

const state = reactive({ todoList: props.todoList });
const [newValue, setNewValue] = useState(props.todoList);

const [resultDelete, loadDelete, loadingDelete] = useFetch();
const [resultEdit, loadEdit, loadingEdit] = useFetch();

const handleDelete = () => {
  loadDelete({
    url: "todolist",
    method: DELETE,
    body: {
      id: state.todoList.id,
    },
  });
};

const handleModify = (modify = true) => {
  state.todoList = { ...state.todoList, modify };
};

const setValue = ({ target }) => {
  setNewValue({ ...newValue(), value: target.value });
};

const setSelect = (category) => {
  setNewValue({
    ...newValue(),
    category,
  });
};

const handleCheck = ({ target }) => {
  console.log(target.checked);
  setNewValue({ ...newValue(), completed: target.checked });
};

const handleEdit = (justCompleted = false) => {
  loadEdit({
    url: `todolist/${state.todoList.id}`,
    method: PUT,
    body: justCompleted ? { completed: true } : newValue(),
  });
};

watch(resultDelete, (currentValue, oldValue) => {
  if (currentValue && currentValue.success) {
    props.handleDeleteCallBack(props.index);
  }
});

watch(resultEdit, (currentValue, oldValue) => {
  if (currentValue && currentValue.success) {
    state.todoList = {
      ...currentValue.todoList,
      modify: false,
    };
  }
});
</script>


<template>
  <tr v-if="state.todoList.modify">
    <td>
      <input
        @input="setValue"
        :value="newValue().value"
        type="text"
        name="message"
        class="form-control"
        :disabled="loadingEdit"
      />
    </td>
    <td>
      <SelectInput
        :data="props.categories"
        :attribute="'name'"
        :handle-callback="setSelect"
        :default-value="newValue().category ? newValue().category.name : ''"
      />
    </td>
    <td class="text-end">
      <div>
        <div class="form-checking">
          <input
            class="form-check-input"
            type="checkbox"
            @input="handleCheck"
            :checked="state.todoList.completed"
          />
        </div>
        <button
          v-on:click.prevent="(e) => handleEdit()"
          type="submit"
          class="btn btn-success m-1"
          value="Modifier"
          :disabled="loadingEdit"
        >
          <LoadingButton :loading="loadingEdit" />
          Modifier
        </button>
        <button
          v-on:click="(e) => handleModify(false)"
          class="btn btn-danger m-1 icon-btn"
        >
          <span class="material-icons">close</span>
        </button>
      </div>
    </td>
  </tr>
  <tr
    v-else
    v-bind:class="{
      completed: state.todoList.completed,
      todo_list_line: true,
    }"
  >
    <td class="align-middle">
      {{ state.todoList.value }}
    </td>
    <td class="text-center align-middle">
      <div v-if="state.todoList.category_id">
        {{ state.todoList.category.name }}
      </div>
    </td>
    <td class="text-end">
      <div>
        <button
          v-if="!state.todoList.completed"
          v-on:click="(e) => handleEdit(true)"
          class="btn btn-success col-auto m-1 icon-btn"
        >
          <Loader v-if="loadingEdit" />
          <span v-else class="material-icons">done</span>
        </button>

        <button
          v-on:click="handleModify"
          class="btn btn-warning col-auto m-1 icon-btn"
        >
          <span class="material-icons">mode_edit</span>
        </button>
        <button
          v-on:click="handleDelete"
          class="btn btn-danger col-auto m-1 icon-btn"
          :disabled="loadingDelete"
        >
          <Loader v-if="loadingDelete" />
          <span v-else class="material-icons">delete</span>
        </button>
      </div>
    </td>
  </tr>
</template>

