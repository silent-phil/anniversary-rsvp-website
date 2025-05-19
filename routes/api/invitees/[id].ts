import { FreshContext, Handlers } from "$fresh/server.ts";
import { Invitee } from "../../../shared/types.ts";
import { db } from "../../../services/database.ts";

export const handler: Handlers<Invitee | null> = {
  async GET(_req: Request, _ctx: FreshContext) {
    const id = parseInt(_ctx.params.id);
    const invitee = await db.invitees.find(id);
    return new Response(JSON.stringify(invitee));
  },
  async DELETE(_req: Request, _ctx: FreshContext) {
    const id = parseInt(_ctx.params.id);
    await db.invitees.delete(id);
    return new Response();
  }
};