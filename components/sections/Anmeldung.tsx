import { Signal } from "@preact/signals";
import { Invitee, User } from "../../shared/types.ts";
import InviteeList from "../../islands/InviteeList.tsx";
import RegisterForm from "../../islands/RegisterForm.tsx";
import Section from "../common/Section.tsx";

interface RegisterProps {
  invitees: Signal<Invitee[]>;
  user: Signal<User | null>;
  registered: boolean;
  redacted: boolean;
  active: boolean;
  admin: boolean;
}

export default function Anmeldung({ invitees, user, admin, registered, active, redacted }: RegisterProps) {
  return (
    <Section id="register" title="Anmelden">
      <p>
        Damit wir alles planen können, meldet Euch bitte bei uns an. Ihr könnt gleich
        hier das Formular ausfüllen!
      </p>

      <RegisterForm
        active={active}
        redacted={redacted}
        registered={registered}
        invitees={invitees}
        user={user}
        admin={admin}
      />

      <hr class="divider" />
      <h3 class="headline">Wer kommt?</h3>

      <InviteeList
        invitees={invitees}
        redacted={redacted}
        user={user}
        admin={admin}
      />
    </Section>
  );
}
