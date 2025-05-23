import { FreshContext, Handlers } from "$fresh/server.ts";
import { Invitee } from "../../../shared/types.ts";
import { db } from "../../../services/database.ts";
import Session from "../../../services/session.ts";
import { Convert } from "../../../shared/convert.ts";

export const handler: Handlers<Invitee | null> = {
  async GET(_req: Request, _ctx: FreshContext) {

    const session = new Session(_req);
    const authorized = await session.auth();

    if (!authorized)
      return new Response(null, {
        status: 401,
      });

    const invitees = await db.invitees.all();
    const users = await db.users.all();

    const data = invitees.map(invitee => ({
      name: invitee.name,
      email: users.find(u => u.id === invitee.user)?.email || '',
      date: new Date(invitee.registeredAt).toISOString(),
      accepted: invitee.accepted
    }));

    const csv = Convert.arrayToCsv(data);
    
    const headers = new Headers();
    headers.set("Content-Type", "text/csv; charset=utf-8");
    headers.set("Content-Disposition", 'attachment; filename="exported_data.csv"');
    
    return new Response(csv, {
      status: 200,
      headers: headers,
    });
  },
};