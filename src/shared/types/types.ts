interface Building {
	id: string;
	data: {
		parts: any | undefined;
		name: string;
	};
	parts: undefined | string[];
}

interface Equip {
	id: string;
	data: {
		name: string;
		count: string;
	};
	placeId: string | undefined;
}

interface InputsConfig {
	[id: string]: {
		[name: string]: string;
	};
}

export type { Building, Equip, InputsConfig };
