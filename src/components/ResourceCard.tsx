import { Clock } from 'lucide-react';
import type { ResourceCardProps } from '../types/types';

export function ResourceCard({ resource, onClick }: ResourceCardProps) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
          <Clock className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">{resource.duration} min</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
          {resource.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-3">
          {resource.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-sm text-slate-600 line-clamp-2">
          {resource.description}
        </p>
      </div>
    </article>
  );
}
