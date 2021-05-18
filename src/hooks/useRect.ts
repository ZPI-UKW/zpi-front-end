import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

export const useRect = (): [
  ClientRect | undefined,
  React.MutableRefObject<HTMLElement | undefined>
] => {
  const ref = useRef<HTMLElement>();
  const [size, setSize] = useState<ClientRect | undefined>(undefined);

  const set = () =>
    setSize(ref && ref.current && ref.current ? ref.current.getBoundingClientRect() : undefined);

  useEffect(() => {
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  return [size, ref];
};
