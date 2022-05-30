import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

/**
 * 타겟인 DOM을 감시하는 훅
 * @param targetRef
 * @returns
 */
export function useIntersection(targetRef: RefObject<HTMLDivElement>) {
  const observerRef = useRef<IntersectionObserver>();
  const [intersecting, setIntersecting] = useState(false);

  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        setIntersecting(entries[0].isIntersecting);
      });
    }
    return observerRef.current;
  }, []);

  useEffect(() => {
    if (targetRef.current) {
      getObserver().observe(targetRef.current);
    }
  }, [getObserver, targetRef]);

  return intersecting;
}
