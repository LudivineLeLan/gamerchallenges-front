import React, { useState } from 'react'

type ContactData = {
    name: string;
    email: string;
    message: string;
}

export default function Contact() {

    // Form data secured with ContactData type
    // Data are updated with user text
    const [formData, setFormData] = useState<ContactData>({
        name: '',
        email: '',
        message:'',
    })

    return (
        <div>

        </div>
    )
}

