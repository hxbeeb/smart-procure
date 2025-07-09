import React, { useState } from 'react';
import { DepartmentGrid } from './rent/DepartmentGrid';
import { CategoryList } from './rent/CategoryList';
import { ProductList } from './rent/ProductList';
import { Building } from 'lucide-react';

function Rentals() {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleBack = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
    } else if (selectedDepartment) {
      setSelectedDepartment(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">GovRent Portal</h1>
            </div>
            {(selectedDepartment || selectedCategory) && (
              <button
                onClick={handleBack}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedDepartment ? (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Select Government Department
            </h2>
            <DepartmentGrid onSelectDepartment={setSelectedDepartment} />
          </>
        ) : !selectedCategory ? (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {selectedDepartment.name} Department Categories
            </h2>
            <CategoryList
              departmentId={selectedDepartment.id}
              onSelectCategory={setSelectedCategory}
            />
          </>
        ) : (
          <ProductList category={selectedCategory} />
        )}
      </main>
    </div>
  );
}

export default Rentals;