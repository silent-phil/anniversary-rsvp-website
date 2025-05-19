import { FreshContext, Handlers } from "$fresh/server.ts";
import { Settings } from "../../../shared/types.ts";
import { db } from "../../../services/database.ts";
import Session from "../../../services/session.ts";

export const handler: Handlers<Settings | null> = {
  async GET(_req: Request, _ctx: FreshContext) {
    const session = new Session(_req);
    const authorized = await session.auth();
    const settings = await db.settings.get();

    if (!authorized)
      return new Response(null, {
        status: 401,
      });

    return new Response(JSON.stringify(settings));
  },
  async PATCH(_req: Request, _ctx: FreshContext) {
    const session = new Session(_req);
    const authorized = await session.auth();
    const json = (await _req.json()) as Settings;

    if (!authorized)
      return new Response(null, {
        status: 401,
      });

    await db.settings.update(json);

    return new Response(null, {
      status: 204,
    });
  },
};
