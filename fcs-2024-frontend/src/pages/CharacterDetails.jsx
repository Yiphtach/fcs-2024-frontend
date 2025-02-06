import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CharacterDetails = ({ character }) => {
  const {
    name,
    imageUrl,
    universe,
    stats,
    totalFights,
    wins,
    losses
  } = character;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {name} - Character Details
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Character Image */}
          <div className="flex justify-center">
            <img 
              src={imageUrl} 
              alt={name}
              className="w-48 h-48 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Basic Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
            <p className="text-gray-700">
              <span className="font-medium">Universe:</span> {universe}
            </p>
          </div>

          {/* Character Stats */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(stats).map(([stat, value]) => (
                <div key={stat} className="flex justify-between items-center">
                  <span className="font-medium capitalize">{stat}:</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${(value / 100) * 100}%` }}
                      />
                    </div>
                    <span>{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fight Statistics */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Fight Record</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white p-3 rounded-lg shadow">
                <p className="text-gray-600">Total Fights</p>
                <p className="text-2xl font-bold">{totalFights}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg shadow">
                <p className="text-green-600">Wins</p>
                <p className="text-2xl font-bold text-green-700">{wins}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg shadow">
                <p className="text-red-600">Losses</p>
                <p className="text-2xl font-bold text-red-700">{losses}</p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <a
              href="/leaderboards"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Back to Leaderboard
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CharacterDetails;