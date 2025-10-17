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


export interface ResourceModalProps {
  resource: Resource;
  onClose: () => void;
}

export interface ResourceCardProps {
  resource: Resource;
  onClick: () => void;
}

export interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ResourceCategory | 'All';
  onCategoryChange: (category: ResourceCategory | 'All') => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  categories: (ResourceCategory | 'All')[];
}