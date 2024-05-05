import { createContext, useState } from 'react';

import { MainPage } from './pages/mainPage/MainPage';
type ContextProps = {
	isLoading: boolean;
	setLoading: (bol: boolean) => void;
};

export const loadingContext = createContext<ContextProps>({ isLoading: true, setLoading: () => {} });

function App() {
	const [isLoading, setLoading] = useState<boolean>(true);
	return (
		<loadingContext.Provider value={{ isLoading, setLoading }}>
			<MainPage />
		</loadingContext.Provider>
	);
}

export default App;
