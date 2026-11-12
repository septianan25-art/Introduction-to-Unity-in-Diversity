export type RegionKey = 
  | 'sumatra' 
  | 'java' 
  | 'kalimantan' 
  | 'sulawesi' 
  | 'bali_nusa' 
  | 'maluku' 
  | 'papua';

export interface GameStats {
  unityScore: number;       // Starts 70, 0-100
  stability: number;        // Starts 70, 0-100
  knowledgePoints: number;  // Starts 0
  currentMissionIndex: number; // 0 to 5 (0: Mission 1, 5: Mission 6)
  completedMissions: number[]; // e.g. [0, 1]
  mistakesCount: number;
}

export type QuestionType = 
  | 'multiple_choice' 
  | 'matching' 
  | 'true_false' 
  | 'situation_analysis' 
  | 'decision_making' 
  | 'short_answer';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  title: string;
  context: string;
  hint: string;
  explanation: string;
  cognitiveLevel: 'C2 - Understanding' | 'C3 - Application' | 'C4 - Analysis' | 'C5 - Evaluation';
  points: number;
  unityImpact: number;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice' | 'situation_analysis' | 'decision_making';
  options: {
    id: string;
    text: string;
    isBest: boolean;
    feedback: string;
    unityDelta: number;
    stabilityDelta: number;
  }[];
}

export interface MatchingPair {
  id: string;
  item: string;
  category: 'house' | 'clothing' | 'food' | 'tradition' | 'instrument';
  region: string;
  detail: string;
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  pairs: MatchingPair[];
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true_false';
  statements: {
    statement: string;
    isTrue: boolean;
    reason: string;
  }[];
}

export interface CrisisScenario {
  id: string;
  title: string;
  location: string;
  threatCategory: 'Cultural Misunderstanding' | 'Discrimination' | 'Hoax & Hate Speech' | 'Regional Inequality' | 'Tradition vs Modernity';
  description: string;
  urgency: 'High' | 'Critical' | 'Severe';
  options: {
    id: string;
    title: string;
    action: string;
    rationale: string;
    isOptimal: boolean;
    unityChange: number;
    stabilityChange: number;
    knowledgeGain: number;
    consequenceText: string;
    educationalLesson: string;
  }[];
}

export interface InfrastructureProject {
  id: string;
  title: string;
  category: 'Transportation' | 'Communication' | 'Education' | 'Economic Cooperation' | 'Cultural Exchange';
  cost: number; // in Unity Budget Points
  regionsConnected: [RegionKey, RegionKey];
  description: string;
  impactDescription: string;
  unityBonus: number;
  stabilityBonus: number;
  knowledgeBonus: number;
}

export interface RegionalDelegate {
  id: RegionKey;
  name: string;
  role: string;
  regionName: string;
  demands: string;
  corePriority: string;
  avatarSeed: string;
}

export interface NegotiationIssue {
  id: string;
  roundNumber: number;
  topic: string;
  nationalChallenge: string;
  proposals: {
    id: string;
    proposer: string;
    summary: string;
    nationalFairnessScore: number; // 1-5
    cooperationScore: number;
    unityDelta: number;
    stabilityDelta: number;
    feedback: string;
    isBalancedSolution: boolean;
  }[];
}

export interface VisionStrategy {
  id: string;
  title: string;
  pillar: string;
  description: string;
  longTermImpact: string;
  focusArea: 'Education' | 'Diversity' | 'Transport' | 'Digital' | 'Anti-Discrimination' | 'Economy' | 'Youth' | 'Heritage';
}

export interface RandomEvent {
  id: string;
  headline: string;
  badge: string;
  description: string;
  unityChange: number;
  stabilityChange: number;
  knowledgeGain: number;
  lesson: string;
}
