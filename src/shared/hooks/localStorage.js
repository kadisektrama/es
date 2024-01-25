import { useState } from "react";
import localStorage from "../services/localStorage";

export const useLocalStorage = (key) => {
  const [value, setValue] = useState(localStorage.getObjects(key));

  const addValue = (value) => {
    localStorage.createObject(key, value);
    setValue(localStorage.getObjects(key));
  };

  const updateValue = (value) => {
    localStorage.updateObject(key, value);
    setValue(localStorage.getObjects(key));
  };

  const deleteValue = (value) => {
    localStorage.deleteObject(key, value);
    setValue(localStorage.getObjects(key));
  };

  return [value, addValue, updateValue, deleteValue];
};
