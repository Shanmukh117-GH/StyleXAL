import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  CloudRain, 
  Sun, 
  Wind, 
  Thermometer, 
  Camera, 
  ShoppingBag, 
  ThumbsUp, 
  ThumbsDown,
  MapPin,
  Calendar,
  Sparkles,
  Search
} from 'lucide-react';

// Types
interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  description: string;
  rain: boolean;
}

interface OutfitItem {
  id: string;
  name: string;
  type: 'top' | 'bottom' | 'outer' | 'accessory' | 'shoes';
  season: 'spring' | 'summer' | 'fall' | 'winter' | 'all';
  fabric: string;
  style: 'casual' | 'formal' | 'sporty' | 'trendy';
  imageUrl: string;
  description: string;
}

interface Outfit {
  id: string;
  name: string;
  items: OutfitItem[];
  style: 'casual' | 'formal' | 'sporty' | 'trendy';
  tags: string[];
  reason?: string;
}

interface UserPreferences {
  stylePreference?: 'casual' | 'formal' | 'sporty' | 'trendy';
  likedOutfits: string[];
  dislikedOutfits: string[];
  likedItems: string[];
  dislikedItems: string[];
}

// Mock Data
const wardrobe: OutfitItem[] = [
  {
    id: 'casual-tee',
    name: 'Cotton T-Shirt',
    type: 'top',
    season: 'all',
    fabric: 'cotton',
    style: 'casual',
    imageUrl: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    description: 'Comfortable cotton t-shirt perfect for everyday wear'
  },
  {
    id: 'denim-jeans',
    name: 'Denim Jeans',
    type: 'bottom',
    season: 'all',
    fabric: 'denim',
    style: 'casual',
    imageUrl: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
    description: 'Classic blue denim jeans with a comfortable fit'
  },
  {
    id: 'dress-shirt',
    name: 'Dress Shirt',
    type: 'top',
    season: 'all',
    fabric: 'cotton',
    style: 'formal',
    imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
    description: 'Crisp white dress shirt ideal for professional settings'
  },
  {
    id: 'blazer',
    name: 'Navy Blazer',
    type: 'outer',
    season: 'all',
    fabric: 'wool',
    style: 'formal',
    imageUrl: 'https://images.pexels.com/photos/1038000/pexels-photo-1038000.jpeg',
    description: 'Sophisticated navy blazer for a polished look'
  },
  {
    id: 'rain-jacket',
    name: 'Rain Jacket',
    type: 'outer',
    season: 'all',
    fabric: 'waterproof',
    style: 'sporty',
    imageUrl: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    description: 'Waterproof jacket to keep you dry in wet weather'
  },
  {
    id: 'sneakers',
    name: 'White Sneakers',
    type: 'shoes',
    season: 'all',
    fabric: 'leather',
    style: 'casual',
    imageUrl: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg',
    description: 'Clean white sneakers for comfortable everyday wear'
  }
];

const sampleOutfits: Outfit[] = [
  {
    id: 'casual-weekend',
    name: 'Casual Weekend',
    items: [wardrobe[0], wardrobe[1], wardrobe[5]],
    style: 'casual',
    tags: ['comfortable', 'relaxed', 'everyday']
  },
  {
    id: 'business-professional',
    name: 'Business Professional',
    items: [wardrobe[2], wardrobe[3]],
    style: 'formal',
    tags: ['professional', 'elegant', 'sophisticated']
  },
  {
    id: 'active-sporty',
    name: 'Active & Sporty',
    items: [wardrobe[0], wardrobe[4], wardrobe[5]],
    style: 'sporty',
    tags: ['athletic', 'functional', 'dynamic']
  }
];

// Mock Weather Function
const getWeather = (city: string): WeatherData => {
  const mockWeather: { [key: string]: WeatherData } = {
    london: { temp: 15, humidity: 70, windSpeed: 10, description: 'Overcast with light rain', rain: true },
    dubai: { temp: 35, humidity: 45, windSpeed: 5, description: 'Sunny and hot', rain: false },
    newyork: { temp: 22, humidity: 55, windSpeed: 8, description: 'Partly cloudy', rain: false },
    tokyo: { temp: 18, humidity: 65, windSpeed: 12, description: 'Light rain showers', rain: true },
    paris: { temp: 20, humidity: 60, windSpeed: 7, description: 'Clear skies', rain: false }
  };
  
  return mockWeather[city.toLowerCase()] || { temp: 20, humidity: 50, windSpeed: 5, description: 'Mild and pleasant', rain: false };
};

