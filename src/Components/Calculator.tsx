import React, { useState } from "react";

export default function Calculator() {
	const [display, setDisplay] = useState<string[]>([]);
	const [calculated, setCalculated] = useState<number | null>(null);

	//Calcul dynamique de l'expression
	const dynamicCalculated = (display: string[]): number | undefined => {
		const regex = /(\d+\.?\d*|\D)/g;
		const tokens = display.join("").match(regex);

		if (!tokens) return;

		let result = parseFloat(tokens[0]);

		for (let i = 1; i < tokens.length; i += 2) {
			const operator = tokens[i];
			const nextNumber = parseFloat(tokens[i + 1]);

			if (isNaN(nextNumber)) continue;

			switch (operator) {
				case "+":
					result += nextNumber;
					break;
				case "-":
					result -= nextNumber;
					break;
				case "*":
					result *= nextNumber;
					break;
				case "/":
					result /= nextNumber;
					break;
				default:
					break;
			}
		}

		return result;
	};
	const handleInput = (input: string) => {
		if (input === "") return;

		if (input === "AC") {
			setDisplay([]);
			setCalculated(0);
			return;
		}

		if (input === "=") {
			const result = dynamicCalculated(display);
			if (result !== null && result !== undefined) {
				setCalculated(result);
				setDisplay([result.toString()]);
			} else {
				setCalculated(0);
				setDisplay([]);
			}
			return;
		}

		if (input === "±") {
			if (display.length === 0) return;

			const updated = [...display];
			const regex = /(\d+\.?\d*)$/; // prend le dernier nombre à la fin

			const joined = updated.join("");
			const match = joined.match(regex);

			if (match) {
				const number = match[0];
				const index = joined.lastIndexOf(number);

				// Vérifie si ce nombre était déjà négatif
				let updatedExpression = "";

				if (joined[index - 1] === "-") {
					// Supprime le "-" précédent
					updatedExpression =
						joined.slice(0, index - 1) + joined.slice(index);
				} else {
					// Injecte un "-" avant le nombre
					updatedExpression =
						joined.slice(0, index) + "-" + joined.slice(index);
				}

				setDisplay(updatedExpression.split(""));
			}
			return;
		}

		if (input === "%") {
			if (display.length === 0) return;

			const updated = [...display];
			const regex = /(\d+\.?\d*)$/;
			const joined = updated.join("");
			const match = joined.match(regex);

			if (match) {
				const numberStr = match[0];
				const number = parseFloat(numberStr);
				const percentValue = (number / 100).toString();

				const index = joined.lastIndexOf(numberStr);

				const updatedExpression = joined.slice(0, index) + percentValue;
				setDisplay(updatedExpression.split(""));
			}
			return;
		}

		const updatedDisplay = [...display, input];
		setDisplay(updatedDisplay);

		const result = dynamicCalculated(updatedDisplay);
		if (result !== null && result !== undefined) {
			setCalculated(result);
		} else {
			setCalculated(0);
		}
	};

	return (
		<div className="bg-black h-[700px] w-[500px] rounded-xl grid grid-rows-7 p-2 border-2 border-gray-400">
			<div className="row-span-1 mr-[25px] opacity-50 text-white text-2xl flex justify-end items-center">
				{calculated}
			</div>

			<div className="row-span-1 text-4xl text-white flex justify-end items-center mr-[25px]">
				{display.length === 0 ? "0" : display.join("")}
			</div>

			<Line>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-white">
						AC
					</Button>
				</div>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-white">
						±
					</Button>
				</div>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-white">
						%
					</Button>
				</div>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-amber-600">
						/
					</Button>
				</div>
			</Line>

			<Line>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-white">
						7
					</Button>
				</div>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-white">
						8
					</Button>
				</div>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-white">
						9
					</Button>
				</div>
				<div className="col-span-1 flex justify-center items-center">
					<Button
						handleInput={handleInput}
						realValue="*"
						color="bg-amber-600"
					>
						x
					</Button>
				</div>
			</Line>

			<Line>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-white">
						4
					</Button>
				</div>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-white">
						5
					</Button>
				</div>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-white">
						6
					</Button>
				</div>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-amber-600">
						-
					</Button>
				</div>
			</Line>

			<Line>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-white">
						1
					</Button>
				</div>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-white">
						2
					</Button>
				</div>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-white">
						3
					</Button>
				</div>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-amber-600">
						+
					</Button>
				</div>
			</Line>

			<Line>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-white">
						0
					</Button>
				</div>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-white">
						.
					</Button>
				</div>
				<div className="col-span-1 flex justify-center items-center">
					<Button handleInput={handleInput} color="bg-white">
						=
					</Button>
				</div>
			</Line>
		</div>
	);
}

//Button
interface ButtonProps {
	children: string;
	color: string;
	handleInput: (value: string) => void;
	realValue?: string;
}

export function Button({
	children,
	color,
	handleInput,
	realValue,
}: ButtonProps) {
	const valueToStore = realValue ?? children;
	return (
		<button
			className={`${color} h-[90px] w-[90px] rounded-full flex justify-center items-center text-3xl hover:opacity-75 transition-opacity duration-200`}
			onClick={() => handleInput(valueToStore)}
		>
			{children}
		</button>
	);
}

//Line
interface LineProps {
	children: React.ReactNode;
}
export function Line({ children }: LineProps) {
	return <div className="row-span-1 grid grid-cols-4">{children}</div>;
}
