import { SMTPClient } from "$denomailer/mod.ts";
import { User } from "../shared/types.ts";
import {
  MAILERSEND_API_TOKEN,
  MAILERSEND_EMAIL,
  SMTP_PASSWORD,
  SMTP_SERVER,
  SMTP_USER,
  EMAIL_ENABLED
} from "../shared/constants.ts";

const MAIL_TEMPLATE = `
Hoi

Vielen Dank für deine Anmeldung!

Du hast folgende Personen angemeldet:
{:persons}

Du kannst über folgenden Link jederzeit deine Anmeldung ändern:
https://miaundtom-demo.deno.dev/?ref={user.id}

Wir freuen uns, bis bald
- Mia & Tom
`;

export interface Mailer {
  config: {
    enabled: boolean;
    sender: string;
  },
  send(user: User, persons: string[]): Promise<void>
}

export class MailersendMailer implements Mailer {
  config = {
    enabled: Boolean(EMAIL_ENABLED),
    sender: MAILERSEND_EMAIL,
  }

  send = async (user: User, persons: string[]): Promise<void> => {
    if (!this.config.enabled)
      return;

    const payload = {
      from: { email: this.config.sender },
      to: [{ email: user.email }],
      subject: "Deine Anmeldung bei Tom & Mia",
      text: MAIL_TEMPLATE
        .replace("{user.id}", user.id.toString())
        .replace("{:persons}", persons.map((p) => "  - " + p).join("\n")),
    };

    const res = await fetch("https://api.mailersend.com/v1/email", {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "Authorization": `Bearer ${MAILERSEND_API_TOKEN}`,
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.warn("Mailersend: Sending Email failed", await res.json());
    }
  };
}

export class SmtpMailer implements Mailer {
  config = {
    enabled: Boolean(EMAIL_ENABLED),
    sender: SMTP_USER,
  }

  send = async (user: User, persons: string[]): Promise<void> => {
    if (!this.config.enabled)
      return;

    try {
      const client = new SMTPClient({
        connection: {
          hostname: SMTP_SERVER?.split(":")[0],
          port: Number(SMTP_SERVER?.split(":")[1]),
          tls: true,
          auth: {
            username: SMTP_USER,
            password: SMTP_PASSWORD,
          },
        },
      });

      const message = MAIL_TEMPLATE
        .replace("{user.id}", user.id.toString())
        .replace("{:persons}", persons.map((p) => "  - " + p).join("\n"));

      await client.send({
        from: this.config.sender,
        to: user.email,
        subject: "Deine Anmeldung bei Tom & Mia",
        content: message,
      });

      await client.close();
    } catch (ex) {
      console.warn("SmtpServer: Sending Email failed", ex);
    }
  };
}

export const mailer = new MailersendMailer();
