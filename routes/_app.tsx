import { type PageProps } from "$fresh/server.ts";
import { UserState } from "../shared/types.ts";
import Footer from "../components/main/Footer.tsx";
import Navbar from "../components/main/Navbar.tsx";
import Meta from "../components/main/Meta.tsx";

export default function App({ Component, url, state }: PageProps<null, UserState>) {
  return (
    <html>
      <head>
        <Meta
          title="Mia & Tom - Einladung"
          description="Wir werden 60 und 70 Jahre alt und sind bereits seit 18 Jahren gemeinsam unterwegs. Grund genug mit Euch an einem kreativen und märchenhaften Ort zu feiern."
          imageUrl={`${url.origin}/images/cover.jpg`}
          href={url.href}
          styles={[
            "/styles.css",
            "/css/fontello.css",
            "/css/animation.css",
            "https://fonts.cdnfonts.com/css/niramit-2",
            "https://fonts.cdnfonts.com/css/lifelogo-easy",
          ]}
          scripts={["/scripts.js"]}
        />
      </head>
      <body>
        <Navbar
          items={[
            { name: "Einladung", ref: "#invite", class: "is-mobile-hidden" },
            { name: "Programm", ref: "#program", class: "" },
            { name: "Anfahrt", ref: "#direction", class: "" },
            { name: "Anmelden", ref: "#register", class: "is-mobile-hidden" },
            { name: "Wunsch", ref: "#gift", class: "" },
          ]}
        />
        <Component />
        <Footer admin={!!state.authorized} />
      </body>
    </html>
  );
}
