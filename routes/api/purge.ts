import { FreshContext, Handlers } from "$fresh/server.ts";
import { User } from "../../shared/types.ts";
import { db } from "../../services/database.ts";
import Session from "../../services/session.ts";

export const handler: Handlers<User | null> = {
  async POST(_req: Request, _ctx: FreshContext) {
    const session = new Session(_req);
    const authorized = await session.auth();

    if (authorized) {
      await db.clear();
      console.warn("All data purged successfully")
      return new Response(JSON.stringify({}));
    }

    return new Response(null, {
      status: 403,
    });
  },
};
