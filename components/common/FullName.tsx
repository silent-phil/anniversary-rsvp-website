import { ComponentChildren, JSX } from "preact";
import { random } from "../../shared/utils.ts";

type FullNameProps = {
  name: string;
  redacted?: boolean;
  children: ComponentChildren;
} & JSX.HTMLAttributes<HTMLParagraphElement>;

export default function Button({ name, redacted, children, ...props }: FullNameProps) {

  const firstname = name.split(' ')[0];
  const surname = name.split(' ')[1];
  const redact = (txt: string) => txt && random(txt.length - 1);
  const letter = (txt: string, i: number = 0) => (txt && txt[i]);

  return (
    <p {...props}
      >
      {redacted ?
        <b>{firstname} {letter(surname, 0)}<del>{redact(surname)}</del></b> :
        <b>{firstname} {surname}</b>
      }
      {children}
    </p>
  );
}
