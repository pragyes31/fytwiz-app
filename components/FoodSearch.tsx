import React, { useState, useRef, useEffect } from 'react';
import { foodDatabase, FoodDBItem } from '../foodDatabase';
import { Search, X } from 'lucide-react';

interface FoodSearchProps {
  value: string;
  onChange: (name: string) => void;
  onSelect: (item: FoodDBItem) => void;
  placeholder?: string;
}

const categoryColors: Record<string, string> = {
  'protein': 'bg-red-50 text-red-600',
  'carbs': 'bg-amber-50 text-amber-600',
  'dairy': 'bg-blue-50 text-blue-600',
  'fruits': 'bg-green-50 text-green-600',
  'vegetables': 'bg-emerald-50 text-emerald-600',
  'nuts-seeds': 'bg-orange-50 text-orange-600',
  'oils-fats': 'bg-yellow-50 text-yellow-700',
  'snacks': 'bg-pink-50 text-pink-600',
  'beverages': 'bg-cyan-50 text-cyan-600',
  'supplements': 'bg-purple-50 text-purple-600',
};

const categoryLabels: Record<string, string> = {
  'protein': 'Protein',
  'carbs': 'Carbs',
  'dairy': 'Dairy',
  'fruits': 'Fruit',
  'vegetables': 'Veg',
  'nuts-seeds': 'Nuts',
  'oils-fats': 'Oil/Fat',
  'snacks': 'Snack',
  'beverages': 'Drink',
  'supplements': 'Supp',
};

export const FoodSearch: React.FC<FoodSearchProps> = ({ value, onChange, onSelect, placeholder = 'Search food...' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<FoodDBItem[]>([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    onChange(query);
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const lower = query.toLowerCase();
    const matches = foodDatabase.filter(item =>
      item.name.toLowerCase().includes(lower)
    ).slice(0, 8);
    setResults(matches);
    setIsOpen(matches.length > 0);
    setHighlightIndex(-1);
  };

  const handleSelect = (item: FoodDBItem) => {
    onChange(item.name);
    onSelect(item);
    setIsOpen(false);
    setResults([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && highlightIndex >= 0) {
      e.preventDefault();
      handleSelect(results[highlightIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    onChange('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
        <input
          ref={inputRef}
          placeholder={placeholder}
          className="w-full pl-9 pr-8 p-2 bg-white rounded-lg text-sm font-bold outline-none border border-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={value}
          onChange={e => handleSearch(e.target.value)}
          onFocus={() => { if (results.length > 0) setIsOpen(true); }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        {value && (
          <button onClick={handleClear} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
            <X size={14} />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-slate-100 rounded-xl shadow-lg overflow-hidden max-h-64 overflow-y-auto">
          {results.map((item, idx) => (
            <button
              key={item.id}
              className={`w-full text-left px-3 py-2.5 flex items-center justify-between gap-2 transition-colors ${
                idx === highlightIndex ? 'bg-blue-50' : 'hover:bg-slate-50'
              } ${idx !== results.length - 1 ? 'border-b border-slate-50' : ''}`}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setHighlightIndex(idx)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">{item.name}</p>
                <p className="text-[10px] text-slate-400 font-medium">
                  {item.caloriesPer100g} kcal · {item.proteinPer100g}P · {item.carbsPer100g}C · {item.fatsPer100g}F
                  {item.commonServing ? ` · ${item.commonServing}` : ''}
                </p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shrink-0 ${categoryColors[item.category] || 'bg-slate-50 text-slate-500'}`}>
                {categoryLabels[item.category] || item.category}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodSearch;
