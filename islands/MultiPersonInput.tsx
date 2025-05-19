import { Signal } from "@preact/signals";
import { Invitee } from "../shared/types.ts";

import Input from "../components/common/Input.tsx";

interface PersonInputProps {
  invitees: Signal<Invitee[]>;
  persons: Signal<string[]>;
  max: number;
}

export default function MultiPersonInput({ persons, invitees, max }: PersonInputProps) {

  function add() {
    if (is_max()) 
      return;
    persons.value = [...persons.value, ''];
  }
  
  const remove = (idx?: number)  => {
    if (is_min()) 
      return;
    persons.value = persons.value.filter((_, i) => i != (idx ?? persons.value.length - 1));
  }

  const set = (i: number, value: string) => {
    persons.value[i] = value;
    persons.value = [...persons.value];
  }

  const is_min = () => persons.value.length <= 1;
  const is_max = () => persons.value.length >= max;

  // validations
  const checkInviteeExists = (value: string) => ({
    valid: !invitees.value.some((p) => p.name.trim().toLowerCase() === value.trim().toLowerCase()),
    error: "Person wurde bereits angemeldet",
  });

  return (
    <>
      {persons.value.map((name, i) => (
        <Input
          onInput={(ev) => set(i, ev.currentTarget.value)}
          onRemove={() => remove(i)}
          validate={[checkInviteeExists]}
          removable={i > 0}
          label="Vor- und Nachname"
          value={name}
          type="text" 
          name="person"
        />
      ))}

      <div class="field-btn">
        {!is_max() && (
          <button class="btn" type="button" onClick={() => add()}>
            <i class="icon-plus"></i>
            Weitere Zeile einfügen
          </button>
        )}
        {!is_min() && (
          <button class="btn" type="button" onClick={() => remove()}>
            <i class="icon-minus"></i>
            Zeile entfernen
          </button>
        )}
      </div>
    </>
  );
}
