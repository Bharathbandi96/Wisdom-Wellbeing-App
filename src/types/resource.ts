export type ResourceCategory =
  | 'Podcasts'
  | 'Articles'
  | 'Newsletters'
  | 'Recipes'
  | 'Fitness'
  | 'Meditation';

export interface Resource {
  id: string;
  category: ResourceCategory;
  title: string;
  thumbnail: string;
  tags: string[];
  duration: number;
  description: string;
  date_uploaded: string;
  created_at?: string;
}

export type SortOption = 'date-newest' | 'date-oldest' | 'category' | 'duration-shortest' | 'duration-longest';
