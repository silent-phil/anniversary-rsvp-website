import { JSX } from "preact/jsx-runtime";
import { Signal, useComputed, useSignal } from "@preact/signals";
import { Invitee, User } from "../shared/types.ts";
import { api } from "../services/api.ts";
import { sleep } from "../shared/utils.ts";
import Input from "../components/common/Input.tsx";
import MultiPersonInput from "./MultiPersonInput.tsx";
import Button from "../components/common/Button.tsx";
import Switch from "../components/common/Switch.tsx";
import Alert from "../components/common/Alert.tsx";
import Action from "../components/common/Action.tsx";


interface RegisterFormProps {
  invitees: Signal<Invitee[]>;
  user: Signal<User | null>;
  registered: boolean;
  redacted: boolean;
  active: boolean;
  admin: boolean;
}

export default function Form({ active, invitees, user, registered, redacted, admin }: RegisterFormProps) {

  const saving = useSignal(false);
  const saved = useSignal(false);

  const registrationActive = useSignal(active);
  const redactNames = useSignal(redacted);
  const additionalPersons = useSignal([""]);
  const hasUserEmailInput = useSignal(false);
  const hasUserNameInput = useSignal(false);
  const totalPersonCount = useComputed(() => 
    additionalPersons.value.filter((x) => !!x).length + (hasUserNameInput.value && !user.value ? 1 : 0));

  const handleSubmit = async (ev: JSX.TargetedSubmitEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const form = new FormData(ev.currentTarget);
    const email = form.get("user")?.toString() ?? user.value?.email;
    const persons = form.getAll("person").map((x) => x.toString()).filter((txt) => !!txt.length);

    // validation
    if (!(email && persons.length) && !admin) {
      alert("E-Mail und/oder Name fehlt!");
      return;
    }

    // save
    try {
      saving.value = true;

      if (user.value === null && !admin)
        await createUser(email as string);

      await sleep(200); // fake longer loading time
      await addInvitees(persons);
      await sendEmail();

      saved.value = true;
      saving.value = false;

    } catch (ex) {
      console.error("Unkown error occured => ", ex);
      alert("Ein Fehler ist aufgetreten. Bitte Seite neu laden und erneut versuchen!");
      saving.value = false;

    } finally {
      additionalPersons.value = [""];
      setTimeout( () => {
         // this will reset the button to allow a new submit
        saving.value = false;
        saved.value = false;
        registered = true;
      }, 3000);
    }
  };

  // actions
  const handlePurgeClick = async (ev: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    if (confirm("Wirklich alle Daten unwiderruflich löschen?")) {
      await api.post("/api/purge", {});
      globalThis.location.reload();
    }
  }
  const handleSettingsChange = async (ev: JSX.TargetedEvent<HTMLInputElement>) => {
    // deno-lint-ignore no-explicit-any
    const data = {} as any;
    data[ev.currentTarget.name] = !!ev.currentTarget.checked;
    await api.update("/api/settings", data);
  }
  const createUser = async (email: string) => {
    const res = await api.post("api/users", {
      email: email,
    }) as User;

    user.value = res;
  };
  const addInvitees = async (names: string[]) => {
    const userId = user.value?.id;
    const res = await api.post("api/invitees", names.map(name => ({
      name: name,
      accepted: true,
      user: userId
    } as Invitee)));
    
    invitees.value = [...invitees.value, ...res];
  };
  const sendEmail = async () => {
    const userId = user.value?.id;
    if (userId && !admin) {
      await api.post("api/notify", {});
    }
  }

  // validations
  const checkInviteeExists = (value: string) => ({
    valid: !invitees.value.some((p) =>
      p.name.trim().toLowerCase() === value.trim().toLowerCase()
    ),
    error: "Person wurde bereits angemeldet",
  });

  return (
    <>
      {(admin || active) ? 
        <form class="form" onSubmit={handleSubmit}>
          <fieldset>
            {admin && (
              <>
                <Alert style="info" icon="info">
                  Als Admin kannst du Anmeldungen bearbeiten
                </Alert>
                <div class="box">
                  <h4>Einstellungen</h4>
                  <Switch name="registrationActive" onChange={handleSettingsChange} checked={registrationActive}>Anmelde-Formular aktiv?</Switch>
                  <Switch name="redactNames" onChange={handleSettingsChange} checked={redactNames}>Vollständige Namen verbergen?</Switch>
                  <hr />
                  <p>
                    <Action icon="arrow-down" href="/api/invitees/csv">Teilnehmer exportieren</Action>
                    <Action icon="trash" href="#" onClick={handlePurgeClick}>Alle Daten löschen</Action>
                  </p>
                </div>
              </>
            )}
            {registered && (
              <>
                <div class="message-success">
                  <p>Vielen Dank! Du hast dich bereits angemeldet als <q>{user.value?.email}</q>. 
                  Du kannst bei Bedarf weitere Personen hinzufügen oder löschen</p>
                </div>
              </>
            )}
            {!(admin || registered) && (
              <>
                <legend>Dein Name & Email angeben</legend>
                <Input
                  label="E-Mail-Adresse"
                  type="email"
                  name="user"
                  disabled={!!user.value}
                  value={user.value?.email}
                  onInput={(ev) => hasUserEmailInput.value = ev.currentTarget.value.length > 0}
                  required
                />
                <Input
                  label="Vor- und Nachname"
                  type="text"
                  name="person"
                  disabled={!!user.value}
                  onInput={(ev) => hasUserNameInput.value = ev.currentTarget.value.length > 0}
                  validate={[checkInviteeExists]}
                  required
                />
                <div class="note">
                  <i class="icon-info"></i>
                  Bitte pro Eingabefeld nur einen einzigen Namen angeben und keine
                  Doppeleintragung wie z.B. “Adam & Eva”
                </div>
              </>
            )}
          </fieldset>
          <fieldset>
            <legend>Möchtest du weitere Personen anmelden?</legend>
            <MultiPersonInput max={10} persons={additionalPersons} invitees={invitees} />
          </fieldset>
          <div class="buttons">
            <Button
              style="submit"
              type="submit"
              disabled={totalPersonCount.value === 0}
              submitting={saving}
              submitted={saved}
            >
              <span>
                Ich melde {totalPersonCount} {totalPersonCount.value === 1 ? "Person" : "Personen"} an
              </span>
              <i class="icon-thumbs-up"></i>
            </Button>
          </div>
        </form>
      : 
        <div>
          <p class="note">Die Teilnahme-Möglichkeit ist beendet</p>
        </div>
      }
    </>
    
  );
}
