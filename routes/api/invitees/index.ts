import { FreshContext, Handlers } from "$fresh/server.ts";
import { Invitee } from "../../../shared/types.ts";
import { db } from "../../../services/database.ts";


export const handler: Handlers<Invitee | null> = {
  async GET(_req: Request, _ctx: FreshContext) {
    const invitees = await db.invitees.all();
    return new Response(JSON.stringify(invitees));
  },
  async PUT(_req: Request, _ctx: FreshContext) {
    const invitee = (await _req.json()) as Invitee;
    await db.invitees.add(invitee);
    return new Response(JSON.stringify(invitee));
  },
  async POST(_req: Request, _ctx: FreshContext) {
    const invitees = (await _req.json()) as Invitee[];
    for (const invitee of invitees)
      await db.invitees.add(invitee);

    return new Response(JSON.stringify(invitees));
  },
};