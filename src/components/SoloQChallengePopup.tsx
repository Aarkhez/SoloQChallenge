const SoloQChallengePopup = ({ togglePopup } :any) => {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center transition-opacity duration-300">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-xl shadow-lg w-11/12 lg:w-1/3 text-white transform scale-100 hover:scale-105 transition-transform duration-300">
                    <h2 className="text-3xl lg:text-4xl font-extrabold mb-6 text-center tracking-wider underline decoration-wavy decoration-pink-300">
                        SOLOQ CHALLENGE
                    </h2>
    
                    <p className="text-lg mb-4 font-semibold tracking-wide">- <span className="text-yellow-300">GRIND LA SOLOQ</span></p>
                    <p className="text-lg mb-4 font-semibold tracking-wide">- <span className="text-yellow-300">25 GAMES PAR SEMAINE</span></p>
                    <p className="text-lg mb-4 font-semibold tracking-wide">- <span className="text-yellow-300">8 JOUEURS</span></p>
                    <p className="text-lg mb-4 font-semibold tracking-wide">- <span className="text-yellow-300">4 EQUIPES</span></p>
    
                    <p className="text-2xl font-bold mt-8 text-center uppercase tracking-wider text-pink-200">Objectifs :</p>
                    
                    <ul className="list-disc ml-8 mt-4 space-y-3 text-lg tracking-wide">
                        <li className="hover:text-yellow-300 transition-colors duration-200">
                            <span className="font-semibold">ETRE LE MEILLEUR JOUEUR</span> DU SOLOQ CHALLENGE
                        </li>
                        <li className="hover:text-yellow-300 transition-colors duration-200">
                            <span className="font-semibold">RAPPORTER LE PLUS DE LPS</span> À SON EQUIPE
                        </li>
                    </ul>
    
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={togglePopup}
                            className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    
    export default SoloQChallengePopup;