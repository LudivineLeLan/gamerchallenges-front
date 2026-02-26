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

        <section
            className=""
        >

            <h1
                className="text-lg"
            >Contact</h1>
            <form
                className="bg-green-dark text-white  p-4"
            >
                <fieldset>
                    <div
                        className="flex flex-col gap-4"
                    >

                        {/* Name field */}
                        <input 
                            type="text" 
                            placeholder="Nom"
                            value={formData.name}
                            onChange={handleChange} 
                            name="name"
                            className="bg-black-dark py-2 px-4 rounded-full"
                        />

                        {/* Mail field */}
                        <input 
                            type="text" 
                            placeholder="mail@mail.com"
                            value={formData.email}
                            onChange={handleChange} 
                            name="email"
                            className="bg-black-dark py-2 px-4 rounded-full"
                        />

                        {/* Message field */}
                        <input 
                            type="text" 
                            placeholder="Je voudrais avoir des informations sur..."
                            value={formData.message}
                            onChange={handleChange} 
                            name="message"
                            className="bg-black-dark py-2 px-4 rounded-full"
                        />
                        <textarea/>
                    </div>
                </fieldset>

            </form>

        </section>
    )
}

