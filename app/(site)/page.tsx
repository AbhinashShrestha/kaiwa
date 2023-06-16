'use client';
import { useState } from 'react';
import LandingPage from './LandingPage';

export default function Home() {
    const [showLandingPage, setShowLandingPage] = useState(false);

    return (
        <div className='bg-teal-200' >
            <div className="bg-cover bg-center min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(./a.png)` }}>
            {showLandingPage ? (
                <LandingPage />
            ) : (
                <div className="text-center">
                    <div
                    className='text-2xl font-bold text-black mb-4'
                    >A realtime chat app</div>
                    <div className="text-sm">
                        It has no encryption so use with caution!
                    </div>
                    <button 
                    className='text-xl text-white bg-teal-500 hover:bg-teal-300 rounded-lg px-4 py-2 mt-4'
                    onClick={() => setShowLandingPage(true)}>Start messaging!</button>
                </div>
            )}
        </div>
        </div>
        
    );
}

