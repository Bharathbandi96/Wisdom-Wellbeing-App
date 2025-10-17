import type { Resource, ResourceCategory, SortOption } from '../types/types';

export function filterResources(
  resources: Resource[],
  searchQuery: string,
  selectedCategory: ResourceCategory | 'All'
): Resource[] {
  return resources.filter((resource) => {
    const matchesCategory =
      selectedCategory === 'All' || resource.category === selectedCategory;

    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !searchLower ||
      resource.title.toLowerCase().includes(searchLower) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });
}

export function sortResources(
  resources: Resource[],
  sortOption: SortOption
): Resource[] {
  const sorted = [...resources];

  switch (sortOption) {
    case 'date-newest':
      return sorted.sort(
        (a, b) =>
          new Date(b.date_uploaded).getTime() - new Date(a.date_uploaded).getTime()
      );
    case 'date-oldest':
      return sorted.sort(
        (a, b) =>
          new Date(a.date_uploaded).getTime() - new Date(b.date_uploaded).getTime()
      );
    case 'category':
      return sorted.sort((a, b) => a.category.localeCompare(b.category));
    case 'duration-shortest':
      return sorted.sort((a, b) => a.duration - b.duration);
    case 'duration-longest':
      return sorted.sort((a, b) => b.duration - a.duration);
    default:
      return sorted;
  }
}

export function groupByCategory(resources: Resource[]): Map<ResourceCategory, Resource[]> {
  const grouped = new Map<ResourceCategory, Resource[]>();

  resources.forEach((resource) => {
    const category = resource.category;
    if (!grouped.has(category)) {
      grouped.set(category, []);
    }
    grouped.get(category)!.push(resource);
  });

  return grouped;
}
