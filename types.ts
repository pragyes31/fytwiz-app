
export enum ClientGoal {
  FAT_LOSS = 'fat loss',
  MUSCLE_GAIN = 'muscle gain',
  GENERAL_FITNESS = 'general fitness'
}

export enum ClientStatus {
  ON_TRACK = 'On track',
  NEEDS_ATTENTION = 'Needs attention'
}

export interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  videoUrl?: string;
}

export interface WorkoutDay {
  id: string;
  dayName: string; // e.g., "Monday" or "Day 1"
  exercises: Exercise[];
}

export interface FoodItem {
  id: string;
  name: string;
  amount: string;
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
}

export interface Meal {
  id: string;
  name: string; // e.g., "Breakfast"
  items: FoodItem[];
}

export interface Coach {
  id: string;
  email: string;
  name: string;
  password?: string; // Added for basic auth MVP
}

export interface Client {
  id: string;
  coachId: string;
  name: string;
  age: number;
  gender?: string;
  height?: string;
  weight?: string;
  goal: ClientGoal;
  location: string;
  injuries?: string;
  dietPreference?: string;
  status: ClientStatus;
  lastCheckInDate?: string;
  // We store a strong token for MVP. Consider storing only a hash in production.
  magicLinkToken: string;
}

export interface WorkoutPlan {
  clientId: string;
  coachId?: string;
  days: WorkoutDay[];
}

export interface DietPlan {
  clientId: string;
  coachId?: string;
  meals: Meal[];
}

export interface ProgressLog {
  id: string;
  clientId: string;
  coachId?: string;
  date: string;
  weight: string;
  waist?: string;
  chest?: string;
  biceps?: string;
  thighs?: string;
  calves?: string;
  feedback?: string;
  followedPlan: boolean;
  issues: string;
  photoUrl?: string;
}

export interface Note {
  id: string;
  clientId: string;
  coachId: string;
  content: string;
  createdAt: string;
}
