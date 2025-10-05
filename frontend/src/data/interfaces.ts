export interface PortfolioItem {
  order?: number;
  name: string;
  date?: string;
  data?: string;
  description: string;
  full_description?: string;
  icon?: string;
  img?: string;
  items?: Array<{
    name: string;
    img?: string;
    number?: number;
  }>;
}

export interface Question {
  question: string;
  answer: string;
}

export interface ContactInfo {
  title: string;
  content: string;
}

export interface TechSkill {
  name: string;
  icon?: string;
  img?: string;
  late?: number;
}