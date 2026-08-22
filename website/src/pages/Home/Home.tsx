import { useState, useEffect } from "react";
import { PokemonBox } from "../../components"; 
import { POKEMON_DATA } from "../../data/pokemondata";

const TIME_INCREASE_INTERVAL = 6;

// enum GAME_STATES {
//   PLAYING = 1,
//   ENDED = 2
// }


export default function Home() {
  const [choice, setChoice] = useState("");
  const [pokemon, setPokemon] = useState<Number[]>([]);
  const [time, setTime] = useState<number>(10);
  const [green, setGreen] = useState<boolean>(false);
  const [gameState, setGameState] = useState<boolean>(true);

  // after initial
  useEffect(() => {
    if (time <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  // janky rn but idc
  function increaseTime() {
    setTime((prev) => prev + TIME_INCREASE_INTERVAL);
    setGreen(true);
  }

  useEffect(() => {
    if (!green) {
      return;
    }

    const timer = setInterval(() => {
      setGreen(false);
    }, 0.5 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, [green]);

  return (
    <div className="flex flex-col justify-center items-center py-5 w-screen overflow-clip">
      <h1 className="text-4xl p-5 font-bold">list pokémon until failure</h1>
      <p className="text-xl">Score: {pokemon.length}</p>
      <span
        className={`font-mono text-2xl py-4 transition ${green ? "text-green-600" : time <= 10 ? "text-red-700" : ""}`}
      >
        <span
          style={{ "--value": Math.floor(time / 60) } as React.CSSProperties}
          aria-live="polite"
          aria-label={"counter"}
        >
          {Math.floor(time / 60)}
        </span>
        :
        <span
          style={{ "--value": time % 60, "--digits": 2 } as React.CSSProperties}
          aria-live="polite"
          aria-label={"counter"}
        >
          {time % 60 < 10 ? "0" : ""}
          {time % 60}
        </span>
      </span>
      <p className="mt-3">Input.</p>
      <div
        className="btn font-silk"
        onClick={(e) => {
          increaseTime();
        }}
      >
        Increase time
      </div>
      <input
        type="text"
        placeholder="I choose..."
        className="input input-sm my-4"
        value={choice}
        onChange={(e) => setChoice(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (true) {
              setPokemon([...pokemon, 1]);
              increaseTime();
              setChoice("");
            }
          }
        }}
      />
      <div className="w-full px-20 flex overflow-x-clip flex-wrap mt-5 justify-start">
        {pokemon.map((mon) => (
          <PokemonBox number={mon.toString()} name={"Gouging Fire"} />
        ))}
      </div>
    </div>
  );
}
