import { useSignal } from "@preact/signals";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Invitee, Settings, User, UserState } from "../shared/types.ts";
import { db } from "../services/database.ts";

import Intro from "../components/sections/Intro.tsx";
import Programm from "../components/sections/Programm.tsx";
import Anfahrt from "../components/sections/Anfahrt.tsx";
import Wunsch from "../components/sections/Wunsch.tsx";
import Einladung from "../components/sections/Einladung.tsx";
import Outro from "../components/sections/Outro.tsx";
import Anmeldung from "../components/sections/Anmeldung.tsx";

interface Context {
  invitees: Invitee[];
  settings: Settings | null;
  currentUser: User | null;
}

export const handler: Handlers<Context, UserState> = {
  async GET(_req, ctx) {
    // get initial data
    const data = {} as Context;
    data.settings = await db.settings.get();
    data.invitees = await db.invitees.all();
    data.currentUser = ctx.state.userId 
      ? await db.users.find(ctx.state.userId) 
      : null;

    // get invitee>user mapping (only for admin user)
    if (ctx.state.userId && ctx.state.authorized) {
      const users = await db.users.all();
      for (const person of data.invitees) {
        person.by = users.find(u => u.id === person.user)?.email
          ?? "admin";
      }
    }

    return ctx.render(data);
  },
};

export default function Home({ data, state }: PageProps<Context, UserState>) {
  const invitees = useSignal(data.invitees);
  const currentUser = useSignal(data.currentUser);
  const alreadyRegistered = invitees.value.some(p => currentUser.value && p.user === currentUser.value?.id);
  const registrationActive = data.settings?.registrationActive || false;
  const redactNames = data.settings?.redactNames || false;

  return (
    <>
      <Intro />
      <Einladung />
      <Programm />
      <Anfahrt />
      <Anmeldung 
        user={currentUser}
        invitees={invitees}
        registered={alreadyRegistered}
        admin={state.authorized}
        active={registrationActive}
        redacted={redactNames} />
      <Wunsch />
      <Outro />
    </>
  );
}
