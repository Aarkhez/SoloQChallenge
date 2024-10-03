import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
    });

    // Date cible (1 mois à partir de maintenant)
    const targetDate = new Date('2024-10-04');
    targetDate.setMonth(targetDate.getMonth() + 1);

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

                setTimeLeft({ days, hours, minutes });
            } else {
                // Si le temps est écoulé, arrêter le timer
                setTimeLeft({ days: 0, hours: 0, minutes: 0 });
            }
        };

        // Mettre à jour le timer toutes les minutes
        const timerId = setInterval(updateTimer, 1000);

        // Nettoyer l'intervalle à la fin
        return () => clearInterval(timerId);
    }, [targetDate]);

    return (
        <div className="p-6 mt-20 rounded w-full text-white text-center">
            <h2 className="text-2xl font-bold">Temps Restant</h2>
            <div className="text-4xl mt-4">
                {timeLeft.days}j {timeLeft.hours}h {timeLeft.minutes}m
            </div>
        </div>
    );
};

export default Timer;
