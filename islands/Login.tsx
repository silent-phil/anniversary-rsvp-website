import { useSignal } from "@preact/signals";
import Modal from "../islands/Modal.tsx";

interface LoginProps {
  loggedIn: boolean;
}

export default function Login({ loggedIn }: LoginProps) {
  const visibility = useSignal(false);
  const openModel = (ev : Event) => {
    ev.preventDefault();
    visibility.value = true;
  };
  
  return (
    <>
      {loggedIn ? (
        <p><a href="/logout">Logout</a></p>
      ) : (
        <p><a href="#" onClick={openModel}>Admin-Login</a></p>
      )}

      <Modal
        title="Admin Anmeldung"
        dismissable={true}
        visible={visibility}
      >
        <form class="form" method="post" action="/login">
          <div class="form-field">
            <input type="text" name="username" placeholder="Username" />
          </div>
          <div class="form-field">
            <input type="password" name="password" placeholder="Password" />
          </div>
          <p>Demo-User: demo / Demo-Password: demo</p>
          <button class="button" type="submit">Los</button>
        </form>
      </Modal>
    </>
  );
}
