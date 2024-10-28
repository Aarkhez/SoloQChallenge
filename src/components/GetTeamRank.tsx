// GetTeamRank.tsx
import React from 'react';

// Définir les ordres de tiers et de rang
const tierOrder = {
    'IRON': 0,
    'BRONZE': 400,
    'SILVER': 800,
    'GOLD': 1200,
    'PLATINUM': 1600,
    'EMERALD': 2000,
    'DIAMOND': 2400,
    'MASTER': 2800,
    'GRANDMASTER': 3200,
    'CHALLENGER': 3600,
};

const rankOrder = {
    'IV': 0,
    'III': 100,
    'II': 200,
    'I': 300,
};

// Interface pour les données des joueurs
interface PlayerData {
    name: string;
    tier: keyof typeof tierOrder;
    rank: keyof typeof rankOrder;
    leaguePoints: number;
    team: string;
}

// Fonction pour calculer les points des équipes
const calculateTeamPoints = (playerData: PlayerData[]) => {
    const teamPoints: { [key: string]: number } = {};

    playerData.forEach(player => {
        const { team, tier, rank, leaguePoints } = player;



        // Calculer les points en fonction du tier et du rank
        const tierPoints = tierOrder[tier] || 0;
        const rankPoints = rankOrder[rank] || 0;

       // console.log(tierPoints, rankPoints, leaguePoints);

        // Points totaux pour le joueur
        const totalPoints = tierPoints + rankPoints + leaguePoints;

        // Ajouter les points au total de l'équipe
        if (!teamPoints[team]) {
            teamPoints[team] = 0; // Initialiser si l'équipe n'existe pas
        }
        teamPoints[team] += totalPoints;

        console.log(teamPoints[team]);
        //console.log(teamPoints);
        //console.log(totalPoints);
    });

    return teamPoints;
};

// Composant pour afficher le classement des équipes
const GetTeamRank: React.FC<{ playerData: PlayerData[] }> = ({ playerData }) => {
    const teamPoints = calculateTeamPoints(playerData);

    // Transformer les points des équipes en tableau pour le tri
    const sortedTeams = Object.entries(teamPoints)
        .map(([team, points]) => ({ team, points }))
        .sort((a, b) => b.points - a.points);

    return (
        <div className="h-auto p-4 rounded shadow-lg w-full bg-slate-900">
            <h2 className="text-lg font-bold text-center mb-4">Classement des Équipes</h2>
            {sortedTeams.length > 0 ? (
                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full border border-gray-700">
                        <thead>
                            <tr className="border border-gray-700 text-white uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Position</th>
                                <th className="py-3 px-6 text-left">Nom de l'équipe</th>
                                <th className="py-3 px-6 text-left">Points Totaux</th>
                            </tr>
                        </thead>
                        <tbody className="text-white text-xs font-light">
                            {sortedTeams.map((team, index) => (
                                <tr key={index} className="border-b font-normal text-base border-gray-700">
                                    <td className="py-3 px-6">{index + 1}</td>
                                    <td className="py-3 px-6">{team.team}</td>
                                    <td className="py-3 px-6">{team.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-white">Aucune équipe disponible</p>
            )}
        </div>
    );
};

export default GetTeamRank;
