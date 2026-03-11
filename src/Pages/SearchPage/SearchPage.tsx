import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "../../ui/Button";
import Image from "../../ui/Image";
import H2 from "../../ui/H2";

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
				/* GAMES */
				if (category === "Jeux" || category === "Tous") {
					const res = await fetch(`${API_URL}/games`);
					const data = await res.json();

					console.log("Games API response:", data);

					const filteredGames = data.games.filter((game) =>
						game.title.toLowerCase().includes(query),
					);

					setGames(filteredGames);
				}

				/*  CHALLENGES  */
				if (category === "Challenges" || category === "Tous") {
					const res = await fetch(`${API_URL}/challenges`);
					const data = await res.json();

					console.log("Challenges API response:", data);

					const filteredChallenges = data.filter((challenge) =>
						challenge.name.toLowerCase().includes(query),
					);

					setChallenges(filteredChallenges);
				}

				/* USERS*/
				if (category === "Joueurs" || category === "Tous") {
					const res = await fetch(`${API_URL}/users`);
					const data = await res.json();

					console.log("Users API response:", data);

					const filteredUsers = data.filter((user) =>
						user.username.toLowerCase().includes(query),
					);

					setUsers(filteredUsers);
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
		<div className="p-6">
			<h1 className="text-xl font-bold mb-6">Résultats pour : "{query}"</h1>

			{loading && <p>Chargement...</p>}
			{error && <p className="text-red-500">{error}</p>}

			{/* GAMES */}
			{(category === "Jeux" || category === "Tous") && (
				<section className="mb-6">
					{games.length > 0 ? (
						games.map((game) => (
							<Link
								key={game.id}
								to={`/games/${game.id}`}
								className="flex items-center gap-3 mb-3 hover:opacity-80"
							>
								<Image src={game.cover} alt={game.title} />
								<H2>{game.title}</H2>
							</Link>
						))
					) : (
						<p>Aucun jeu trouvé</p>
					)}
				</section>
			)}

			{/* CHALLENGES */}
			{(category === "Challenges" || category === "Tous") && (
				<section className="mb-6">
					{challenges.length > 0 ? (
						challenges.map((challenge) => (
							<Link
								key={challenge.id}
								to={`/challenges/${challenge.id}`}
								className="flex items-center gap-3 mb-3 hover:opacity-80"
							>
								<Image src={challenge.game.cover} alt={challenge.name} />
								<H2>{challenge.name}</H2>
							</Link>
						))
					) : (
						<p>Aucun challenge trouvé</p>
					)}
				</section>
			)}

			{/*  USERS */}
			{(category === "Joueurs" || category === "Tous") && (
				<section>
					{users.length > 0 ? (
						users.map((user) => (
							<Link
								key={user.id}
								to={`/users/${user.id}`}
								className="flex items-center gap-3 mb-3 hover:opacity-80"
							>
								<Image src={user.avatar} alt={user.username} />
								<H2>{user.username}</H2>
							</Link>
						))
					) : (
						<p>Aucun joueur trouvé</p>
					)}
				</section>
			)}

			<div className="flex justify-center mt-10 w-full">
				<Link to="/">
					<Button label="Retour" type="button" />
				</Link>
			</div>
		</div>
	);
}

export default SearchPage;
