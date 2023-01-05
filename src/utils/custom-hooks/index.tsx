import { useEffect, useState } from "react";

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState('');
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );
  return debouncedValue;
}

// export const debounceMethod = (inputVal: string, apiTimeout: null | NodeJS.Timeout, handleUpdate: (inputVal: string) => void) => {
//   if (apiTimeout) {
//     clearTimeout(apiTimeout);
//   }
//   apiTimeout = setTimeout(() => handleUpdate(inputVal || ''), 600);
//   return apiTimeout;
// };