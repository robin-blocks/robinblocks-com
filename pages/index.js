import Head from 'next/head';
import EmailSignup from '../components/EmailSignup';

export default function Home() {
  return (
    <>
      <Head>
        <title>Join Robin Blocks - Stay Updated with the Latest Insights</title>
        <meta name="description" content="Subscribe to Robin Blocks mailing list for exclusive insights, updates, and valuable content delivered straight to your inbox." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Join Robin Blocks - Stay Updated with the Latest Insights" />
        <meta property="og:description" content="Subscribe to Robin Blocks mailing list for exclusive insights, updates, and valuable content delivered straight to your inbox." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Join Robin Blocks - Stay Updated with the Latest Insights" />
        <meta property="twitter:description" content="Subscribe to Robin Blocks mailing list for exclusive insights, updates, and valuable content delivered straight to your inbox." />
      </Head>

      <main className="min-h-screen gradient-bg flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Robin Blocks
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Get exclusive insights, updates, and valuable content delivered straight to your inbox. 
              Join our community of forward-thinking individuals.
            </p>
            
            {/* Feature highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 text-white/80">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Fresh Insights</h3>
                <p className="text-sm text-center">Weekly curated content and industry insights</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Exclusive Access</h3>
                <p className="text-sm text-center">Member-only content and early previews</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Community</h3>
                <p className="text-sm text-center">Connect with like-minded individuals</p>
              </div>
            </div>
          </div>

          {/* Signup Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Ready to get started?
            </h2>
            <p className="text-gray-600 mb-8">
              Join thousands of subscribers who never miss an update.
            </p>
            
            <EmailSignup />
          </div>

          {/* Footer */}
          <div className="mt-12 text-white/70 text-sm">
            <p>© {new Date().getFullYear()} Robin Blocks. Made with ❤️ for our community.</p>
          </div>
        </div>
      </main>
    </>
  );
}