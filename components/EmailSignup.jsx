import { useState } from 'react';
import { useEmailSubscription } from '../hooks/useEmailSubscription';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const { subscribe, loading, success, error, reset } = useEmailSubscription();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      await subscribe(email, firstName);
    }
  };

  const handleTryAgain = () => {
    reset();
    setEmail('');
    setFirstName('');
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-2">Welcome aboard! 🎉</h3>
          <p className="text-green-700 mb-6">
            Thank you for joining the Robin Blocks mailing list. You'll receive exciting updates and insights straight to your inbox.
          </p>
          <button
            onClick={handleTryAgain}
            className="text-green-600 hover:text-green-700 font-medium underline"
          >
            Sign up another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-input"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !email}
          className="btn-primary"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Subscribing...
            </span>
          ) : (
            'Join Robin Blocks'
          )}
        </button>
      </form>
      
      <p className="text-center text-sm text-gray-500 mt-4">
        By subscribing, you agree to receive emails from Robin Blocks. You can unsubscribe at any time.
      </p>
    </div>
  );
}