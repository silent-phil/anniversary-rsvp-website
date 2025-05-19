import Section from "../common/Section.tsx";
import Image from "../common/Image.tsx";

export default function Wunsch() {
  return (
    <Section id="gift" title="Wunsch" background="white">
      <div class="headerimage">
        <Image
          src="/images/gift.jpg"
          alt="Geschenk"
          loading="lazy"
        />
      </div>
      <p>
        Wir lieben zu Reisen und zu Wandern und freuen uns schon auf den nächsten Ausflug durch ganz Frankreich.
      </p>
      <p>
        Falls ihr uns etwas schenken möchtet, dürft ihr die Reise gerne mitfinanzieren 
        und etwas in das bereitgestellte Sparschwein legen oder twinten.
      </p>
    </Section>
  );
}
