import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function SearchPage() {
	const { search } = useLocation();
	const params = new URLSearchParams(search);
	const query = params.get("q")?.toLowerCase() || "";
	const category = params.get("category") || "Tous";

	const [games, setGames] = useState([]);
	const [challenges, setChallenges] = useState([]);
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchResults = async () => {
			setLoading(true);
			setError(null);

			try {
				// Jeux
				if (category === "Jeux" || category === "Tous") {
					const resGames = await fetch(`${API_URL}/games`);
					const dataGames = await resGames.json();
					setGames(
						dataGames.filter((game) =>
							game.title.toLowerCase().includes(query),
						),
					);
				}

				// Challenges
				if (category === "Challenges" || category === "Tous") {
					const resChallenges = await fetch(`${API_URL}/challenges`);
					const dataChallenges = await resChallenges.json();
					setChallenges(
						dataChallenges.filter((ch) =>
							ch.title.toLowerCase().includes(query),
						),
					);
				}

				// Users
				if (category === "Joueurs" || category === "Tous") {
					const resUsers = await fetch(`${API_URL}/users`);
					const dataUsers = await resUsers.json();
					setUsers(
						dataUsers.filter((user) =>
							user.username.toLowerCase().includes(query),
						),
					);
				}
			} catch (err) {
				console.error(err);
				setError(
					"Une erreur est survenue lors de la récupération des données.",
				);
			} finally {
				setLoading(false);
			}
		};

		fetchResults();
	}, [query, category]);

	return (
		<div className="p-4">
			<h1 className="text-xl font-bold mb-4">Résultats pour : "{query}"</h1>

			{loading && <p>Chargement des résultats...</p>}
			{error && <p className="text-red-500">{error}</p>}

			{/* Jeux */}
			{(category === "Jeux" || category === "Tous") && (
				<section className="mb-4">
					<h2 className="text-lg font-semibold">Jeux</h2>
					{games.length ? (
						games.map((game) => (
							<div key={game.id}>
								<Link to={`/games/${game.id}`} className="hover:underline">
									{game.name}
								</Link>
							</div>
						))
					) : (
						<p>Aucun jeu trouvé</p>
					)}
				</section>
			)}

			{/* Challenges */}
			{(category === "Challenges" || category === "Tous") && (
				<section className="mb-4">
					<h2 className="text-lg font-semibold">Challenges</h2>
					{challenges.length ? (
						challenges.map((ch) => (
							<div key={ch.id}>
								<Link to={`/challenges/${ch.id}`} className="hover:underline">
									{ch.title}
								</Link>
							</div>
						))
					) : (
						<p>Aucun challenge trouvé</p>
					)}
				</section>
			)}

			{/* Users */}
			{(category === "Joueurs" || category === "Tous") && (
				<section className="mb-4">
					<h2 className="text-lg font-semibold">Joueurs</h2>
					{users.length ? (
						users.map((user) => (
							<div key={user.id}>
								<Link to={`/users/${user.id}`} className="hover:underline">
									{user.username}
								</Link>
							</div>
						))
					) : (
						<p>Aucun joueur trouvé</p>
					)}
				</section>
			)}
		</div>
	);
}

export default SearchPage;
