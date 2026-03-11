// SearchPage.jsx
import { useLocation } from "react-router-dom";

function SearchPage({ data }) {
	const { search } = useLocation();
	const params = new URLSearchParams(search);
	const query = params.get("q")?.toLowerCase() || "";
	const category = params.get("category") || "Tous";

	// Simuler des données pour l’exemple
	const games = data.games.filter((game) =>
		game.name.toLowerCase().includes(query),
	);
	const challenges = data.challenges.filter((ch) =>
		ch.title.toLowerCase().includes(query),
	);
	const users = data.users.filter((user) =>
		user.username.toLowerCase().includes(query),
	);

	return (
		<div className="p-4">
			<h1>Résultats pour : "{query}"</h1>

			{category === "Jeux" || category === "Tous" ? (
				<section>
					<h2>Jeux</h2>
					{games.length ? (
						games.map((game) => <div key={game.id}>{game.name}</div>)
					) : (
						<p>Aucun jeu trouvé</p>
					)}
				</section>
			) : null}

			{category === "Challenges" || category === "Tous" ? (
				<section>
					<h2>Challenges</h2>
					{challenges.length ? (
						challenges.map((ch) => <div key={ch.id}>{ch.title}</div>)
					) : (
						<p>Aucun challenge trouvé</p>
					)}
				</section>
			) : null}

			{category === "Joueurs" || category === "Tous" ? (
				<section>
					<h2>Joueurs</h2>
					{users.length ? (
						users.map((user) => <div key={user.id}>{user.username}</div>)
					) : (
						<p>Aucun joueur trouvé</p>
					)}
				</section>
			) : null}
		</div>
	);
}

export default SearchPage;
