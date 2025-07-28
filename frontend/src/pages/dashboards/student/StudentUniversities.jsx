import { useState, useEffect } from "react";

const StudentUniversities = () => {
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    country: "all",
    ranking: "all",
    tuition: "all"
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    setUniversities([
      {
        id: 1,
        name: "Stanford University",
        country: "USA",
        ranking: 2,
        tuition: "$55,473",
        programs: ["MS Computer Science", "MS AI", "MS Data Science"],
        description: "Leading research university in Silicon Valley",
        image: "https://via.placeholder.com/300x200",
        saved: true
      },
      {
        id: 2,
        name: "MIT",
        country: "USA", 
        ranking: 1,
        tuition: "$53,790",
        programs: ["MS Computer Science", "MS AI", "MS Robotics"],
        description: "Premier technology institute",
        image: "https://via.placeholder.com/300x200",
        saved: false
      },
      {
        id: 3,
        name: "University of Cambridge",
        country: "UK",
        ranking: 3,
        tuition: "£33,972",
        programs: ["MPhil Computer Science", "MPhil AI"],
        description: "Historic university with cutting-edge research",
        image: "https://via.placeholder.com/300x200",
        saved: true
      },
      {
        id: 4,
        name: "ETH Zurich",
        country: "Switzerland",
        ranking: 8,
        tuition: "CHF 1,460",
        programs: ["MS Computer Science", "MS Data Science"],
        description: "Top European technical university",
        image: "https://via.placeholder.com/300x200",
        saved: false
      }
    ]);
  }, []);

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.programs.some(program => program.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCountry = filters.country === "all" || uni.country === filters.country;
    const matchesRanking = filters.ranking === "all" || 
                          (filters.ranking === "top10" && uni.ranking <= 10) ||
                          (filters.ranking === "top50" && uni.ranking <= 50);
    
    return matchesSearch && matchesCountry && matchesRanking;
  });

  const toggleSave = (id) => {
    setUniversities(prev => prev.map(uni => 
      uni.id === id ? { ...uni, saved: !uni.saved } : uni
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Explore Universities</h1>
        <p className="text-gray-600">Discover and save universities for your applications</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Search universities, countries, or programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                value={filters.country}
                onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Countries</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Germany">Germany</option>
                <option value="Switzerland">Switzerland</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ranking</label>
              <select
                value={filters.ranking}
                onChange={(e) => setFilters(prev => ({ ...prev, ranking: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Rankings</option>
                <option value="top10">Top 10</option>
                <option value="top50">Top 50</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tuition</label>
              <select
                value={filters.tuition}
                onChange={(e) => setFilters(prev => ({ ...prev, tuition: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Ranges</option>
                <option value="low">Under $30,000</option>
                <option value="medium">$30,000 - $60,000</option>
                <option value="high">Above $60,000</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredUniversities.length} of {universities.length} universities
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Ranking</option>
            <option>Name</option>
            <option>Tuition</option>
          </select>
        </div>
      </div>

      {/* Universities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map((uni) => (
          <div key={uni.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={uni.image} 
              alt={uni.name}
              className="w-full h-48 object-cover"
            />
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{uni.name}</h3>
                  <p className="text-sm text-gray-600">{uni.country}</p>
                </div>
                <button
                  onClick={() => toggleSave(uni.id)}
                  className={`p-2 rounded-full transition-colors ${
                    uni.saved 
                      ? "text-red-600 hover:text-red-700" 
                      : "text-gray-400 hover:text-red-600"
                  }`}
                >
                  <svg className="w-5 h-5" fill={uni.saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                  Rank #{uni.ranking}
                </span>
                <span className="text-sm font-medium text-gray-900">{uni.tuition}</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{uni.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Programs:</h4>
                <div className="flex flex-wrap gap-1">
                  {uni.programs.slice(0, 2).map((program, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {program}
                    </span>
                  ))}
                  {uni.programs.length > 2 && (
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      +{uni.programs.length - 2} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                  View Details
                </button>
                <button className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors">
                  Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUniversities.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No universities found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StudentUniversities;
