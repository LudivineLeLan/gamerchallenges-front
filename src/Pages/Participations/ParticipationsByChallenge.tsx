import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Challenge } from "../../types/models";
import H1Title from "../../ui/H1Title";
import ReactPlayer from "react-player";
import Pagination from "../../ui/Pagination";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

// Nouveaux imports pour la gestion des erreurs
import type { ApiErrorResponse } from "../../types/forms";
import ErrorSummary from "../../ui/ErrorSummary";

type ApiResponse = Challenge & { error?: string };

export default function ParticipationsByChallenge() {
    // --- Get id from params ---
    const { id } = useParams();
    const { userInfo, token, loadingUser } = useAuth();

    // --- STATES INITIALIZATION ---
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [error, setError] = useState<Partial<ApiErrorResponse>>({});

    // --- PAGINATION DATA ---
    const [currentPage, setCurrentPage] = useState<number>(1);
    const participationPerPage: number = 6;
    const totalPages = Math.ceil(
        (challenge?.participations?.length || 0) / participationPerPage,
    );
    const endIndex = participationPerPage * currentPage;
    const startIndex = endIndex - participationPerPage;
    const currentParticipations =
        challenge?.participations?.slice(startIndex, endIndex) || [];

    // --- SHOW PARTICIPATIONS IF EXISTING ---
    useEffect(() => {
        const fetchParticipations = async () => {

            const API_URL = import.meta.env.VITE_API_URL;

            setChallenge(null);
            setError({});

            try {
                const response = await fetch(
                    `${API_URL}/challenges/${id}/participations`,
                );
                const data: ApiResponse = await response.json();
                console.log("Données reçues:", data);

                // 3. Throw data si la requête échoue
                if (!response.ok) {
                    throw data;
                }

                setChallenge(data);
            } catch (err: any) {
                
                console.error("Erreur reçue:", err);
                setError({
                    server: err.error || "Impossible d'afficher les participations.",
                    statusCode: err.status || 500
                });
            }
        };

        if (id) fetchParticipations();
    }, [id]);

    // --- Handler vote à implémenter plus tard ---
    const handleVote = async (participationId: number) => {
        // TODO: envoyer un POST à /participations/:id/vote avec token
        console.log("Vote clicked for participation:", participationId);
    };

    // Checking that the challenge has participations
    const hasParticipation = (challenge?.participations?.length ?? 0) > 0;

    // LOADING
    if (!challenge && !error.server) {
        return (
            <div className="flex justify-center mt-10">
                <p className="text-white animate-pulse">Chargement en cours...</p>
            </div>
        );
    }

    return (
        <section className="p-2">
            
            <ErrorSummary errors={error} />

            {challenge && (
                <>
                    <H1Title>
                        Participations au challenge : {challenge.name}
                    </H1Title>

                    <div
                        className="grid grid-cols-1 gap-6 w-[90%] max-w-[370px] mx-auto
                              md:grid-cols-2 md:max-w-[600px] md:gap-12
                              lg:grid-cols-3 lg:max-w-[1200px]"
                    >
                        {hasParticipation ? (
                            currentParticipations.map((part) => (
                                <div key={part.id} className="flex flex-col gap-2">
                                    <div className="border border-green-light rounded-lg overflow-hidden relative aspect-video w-full">
                                        <ReactPlayer
                                            src={part.url}
                                            controls={true}
                                            width="100%"
                                            height="100%"
                                            className="absolute top-0 left-0"
                                        />
                                    </div>
                                    <div className="flex flex-col items-center text-p-mobile md:text-p-tablet text-white">
                                        <p>{part.title}</p>
                                        <p>Posté par : {part.player?.username}</p>

                                        {/* --- Bouton vote avec nombre de votes --- */}
                                        <div className="flex items-center gap-2 mt-1">
                                            <span>{part.voteCount || 0}</span>
                                            <FaHeart
                                                className="cursor-pointer text-white text-[18px]"
                                                onClick={() => handleVote(part.id)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex justify-center text-white mt-4 opacity-50">
                                <p>Il n'y a aucune participation actuellement à ce challenge.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination protégée par la condition du challenge */}
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    )}
                </>
            )}
        </section>
    );
}