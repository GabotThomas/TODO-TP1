import { ref, readonly, reactive } from "vue";

const useReactive = (initValue) => {
    const state = reactive({ value: initValue });
    const setState = (newValue) => {
        state.value = newValue;
    }

    return [state, setState];
}

export default useReactive;
