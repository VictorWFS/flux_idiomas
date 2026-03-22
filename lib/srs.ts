// lib/srs.ts

export type Grade = 'muito_dificil' | 'dificil' | 'mais_ou_menos' | 'facil';

export interface SRSData {
  interval: number;
  easeFactor: number;
  repetitions: number;
}

export function calculateNextReview(grade: Grade, currentStats: SRSData): SRSData {
  let { interval, easeFactor, repetitions } = currentStats;

  // QUALQUER OPÇÃO ABAIXO DE "FÁCIL" FORÇA A REVISÃO RÁPIDA (1 a 2 dias)
  
  if (grade === 'muito_dificil') {
    repetitions = 0;
    interval = 1; // Vê amanhã com certeza absoluta
    easeFactor = Math.max(1.3, easeFactor - 0.25); // Penalidade máxima na prioridade
    
  } else if (grade === 'dificil') {
    repetitions = 0;
    interval = 1; // Vê amanhã
    easeFactor = Math.max(1.3, easeFactor - 0.15); // Penalidade média
    
  } else if (grade === 'mais_ou_menos') {
    repetitions = Math.max(0, repetitions - 1);
    interval = 2; // Vê em 2 dias (já entra na zona de alerta)
    easeFactor = Math.max(1.3, easeFactor - 0.05); // Penalidade leve
    
  } else if (grade === 'facil') {
    // Só o "Fácil" avança o card no espaçamento
    repetitions += 1;
    if (repetitions === 1) {
      interval = 4;
    } else {
      interval = Math.round(interval * easeFactor * 1.3); 
    }
    easeFactor += 0.15; // Fica mais fácil
  }

  return { interval, easeFactor, repetitions };
}