import { useState } from "react";
import { PokemonBox } from "../../components";

export default function Home() {
  const [choice, setChoice] = useState("");
  const [pokemon, setPokemon] = useState([]);

  return (
    <div className="flex flex-col justify-center items-center py-5 w-screen overflow-clip">
      <h1 className="text-4xl p-5 font-bold">list pokémon until failure</h1>
      <p className="text-xl">Score: -2</p>
      <span className="countdown font-mono text-2xl py-4">
        <span
          style={{ "--value": 1 } as React.CSSProperties}
          aria-live="polite"
          aria-label={"counter"}
        >
          10
        </span>
        :
        <span
          style={{ "--value": 0, "--digits": 2 } as React.CSSProperties}
          aria-live="polite"
          aria-label={"counter"}
        >
          59
        </span>
      </span>
      <p className="mt-3">Input.</p>
      <input
        type="text"
        placeholder="I choose..."
        className="input input-sm my-4"
        value={choice}
        onChange={(e) => setChoice(e.target.value)}
      />
      <div className="w-full px-20 flex overflow-x-clip flex-wrap mt-5 justify-start">
        <PokemonBox name={"Fletchinder"} />
        <PokemonBox name={"Fletchinder"} />
        <PokemonBox name={"Fletchinder"} />
        <PokemonBox name={"Fletchinder"} />
        <PokemonBox name={"Fletchinder"} />
        <PokemonBox name={"Fletchinder"} />
        <PokemonBox name={"Fletchinder"} />
        <PokemonBox name={"Fletchinder"} />
        <PokemonBox name={"Fletchinder"} />
        <PokemonBox name={"Fletchinder"} />
        <PokemonBox name={"Fletchinder"} />
        <PokemonBox name={"Fletchinder"} />
        <PokemonBox name={"Fletchinder"} />
        <PokemonBox name={"Fletchinder"} />
      </div>
    </div>
  );
}