// AI Outfit Recommendation Engine
const generateOutfitRecommendations = (weather: WeatherData, preferences: UserPreferences): Outfit[] => {
  const recommendations: Outfit[] = [];
  const { temp, rain, windSpeed } = weather;
  const style = preferences.stylePreference || 'casual';
  
  // Filter items based on preferences
  const availableItems = wardrobe.filter(item => 
    !preferences.dislikedItems.includes(item.id)
  );
  
  // Generate 3 recommendations
  for (let i = 0; i < 3; i++) {
    const outfit: Outfit = {
      id: recommendation-${i},
      name: Look ${i + 1},
      items: [],
      style,
      tags: [],
      reason: ''
    };
    
    // Pick top
    const tops = availableItems.filter(item => item.type === 'top');
    if (style === 'formal') {
      outfit.items.push(tops.find(t => t.style === 'formal') || tops[0]);
    } else {
      outfit.items.push(tops.find(t => t.style === style) || tops[0]);
    }
    
    // Pick bottom
    const bottoms = availableItems.filter(item => item.type === 'bottom');
    outfit.items.push(bottoms[0]);
    
    // Weather-based additions
    if (rain || temp < 15) {
      const outers = availableItems.filter(item => item.type === 'outer');
      if (rain) {
        outfit.items.push(outers.find(o => o.fabric === 'waterproof') || outers[0]);
      } else {
        outfit.items.push(outers.find(o => o.style === style) || outers[0]);
      }
    }
    
    // Add shoes
    const shoes = availableItems.filter(item => item.type === 'shoes');
    outfit.items.push(shoes[0]);
    
    // Generate reasoning
    outfit.reason = generateOutfitReason(outfit, weather, style);
    
    recommendations.push(outfit);
  }
  
  return recommendations;
};

