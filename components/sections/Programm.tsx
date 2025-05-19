import Section from "../common/Section.tsx";

export default function Program() {
  return (
    <Section id="program" title="Programm">
      <dl class="details">
        <dt>
          <em>ab</em> 10:00 Uhr
        </dt>
        <dd>Ankunft, Begrüssung und Apperitiv im Restaurant</dd>
        <dt>
          12:00 Uhr
        </dt>
        <dd>
          Ein feines Mittagessen mit Spezialitäten aus der Region.
        </dd>
        <dt>
          <em>ca</em> 15:00 Uhr
        </dt>
        <dd>
          <p>
            Wir machen einen gemütlichen Verdauungs-Spaziergang durch den Naturpark
          </p>
        </dd>
        <dt>
          <em>bis</em> 17:00 Uhr
        </dt>
        <dd>Individueller Abschluss</dd>
      </dl>
    </Section>
  );
}
