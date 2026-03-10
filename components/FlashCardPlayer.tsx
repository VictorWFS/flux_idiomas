'use client';

import { useState } from "react";
import type { Flashcard } from "@/types/flashcard";

const mockFlashcard: Flashcard = {
    id: '1',
    theme: 'Travel',
    scenario: 'Airport check-in',
    textEn: 'Good morning, I have a reservation.',
    textPt: 'Bom dia, eu tenho uma reserva.',
    audioUrl: '/audio/test.mp3',
    words: [
        { id: '1', text: 'Good', status: 'neutral' },
        { id: '2', text: 'morning,', status: 'neutral' },
        { id: '3', text: 'I', status: 'neutral' },
        { id: '4', text: 'have', status: 'neutral' },
        { id: '5', text: 'a', status: 'neutral' },
        { id: '6', text: 'reservation.', status: 'neutral' },
    ],
}

export default function StudyPage() {
    const [showTranslation, setShowTranslation] = useState(false);

    const allWordsCorrect = mockFlashcard.words.every(
        (word) => word.status === 'correct'
    );

    return (
        <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-lg p-8 space-y-6">
                <div>
                    <p className = "text-sm text-gray-500">
                        Tema: {mockFlashcard.theme}
                    </p>
                    <p className="text-sm text-gray-500">
                        Cenário: {mockFlashcard.scenario}
                    </p>
                </div>
                <div className="space-y-4">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        {mockFlashcard.textEn}
                    </h1>

                    <div className="flex flex-wrap gap-2">
                        {mockFlashcard.words.map((word) => {
                            const statusClasses = {
                                neutral: 'bg-gray-200 text-gray-800',
                                correct: 'bg-green-200 text-green-800',
                                incorrect: 'bg-red-200 text-red-800',
                            };
                            return (
                                <span
                                key = {word.id}
                                className = {`px-3 py-2 rounded-lg text-sm font-medium ${statusClasses[word.status]}`}
                                >
                                    {word.text}
                                </span>
                            )
                        })};
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                    onClick={() => setShowTranslation(!showTranslation)}
                    className = "rounded-lg bg-blue-600 px-4 py-2 text-white"
                    >
                        {showTranslation ? "Ocultar tradução" : 'Mostrar tradução'}
                    </button>

                    <button
                    className="rounded-lg bg-gray-800 px-4 py-2 text-white font-medium hover:bg-gray-900 transition"
                    onClick={() => alert('Aqui depois entra o play do áudio')}
                    >
                        Tocar áudio
                    </button>
                </div>

                {showTranslation && (
                    <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
                        <p className="text-gray-800 font-medium">{mockFlashcard.textPt}</p>
                    </div>
                )}

                <div className="pt-4 border-t">
                    <button 
                    disabled = {!allWordsCorrect}
                    className={`rounded-lg bg-gray-300 px-4 py-2 text-gray-500 font-medium cursor-not-allowed ${
                        allWordsCorrect
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    >
                        Próximo
                    </button>
                </div>
            </div>
        </main>
    )
}


