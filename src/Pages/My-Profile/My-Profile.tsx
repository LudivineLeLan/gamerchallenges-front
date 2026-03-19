import { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import Pagination from "../../ui/Pagination";
import { useAuth } from "../../hooks/useAuth";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";


type Participation = {
	id: number;
	url?: string;
	video?: string;
	video_url?: string;
	videoUrl?: string;
	youtube?: string;
	youtube_url?: string;
	youtubeUrl?: string;
};

function getYoutubeEmbedUrl(url?: string) {
	if (!url) return "";

	try {
		const parsedUrl = new URL(url);

		if (
			parsedUrl.hostname.includes("youtube.com") &&
			parsedUrl.searchParams.get("v")
		) {
			return `https://www.youtube.com/embed/${parsedUrl.searchParams.get("v")}`;
		}

		if (parsedUrl.hostname.includes("youtu.be")) {
			const videoId = parsedUrl.pathname.replace("/", "");
			return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
		}

		if (parsedUrl.pathname.includes("/embed/")) {
			return url;
		}

		return "";
	} catch {
		return "";
	}
}

function getParticipationVideoUrl(participation: Participation) {
	return (
		participation.url ||
		participation.video ||
		participation.video_url ||
		participation.videoUrl ||
		participation.youtube ||
		participation.youtube_url ||
		participation.youtubeUrl ||
		""
	);
}

export default function MyProfile() {
	const { token } = useContext(AuthContext);
	const { userInfo, loadingUser } = useAuth();

	const [participations, setParticipations] = useState<Participation[]>([]);
	const [loadingParticipations, setLoadingParticipations] = useState(false);
	const [error, setError] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const pageSize = 6;

	useEffect(() => {
		if (!userInfo?.id) return;

		const fetchParticipations = async () => {
			try {
				setLoadingParticipations(true);
				setError("");

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/users/${userInfo.id}/participations`,
					{
						headers: token
							? {
								Authorization: `Bearer ${token}`,
							}
							: {},
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP error ${response.status}`);
				}

				const data = await response.json();

				const participationsList = Array.isArray(data)
					? data
					: Array.isArray(data.participations)
						? data.participations
						: [];

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

	const totalPages = Math.max(1, Math.ceil(participations.length / pageSize));
	const startIndex = (currentPage - 1) * pageSize;
	const currentParticipations = participations.slice(
		startIndex,
		startIndex + pageSize,
	);

	return (
		<div className="min-h-screen w-full bg-[radial-gradient(circle_at_50%_20%,rgba(0,100,0,0.35)_0%,rgba(0,40,0,0.2)_40%,#001c22_100%),linear-gradient(to_bottom,#1a4c0e,#001c22)] bg-fixed bg-no-repeat px-4 py-8 text-white">
			<div className="mx-auto flex w-full max-w-5xl justify-center">
				<div className="w-full rounded-[2.2rem] border-4 border-green-light bg-linear-to-t from-green-dark to-blue-dark px-4 py-6 shadow-[0_0_30px_rgba(85,204,3,0.18)] sm:px-8 sm:py-8 lg:px-12 lg:py-10">
					<div className="mb-8 flex flex-col items-center gap-4">
						<h1 className="text-[1.75rem] font-extrabold uppercase tracking-wide">
							{userInfo.username}
						</h1>

						<div className="h-28 w-28 overflow-hidden rounded-full border-4 border-green-light shadow-[0_0_20px_rgba(57,255,20,0.9)]">
							<img
								src={userInfo.avatar || "/images/avatar-bob.png"}
								alt={userInfo.username}
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="mt-4">
							<Link to="/mon-compte">
								<button className="rounded-full border-2 border-green-light bg-green-light px-5 py-2 text-sm font-bold text-white transition hover:brightness-110 hover:text-black">
									Mon compte
								</button>
							</Link>
						</div>

						<div className="flex gap-6 text-green-light">
							{userInfo.twitch && (
								<a href={userInfo.twitch} target="_blank" rel="noopener noreferrer">
									<Icon icon="mdi:twitch" className="text-2xl" />
								</a>
							)}
							{userInfo.youtube && (
								<a href={userInfo.youtube} target="_blank" rel="noopener noreferrer">
									<Icon icon="mdi:youtube" className="text-2xl" />
								</a>
							)}
							{userInfo.discord && (
								<a href={userInfo.discord} target="_blank" rel="noopener noreferrer">
									<Icon icon="ic:baseline-discord" className="text-2xl" />
								</a>
							)}
						</div>
					</div>

					{loadingParticipations ? (
						<p className="text-center">Chargement...</p>
					) : error ? (
						<p className="text-center text-red-medium">{error}</p>
					) : currentParticipations.length === 0 ? (
						<p className="text-center">Aucune participation</p>
					) : (
						<>
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{currentParticipations.map((participation) => {
									const rawUrl = getParticipationVideoUrl(participation);
									const embedUrl = getYoutubeEmbedUrl(rawUrl);

									return (
										<div
											key={participation.id}
											className="overflow-hidden rounded-2xl border-4 border-green-light bg-black"
										>
											{embedUrl ? (
												<iframe
													src={embedUrl}
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
													allowFullScreen
													className="w-full aspect-video"
												/>
											) : (
												<div className="flex aspect-video items-center justify-center text-center text-sm text-white">
													Vidéo introuvable
												</div>
											)}
										</div>
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
	);
}