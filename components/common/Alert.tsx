import { ComponentChildren, JSX } from "preact";

type AlertProps = {
  style: 'info' | 'success' | 'warning' | 'danger';
  icon?: string;
  children: ComponentChildren;
} & JSX.HTMLAttributes<HTMLDivElement>;

export default function Image({ style, icon, children, ...props }: AlertProps) {

  return (
    <div
      {...props}
      class={`alert --${style}`}
      >
      <i class={`icon-${icon}`}></i>
      {children}
    </div>
  );
}
