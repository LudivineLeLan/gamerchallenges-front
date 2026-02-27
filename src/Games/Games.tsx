import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Game = {
	id: number;
	title: string;
	genre: string;
	release_year: string;
	cover: string;
	description: string;
};

const Games = () => {
	const [games, setGames] = useState<Game[]>([]);
	const [error, setError] = useState<string | null>(null);

	const API_URL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const fetchGames = async () => {
			try {
				const res = await fetch(`${API_URL}/games`);
				if (!res.ok) throw new Error("Erreur lors de la récupération des jeux");

				const data = await res.json();
				console.log("Données reçues :", data);
				setGames(data.games); // tableau renvoyé par le back
			} catch (err) {
				console.error(err);
				setError("Impossible de charger les jeux.");
			}
		};

		fetchGames();
	}, []);

	if (error) return <p>{error}</p>;

	return (
		<div>
			<h1>Liste des jeux</h1>
			{games.map((game) => (
				<Link key={game.id} to={`/games/${game.id}`}>
					<img src={game.cover} alt={game.title} width={150} />
					<h3>{game.title}</h3>
				</Link>
			))}
		</div>
    
	);
};

export default Games;
