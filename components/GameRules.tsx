import Link from 'next/link';
import React from 'react';

const GameRules = () => {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center p-4'>
            <div className=' text-white md:w-[80%] mx-auto px-4 py-8'>
                <h2 className='text-2xl mb-4 text-center'>
                    How the Superhero Comparison Application Works
                </h2>
                <ol className='list-decimal list-inside'>
                    <li className='my-2 md:my-6'>
                        <strong>Generating Random Superheroes:</strong> The
                        application generates two unique random numbers between
                        1 and 731 to fetch different superheroes' data.
                    </li>
                    <li className='my-2 md:my-6'>
                        <strong>Fetching Superhero Data:</strong> It retrieves
                        the selected superheroes' information including their
                        name, image, and powerstats from the Superhero API.
                    </li>
                    <li className='my-2 md:my-6'>
                        <strong>Generating Comparison Questions:</strong> A
                        random powerstat is selected to compare, and a question
                        like "Which superhero has more strength?" is displayed.
                    </li>
                    <li className='my-2 md:my-6'>
                        <strong>Handling NaN Values:</strong> If any powerstat
                        value is NaN, it is treated appropriately. If both are
                        NaN, it is a tie. If one is NaN and the other is a valid
                        number, the valid number is considered higher.
                    </li>
                    <li className='my-2 md:my-6'>
                        <strong>
                            Displaying Superheroes and Answering Questions:
                        </strong>{' '}
                        Superheroes are shown side by side. Users can click on a
                        superhero or a button to indicate a tie to answer the
                        question. Feedback is provided with the correct stats
                        shown.
                    </li>
                    <li className='my-2 md:my-6'>
                        <strong>Loading the Next Question:</strong> After an
                        answer is given, a new question is generated and
                        displayed, repeating the comparison process.
                    </li>
                </ol>
            </div>
            <Link
                href='/start'
                className='bg-white rounded px-8 py-3 text-gray-700 hover:bg-transparent hover:border hover:border-white hover:text-white transition-all duration-200 mt-8'
            >
                Start Game
            </Link>
        </div>
    );
};

export default GameRules;
