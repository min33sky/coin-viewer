import { useEffect, useState } from 'react';

/**
 * 디바운스 훅
 * - 딜레이 끝나기 전에 문자가 들어오면 이전 입력값은 무시한다.
 * @param value 문자열
 * @param delay 딜레이
 * @returns
 */
function useDebounce(value: string, delay = 200) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debounceValue;
}

export default useDebounce;
