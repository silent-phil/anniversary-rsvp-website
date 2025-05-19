import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

type BadgeProps = {
  name: string;
  years: number;
  text?: string;
  image?: string;
  delay?: number;
  animate?: boolean;
};

export default function Badge({ name, years, text, image, animate, delay }: BadgeProps) {
  const animated = useSignal(false);
  const visibility = useSignal(true);

  useEffect(() => {
    if (!animate)
      return;

    const timer = setTimeout(() => {
      animated.value = true;
    }, delay ?? 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      class={[
        "badge",
        name,
        animated.value ? "--animate" : "",
        !visibility.value ? "is-hidden" : "",
      ].join(" ")}
    >
      {image && <div class="img"><img src={image} /></div>}
      <div class="years">
        <div class="val">{years}</div>
        <sub>Jahre</sub>
      </div>
      {text && <p class="txt">{text}</p>}
    </div>
  );
}
