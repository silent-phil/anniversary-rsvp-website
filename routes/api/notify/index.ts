import { FreshContext, Handlers } from "$fresh/server.ts";
import { User } from "../../../shared/types.ts";
import { db } from "../../../services/database.ts";
import { mailer } from "../../../services/mailer.ts";
import Session from "../../../services/session.ts";

export const handler: Handlers<User | null> = {
  async POST(_req: Request, _ctx: FreshContext) {
    const session = new Session(_req);
    const userId = session.get();
    const user = await db.users.find(userId);
    const persons = [];

    // get invites for users
    for (const invitee of await db.invitees.all())
      if (invitee.user === userId)
        persons.push(invitee.name);
      
    // send email
    if (persons.length && !!user)
      await mailer.send(user, persons);

    return new Response(JSON.stringify({ status: "sent" }));
  },
};
