import { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

type ImageProps = {
  src: string;
  thumb: string;
} & JSX.HTMLAttributes<HTMLImageElement>;

export default function LazyImage(props: ImageProps) {
  const loading = useSignal(true);
  const image = useSignal(props.thumb);

  useEffect(() => {
    const img = new Image(200, 200);
    img.src = props.src;
    img.onload = () => {
      image.value = img.src;
      loading.value = false;
    };
  }, []);

  return (
    <picture>
      <img 
        {...props}
        src={image.value}
        class={[
          "img",
          loading.value ? "--loading" : "",
        ].join(" ")}
      />
    </picture>
  );
}
