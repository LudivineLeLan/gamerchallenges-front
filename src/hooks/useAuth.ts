import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

type UserInfo = {
	username: string;
	[key: string]: any; // to get more user infos according to page
};

export function useAuth() {
	const { token, userId, login, logout } = useContext(AuthContext);
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

	useEffect(() => {
		if (userId) {
			// simulation des infos utilisateur
			setUserInfo({
				username: "TestUser",
				avatar: "https://i.pravatar.cc/150?img=7",
				favouriteGame: "Zelda",
				twitch: "twitch.tv/test",
			});
		} else {
			setUserInfo(null);
		}
	}, [userId]);

	return { token, userId, login, logout, userInfo };
}
