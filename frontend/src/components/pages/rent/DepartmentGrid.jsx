import React from 'react';
import { Building2, Users, Briefcase, Scale, Stethoscope, GraduationCap, Shield, Plane } from 'lucide-react';

const departments = [
  { id: 1, name: 'Defense', icon: Shield, color: 'bg-blue-100 hover:bg-blue-200' },
  { id: 2, name: 'Healthcare', icon: Stethoscope, color: 'bg-green-100 hover:bg-green-200' },
  { id: 3, name: 'Education', icon: GraduationCap, color: 'bg-yellow-100 hover:bg-yellow-200' },
  { id: 4, name: 'Transportation', icon: Plane, color: 'bg-purple-100 hover:bg-purple-200' },
  { id: 5, name: 'Administration', icon: Building2, color: 'bg-red-100 hover:bg-red-200' },
  { id: 6, name: 'Justice', icon: Scale, color: 'bg-indigo-100 hover:bg-indigo-200' },
  { id: 7, name: 'Social Services', icon: Users, color: 'bg-pink-100 hover:bg-pink-200' },
  { id: 8, name: 'Commerce', icon: Briefcase, color: 'bg-orange-100 hover:bg-orange-200' },
];

export function DepartmentGrid({ onSelectDepartment }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {departments.map((dept) => (
        <button
          key={dept.id}
          onClick={() => onSelectDepartment(dept)}
          className={`${dept.color} p-6 rounded-xl shadow-sm transition-all duration-300 transform hover:scale-105 flex flex-col items-center space-y-4`}
        >
          <dept.icon className="w-12 h-12" />
          <span className="font-semibold text-gray-800">{dept.name}</span>
        </button>
      ))}
    </div>
  );
}