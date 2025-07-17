import { useEventListener } from "./useEventListener";

export function useOnClickOutside(ref, handler, mouseEvent) {
  useEventListener(mouseEvent, (event) => {
    const el = ref?.current;

    if (!el || el.contains(event.target)) {
      return;
    }

    handler(event);
  });
}
