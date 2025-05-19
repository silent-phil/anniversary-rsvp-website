import { ComponentChildren, JSX } from "preact";
import { Ref } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { ReadonlySignal } from "@preact/signals";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  style?: string;
  submitting?: ReadonlySignal<boolean>;
  submitted?: ReadonlySignal<boolean>;
  ref?: Ref<HTMLButtonElement>;
  onClick?: JSX.GenericEventHandler<HTMLButtonElement>;
  children: ComponentChildren;
} & JSX.HTMLAttributes<HTMLButtonElement>;

export default function Button({ type, style, submitting, submitted, ref, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={!IS_BROWSER || props.disabled}
      class={`button --${style} ${submitting?.value && "is-submitting"} ${submitted?.value && "is-submitted"}`}
    >
      {children}
    </button>
  );
}
