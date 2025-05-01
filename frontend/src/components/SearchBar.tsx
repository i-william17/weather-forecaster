'use client';

import { useState } from 'react';
import { Loader2, X } from 'lucide-react';

interface Props {
  onSearch: (city: string) => void;
  loading?: boolean;
}

export default function SearchBar({ onSearch, loading }: Props) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) onSearch(city);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full max-w-md mx-auto"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city..."
        className="text-black flex-1 px-4 py-2 rounded-xl shadow border focus:outline-none"
      />
      {city && (
        <button
          type="button"
          onClick={() => setCity('')}
          className="text-black hover:text-gray-800"
        >
          <X />
        </button>
      )}
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded-xl hover:bg-blue-600 flex items-center gap-1"
      >
        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : 'Search'}
      </button>
    </form>
  );
}
