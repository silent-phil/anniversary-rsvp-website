import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Signal, useComputed, useSignal } from "@preact/signals";
import { ValidatorResult } from "../../shared/types.ts";

type InputProps = {
  name: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date';
  label: string;
  removable?: boolean;
  validate?: Array<(value: string) => ValidatorResult>;
  onRemove?: JSX.GenericEventHandler<HTMLButtonElement>;
  onInput?: JSX.GenericEventHandler<HTMLInputElement>;
  onChange?: JSX.GenericEventHandler<HTMLInputElement>;
  onBlur?: JSX.FocusEventHandler<HTMLInputElement>;
} & JSX.HTMLAttributes<HTMLInputElement>;


export default function Input({ name, label, removable, validate, onRemove, onInput, onChange, ...props }: InputProps) {
  
  const errorMessage = useSignal(null) as Signal<string | null>;

  const handleValidation = (ev: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const value = ev.currentTarget.value
    errorMessage.value = null;
    if (validate && value.length > 0) {
      for (const check of validate) {
        const result = check(value);
        if (!result.valid) {
          errorMessage.value = result.error;
          return;
        }
      }
    }
  };

  const handleChange = (ev: JSX.TargetedEvent<HTMLInputElement>) => {
    onChange && onChange(ev);
    handleValidation(ev);
  };

  function handleInput(ev: JSX.TargetedEvent<HTMLInputElement>) {
    onInput && onInput(ev);
    handleValidation(ev);
  }

  return (
    <div
      class={[
        "form-field",
        "has-floating-label",
        removable ? "is-removable" : "",
        errorMessage.value ? "has-errors" : "",
      ].join(' ')}
    >
      <input
        {...props}
        id={name}
        name={name}
        placeholder={label}
        aria-invalid={!!errorMessage?.value}
        aria-errormessage={`${name}-error`}
        onInput={handleInput}
        onChange={handleChange}
        required={!IS_BROWSER || props.required}
        disabled={!IS_BROWSER || props.disabled}
      />
      <label>{label}</label>
      {removable && <button onClick={onRemove} type="button" class="remove">&times;</button>}
      <span class="message" id={`${name}-error`}>{errorMessage}</span>
    </div>
  );
}
