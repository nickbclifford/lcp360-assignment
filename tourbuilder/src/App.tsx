import React from "react";
import { ReactComponent as Map } from "./map.svg";
import { getData, StateData } from "./backend";

enum ViewInterval {
	LOW = "0-250",
	MEDIUM = "250-500",
	HIGH = "500-1000",
	HIGHEST = "1000+",
}

function App() {
	const [data, setData] = React.useState<StateData[]>([]);
	const [interval, setInterval] = React.useState(ViewInterval.LOW);

	React.useEffect(() => {
		getData()
			.then(setData)
			.catch(err => {
				console.error("Error retrieving backend data!", err);
			});
	}, []);

	const ids = data
		.filter(({ visits }) => {
			switch (interval) {
				case ViewInterval.LOW:
					return visits < 250;
				case ViewInterval.MEDIUM:
					return visits >= 250 && visits < 500;
				case ViewInterval.HIGH:
					return visits >= 500 && visits < 1000;
				case ViewInterval.HIGHEST:
					return visits >= 1000;
			}
		})
		.map(d => `.${d.id.toLowerCase()}`)
		.join(",");

	return (
		<div>
			<h1>TourBuilder</h1>
			<select
				name="interval"
				onChange={e => setInterval(e.target.value as ViewInterval)}
			>
				{Object.values(ViewInterval).map(i => (
					<option value={i}>{i}</option>
				))}
			</select>
			<style>{`${ids} { fill: #0D7EF9; }`}</style>
			<Map />
		</div>
	);
}

export default App;
