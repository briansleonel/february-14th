import { useRef, useState } from "react";
import phrases from "./phrases";

function App() {
    const [noCount, setNoCount] = useState(0);
    const [yesPressed, setYesPressed] = useState(false);
    //const yesButtonSize = noCount * 20 + 16;

    const refContainer = useRef<HTMLDivElement>(null);
    const refButtonNo = useRef<HTMLButtonElement>(null);

    const [firstNo, setFirstNo] = useState(true);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    function getNoButtonText() {
        return phrases[Math.min(noCount, phrases.length - 1)];
    }

    function handleHoverNo() {
        setFirstNo(false);
        if (refButtonNo.current && refContainer.current) {
            const width = refContainer.current.offsetWidth ?? 0;
            const height = refContainer.current.offsetHeight ?? 0;

            let valueX = 0;
            let valueY = 0;

            do {
                valueX = Math.floor(Math.random() * (width - 200 + 1) + 0);
                valueY = Math.floor(Math.random() * (height - 200 + 1) + 0);
            } while (refButtonNo.current.offsetWidth + valueX > width);

            setNoCount(noCount + 1);

            setX(valueX);
            setY(valueY);
            console.log("x: ", valueX);
            console.log("y: ", valueY);
        }
    }

    return (
        <div
            className="w-full max-h-screen h-screen bg-zinc-950 text-zinc-50 flex flex-col justify-center items-center gap-16 relative p-4 md:p-12 transition-all"
            ref={refContainer}
        >
            {yesPressed ? (
                <>
                    <img
                        src="https://media1.tenor.com/m/jjM8wEXXNqwAAAAd/kiss.gif"
                        alt="bears kissing"
                        className="w-1/3"
                    />
                </>
            ) : (
                <>
                    <div
                        className="w-full h-full relative flex flex-col justify-center items-center gap-16"
                        //ref={refContainer}
                    >
                        <div className="text-4xl md:text-7xl uppercase font-normal md:font-light text-center">
                            ¿Querés ser mi 14 de febrero?
                        </div>
                        <div className="grid grid-cols-2 gap-8 md:gap-16 text-white">
                            <button
                                className="bg-green-600 hover:bg-green-600/85 px-10 py-3 text-center rounded font-medium uppercase text-xl md:text-4xl"
                                //style={{ fontSize: yesButtonSize }}
                                onClick={() => setYesPressed(true)}
                            >
                                SI
                            </button>
                            <button
                                className={`bg-red-600 px-10 py-3 rounded font-normal md:font-medium text-center text-xl md:text-4xl ${
                                    firstNo ? "" : "absolute"
                                }`}
                                style={{ top: y, left: x }}
                                onClick={handleHoverNo}
                                ref={refButtonNo}
                                onMouseEnter={handleHoverNo}
                            >
                                NO
                            </button>
                        </div>
                    </div>

                    {!firstNo && (
                        <div className="w-full md:w-auto p-6 px-8 md:p-8 md:px-14 mt-10 bg-zinc-900 rounded text-xl md:text-4xl font-light text-center">
                            {getNoButtonText()}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
