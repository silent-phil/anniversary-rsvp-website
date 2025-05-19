import Section from "../common/Section.tsx";

export default function Einladung() {
  return (
    <Section id="invite" background="white">
      <dl class="details details --facts">
        <dt>
          <i class="icon-calendar"></i>
        </dt>
        <dd>
          <h3 class="subline">Samstag, XX. Juni 2025</h3>
          <p>
            <a
              class="link"
              target="_blank"
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mia%20%26%20Tom%20Feier"
            >
              In Google Kalender speichern
            </a>
          </p>
        </dd>
      </dl>
      <dl class="details details --facts">
        <dt>
          <i class="icon-location"></i>
        </dt>
        <dd>
          <h3 class="subline">Restaurant Schönbrunnen</h3>
          <p>
            <a
              class="link"
              target="_blank"
              href="https://www.google.com/maps/search/?api=1&query=Restaurant+Schönbrunnen"
            >
              In Google Maps anzeigen
            </a>
          </p>
        </dd>
      </dl>
      <p>
        Wir feiern unser 10-järiges Jubiläum und wollen dies mit euch feiern! Genießt mit uns
        die Sonne und feines Essen in der wunderschönen Terasse des Restaurants Schönbrunnen
      </p>
    </Section>
  );
}
