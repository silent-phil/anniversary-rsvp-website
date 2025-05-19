import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

type LogoProps = {
  text: string;
  delay?: number;
};

export default function Logo({ text, delay }: LogoProps) {
  const animate = useSignal(false);
  const transitionDelay = (index: number) => "transition-delay:" + Math.abs(0.1 + index / 10 - text.length * 0.1 / 2).toFixed(1) + "s";
  const transitionDuration = "transition-duration:" + (text.length / 10 / 2) + "s";

  useEffect(() => {
    const timer = setTimeout(() => {
      animate.value = true;
    }, delay ?? 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      class={["logo", animate.value ? "--animate" : ""].join(" ")}
      >
      <div
        class="letters"
        style={transitionDuration}
        >
        {[...text].map((char, i) => 
          char.trim() !== ''
            ? (<span style={transitionDelay(i)}>{char}</span>)
            : ' '
        )}
      </div>
    </div>
  );
}
