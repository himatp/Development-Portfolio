export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  features: string[];
  image: string;
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  timeline?: string;
  role?: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  technologies: string[];
  icon: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string[];
}

export interface HighlightItem {
  id: string;
  title: string;
  description: string;
  badge: string;
}

export interface ServiceRate {
  id: string;
  title: string;
  price: string;
  unit?: string;
  popular?: boolean;
  description: string;
  highlights: string[];
  exclusions?: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface StatItem {
  value: string;
  label: string;
}
