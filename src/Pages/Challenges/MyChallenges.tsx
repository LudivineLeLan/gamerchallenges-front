import { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import Pagination from "../../ui/Pagination";
import { useAuth } from "../../hooks/useAuth";
import { AuthContext } from "../../Context/AuthContext";

type ParticipationChallenge = {
	id: number;
	name?: string;
	title?: string;
};

type Participation = {
	id: number;
	video?: string;
	video_url?: string;
	challenge?: ParticipationChallenge;
	Challenge?: ParticipationChallenge;
};

function getYoutubeEmbedUrl(url?: string) {
	if (!url) return "";

	try {
		const parsedUrl = new URL(url);

		if (parsedUrl.hostname.includes("youtube.com")) {
			const videoId = parsedUrl.searchParams.get("v");
			return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
		}

		if (parsedUrl.hostname.includes("youtu.be")) {
			const videoId = parsedUrl.pathname.slice(1);
			return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
		}

		return "";
	} catch {
		return "";
	}
}

export default function MyProfile() {
	const { token } = useContext(AuthContext);
	const { userInfo, loadingUser } = useAuth();

	const [participations, setParticipations] = useState<Participation[]>([]);
	const [loadingParticipations, setLoadingParticipations] = useState(false);
	const [error, setError] = useState("");

	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 3;

	useEffect(() => {
		if (!userInfo?.id || !token) return;

		const fetchParticipations = async () => {
			try {
				setLoadingParticipations(true);
				setError("");

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/users/${userInfo.id}/participations`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP error ${response.status}`);
				}

				const data = await response.json();
				console.log("participations:", data);

				const participationsList = Array.isArray(data)
					? data
					: data.participations || [];

				setParticipations(participationsList);
			} catch (err) {
				console.error("Erreur récupération participations :", err);
				setError("Impossible de récupérer les participations.");
			} finally {
				setLoadingParticipations(false);
			}
		};

		fetchParticipations();
	}, [userInfo?.id, token]);

	if (loadingUser) {
		return <p className="mt-10 text-center text-white">Chargement...</p>;
	}

	if (!userInfo) {
		return (
			<p className="mt-10 text-center text-white">
				Utilisateur introuvable.
			</p>
		);
	}

	const totalPages = Math.ceil(participations.length / pageSize);
	const startIndex = (currentPage - 1) * pageSize;
	const currentParticipations = participations.slice(
		startIndex,
		startIndex + pageSize,
	);

	return (
		<div className="min-h-screen w-full bg-[radial-gradient(circle_at_50%_20%,rgba(0,100,0,0.35)_0%,rgba(0,40,0,0.2)_40%,#001c22_100%),linear-gradient(to_bottom,#1a4c0e,#001c22)] bg-fixed bg-no-repeat px-4 py-8 text-white">
			<div className="mx-auto flex w-full max-w-5xl justify-center">
				<div className="w-full rounded-[2.2rem] border-4 border-green-light bg-linear-to-t from-green-dark to-blue-dark px-4 py-6 shadow-[0_0_30px_rgba(85,204,3,0.18)] sm:px-8 sm:py-8 lg:px-12 lg:py-10">
					<div className="flex flex-col items-center gap-6">
						<div className="flex flex-col items-center">
							<h1 className="mb-2 text-[1.75rem] font-extrabold uppercase tracking-wide text-white">
								{userInfo.username}
							</h1>

							<div className="flex h-27.5 w-27.5 items-center justify-center overflow-hidden rounded-full border-4 border-green-light bg-green-light shadow-[0_0_20px_rgba(57,255,20,0.9)]">
								<img
									src={userInfo.avatar || "/images/avatar-bob.png"}
									alt={userInfo.username}
									className="h-full w-full object-cover"
								/>
							</div>
						</div>

						<div className="mt-1 flex items-center justify-center gap-7 text-green-light">
							{userInfo.twitch && (
								<a
									href={userInfo.twitch}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Twitch"
									className="transition hover:scale-110"
								>
									<Icon icon="mdi:twitch" className="text-[2rem]" />
								</a>
							)}

							{userInfo.youtube && (
								<a
									href={userInfo.youtube}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="YouTube"
									className="transition hover:scale-110"
								>
									<Icon icon="mdi:youtube" className="text-[2rem]" />
								</a>
							)}

							{userInfo.discord && (
								<a
									href={userInfo.discord}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Discord"
									className="transition hover:scale-110"
								>
									<Icon icon="ic:baseline-discord" className="text-[2rem]" />
								</a>
							)}
						</div>

						<div className="mt-1 flex w-full flex-col items-center">
							<h2 className="mb-4 text-center text-[1.5rem] font-bold italic text-white">
								Mes participations
							</h2>

							<div className="mb-10 h-1.5 w-full max-w-130 rounded-full bg-green-light shadow-[0_0_14px_3px_rgba(57,255,20,0.9)]" />

							{loadingParticipations ? (
								<p>Chargement...</p>
							) : error ? (
								<p className="text-red-medium">{error}</p>
							) : currentParticipations.length === 0 ? (
								<p>Aucune participation trouvée.</p>
							) : (
								<>
									<div className="grid w-full max-w-245 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
										{currentParticipations.map((participation) => {
											const challenge =
												participation.challenge || participation.Challenge;

											const title =
												challenge?.name ||
												challenge?.title ||
												"Participation";

											const youtubeUrl =
												participation.video || participation.video_url;

											const embedUrl = getYoutubeEmbedUrl(youtubeUrl);

											return (
												<article
													key={participation.id}
													className="mx-auto flex w-41.25 flex-col items-center rounded-[1.9rem] border-4 border-green-light bg-[rgba(17,40,16,0.45)] px-2 py-3"
												>
													<div className="h-24 w-full overflow-hidden rounded-2xl border-[3px] border-green-light bg-black">
														{embedUrl ? (
															<iframe
																src={embedUrl}
																title={title}
																allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
																allowFullScreen
																className="h-full w-full"
															/>
														) : (
															<div className="flex h-full w-full items-center justify-center text-center text-xs text-white">
																Aucune vidéo disponible
															</div>
														)}
													</div>

													<p className="mt-3 text-center text-[0.95rem] font-extrabold text-white">
														{title}
													</p>
												</article>
											);
										})}
									</div>

									<Pagination
										currentPage={currentPage}
										totalPages={totalPages}
										onPageChange={setCurrentPage}
									/>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}