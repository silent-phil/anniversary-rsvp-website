import Section from "../common/Section.tsx";
import Logo from "../../islands/Logo.tsx";
import Badge from "../../islands/Badge.tsx";
import LazyImage from "../../islands/LazyImage.tsx";

export default function Intro() {
  return (
    <Section id="intro" style="intro">
      <LazyImage
        thumb="/images/intro-thumb.jpg"
        src="/images/intro.jpg"
        alt="Mia & Tom"
      />
      <Logo text="Mia & Tom" delay={500} />
      <Badge name="wreath" years={10} text="gemeinsam unterwegs" delay={1000} image="/images/kranz.png" animate={true} />
      <Badge name="left" years={34} />
      <Badge name="right" years={38} />
      <div class="buttons">
        <a class="button --overlay --fx-scroll" href="#register">
          Zur Anmeldung
        </a>
        <a class="--fx-scroll"  href="#invite">
          <button class="next">
            <i class="icon-arrow-down"></i>
          </button>
        </a>
      </div>
    </Section>
  );
}
