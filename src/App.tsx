import { Heart } from 'lucide-react';
import { ResourceCard } from './components/ResourceCard'
import { mockResources } from './data/mockResources';

function App() {

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
      <div className="space-y-12">
        {mockResources.map((item) => (
          <section key={item.category}>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-slate-900">{item.category}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard
                key={item.id}
                resource={item}
              />
            </div>
          </section>
        ))}
      </div>
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
