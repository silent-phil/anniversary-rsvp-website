import { Signal, useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import { Invitee, User } from "../shared/types.ts";
import { api } from "../services/api.ts";
import { sleep } from "../shared/utils.ts";
import FullName from "../components/common/FullName.tsx";

interface InviteeListProps {
  invitees: Signal<Invitee[]>;
  user: Signal<User | null>;
  redacted: boolean;
  admin: boolean;
}

export default function InviteeList({ invitees, user, redacted, admin }: InviteeListProps) {
  const addedIndexes = useSignal([-1]);
  const removedIndex = useSignal(-1);
  const prevInvitees = useRef<Invitee[]>(invitees.value);

  useEffect(() => {
    const diff = arrayDiff(prevInvitees.current, invitees.value);
    addedIndexes.value = [...diff.map(p => invitees.value.indexOf(p))];
    prevInvitees.current = invitees.value;
  }, [invitees.value]);

  const arrayDiff = (a: Invitee[], b: Invitee[]) => b.filter((p) => a.indexOf(p) === -1);
  // deno-lint-ignore no-unused-vars
  const sortByName = (a: Invitee, b: Invitee) => a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  const sortByDate = (a: Invitee, b: Invitee) => b.registeredAt - a.registeredAt;

  const removePerson = async (person: Invitee, i: number) => {
    try {
      removedIndex.value = i;
      await sleep(100);
      await api.delete("api/invitees", person.id);
      removedIndex.value = -1;
      invitees.value = invitees.value.filter((e) => e.id !== person.id);
    } catch (ex) {
      console.error("Error removing invitee =>", ex);
    }
  };

  return (
    <div>
      <p class="note">
        Es haben sich {invitees.value.length} {invitees.value.length === 1 ? "Person" : "Personen"} angemeldet
      </p>
      <ul class="list">
        {invitees.value.sort(sortByDate).map((person, i) => (
          <li
            class={[
              user.value && user.value?.id === person.user ? "is-active" : "",
              addedIndexes.value.includes(i) ? "--added" : "",
              removedIndex.value === i ? "--removed" : "",
            ].join(" ")}
          >
            <FullName name={person.name} redacted={redacted && !admin}>
              {admin && (
                <small>
                  hinzugefügt am {new Date(person.registeredAt).toLocaleString()} von {person.by ?? "admin"}
                </small>
              )}
            </FullName>
            {(user.value && user.value?.id === person.user || admin) && (
              <button
                class="remove"
                type="button"
                onClick={() => removePerson(person, i)}
              >
                <i class="icon-trash"></i>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
