
import { ComponentChildren } from "preact";

type SectionProps = {
  id?: string;
  title?: string;
  style?: string;
  background?: string;
  children: ComponentChildren;
}

export default function Section({ id, title, style, background, children }: SectionProps) {

  const ref = (id ?? title)?.replace(/\s/g,"").toLocaleLowerCase();

  return (
    <section id={ref} 
      class={[
        "section",
        style ? "--" + style : "",
        background ? "bg-" + background : "",
      ].join(" ")}
    >
      {title && <h2 class="headline">{title}</h2>}
      {children}
    </section>
  );
}