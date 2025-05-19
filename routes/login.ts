import { FreshContext, Handlers } from "$fresh/server.ts";
import { ADMIN_PASSWORD, ADMIN_USER } from "../shared/constants.ts";
import { logins } from "../services/logins.ts";
import Session from "../services/session.ts";

export const handler: Handlers = {
  async POST(req: Request, ctx: FreshContext) {
    const form = await req.formData();
    const username = form.get("username")?.toString();
    const password = form.get("password")?.toString();
    const session = new Session(req);
    const headers = new Headers();

    const ip = ctx.remoteAddr.hostname;
    const ok = await logins.attempt(ip);

    if (ok && password === ADMIN_PASSWORD && username === ADMIN_USER) {
      await session.create(headers);
      headers.set("location", "/");
      console.info("Login successful: ", username);
      
      return new Response(null, {
        status: 303,
        headers,
      });
    }
    
    if (!ok) console.warn("Login attempt, ip blocked:", ip);
    const message = ok
      ? "Login failed. Password and/or Username are incorrect"
      : "Too many login attempts. Please try later";

    return new Response(message, {
      status: 403,
    });
  },
};
