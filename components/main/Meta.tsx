import { asset } from "$fresh/runtime.ts";

export interface MetaProps {
  title: string; // Title of the current page
  description: string; // Description of the current page
  href: string; // URL of the current page
  imageUrl: string; // URL of the cover image
  styles?: string[];
  scripts?: string[]
}

export default function Meta(props: MetaProps) {
  return (
    <>
      <title>{props.title}</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="noindex" />
      <meta name="description" content={props.description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={props.title} />
      <meta property="og:locale" content="de_CH" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:url" content={props.href.slice(0, -1)} />
      <meta property="og:image" content={props.imageUrl} />
      <meta property="og:image:width" content="900" />
      <meta property="og:image:height" content="900" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.imageUrl} />
      <link rel="canonical" href={`${props.href}`} />
      {props.styles?.map((src) => <link rel="stylesheet" href={asset(src)} async />)}
      {props.scripts?.map((src) => <script src={asset(src)} async defer></script>)}
    </>
  );
}
