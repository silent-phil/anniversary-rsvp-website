import { FreshContext, Handlers } from "$fresh/server.ts";
import { User } from "../../../shared/types.ts";
import { db } from "../../../services/database.ts";
import Session from "../../../services/session.ts";

export const handler: Handlers<User | null> = {
  async GET(_req: Request, _ctx: FreshContext) {
    const session = new Session(_req);
    const userId = session.get();
    const authorized = await session.auth();
    const users = authorized
      ? await db.users.all()
      : userId
      ? [await db.users.find(userId)]
      : [];

    return new Response(JSON.stringify(users));
  },
  async POST(_req: Request, _ctx: FreshContext) {
    const user = (await _req.json()) as User;
    await db.users.add(user);
    const session = new Session(_req);
    const headers = new Headers();
    session.set(headers, user.id as string);
    return new Response(JSON.stringify(user), {
      headers,
    });
  },
};
