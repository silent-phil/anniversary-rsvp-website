import { JSX } from "preact";

export default function Image(props: JSX.HTMLAttributes<HTMLImageElement>) {
  return (
    <picture>
      <img 
        {...props}
        class="img"
      />
    </picture>
  );
}
