export interface ChatMessage {
  type: 'user' | 'bot';
  message: string;
}

export interface Project {
  id?: string;
  name: string;
  description: string;
  img: string;
  data: string;
  order: number;
  items?: any[];
}

export interface WorkExperience {
  order: number;
  name: string;
  data: string;
  description: string;
  full_description: string;
  img: string;
  items: { name: string; img: string; }[];
}

export interface Education {
  order: number;
  name: string;
  date: string;
  description: string;
  full_description: string;
  icon: string;
  img: string;
  items: { name: string; number: number; }[];
}

export interface Skill {
  id?: string;
  name: string;
  img: string;
  late?: number;
}

export interface Question {
  question: string;
  answer: string;
}

export interface Info {
  title: string;
  content: string;
}