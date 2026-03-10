//Definindo como os objetos devem ser. Como deve ser a sua estrutura
export type WordStatus = 'neutral' | 'correct' | 'incorrect';

export type FlashcardWord = {
    id: string;
    text: string;
    status: WordStatus;
};

export type Flashcard = {
    id: string;
    theme: string;
    scenario: string;
    textEn: string;
    textPt: string;
    audioUrl: string;
    words: FlashcardWord[];
}