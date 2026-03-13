import { useState } from "react"
import type { ParticipationFormData, FormErrors } from "../../types/forms"
import { useNavigate } from "react-router-dom";

export default function ShareParticipation() {

    // --- STATES INITIALIZATION --- 
    const[formData, setFormData] = useState<ParticipationFormData | null>(null);
    const[successMessage, setSuccessMessage] = useState<string | null>(null);
    const[errorMessage, setErrorMessage] = useState<FormErrors<ParticipationFormData>>({});


    // --- NAVIGATION --- 
    const navigate = useNavigate();


    // Update value put in the form
    

  return (
    <section>

    </section>
  )
}
