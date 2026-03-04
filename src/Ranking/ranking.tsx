import { useEffect, useState } from "react";
import H1Title from "../ui/H1Title";
import { FaHeart } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import Image from "../ui/Image";

type RankingUser = {
	id: number;
	username: string;
	avatar: string;
	participationCount?: number;
	voteCount?: number;
};

export default function Ranking() {
	const [topParticipations, setTopParticipations] = useState<RankingUser[]>([]);
	const [topVotes, setTopVotes] = useState<RankingUser[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const API_URL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const fetchRankings = async () => {
			try {
				const [participations, votes] = await Promise.all([
					fetch(`${API_URL}/ranking/participations`),
					fetch(`${API_URL}/ranking/votes`),
				]);

				if (!participations.ok || !votes.ok) {
					throw new Error("Erreur lors du chargement");
				}

				const participationsData = await participations.json();
				const votesData = await votes.json();

				setTopParticipations(participationsData);
				setTopVotes(votesData);
			} catch (error) {
				setError("Impossible de charger les classements");
			} finally {
				setLoading(false);
			}
		};

		fetchRankings();
	}, []);

	if (loading) return <p>Chargement...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div>
			<H1Title>CLASSEMENT</H1Title>
			<h2>
				<FaTrophy style={{ marginRight: "8px" }} />
				Top participations
			</h2>{" "}
			<ul>
				{topParticipations.map((user, index) => (
					<li
						key={user.id}
						className="border border-green-medium rounded-md p-2 mb-2 flex items-center gap-2"
					>
						{index + 1}. <Image src={user.avatar} alt={user.username} />{" "}
						{user.username} — {user.participationCount} participation(s) aux
						challenges
					</li>
				))}
			</ul>
			<h2>
				<FaTrophy style={{ marginRight: "8px" }} />
				Top votes reçus
			</h2>{" "}
			<ul>
				{topVotes.map((user, index) => (
					<li
						key={user.id}
						className="border border-green-medium rounded-md p-2 mb-2 flex items-center gap-2"
					>
						{index + 1}. <Image src={user.avatar} alt={user.username} />{" "}
						{user.username} — {user.voteCount} <FaHeart className="text-red" />
					</li>
				))}
			</ul>
		</div>
	);
}
