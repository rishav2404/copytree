
import React from 'react';
import { UrlProcessor } from './components/UrlProcessor';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">URL Transformer</h1>
          </div>
          <div className="hidden sm:flex space-x-4 text-sm font-medium text-slate-500">
            <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600">v1.0.0</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              One-Click URL Processor
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Instantly transform <code className="bg-slate-200 px-1 rounded text-slate-800 text-sm">/archive/</code> URLs 
              to <code className="bg-slate-200 px-1 rounded text-slate-800 text-sm">/tree/</code> views and remove 
              <code className="bg-slate-200 px-1 rounded text-slate-800 text-sm">.tar.gz</code> extensions.
            </p>
          </div>

          <UrlProcessor />

          {/* Guidelines Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-600">
            <div className="p-4">
              <h4 className="font-bold text-slate-800 mb-2">Automated Paste</h4>
              <p className="text-sm">Click "Paste & Process" to grab the URL directly from your clipboard and start transforming immediately.</p>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-slate-800 mb-2">Logic Applied</h4>
              <p className="text-sm">We replace the path segment and trim archive extensions for a cleaner navigation URL.</p>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-slate-800 mb-2">Instant Copy</h4>
              <p className="text-sm">The result is automatically copied back to your clipboard, ready for use elsewhere.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-slate-400 text-sm">
            Web Utility &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
