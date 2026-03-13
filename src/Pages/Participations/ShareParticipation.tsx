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
    <section>

    </section>
  )
}
