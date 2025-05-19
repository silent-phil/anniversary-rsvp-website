import Section from "../common/Section.tsx";

export default function Anfahrt() {
  return (
    <Section id="direction" title="Anfahrt" background="white">
      <dl class="details">
        <dt>Auto</dt>
        <dd>
          <p>
            Im Navi <b>Schönbrunnen</b> (Blumenweg 15, 7000 Schönbrunnen) 
            eingeben und am öffentlichen Parkplatz parken. Von da folgt
            der Beschilderung zum Restaurant Schönbrunnen.
          </p>
        </dd>
        <dt>ÖV</dt>
        <dd>
          <p>
            Mit dem Zug bis Bahnhof Vorort, von da weiter mit <b>Bus 70</b> bis Station Restaurant, Schönbrunnen
          </p>
        </dd>
      </dl>
    </Section>
  );
}
