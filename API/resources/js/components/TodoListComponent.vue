

<script setup>
import { ref, watch, onMounted, reactive, computed } from "@vue/runtime-core";
import { DELETE, POST } from "../methods.js";
import useCounter from "../useCounter.js";
import useFetch from "../useFetch.js";
import useState from "../useState.js";
import { objectToGETparams } from "../index.js";
import TodoListLine from "./TodoListLineComponent.vue";
import SelectInput from "./SelectInputComponent.vue";
import Loader from "./LoaderComponent.vue";

const [result, load, loading] = useFetch();
const [resultSend, loadSend, loadingSend] = useFetch();
const defaultValue = { value: "", category: null };
const [newTodo, setNewTodo] = useState(defaultValue);
const todoLists = ref([]);
const categories = ref([]);
const filter = ref({});

const handleLoad = () => {
  load({
    url: "todolist" + objectToGETparams(filter.value),
  });
};

const handleAdd = (newTodoGiven) => {
  const todoTemp = todoLists.value.slice();
  todoTemp.unshift(newTodoGiven);
  todoLists.value = todoTemp;
  setNewTodo(defaultValue);
};

const handleDelete = (index) => {
  todoLists.value.splice(index, 1);
};

const handleSubmit = (e) => {
  e.preventDefault();
  loadSend({
    url: "todolist",
    method: POST,
    body: newTodo(),
  });
};

const setValue = ({ target }) => {
  setNewTodo({ ...newTodo(), value: target.value });
};

const setSelect = ({ id, name }) => {
  if (id) {
    filter.value = { category: id };
  }
  if (!name) {
    filter.value = {};
  }
};

const setCategory = (category) => {
  setNewTodo({ ...newTodo(), category });
};

watch(filter, (currentValue, oldValue) => {
  handleLoad();
});

watch(result, (currentValue, oldValue) => {
  if (currentValue && currentValue.success) {
    todoLists.value = currentValue.todoLists;
    categories.value = currentValue.categories;
  }
});

watch(resultSend, (currentValue, oldValue) => {
  if (currentValue && currentValue.success) {
    handleAdd(currentValue.todoList);
  }
});

onMounted(() => {
  handleLoad();
});
</script>

<template>
  <div class="container todolist">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <div>Todo List</div>
            <div>
              <SelectInput
                :data="categories"
                :attribute="'name'"
                :handle-callback="setSelect"
              />
            </div>
          </div>
          <div class="card-body">
            <div v-if="loading">
              <Loader />
            </div>
            <table class="table" v-else>
              <thead>
                <tr>
                  <th scope="col" class="text-center">Todo</th>
                  <th scope="col" class="text-center">Category</th>
                  <th scope="col" class="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      @input="setValue"
                      :value="newTodo().value"
                      type="text"
                      name="message"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <SelectInput
                      :data="categories"
                      :attribute="'name'"
                      :handle-callback="setCategory"
                      :default-value="
                        newTodo().category ? newTodo().category.name : ''
                      "
                    />
                  </td>
                  <td class="text-end">
                    <input
                      class="btn btn-primary col-auto"
                      v-on:click.prevent="handleSubmit"
                      type="submit"
                      value="Ajouter"
                    />
                  </td>
                </tr>
                <TodoListLine
                  v-for="(todolist, index) in todoLists"
                  :key="todolist.id"
                  :todo-list="todolist"
                  :index="index"
                  :handle-delete-call-back="handleDelete"
                  :categories="categories"
                >
                </TodoListLine>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
