import React, { useState } from 'react'

type ContactData = {
    name: string;
    email: string;
    message: string;
}

export default function Contact() {

    // Form data secured with ContactData type
    // Form data is empty by default 
    const [formData, setFormData] = useState<ContactData>({
        name: '',
        email: '',
        message: '',
    });

    // --- UPDATE VALUES IN FORM ---
    const handleChange = (e) => {

        // Get the value and the input name from event
        const { name, value } = e.target;

        // Update formData with the new value in the input targeted 
        setFormData(formData => ({
            ...formData, // previous data in form data
            [name] : value
        }));

    }

    return (

        <section>

            <h1>Contact</h1>
            <form
                className="bg-green-dark"
            >
                <fieldset>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Nom"
                            value={formData.name}
                            onChange={handleChange} 
                            name
                        />
                    </div>
                </fieldset>

            </form>

        </section>
    )
}

