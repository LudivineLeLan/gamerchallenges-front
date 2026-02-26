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
        message:'',
    });



    return (

        <section>

            <form>

                <legend>Contact</legend>
                <fieldset>
                    
                </fieldset>

            </form>

        </section>
    )
}

