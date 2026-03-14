import { createContext, useState, ReactNode } from "react";

type AuthContextType = {
	token: string | null;
	userId: number | null;
	login: (data: { token: string; userId: number }) => void;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
	token: null,
	userId: null,
	login: () => {},
	logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
	const [token, setToken] = useState<string | null>("fake-token-123"); // token en dur pour test
	const [userId, setUserId] = useState<number | null>(3); // ID “user connecté” en dur pour test

	const login = (data: { token: string; userId: number }) => {
		setToken(data.token);
		setUserId(data.userId);
	};

	const logout = () => {
		setToken(null);
		setUserId(null);
	};

	return (
		<AuthContext.Provider value={{ token, userId, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
