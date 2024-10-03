import { useEffect, useState } from 'react';
import axios from 'axios';
import PLAYERS from '../models/mock-player';
import player from '../models/player';
import GetTeamRank from './GetTeamRank';
import SoloQChallengelogo from './img/soloqchallengelogo.webp';
import Timer from './Timer';
import SoloQChallengePopup from './SoloQChallengePopup';
import twitchlogo from './img/twitch.png';
import imgIron from './img/rank/Rank=Iron.png';
import imgBronze from './img/rank/Rank=Bronze.png';
import imgSilver from './img/rank/Rank=Silver.png';
import imgGold from './img/rank/Rank=Gold.png';
import imgPlatinum from './img/rank/Rank=Platinum.png';
import imgEmerald from './img/rank/Rank=Emerald.png';
import imgDiamond from './img/rank/Rank=Diamond.png';
import imgMaster from './img/rank/Rank=Master.png';
import imgGrandmaster from './img/rank/Rank=Grandmaster.png';
import imgChallenger from './img/rank/Rank=Challenger.png';


const GetDataAccount = () => {
    const [summonerData, setSummonerData] = useState<any[]>([]); // Pour stocker les données récupérées
    const [error, setError] = useState<string | null>(null); // Message d'erreur ou null
    const [players] = useState<player[]>(PLAYERS); // Initialisation directe avec les joueurs
    const [loading, setLoading] = useState<boolean>(false); // État de chargement
    const [showPopup, setShowPopup] = useState<boolean>(false); // État pour afficher ou cacher le popup

    const API_KEY = import.meta.env.VITE_API_KEY; // Pour récupérer la clé API
    console.log("API_KEY:", API_KEY); // Log pour vérifier que ça fonctionne

    try {
        const logoPath = require('./GetDataAccount.tsx');
        console.log("Logo path exists:", logoPath);
    } catch (error) {
        console.error("Logo path does not exist:", error);
    }

    // Ordre des tiers et rangs
    const tierOrder = {
        'IRON': 1,
        'BRONZE': 2,
        'SILVER': 3,
        'GOLD': 4,
        'PLATINUM': 5,
        'EMERALD': 6,
        'DIAMOND': 7,
        'MASTER': 8,
        'GRANDMASTER': 9,
        'CHALLENGER': 10,
    };

    const tierImages = {
        'IRON': imgIron,
        'BRONZE': imgBronze,
        'SILVER': imgSilver,
        'GOLD': imgGold,
        'PLATINUM': imgPlatinum,
        'EMERALD': imgEmerald,
        'DIAMOND': imgDiamond,
        'MASTER': imgMaster,
        'GRANDMASTER': imgGrandmaster,
        'CHALLENGER': imgChallenger,
    };
    
    const rankOrder = {
        'IV': 4,
        'III': 3,
        'II': 2,
        'I': 1,
    };
    
    const sortByRankAndDivision = (data: { tier: string; rank: string; leaguePoints: number }[]) => {
        console.log("Data to sort:", data); // Log des données
    
        return data.sort((a, b) => {
            const tierA = a.tier.toUpperCase();
            const tierB = b.tier.toUpperCase();
            console.log(`Comparing tiers: ${tierA} vs ${tierB}`);
    
            // Comparer les tiers, inversé pour que les tiers supérieurs soient considérés comme inférieurs
            const tierComparison = (tierOrder[tierB as keyof typeof tierOrder] ?? 0) - (tierOrder[tierA as keyof typeof tierOrder] ?? 0);
            console.log(`Tier comparison result: ${tierComparison}`);
    
            if (tierComparison !== 0) {
                return tierComparison; // Si les tiers sont différents, retourner le résultat
            }
    
            // Comparer les rangs uniquement si les tiers ne sont pas Master, Grandmaster, ou Challenger
            if (tierA !== 'MASTER' && tierA !== 'GRANDMASTER' && tierA !== 'CHALLENGER') {
                const rankA = a.rank.toUpperCase();
                const rankB = b.rank.toUpperCase();
                console.log(`Comparing ranks: ${rankA} vs ${rankB}`);
    
                const rankComparison = (rankOrder[rankA as keyof typeof rankOrder] ?? 0) - (rankOrder[rankB as keyof typeof rankOrder] ?? 0);
                console.log(`Rank comparison result: ${rankComparison}`);
    
                if (rankComparison !== 0) {
                    return rankComparison; // Si les rangs sont différents, retourner le résultat
                }
            }
    
            // Comparer les points de ligue
            console.log(`Comparing league points: ${b.leaguePoints} vs ${a.leaguePoints}`);
            return b.leaguePoints - a.leaguePoints; // Ordre décroissant pour les points de ligue
        });
    };

    useEffect(() => {
        const fetchSummonerData = async () => {
            const data: any[] = []; // Pour stocker les données des joueurs

            if (players.length === 0) {
                setError('Aucun joueur trouvé.');
                return;
            }

            setLoading(true); // Début du chargement

            // Boucle sur chaque joueur
            for (const player of players) {
                const { pseudo: gameName, tag: tagLine, idLol: encryptedSummonerId, name, team, tag, twitch } = player;

                try {
                    // Récupérer les données classées par joueur
                    const response = await axios.get(
                        `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${API_KEY}`
                    );

                    // Extraire les informations nécessaires
                    if (response.data.length > 0) {
                        const rankedInfo = response.data[0]; // On prend la première entrée (le joueur peut avoir plusieurs classements)

                        // Construire un objet avec les informations souhaitées
                        data.push({
                            name: name,
                            pseudo: gameName,
                            tag : tag,
                            team: team,
                            tier: rankedInfo.tier,
                            rank: rankedInfo.rank,
                            leaguePoints: rankedInfo.leaguePoints,
                            wins: rankedInfo.wins,
                            losses: rankedInfo.losses,
                            twitch: twitch,
                        });
                    } else {
                        setError(`Aucune donnée de classement trouvée pour ${gameName}#${tagLine}.`);
                    }

                } catch (err) {
                    console.error(err); // Log de l'erreur
                    setError(`Impossible de récupérer les informations pour ${gameName}#${tagLine}.`);
                }
            }
            // Trier les données par tier, rank et LP avant de les mettre à jour
            const sortedData = sortByRankAndDivision(data);
            setSummonerData(sortedData);
            setLoading(false); // Fin du chargement
            setError(null); // Réinitialiser l'erreur
        };

        fetchSummonerData(); // Appeler la fonction de récupération des données automatiquement lors du montage
    }, [players]); // L'effet dépend des joueurs


    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className='flex flex-col'>
            {/* Premier conteneur pour l'image et le classement */}
            <div className="w-full">
                <div className='flex flex-col lg:flex-row h-auto lg:h-96 pb-12 w-full justify-between px-4 lg:px-16 mt-10'>
                    {/* Image responsive */}
                    <img className="pb-4 mx-auto lg:mx-0 w-1/2 lg:w-auto" alt="SoloQChallenge" src={SoloQChallengelogo} />
                    <Timer />
                    {/* Classement des équipes */}
                    <div className="mt-6 lg:mt-0 w-full lg:w-3/12">
                        <GetTeamRank playerData={summonerData} />
                    </div>
                </div>
            </div>
            {showPopup && <SoloQChallengePopup togglePopup={togglePopup} />}
            {/* Pop-up */}
            {/* Deuxième conteneur pour le tableau des joueurs */}
            <div className="flex items-center justify-center mx-auto mt-12 w-full px-4">
                <div className="bg-white p-6 mb-6 rounded shadow-lg w-full lg:w-4/5 bg-slate-900 sm:bg-slate-900 lg:bg-slate-900">
                    {/* Titre du classement */}
                    <div className="flex flex-col lg:flex-row justify-center items-center mb-4">
                        <h1 className="mx-auto text-3xl font-bold text-white text-center w-full lg:w-auto">
                            Classement SoloQ Challenge
                        </h1>
                        <button 
                        onClick={togglePopup}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 lg:mt-0 lg:ml-4">
                            Règles
                        </button>
                    </div>
                    {/* Afficher un message de chargement ou d'erreur */}
                    {loading && <p className="text-center text-white">Chargement des données...</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}
    
                    {/* Table des données si disponibles */}
                    {summonerData.length > 0 && (
                        <div className="overflow-x-auto mt-6">
                            <table className="min-w-full border border-gray-700">
                                <thead>
                                    <tr className="border border-gray-700 text-white uppercase text-lg leading-normal">
                                        <th className="py-3 px-6 text-left">Classement</th>
                                        <th className="py-3 px-6 text-left">Nom</th>
                                        <th className="py-3 px-6 text-left">Pseudo</th>
                                        <th className="py-3 px-6 text-left">Team</th>
                                        <th className="py-3 px-6 text-left">Rank</th>
                                        <th className="py-3 px-6 text-left">Matchs</th>
                                        <th className="py-3 px-6 text-left">Victoire</th>
                                        <th className="py-3 px-6 text-left">Défaite</th>
                                        <th className="py-3 px-6 text-left">Winrate</th>
                                        <th className="py-3 px-6 text-left">Twitch</th>
                                    </tr>
                                </thead>
                                <tbody className="text-white text-sm font-light">
                                    {summonerData.map((data: { tier: keyof typeof tierImages; rank: string; leaguePoints: number; name: string; pseudo: string; tag: string; team: string; wins: number; losses: number; twitch: string | null }, index) => (
                                        <tr key={index} className="border-b font-normal text-lg border-gray-700">
                                            <td className="py-3 px-6">{index + 1}</td> {/* Afficher le classement */}
                                            <td className="py-3 px-6">{data.name}</td>
                                            <td className="py-3 px-6">{data.pseudo}#{data.tag}</td>
                                            <td className="py-3 px-6">{data.team}</td>
                                            <td className="py-3 px-6 flex items-center">
                                                {/* Afficher l'image du tier */}
                                                <img
                                                    src={tierImages[data.tier] || ''} // Utilise une image par défaut si le tier n'est pas trouvé
                                                    alt={`${data.tier} logo`}
                                                    className="h-6 w-6 mr-2" // Taille de l'image
                                                />
                                                {data.tier} {data.rank} ({data.leaguePoints} LP)
                                            </td>
                                            <td className="py-3 px-6">{data.wins + data.losses}</td>
                                            <td className="py-3 px-6">{data.wins}</td>
                                            <td className="py-3 px-6">{data.losses}</td>
                                            <td className="py-3 px-6">{((data.wins / (data.wins + data.losses)) * 100).toFixed(2)}%</td>
                                            <td className="py-3 px-6">
                                                {data.twitch ? (
                                                    <a href={data.twitch} target="_blank" rel="noreferrer">
                                                        <img
                                                    src={twitchlogo} // Utilise une image par défaut si le tier n'est pas trouvé
                                                    alt={`twitch logo`}
                                                    className="h-6 w-6 mr-2" // Taille de l'image
                                                />
                                                    </a>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
};

export default GetDataAccount;
