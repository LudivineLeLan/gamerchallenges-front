import { useState } from "react";
import FormAuth from "./FormAuth";

export default function Auth() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <section className="flex flex-col items-center justify-center mx-auto min-h-screen w-full gap-8">
      {/* Onglets */}
      <div className="flex w-full max-w-100">
        <button
          className={`flex-1 py-3 font-bold uppercase ${
            activeTab === "login"
              ? "bg-green-light text-black"
              : "bg-green-dark text-white"
          }`}
          onClick={() => setActiveTab("login")}>
          Connexion
        </button>

        <button
          className={`flex-1 py-3 font-bold uppercase ${
            activeTab === "register"
              ? "bg-green-light text-black"
              : "bg-green-dark text-white"
          }`}
          onClick={() => setActiveTab("register")}>
          Inscription
        </button>
      </div>

      {/* Titre dynamique */}
      <h1
        className="
          text-h1-mobile italic uppercase font-bold text-white drop-shadow-title-glow text-center
          md:text-h1-tablet
          lg:text-h1-desktop
        ">
        {activeTab === "login" ? "Connexion" : "Inscription"}
      </h1>

      {/* Formulaire dynamique */}
      <FormAuth mode={activeTab} />
    </section>
  );
}
