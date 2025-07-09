import React from 'react';

const categories = {
  1: [ // Defense
    { id: 1, name: 'Vehicles', items: ['Transport Vehicles', 'Specialized Military Vehicles', 'Surveillance Drones', 'Armored Vehicles', 'Combat Aircrafts'] },
    { id: 2, name: 'Technology', items: ['Surveillance Equipment', 'Communication Devices', 'Security Systems', 'Cyber Defense', 'Signal Jamming Equipment'] },
    { id: 3, name: 'Infrastructure', items: ['Temporary Structures', 'Power Generation Systems', 'Storage Facilities', 'Field Hospitals', 'Satellite Equipment'] },
    { id: 4, name: 'Weaponry', items: ['Missiles', 'Rifles', 'Explosives', 'Anti-Tank Weaponry'] },
    { id: 5, name: 'Logistics', items: ['Ammunition', 'Transport Aircraft', 'Shipping Containers', 'Fuel Management'] },
  ],
  2: [ // Healthcare
    { id: 6, name: 'Medical Equipment', items: ['Diagnostic Machines', 'Patient Monitoring', 'Laboratory Equipment', 'Portable X-rays', 'Medical Imaging Systems'] },
    { id: 7, name: 'Emergency Response', items: ['Mobile Units', 'Field Hospitals', 'Ambulances', 'Helicopter Rescue', 'Mobile Blood Banks'] },
    { id: 8, name: 'Support Infrastructure', items: ['Medical Storage', 'Waste Management', 'Sterilization Units', 'Quarantine Facilities', 'Vaccine Storage'] },
    { id: 9, name: 'Public Health', items: ['Vaccination Kits', 'Disease Testing Kits', 'Personal Protective Equipment (PPE)', 'Epidemic Control Supplies'] },
    { id: 10, name: 'Pharmaceuticals', items: ['Medications', 'Over-the-Counter Drugs', 'Antibiotics', 'Antivirals', 'Emergency Stockpiles'] },
  ],
  3: [ // Education
    { id: 11, name: 'Educational Materials', items: ['Textbooks', 'Digital Learning Platforms', 'E-Learning Tools', 'Smart Boards', 'Student Kits'] },
    { id: 12, name: 'Infrastructure', items: ['School Buildings', 'Classroom Furniture', 'Library Supplies', 'Playground Equipment'] },
    { id: 13, name: 'Technology', items: ['Computers', 'Laptops', 'Projectors', 'Server Infrastructure', 'Learning Management Systems'] },
    { id: 14, name: 'Teacher Training', items: ['Workshops', 'Online Training Courses', 'Teacher Support Materials'] },
    { id: 15, name: 'Scholarships and Grants', items: ['Student Loans', 'Merit-based Scholarships', 'Research Grants', 'Educational Endowments'] },
  ],
  4: [ // Transportation
    { id: 16, name: 'Land Vehicles', items: ['Buses', 'Trucks', 'Electric Cars', 'Bicycles', 'Rail Coaches'] },
    { id: 17, name: 'Aviation', items: ['Passenger Aircraft', 'Cargo Drones', 'Airport Equipment', 'Helicopters', 'Aviation Maintenance'] },
    { id: 18, name: 'Maritime', items: ['Cargo Ships', 'Submarines', 'Coastal Patrol Boats', 'Navigation Equipment', 'Dockyard Tools'] },
    { id: 19, name: 'Railways', items: ['High-Speed Trains', 'Subway Systems', 'Railway Tracks', 'Signal Systems', 'Train Stations'] },
    { id: 20, name: 'Urban Mobility', items: ['Electric Scooters', 'Car Sharing', 'Pedestrian Infrastructure', 'Traffic Control Systems'] },
  ],
  5: [ // Administration
    { id: 21, name: 'Government Offices', items: ['Building Materials', 'Office Furniture', 'Server Rooms', 'Security Systems', 'Document Storage'] },
    { id: 22, name: 'IT Infrastructure', items: ['Data Centers', 'Government Software', 'Cloud Hosting Services', 'Data Protection Tools', 'Networking'] },
    { id: 23, name: 'Human Resources', items: ['Recruitment Services', 'Employee Training', 'Employee Benefits Management', 'HR Software'] },
    { id: 24, name: 'Legal Services', items: ['Legal Software', 'Court Filing Systems', 'Case Management Tools', 'Public Records Management'] },
    { id: 25, name: 'Public Relations', items: ['Event Management', 'Media Partnerships', 'Public Service Announcements'] },
  ],
  6: [ // Justice
    { id: 26, name: 'Court Infrastructure', items: ['Courtrooms', 'Judicial Furniture', 'Security Systems', 'Court Recording Equipment'] },
    { id: 27, name: 'Legal Materials', items: ['Legal Textbooks', 'Law Journals', 'Legal Research Tools'] },
    { id: 28, name: 'Judicial Tools', items: ['Case Management Systems', 'Court Filing Systems', 'Public Access Portals'] },
    { id: 29, name: 'Crime Prevention', items: ['Surveillance Cameras', 'Patrol Cars', 'Body Cameras', 'Crime Reporting Tools'] },
    { id: 30, name: 'Rehabilitation', items: ['Prison Infrastructure', 'Rehabilitation Programs', 'Counseling Services', 'Reform Projects'] },
  ],
  7: [ // Social Services
    { id: 31, name: 'Welfare Programs', items: ['Disability Benefits', 'Child Welfare', 'Elderly Care Programs'] },
    { id: 32, name: 'Housing', items: ['Affordable Housing Projects', 'Emergency Shelters', 'Temporary Housing'] },
    { id: 33, name: 'Food Assistance', items: ['Food Banks', 'Meal Distribution', 'Nutritional Programs'] },
    { id: 34, name: 'Employment', items: ['Job Training Programs', 'Career Counseling', 'Employment Agencies'] },
    { id: 35, name: 'Mental Health', items: ['Counseling Services', 'Support Groups', 'Psychological Assessments'] },
  ],
  8: [ // Commerce
    { id: 36, name: 'Business Services', items: ['Corporate Tax Filing', 'Business Licenses', 'Incentive Programs'] },
    { id: 37, name: 'Supply Chain', items: ['Logistics Solutions', 'Inventory Management', 'Warehousing Services'] },
    { id: 38, name: 'E-Commerce', items: ['Online Marketplaces', 'Payment Gateways', 'Digital Marketing Solutions'] },
    { id: 39, name: 'Exports & Imports', items: ['Customs Services', 'International Trade Agreements', 'Freight Forwarding'] },
    { id: 40, name: 'Banking', items: ['Payment Processing Systems', 'Cryptocurrency Services', 'Digital Banking Platforms'] },
  ],
  9: [ // Environment
    { id: 41, name: 'Conservation', items: ['Wildlife Protection', 'Marine Conservation', 'Reforestation Projects'] },
    { id: 42, name: 'Waste Management', items: ['Recycling Plants', 'Waste Collection Vehicles', 'Composting Units'] },
    { id: 43, name: 'Renewable Energy', items: ['Solar Panels', 'Wind Turbines', 'Hydroelectric Systems', 'Geothermal Energy'] },
    { id: 44, name: 'Pollution Control', items: ['Air Purification Systems', 'Water Treatment Plants', 'Noise Control Systems'] },
    { id: 45, name: 'Sustainability', items: ['Eco-friendly Packaging', 'Green Building Materials', 'Carbon Offset Programs'] },
  ],
};

export function CategoryList({ departmentId, onSelectCategory }) {
  const departmentCategories = categories[departmentId] || [];

  return (
    <div className="space-y-4">
      {departmentCategories.map((category) => (
        <div
          key={category.id}
          onClick={() => onSelectCategory(category)}
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-800"
          tabIndex={0}
          role="button"
          aria-pressed="false"
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { onSelectCategory(category); } }}
        >
          <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {category.items.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-blue-100 focus:bg-blue-200 transition-colors"
                tabIndex={0}
                aria-label={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
