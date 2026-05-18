import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
	id: number;
	email: string;
	username: string;
	is_active?: boolean;
	created_at?: string;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	login: (user: User, token: string) => void;
	logout: () => void;
	setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);

	// Загружаем данные из localStorage при монтировании
	useEffect(() => {
		const savedToken = localStorage.getItem('jwt_token');
		const savedUser = localStorage.getItem('user');

		if (savedToken && savedUser) {
			setToken(savedToken);
			setUser(JSON.parse(savedUser));
		}
	}, []);

	const login = (userData: User, userToken: string) => {
		setUser(userData);
		setToken(userToken);
		localStorage.setItem('jwt_token', userToken);
		localStorage.setItem('user', JSON.stringify(userData));
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem('jwt_token');
		localStorage.removeItem('user');
	};

	const value: AuthContextType = {
		user,
		token,
		isAuthenticated: !!token,
		login,
		logout,
		setUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider');
	}
	return context;
};
