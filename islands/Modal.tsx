// deno-lint-ignore-file no-window no-window-prefix
import { ComponentChildren, JSX } from "preact";
import { Signal } from "@preact/signals";
import { useEffect } from "preact/hooks";

type ModalProps = {
  title: string;
  visible: Signal<boolean>;
  dismissable?: boolean;
  children: ComponentChildren;
} & JSX.HTMLAttributes<HTMLInputElement>;

export default function Modal({ title, visible, dismissable, children }: ModalProps) {

  const close = (ev: KeyboardEvent) => {
    if (ev.keyCode === 27 || ev.which == 27 || ev.key === "Escape")
      visible.value = false;
  };

  useEffect(() => {
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  },[]);

  return (
    <>
      <div class={`modal ${visible.value ? "is-opened" : "is-closed"}`}>
        { dismissable && <button class="close" onClick={() => visible.value = false}>&times;</button> }
        <h4>{title}</h4>
        <div>
          {children}
        </div>
      </div>
      <div class={`dimmer ${visible.value && "is-active"}`}></div>
    </>
  );
}