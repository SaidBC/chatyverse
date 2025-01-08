import { useState } from "react";

function useLocalStorage(key, value) {
  const { stringify, parse } = JSON;
  const [item, setItem] = useState(() => {
    try {
      const storageValue = window.localStorage.getItem(key);
      if (storageValue) return parse(storageValue);
      window.localStorage.setItem(key, stringify(value));
      return value;
    } catch (error) {
      console.error(error);
      window.localStorage.setItem(key, stringify(value));
      return value;
    }
  });

  const setStorageItem = (valOrfn) => {
    let newValue;
    if (typeof valOrfn == "function") {
      newValue = valOrfn(value);
    } else {
      newValue = valOrfn;
    }
    window.localStorage.setItem(key, stringify(newValue));
    setItem(newValue);
  };

  return [item, setStorageItem];
}

export default useLocalStorage;
