import { ComponentChildren, JSX } from "preact";
import { ReadonlySignal } from "@preact/signals";

type SwitchProps = {
  name: string;
  checked: ReadonlySignal<boolean>;
  onChange?: JSX.GenericEventHandler<HTMLInputElement>;
  children: ComponentChildren;
} & JSX.HTMLAttributes<HTMLInputElement>;

export default function Switch({ name, checked, children, onChange, ...props }: SwitchProps) {

  const handleChange = (ev: JSX.TargetedEvent<HTMLInputElement>) => {
    onChange && onChange(ev);
  };

  return (
    <div class="form-checkbox-switch">
      <div class="checkbox-switch">
        <input 
          {...props}
          name={name}
          id={name}
          type="checkbox"
          checked={checked.value}
          onChange={handleChange} /> 
        <div class="checkbox-animate">
          <span class="checkbox-off">OFF</span>
          <span class="checkbox-on">ON</span>
        </div>
      </div>
      {children}
    </div>
  );
}
