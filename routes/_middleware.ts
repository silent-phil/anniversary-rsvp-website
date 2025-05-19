import { FreshContext } from "$fresh/server.ts";
import { UserState } from "../shared/types.ts";
import Session from "../services/session.ts";

export async function handler(req: Request, ctx: FreshContext<UserState>) {
  const session = new Session(req);
  const ref = new URL(req.url).searchParams.get('ref');
  if (ref) {
    const headers = new Headers();
    session.set(headers, ref);
    headers.set("location", "/");
    return new Response(null, {
        status: 307,
        headers,
      });
  }
  ctx.state.authorized = await session.auth();
  ctx.state.userId = session.get();
  const resp = await ctx.next();
  if (resp.ok) {
    resp.headers.set("X-Frame-Options", "DENY");
    resp.headers.set("X-Robots-Tag", "noindex");
    resp.headers.set("X-Content-Type-Options", "nosniff");
    resp.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  }
  return resp;
}