import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Pagination from "../../ui/Pagination";

type Challenge = {
	id: number;
	title: string;
	image: string;
	buttonLabel: string;
};

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
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [challenges, setChallenges] = useState<Challenge[]>([]);

	useEffect(() => {
		// --- MODE TEST ---
		setChallenges(testChallenges);
		setTotalPages(3);

		// --- FETCH BACK (A ACTIVER PLUS TARD) ---
		/*
		const fetchChallenges = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/my-profile/challenges?page=${page}&limit=3`
                    
				);

				if (!response.ok) {
					throw new Error(`HTTP error ${response.status}`);
				}

				const data = await response.json();

				setChallenges(data.challenges);
				setTotalPages(data.totalPages);
			} catch (err) {
				console.error("Erreur récupération challenges :", err);
			}
		};

		fetchChallenges();
		*/
	}, [page]);

	return (
		<div className="min-h-screen w-full bg-[radial-gradient(circle_at_50%_20%,rgba(0,100,0,0.35)_0%,rgba(0,40,0,0.2)_40%,#001c22_100%),linear-gradient(to_bottom,#1a4c0e,#001c22)] bg-fixed bg-no-repeat px-4 py-8 text-white">
			<div className="mx-auto flex w-full max-w-5xl justify-center">
				<div className="w-full rounded-[2.2rem] border-4 border-green-light bg-linear-to-t from-green-dark to-blue-dark px-4 py-6 shadow-[0_0_30px_rgba(85,204,3,0.18)] sm:px-8 sm:py-8 lg:px-12 lg:py-10">
					<div className="flex flex-col items-center gap-6">
						<div className="flex flex-col items-center">
							<h1 className="mb-2 text-[1.75rem] font-extrabold uppercase tracking-wide text-white">
								BOB
							</h1>

							<div className="flex h-27.5 w-27.5 items-center justify-center overflow-hidden rounded-full bg-green-light border-4 border-green-light shadow-[0_0_20px_rgba(57,255,20,0.9)]">
								<img
									src="/images/avatar-bob.png"
									alt="Avatar de Bob"
									className="h-full w-full object-cover"
								/>
							</div>
						</div>

						<div className="mt-1 flex items-center justify-center gap-7 text-green-light">
							<Icon icon="mdi:twitch" className="text-[2rem]" />
							<Icon icon="mdi:youtube" className="text-[2rem]" />
							<Icon icon="ic:baseline-discord" className="text-[2rem]" />
						</div>

						<div className="mt-1 flex w-full flex-col items-center">
							<h2 className="mb-4 text-center text-[1.5rem] font-bold italic text-white">
								Mes challenges
							</h2>

							<div className="mb-10 h-1.5 w-full max-w-130 rounded-full bg-[#39ff14] shadow-[0_0_14px_3px_rgba(57,255,20,0.9)]" />

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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}