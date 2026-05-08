// components/FiltersBar/FiltersBar.jsx
import React from 'react';

export const FiltersBar = ({ configs, values, onChange }) => {

  return (
    <div className="row-filter-">
      {configs.map((filter) => (
        <div key={filter.key} className="flex flex-col mr-4">
          <label className="text-sm font-medium mb-1">{filter.label}</label>
          
          {filter.type === 'text' && (
            <input
              type="text"
              value={values[filter.key] || ''}
              onChange={(e) => onChange(filter.key, e.target.value)}
              className="border rounded px-2 py-1"
            />
          )}

          {filter.type === 'select' && (
            <select
              value={values[filter.key] || ''}
              onChange={(e) => onChange(filter.key, e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="">Todos</option>
              {filter.options?.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
};