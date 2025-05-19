import { Handlers } from "$fresh/server.ts";
import Session from "../services/session.ts";

export const handler: Handlers = {
  GET(req: Request) {
    const headers = new Headers();
    const session = new Session(req);
    session.clear(headers);
    headers.set("location", "/");
    return new Response(null, {
      status: 302,
      headers,
    });
  },
};
