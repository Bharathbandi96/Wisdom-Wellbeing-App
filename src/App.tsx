import { useState, useMemo } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { useResources } from './hooks/useResources';
import { ResourceCard } from './components/ResourceCard';
import { FilterBar } from './components/FilterBar';
import { filterResources, sortResources, groupByCategory } from './utils/resourceFilters';
import type { ResourceCategory, SortOption } from './types/resource';

const CATEGORIES: (ResourceCategory | 'All')[] = [
  'All',
  'Podcasts',
  'Articles',
  'Newsletters',
  'Recipes',
  'Fitness',
  'Meditation',
];

function App() {
  const { resources, loading, error } = useResources();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'All'>('All');
  const [sortOption, setSortOption] = useState<SortOption>('date-newest');

  const filteredAndSortedResources = useMemo(() => {
    const filtered = filterResources(resources, searchQuery, selectedCategory);
    return sortResources(filtered, sortOption);
  }, [resources, searchQuery, selectedCategory, sortOption]);

  const groupedResources = useMemo(() => {
    return groupByCategory(filteredAndSortedResources);
  }, [filteredAndSortedResources]);

  const shouldGroupByCategory = selectedCategory === 'All' && !searchQuery;
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Loading resources...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md">
          <p className="text-red-800 font-medium">Error loading resources</p>
          <p className="text-red-600 text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-2 rounded-xl shadow-md">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Wisdom Wellbeing
              </h1>
              <p className="text-slate-600 text-sm">Resource Centre</p>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortOption={sortOption}
          onSortChange={setSortOption}
          categories={CATEGORIES}
        />

        {filteredAndSortedResources.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-sm p-12">
              <p className="text-slate-600 text-lg">No resources found matching your criteria</p>
              <p className="text-slate-500 text-sm mt-2">Try adjusting your filters or search query</p>
            </div>
          </div>
        ) : shouldGroupByCategory ? (
          <div className="space-y-12">
            {Array.from(groupedResources.entries()).map(([category, categoryResources]) => (
              <section key={category}>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">{category}</h2>
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 text-sm font-medium rounded-full">
                    {categoryResources.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {selectedCategory === 'All' ? 'All Resources' : selectedCategory}
              </h2>
              <span className="px-3 py-1 bg-teal-100 text-teal-700 text-sm font-medium rounded-full">
                {filteredAndSortedResources.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                />
              ))}
            </div>
          </div>
        )}
      </main>
      <footer className="bg-white/80 backdrop-blur-sm mt-16 py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-600 text-sm">
            Your healthy advantage
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App;
