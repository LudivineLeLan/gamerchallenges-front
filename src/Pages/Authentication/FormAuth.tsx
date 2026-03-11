import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../Services/authService";
import SuccessMessage from "../../ui/SuccessMessage";
import Input from "../../ui/Input";
import ErrorSummary from "../../ui/ErrorSummary";
import Button from "../../ui/Button";
// Types
import type {
  LoginFormData,
  RegisterFormData,
  FormErrors,
} from "../../types/forms";

type FormAuthProps = {
  mode: "login" | "register";
};

export default function FormAuth({ mode }: FormAuthProps) {
  const navigate = useNavigate();

  // -----------------------------------------------------
  // 1) State dynamique selon le mode (login ou register)
  // -----------------------------------------------------
  const [formData, setFormData] = useState<LoginFormData | RegisterFormData>(
    mode === "login"
      ? { email: "", password: "" }
      : {
          email: "",
          username: "",
          password: "",
          acceptPolicy: false,
          avatar: undefined,
        },
  );

  // -----------------------------------------------------
  // 2) State des erreurs (union propre)
  // -----------------------------------------------------
  const [errors, setErrors] = useState<
    FormErrors<LoginFormData> | FormErrors<RegisterFormData>
  >({});

  const [success, setSuccessMessage] = useState<string>("");

  // -----------------------------------------------------
  // 3) Gestion des inputs texte
  // -----------------------------------------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -----------------------------------------------------
  // 4) Gestion de l’avatar (register uniquement)
  // -----------------------------------------------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData({ ...formData, avatar: file });
  };

  // -----------------------------------------------------
  // 5) Gestion de la checkbox (register uniquement)
  // -----------------------------------------------------
  const handleCheckbox = () => {
    if (mode === "register") {
      setFormData({
        ...formData,
        acceptPolicy: !(formData as RegisterFormData).acceptPolicy,
      });
    }
  };

  // -----------------------------------------------------
  // 6) Validation front simple
  // -----------------------------------------------------
  const validate = () => {
    const newErrors: any = {};

    if (!formData.email) newErrors.email = "Email obligatoire.";
    if (!formData.password) newErrors.password = "Mot de passe obligatoire.";

    if (mode === "register") {
      const data = formData as RegisterFormData;

      if (!data.username) newErrors.username = "Nom d'utilisateur obligatoire.";
      if (!data.acceptPolicy)
        newErrors.isChecked = "Vous devez accepter la politique.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -----------------------------------------------------
  // 7) Submit dynamique selon le mode
  // -----------------------------------------------------
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      if (mode === "login") {
        const data = await loginUser(formData as LoginFormData);
        localStorage.setItem("token", data.token);
        navigate("/mon-compte");
      } else {
        await registerUser(formData as RegisterFormData);

        setSuccessMessage("Inscription réussie !");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err: any) {
      setErrors({ server: err.message });
    }
  };

  // -----------------------------------------------------
  // 8) Rendu JSX
  // -----------------------------------------------------
  return (
    <>
      <SuccessMessage success={success} />

      <form onSubmit={handleSubmit} className="auth-form">
        {/* Email */}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        {/* Nickname (register only) */}
        {mode === "register" && (
          <>
            <Input
              type="text"
              name="username"
              placeholder="Pseudo"
              value={(formData as RegisterFormData).username}
              onChange={handleChange}
            />
            {(errors as FormErrors<RegisterFormData>).username && (
              <p className="error">
                {(errors as FormErrors<RegisterFormData>).username}
              </p>
            )}
          </>
        )}

        {/* Password */}
        <Input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        {/* Avatar (register only) */}
        {mode === "register" && (
          <input type="file" name="avatar" onChange={handleFileChange} />
        )}

        {/* Accept policy (register only) */}
        {mode === "register" && (
          <>
            <label>
              <Input
                type="checkbox"
                name="acceptPolicy"
                checked={(formData as RegisterFormData).acceptPolicy}
                onChange={handleCheckbox}
              />
              J’accepte la politique de confidentialité
            </label>
            {errors.isChecked && <p className="error">{errors.isChecked}</p>}
          </>
        )}

        {/* Erreur serveur */}
        {errors.server && <p className="error">{errors.server}</p>}

        <Button
          label={mode === "login" ? "Se connecter" : "Créer un compte"}
          type="submit"
        />
      </form>

      <ErrorSummary errors={errors} />
    </>
  );
}
