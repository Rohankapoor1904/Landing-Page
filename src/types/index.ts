export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  version?: string;
  baseVersion?: string;
  status: string;
  description: string;
  architectureHighlights: string[];
  keyFeatures: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  githubUrl?: string;
  releaseUrl?: string;
  liveUrl?: string;
  accentColor: string; // Hex color for accenting
  glowColor: string;
  iconName: string;
}

export interface ServiceOffering {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  tags: string[];
  deliverables: string[];
  highlightMetric: string;
  accentColor: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  telegramUsername: string;
  serviceCategory: string;
  projectBudget: string;
  timeline: string;
  preferredDate: string;
  preferredTime: string;
  projectBrief: string;
}

