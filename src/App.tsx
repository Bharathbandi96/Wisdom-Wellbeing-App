import { ResourceCard } from './components/ResourceCard'
import { mockResources } from './data/mockResources';

function App() {

  return <div className="space-y-12">
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
}

export default App;
