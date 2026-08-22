import { useState, useEffect } from "react";
import BitSet from "bitset";

// import { PokemonBox } from "@components";
import { PokemonBox } from "../../components";
// import { POKEMON_DATA } from "@data/pokemondata";
import { POKEMON_DATA } from "../../data/pokemondata";

const INITIAL_TIME = 10;
const TIME_INCREASE_INTERVAL = 6;

// nidoran edge cases bc they're weird
const NIDORAN_EQUIVALENTS = ["nidoran"];
const NIDORAN_FEMALE_EQUIVALENTS = ["nidoran female", "nidoran♀"];
const NIDORAN_MALE_EQUIVALENTS = ["nidoran male", "nidoran♂"];

const NIDORAN_MALE_KEY = "nidoran male";
const NIDORAN_FEMALE_KEY = "nidoran female";

const GAME_STATES = {
  UNSTARTED: "UNSTARTED",
  PLAYING: "PLAYING",
  ENDED: "ENDED",
};
type GAME_STATES = (typeof GAME_STATES)[keyof typeof GAME_STATES];

const ERROR_STATES = {
  NONE: "Meow.",
  DUPLICATE: "You've already said that pokémon.",
  INVALID: "I don't know that pokémon. Check your spelling?",
  NIDORAN: "Nidoran is weird. Um, take both.",
};
type ERROR_STATES = (typeof ERROR_STATES)[keyof typeof ERROR_STATES];

export default function Home() {
  const [choice, setChoice] = useState("");
  const [pokemon, setPokemon] = useState<string[]>([]);
  const [time, setTime] = useState<number>(INITIAL_TIME);
  const [green, setGreen] = useState<boolean>(false);
  const [gameState, setGameState] = useState<GAME_STATES>(
    GAME_STATES.UNSTARTED,
  );
  const [error, setError] = useState<ERROR_STATES>(ERROR_STATES.NONE);

  const used = new BitSet();

  // after initial
  useEffect(() => {
    if (gameState !== GAME_STATES.PLAYING) {
      return;
    }
    if (time <= 0) {
      setGameState(GAME_STATES.ENDED);
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time]);

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

  // janky rn but idc
  function increaseTime() {
    setTime((prev) => prev + TIME_INCREASE_INTERVAL);
    setGreen(true);
  }

  function handleCorrectMon() {
    increaseTime();
    setChoice("");
    setGameState(GAME_STATES.PLAYING);
    setError(ERROR_STATES.NONE);
    // bitset action here
  }

  function compareMon(input: string) {
    input = input.toLowerCase();
    if (NIDORAN_EQUIVALENTS.includes(input)) {
      handleCorrectMon();
      setError(ERROR_STATES.NIDORAN);
      setPokemon([...pokemon, NIDORAN_MALE_KEY, NIDORAN_FEMALE_KEY]);
    } else if (NIDORAN_FEMALE_EQUIVALENTS.includes(input)) {
      handleCorrectMon();
      setPokemon([...pokemon, NIDORAN_FEMALE_KEY]);
    } else if (NIDORAN_MALE_EQUIVALENTS.includes(input)) {
      handleCorrectMon();
      setPokemon([...pokemon, NIDORAN_MALE_KEY]);
    } else if (POKEMON_DATA.hasOwnProperty(input)) {
      if (false) {
        // TODO: check if exists already (with used)
      }
      setPokemon([...pokemon, POKEMON_DATA[input].name]);
      handleCorrectMon();
    } else {
      setError(ERROR_STATES.INVALID);
    }
  }

  function resetGame() {
    setGameState(GAME_STATES.UNSTARTED);
    setError(ERROR_STATES.NONE);
    setChoice("");
    setTime(INITIAL_TIME);
    setPokemon([]);
  }

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
      <p className={`mt-1 ${error === ERROR_STATES.NONE ? "hidden" : ""}`}>
        {error}
      </p>
      <input
        type="text"
        placeholder="I choose..."
        className="input input-sm my-4"
        value={choice}
        onChange={(e) => setChoice(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            compareMon(choice);
          }
        }}
        disabled={gameState === GAME_STATES.ENDED}
      />
      {gameState === GAME_STATES.ENDED ? (
        <div
          className="btn font-silk"
          onClick={(e) => {
            resetGame();
          }}
        >
          Try Again?
        </div>
      ) : (
        <div
          className="btn font-silk"
          onClick={(e) => {
            increaseTime();
          }}
        >
          Increase time
        </div>
      )}
      <div className="w-full px-20 flex overflow-x-clip flex-wrap mt-5 justify-start">
        {pokemon.toReversed().map((mon, index) => (
          <PokemonBox key={index} {...POKEMON_DATA[mon]} />
        ))}
      </div>
    </div>
  );
}
