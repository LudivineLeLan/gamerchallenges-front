import FormAuth from "../components/Auth/FormAuth";

export default function Login() {
  return (
    <section className="auth-container">
      <h1 className="auth-title">Connexion</h1>
      <FormAuth mode="login" />
    </section>
  );
}
