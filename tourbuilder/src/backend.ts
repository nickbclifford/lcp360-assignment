const BACKEND_URL = "http://localhost:3100";

export interface StateData {
	id: string;
	name: string;
	visits: number;
}

export async function getData(): Promise<StateData[]> {
	const res = await fetch(BACKEND_URL);
	return res.json(); // return type automatically coerces from Promise<any> to Promise<StateData[]>
}
