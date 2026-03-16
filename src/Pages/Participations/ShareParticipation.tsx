import React, { useState } from "react"
import type { ParticipationInputs, FormErrors } from "../../types/forms"
import { useNavigate } from "react-router-dom";

export default function ShareParticipation() {

    // --- STATES INITIALIZATION --- 
    const[formData, setFormData] = useState<ParticipationInputs>({
        title: "",
        url:""
    });
    const[successMessage, setSuccessMessage] = useState<string | null>(null);
    const[errorMessage, setErrorMessage] = useState<FormErrors<ParticipationInputs>>({});


    // --- NAVIGATION --- 
    const navigate = useNavigate();


    // Update value put in the form
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {

        // Get name and value from event 
        const { name, value } = e.target;

        // update the form with current value and name 
        setFormData((formData) => ({
            ...formData,
           [name]: value,
        }));
    };

  return (
    <section className="flex flex-col py-2 gap-2 items-center justify-center mx-auto min-h-screen w-full">
          <form
            className="
                        flex flex-col gap-6 text-p-mobile bg-green-dark text-white p-4 my-2 rounded-2xl border-green-light border-2 border-green-light
                        md:text-p-tablet
                        lg:w-full lg:max-w-150
                        "
            onSubmit={handleSubmit}>
            <h1
              className="
                        text-h1-mobile italic uppercase font-bold text-white drop-shadow-title-glow text-center
                        md:text-h1-tablet
                        lg:text-h1-desktop
                    ">
              Contactez-nous
            </h1>
            <fieldset
              className="w-full
                            lg:max-w-[80%] lg:mx-auto
                        ">
              <div className="flex flex-col gap-4 w-full">
                {/* Name input */}
                <Input
                  type="text"
                  placeholder="Nom"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                />
    
                {/* Mail input */}
    
                <Input
                  type="email"
                  placeholder="mail@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                />
    
                {/* Message input */}
                <Input
                  placeholder="Mon message"
                  value={formData.message}
                  onChange={handleChange}
                  name="message"
                  isTextArea
                />
    
                {/* Data management policy */}
                <div
                  className="
                                    flex items-center gap-4 text-xs
                                    md:text-sm md:justify-center">
                  <Input type="checkbox" onChange={handleChecked} width="w-auto" />
    
                  <span>J'accepte la politique de confidentialité.</span>
                </div>
    
                <Button label="Valider" type="submit" />
              </div>
            </fieldset>
          </form>
    
          <Button
            label="Retour à l'accueil"
            type="button"
            width="max-w-none"
            rounded="rounded-full"
            onClick={() => navigate("/")}
          />
    
          {/* Success message */}
    
          <SuccessMessage success={success} />
    
          {/* Error messages */}
          <ErrorSummary errors={errors} />
        </section>
  )
}
