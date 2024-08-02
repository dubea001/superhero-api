'use client';

import { fetchSuperHeroData } from '@/utils/fetchWithAxios';
import { PowerStats, SuperHero } from '@/utils/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

const GameSection: React.FC = () => {
    const [superHeroData1, setSuperHeroData1] = useState<SuperHero | null>(
        null
    );
    const [superHeroData2, setSuperHeroData2] = useState<SuperHero | null>(
        null
    );
    const [question, setQuestion] = useState<string>('');
    const [feedBack, setFeedBack] = useState<string>('');
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
    const [currentStat1, setCurrentStat1] = useState<number | null>(null);
    const [currentStat2, setCurrentStat2] = useState<number | null>(null);
    const [currentStatName, setCurrentStatName] = useState<string>('');

    const generateRandomUser = (): number => {
        return Math.floor(Math.random() * 731) + 1;
    };

    const generateUniqueNumber = (): [number, number] => {
        const superHero1 = generateRandomUser();
        let superHero2 = generateRandomUser();

        while (superHero1 === superHero2) {
            superHero2 = generateRandomUser();
        }
        return [superHero1, superHero2];
    };

    const [superHero1, superHero2] = generateUniqueNumber();

    const fetchData = async (
        id: number,
        setData: React.Dispatch<React.SetStateAction<SuperHero | null>>
    ) => {
        try {
            const response = await fetchSuperHeroData(id);
            setData(response);
        } catch (error) {
            console.error('failed please try again', error);
        }
    };

    useEffect(() => {
        fetchData(superHero1, setSuperHeroData1);
        fetchData(superHero2, setSuperHeroData2);
    }, []);

    useEffect(() => {
        if (superHeroData1 && superHeroData2) {
            generateQuestion();
        }
    }, [superHeroData1, superHeroData2]);

    const generateQuestion = () => {
        if (!superHeroData1 || !superHeroData2) return;

        const stats: (keyof PowerStats)[] = [
            'intelligence',
            'strength',
            'speed',
            'durability',
            'power',
            'combat',
        ];
        const randomQuestion = stats[Math.floor(Math.random() * stats.length)];
        setCurrentStatName(randomQuestion);
        setQuestion(randomQuestion);

        const stats1 = parseInt(superHeroData1.powerstats[randomQuestion]);
        const stats2 = parseInt(superHeroData2.powerstats[randomQuestion]);
        setCurrentStat1(stats1);
        setCurrentStat2(stats2);
        if (stats1 === stats2) {
            setCorrectAnswer(0);
        } else if (stats1 > stats2) {
            setCorrectAnswer(1);
        } else {
            setCorrectAnswer(2);
        }
    };

    const handleAnswer = (selected: number) => {
        if (selected === 0) {
            setFeedBack(correctAnswer === 0 ? 'Correct' : 'Incorrect');
        } else if (selected === correctAnswer) {
            setFeedBack('Correct');
        } else {
            setFeedBack('Incorrect');
        }

        setTimeout(() => {
            generateNewRound();
        }, 20000);
    };

    const generateNewRound = () => {
        setFeedBack('');
        setCurrentStat1(null);
        setCurrentStat2(null);
        const [newSuperHero1, newSuperHero2] = generateUniqueNumber();
        fetchData(newSuperHero1, setSuperHeroData1);
        fetchData(newSuperHero2, setSuperHeroData2);
    };

    return (
        <div className='px-4 flex flex-col items-center justify-center min-h-screen md:pb-12'>
            {question && (
                <h1 className='text-2xl md:text-4xl font-bold my-8'>
                    which superhero has more {question}?
                </h1>
            )}
            {feedBack && (
                <div className='border border-black'>
                    <p className='text-lg font-semibold text-center my-4'>
                        {feedBack}
                    </p>
                    {currentStat1 !== null && currentStat2 !== null && (
                        <p className='font-bold text-lg md:text-xl'>
                            {superHeroData1!.name}'s {currentStatName}:
                            {currentStat1}, {superHeroData2!.name}'s{' '}
                            {currentStatName}: {currentStat2}
                        </p>
                    )}
                </div>
            )}

            {question && (
                <div className='mt-4'>
                    <button
                        onClick={() => handleAnswer(0)}
                        className='border rounded hover:bg-white hover:text-gray-600 transition-all duration-200 border-white px-8 py-2 md:px-12'
                    >
                        Equal {question}
                    </button>
                </div>
            )}
            <div className='flex gap-4 md:gap-8 p-2 my-4'>
                {superHeroData1 ? (
                    <div
                        onClick={() => handleAnswer(1)}
                        className='border border-white cursor-pointer w-1/2 hover:bg-gray-700 transition-all duration-200'
                    >
                        <Image
                            src={superHeroData1.image.url}
                            alt={superHeroData1.name}
                            width={400}
                            height={400}
                            className=''
                        />
                        <p className='text-xl my-4 font-semibold ml-4'>
                            {superHeroData1.name}
                        </p>
                    </div>
                ) : (
                    <SyncLoader color='#ffffff' speedMultiplier={0.5} />
                )}
                {superHeroData2 ? (
                    <div
                        onClick={() => handleAnswer(2)}
                        className='border border-white cursor-pointer w-1/2 hover:bg-gray-700 transition-all duration-200'
                    >
                        <Image
                            src={superHeroData2.image.url}
                            alt={superHeroData2.name}
                            width={400}
                            height={400}
                            className=''
                        />
                        <p className='text-xl my-4 font-semibold ml-4'>
                            {superHeroData2.name}
                        </p>
                    </div>
                ) : (
                    <SyncLoader color='#ffffff' speedMultiplier={0.5} />
                )}
            </div>
        </div>
    );
};

export default GameSection;
