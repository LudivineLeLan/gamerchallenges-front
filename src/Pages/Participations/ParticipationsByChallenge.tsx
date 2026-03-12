import { useState } from "react";
import { useParams } from "react-router-dom"
import type { Participation } from "../../types/models";

export default function ParticipationsByChallenge() {

    // --- Get id from params --- 
    const { id } = useParams();

    // --- States initialization --- 
    const[participations, setParticipations] = useState<Participation | null>(null);

  return (
    <section>
    </section>
    
  )
}
