import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Pagination from "../../ui/Pagination";
import { useAuth } from "../../hooks/useAuth";

type Challenge = {
	id: number;
	title: string;
	image: string;
	buttonLabel: string;
};

type ChallengesResponse = {
	challenges: Challenge[];
	totalPages: number;
	currentPage: number;
};

// --- DONNÉES TEST ---
const testChallenges: Challenge[] = [
	{
		id: 1,
		title: "Champion",
		image: "/images/super-mario.jpg",
		buttonLabel: "Voir le challenge",
	},
	{
		id: 2,
		title: "L’as du volant",
		image: "/images/gta.jpg",
		buttonLabel: "Voir le challenge",
	},
	{
		id: 3,
		title: "Un cheval pour la vie",
		image: "/images/red-dead.jpg",
		buttonLabel: "Voir le challenge",
	},
];

export default function MyProfile() {
	const { userId, userInfo } = useAuth();

	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [challenges, setChallenges] = useState<Challenge[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		// --- MODE TEST ---
		setChallenges(testChallenges);
		setTotalPages(1);

		// --- FETCH BACK (A ACTIVER PLUS TARD) ---
		/*
		if (!userId) return;

		const fetchChallenges = async () => {
			try {
				setLoading(true);
				setError("");

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/users/${userId}/challenges?page=${page}&limit=3`
				);

				if (!response.ok) {
					throw new Error(`HTTP error ${response.status}`);
				}

				const data: ChallengesResponse = await response.json();

				setChallenges(data.challenges);
				setTotalPages(data.totalPages);
			} catch (err) {
				console.error("Erreur récupération challenges :", err);
				setError("Impossible de récupérer les challenges.");
			} finally {
				setLoading(false);
			}
		};

		fetchChallenges();
		*/
	}, [page, userId]);

	return (
		<div className="min-h-screen w-full bg-[radial-gradient(circle_at_50%_20%,rgba(0,100,0,0.35)_0%,rgba(0,40,0,0.2)_40%,#001c22_100%),linear-gradient(to_bottom,#1a4c0e,#001c22)] bg-fixed bg-no-repeat px-4 py-8 text-white">
			<div className="mx-auto flex w-full max-w-5xl justify-center">
				<div className="w-full rounded-[2.2rem] border-4 border-green-light bg-linear-to-t from-green-dark to-blue-dark px-4 py-6 shadow-[0_0_30px_rgba(85,204,3,0.18)] sm:px-8 sm:py-8 lg:px-12 lg:py-10">
					<div className="flex flex-col items-center gap-6">

						{/* USER */}
						<div className="flex flex-col items-center">
							<h1 className="mb-2 text-[1.75rem] font-extrabold uppercase tracking-wide text-white">
								{userInfo?.username || "Utilisateur"}
							</h1>

							<div className="flex h-27.5 w-27.5 items-center justify-center overflow-hidden rounded-full bg-green-light border-4 border-green-light shadow-[0_0_20px_rgba(57,255,20,0.9)]">
								<img
									src={userInfo?.avatar || "/images/avatar-bob.png"}
									alt={userInfo?.username || "Avatar"}
									className="h-full w-full object-cover"
								/>
							</div>
						</div>

						{/* SOCIALS */}
						<div className="mt-1 flex items-center justify-center gap-7 text-green-light">
							{userInfo?.twitch && (
								<a href={userInfo.twitch} target="_blank">
									<Icon icon="mdi:twitch" className="text-[2rem]" />
								</a>
							)}
							{userInfo?.youtube && (
								<a href={userInfo.youtube} target="_blank">
									<Icon icon="mdi:youtube" className="text-[2rem]" />
								</a>
							)}
							{userInfo?.discord && (
								<a href={userInfo.discord} target="_blank">
									<Icon icon="ic:baseline-discord" className="text-[2rem]" />
								</a>
							)}
						</div>

						{/* CHALLENGES */}
						<div className="mt-1 flex w-full flex-col items-center">
							<h2 className="mb-4 text-center text-[1.5rem] font-bold italic text-white">
								Mes challenges
							</h2>

							<div className="mb-10 h-1.5 w-full max-w-130 rounded-full bg-green-light shadow-[0_0_14px_3px_rgba(57,255,20,0.9)]" />

							{loading ? (
								<p>Chargement...</p>
							) : error ? (
								<p className="text-red-medium">{error}</p>
							) : (
								<>
									<div className="grid w-full max-w-245 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
										{challenges.map((challenge) => (
											<div
												key={challenge.id}
												className="mx-auto flex w-41.25 flex-col items-center rounded-[1.9rem] border-4 border-green-light bg-[rgba(17,40,16,0.45)] px-2 py-3"
											>
												<div className="h-24 w-full overflow-hidden rounded-2xl border-[3px] border-green-light bg-black">
													<img
														src={challenge.image}
														alt={challenge.title}
														className="h-full w-full object-cover"
													/>
												</div>

												<h3 className="mt-3 text-center text-[0.95rem] font-extrabold text-white">
													{challenge.title}
												</h3>

												<button
													type="button"
													className="mt-2 rounded-full bg-green-light px-3 py-[0.28rem] text-[0.62rem] font-bold text-white hover:brightness-110"
												>
													{challenge.buttonLabel}
												</button>
											</div>
										))}
									</div>

									<Pagination
										currentPage={page}
										totalPages={totalPages}
										onPageChange={setPage}
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