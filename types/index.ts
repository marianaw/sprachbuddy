export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type StrictnessLevel = 'lenient' | 'moderate' | 'strict';

export interface UserSettings {
  cefrLevel: CEFRLevel;
  goals: string;
  strictness: StrictnessLevel;
  correctMe: boolean;
  germanOnly: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatRequest {
  messages: Message[];
  settings: UserSettings;
  summaryMode?: boolean;
}