const generateOutfitReason = (outfit: Outfit, weather: WeatherData, style: string): string => {
  const { temp, rain, description } = weather;
  const reasons = [];
  
  if (rain) {
    reasons.push("I've included a waterproof outer layer to keep you dry");
  }
  
  if (temp > 25) {
    reasons.push("The breathable cotton fabric will keep you cool in the heat");
  } else if (temp < 15) {
    reasons.push("Layered pieces will provide warmth in the cooler weather");
  }
  
  reasons.push(The ${style} style matches your personal preference);
  reasons.push(Perfect for today's ${description.toLowerCase()});
  
  return reasons.join(". ") + ".";
};

// Main App Component
function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCity, setSelectedCity] = useState('london');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    likedOutfits: [],
    dislikedOutfits: [],
    likedItems: [],
    dislikedItems: []
  });
  const [recommendations, setRecommendations] = useState<Outfit[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [tripDays, setTripDays] = useState(3);
  const [packingList, setPackingList] = useState<Outfit[]>([]);

  useEffect(() => {
    if (selectedCity) {
      setWeather(getWeather(selectedCity));
    }
  }, [selectedCity]);

  const handleStylePreference = (outfit: Outfit) => {
    setUserPreferences(prev => ({
      ...prev,
      stylePreference: outfit.style,
      likedOutfits: [...prev.likedOutfits, outfit.id]
    }));
    setCurrentStep(2);
  };

  const handleOutfitFeedback = (outfitId: string, liked: boolean) => {
    setUserPreferences(prev => ({
      ...prev,
      likedOutfits: liked 
        ? [...prev.likedOutfits, outfitId]
        : prev.likedOutfits.filter(id => id !== outfitId),
      dislikedOutfits: !liked
        ? [...prev.dislikedOutfits, outfitId]
        : prev.dislikedOutfits.filter(id => id !== outfitId)
    }));
  };

  const generateRecommendations = () => {
    if (weather && userPreferences.stylePreference) {
      const recs = generateOutfitRecommendations(weather, userPreferences);
      setRecommendations(recs);
      setCurrentStep(4);
    }
  };

  const generatePackingList = () => {
    if (weather && userPreferences.stylePreference) {
      const list = [];
      for (let i = 0; i < tripDays; i++) {
        const dayWeather = { ...weather, temp: weather.temp + Math.random() * 4 - 2 };
        const dayOutfits = generateOutfitRecommendations(dayWeather, userPreferences);
        list.push({ ...dayOutfits[0], name: Day ${i + 1} });
      }
      setPackingList(list);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getShopUrl = (outfit: Outfit) => {
    const query = outfit.items.map(item => item.name).join(' ');
    return https://www.google.com/search?q=${encodeURIComponent(query + ' fashion buy online')};
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🌦 StyleXAI
          </h1>
          <p className="text-xl text-slate-300">Your intelligent style companion for any weather</p>
        </div>

        {/* Step 1: AI Style Matcher */}
        <div className="mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center mb-6">
              <Sparkles className="w-6 h-6 text-purple-400 mr-3" />
              <h2 className="text-2xl font-semibold">Step 1: AI Style Matcher</h2>
            </div>
            
            {currentStep === 1 && (
              <div>
                <p className="text-slate-300 mb-6">Choose an outfit you love to help our AI understand your style:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sampleOutfits.map((outfit) => (
                    <div key={outfit.id} className="bg-slate-700/50 rounded-xl p-4 border border-slate-600 hover:border-purple-400 transition-all duration-300">
                      <h3 className="text-lg font-semibold mb-3 text-purple-300">{outfit.name}</h3>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {outfit.items.slice(0, 4).map((item) => (
                          <img
                            key={item.id}
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {outfit.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => handleStylePreference(outfit)}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <Heart className="w-4 h-4" />
                        I Love This Style
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {currentStep > 1 && userPreferences.stylePreference && (
              <div className="text-green-400 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>Style preference learned: {userPreferences.stylePreference}</span>
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Weather & Preferences */}
        {currentStep >= 2 && (
          <div className="mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center mb-6">
                <CloudRain className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="text-2xl font-semibold">Step 2: Get Weather & Preferences</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Your City</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
                  >
                    <option value="london">London</option>
                    <option value="dubai">Dubai</option>
                    <option value="newyork">New York</option>
                    <option value="tokyo">Tokyo</option>
                    <option value="paris">Paris</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Trip Duration (days)</label>
                  <input
                    type="number"
                    value={tripDays}
                    onChange={(e) => setTripDays(parseInt(e.target.value))}
                    min="1"
                    max="14"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              {weather && (
                <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-4 mb-3">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold capitalize">{selectedCity} Weather</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-red-400" />
                      <span>{weather.temp}°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-blue-400" />
                      <span>{weather.windSpeed} km/h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CloudRain className="w-4 h-4 text-blue-400" />
                      <span>{weather.humidity}% humidity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {weather.rain ? <CloudRain className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-yellow-400" />}
                      <span>{weather.description}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-4">
                <button
                  onClick={generateRecommendations}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Get Outfit Recommendations
                </button>
                <button
                  onClick={generatePackingList}
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Packing Assistant
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Upload Selfie & Try-On */}
        {currentStep >= 3 && (
          <div className="mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center mb-6">
                <Camera className="w-6 h-6 text-pink-400 mr-3" />
                <h2 className="text-2xl font-semibold">Step 3: Upload a Selfie & Try-On</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white hover:file:bg-purple-600"
                  />
                  {uploadedImage && (
                    <div className="mt-4">
                      <img
                        src={uploadedImage}
                        alt="Uploaded selfie"
                        className="w-full h-64 object-cover rounded-lg border border-slate-600"
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <p className="text-slate-300 mb-4">
                    Upload your photo to see how the recommended outfits would look on you using our virtual try-on technology.
                  </p>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Virtual Try-On Features:</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>• AI-powered outfit overlay</li>
                      <li>• Real-time style matching</li>
                      <li>• Color coordination analysis</li>
                      <li>• Fit prediction technology</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: AI Recommendations */}
        {currentStep >= 4 && recommendations.length > 0 && (
          <div className="mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center mb-6">
                <Sparkles className="w-6 h-6 text-yellow-400 mr-3" />
                <h2 className="text-2xl font-semibold">Step 4: AI-Powered Recommendations</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {recommendations.map((outfit, index) => (
                  <div key={outfit.id} className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                    <h3 className="text-lg font-semibold mb-3 text-yellow-300">{outfit.name}</h3>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {outfit.items.map((item) => (
                        <div key={item.id} className="relative">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-xs p-1 rounded-b-lg">
                            {item.name}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2 text-purple-300">AI Insights:</h4>
                      <p className="text-xs text-slate-300">{outfit.reason}</p>
                    </div>

                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => handleOutfitFeedback(outfit.id, true)}
                        className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-300 py-1 px-2 rounded-lg text-sm transition-all duration-300 flex items-center justify-center gap-1"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        Love It
                      </button>
                      <button
                        onClick={() => handleOutfitFeedback(outfit.id, false)}
                        className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 py-1 px-2 rounded-lg text-sm transition-all duration-300 flex items-center justify-center gap-1"
                      >
                        <ThumbsDown className="w-3 h-3" />
                        Not My Style
                      </button>
                    </div>

                    <a
                      href={getShopUrl(outfit)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-center py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      Shop Similar Look
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Packing Assistant */}
        {packingList.length > 0 && (
          <div className="mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center mb-6">
                <ShoppingBag className="w-6 h-6 text-green-400 mr-3" />
                <h2 className="text-2xl font-semibold">Packing Assistant - {tripDays} Day Trip</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {packingList.map((outfit, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                    <h3 className="text-lg font-semibold mb-3 text-green-300">{outfit.name}</h3>
                    <div className="space-y-2">
                      {outfit.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 text-sm">
                          <div className="w-8 h-8 bg-slate-600 rounded-lg flex-shrink-0"></div>
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
