import FormAuth from "../components/Auth/FormAuth";

export default function Register() {
  return (
    <section className="auth-container">
      <h1 className="auth-title">Créer un compte</h1>
      <FormAuth mode="register" />
    </section>
  );
}
