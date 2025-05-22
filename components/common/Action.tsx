import { ComponentChildren, JSX } from "preact";

type ActionProps = {
  icon?: string;
  children: ComponentChildren;
} & JSX.HTMLAttributes<HTMLAnchorElement>;

export default function Action({ icon, children, ...props }: ActionProps) {

  return (
    <a class="action"
      {...props}
      >
      {icon && <i class={`icon-${icon}`}></i>}
      {children}
    </a>
  );
}
