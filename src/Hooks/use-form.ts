import React, { useReducer } from "react";
type State = {
  value: string | number;
  isValid: boolean;
  isTouched: boolean;
};

type Action = { type: "VALUECHANGED"; payload: string } | { type: "RESET" };

const initialState = { value: "", isTouched: false, isValid: false };

const reducerFn: React.Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  switch (action.type) {
    case "VALUECHANGED":
      return {
        value: action.payload,
        isTouched: true,
        isValid: action.payload.trim() !== "",
      };
    case "RESET":
      return {
        value: "",
        isTouched: false,
        isValid: false,
      };
    default:
      return initialState;
  }
};

const useForm = () => {
  const [field, dispatchFn] = useReducer(reducerFn, initialState);

  const filedValueChangeHandler = (value: any) => {
    dispatchFn({ type: "VALUECHANGED", payload: value});
  };

  const restFiled = () => {
    dispatchFn({ type: "RESET" });
  };

  return { value : field.value, isTouched: field.isTouched, isValid: field.isValid, filedValueChangeHandler, restFiled };
};

export default useForm;
