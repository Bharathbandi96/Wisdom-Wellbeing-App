import { X, Clock, Calendar, Tag } from 'lucide-react';
import type { ResourceModalProps } from '../types/types';

export function ResourceModal({ resource, onClose }: ResourceModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slideUp"
      >
        <div className="relative h-72 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
          <img
            src={resource.thumbnail}
            alt={resource.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-slate-700" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <span className="inline-block px-3 py-1 bg-teal-500 text-white text-sm font-medium rounded-full mb-3">
              {resource.category}
            </span>
            <h2 className="text-3xl font-bold text-white">{resource.title}</h2>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2 text-slate-600">
              <Clock className="w-5 h-5 text-teal-600" />
              <span className="font-medium">{resource.duration} minutes</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-5 h-5 text-teal-600" />
              <span className="font-medium">{formatDate(resource.date_uploaded)}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-5 h-5 text-slate-600" />
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-teal-50 text-teal-700 text-sm font-medium rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">
              Description
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              {resource.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
