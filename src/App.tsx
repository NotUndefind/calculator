import "./App.css";
import Calculator from "./Components/Calculator";

function App() {
	return (
		<>
			<div className="header mt-9 flex justify-evenly items-center">
				<h2 className="text-4xl font-subtitle text-white">
					Made by Jules Bourin
				</h2>
				<h1 className="text-9xl font-title text-white">Calculatrice</h1>

				<h2 className="text-4xl font-subtitle text-white">
					<a
						href="https://github.com/JulesBourin/calculator"
						target="_blank"
						rel="noopener noreferrer"
					>
						Go on Github
					</a>
				</h2>
			</div>

			<div className="flex justify-center items-start h-screen m-2">
				<Calculator />
			</div>
		</>
	);
}

export default App;
