import { useState } from 'react';
import { Alert, AlertTitle } from '@/components/ui/alert';

const DuplicateRemover = () => {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const removeDuplicates = async () => {
    try {
      setStatus('loading');
      setError(null);
      
      const response = await fetch('/api/characters/remove-duplicates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data);
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Character Duplicate Removal</h2>
        <button
          onClick={removeDuplicates}
          disabled={status === 'loading'}
          className={`px-4 py-2 rounded-lg text-white transition-colors ${
            status === 'loading'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {status === 'loading' ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Remove Duplicates'
          )}
        </button>
      </div>

      {status === 'error' && (
        <Alert variant="destructive">
          <AlertTitle>Error Removing Duplicates</AlertTitle>
          {error}
        </Alert>
      )}

      {status === 'success' && results && (
        <Alert className="bg-green-50 border-green-200">
          <AlertTitle className="text-green-800">
            Duplicate Removal Complete
          </AlertTitle>
          <div className="mt-2 text-green-700">
            {results.removedCount > 0 ? (
              <div className="space-y-2">
                <p>Successfully removed {results.removedCount} duplicate characters:</p>
                <ul className="list-disc pl-5">
                  {results.removedCharacters.map((char, index) => (
                    <li key={index}>
                      {char.name}: Removed {char.duplicatesRemoved} duplicate(s)
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No duplicates were found in the database.</p>
            )}
          </div>
        </Alert>
      )}

      {status === 'loading' && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700">
            Scanning and removing duplicate characters... This may take a moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default DuplicateRemover;