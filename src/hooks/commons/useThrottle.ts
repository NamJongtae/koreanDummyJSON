import { useCallback, useRef } from "react";

const useThrottle = () => {
  const timer = useRef(false);

  return useCallback(
    (cb: (...arg: any) => void, time: number) =>
      function (...arg: any) {
        if (!timer.current) {
          cb(...arg);
          timer.current = true;
          setTimeout(() => {
            timer.current = false;
          }, time);
        }
      },
    []
  );
};

export default useThrottle;
