'use client';

import { fetchSuperHeroData } from '@/utils/fetchWithAxios';
import { PowerStats, SuperHero } from '@/utils/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

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
        setQuestion(`which superhero has more ${randomQuestion}?`);

        const stats1 = parseInt(superHeroData1.powerstats[randomQuestion]);
        const stats2 = parseInt(superHeroData2.powerstats[randomQuestion]);
        if (stats1 > stats2) {
            setCorrectAnswer(1);
        } else if (stats2 > stats1) {
            setCorrectAnswer(2);
        } else {
            setCorrectAnswer(0);
        }
    };

    const handleAnswer = (selected: number) => {
        if (correctAnswer === 0) {
            setFeedBack("it's a tie!");
        } else if (selected === correctAnswer) {
            setFeedBack('correct');
        } else {
            setFeedBack('wrong');
        }
    };

    return (
        <div className='px-4 flex flex-col items-center justify-center min-h-screen'>
            {question && <h1 className=''>{question}</h1>}
            <div className='border border-green-600 flex gap-4 md:gap-8 p-2'>
                {superHeroData1 ? (
                    <div
                        onClick={() => handleAnswer(1)}
                        className='border border-black'
                    >
                        <Image
                            src={superHeroData1.image.url}
                            alt={superHeroData1.name}
                            width={400}
                            height={400}
                            className=''
                        />
                        <h1 className=''>{superHeroData1.name}</h1>
                    </div>
                ) : (
                    <p className=''>Loading...</p>
                )}
                {superHeroData2 ? (
                    <div
                        onClick={() => handleAnswer(2)}
                        className='border border-black'
                    >
                        <Image
                            src={superHeroData2.image.url}
                            alt={superHeroData2.name}
                            width={400}
                            height={400}
                            className=''
                        />
                        <h1 className=''>{superHeroData2.name}</h1>
                    </div>
                ) : (
                    <p className=''>Loading...</p>
                )}
            </div>
            {feedBack && <p className=''>{feedBack}</p>}
        </div>
    );
};

export default GameSection;
