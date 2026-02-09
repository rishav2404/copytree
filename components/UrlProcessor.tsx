
import React, { useState, useCallback } from 'react';
import { transformUrl, isValidUrl } from '../utils/urlUtils';
import { TransformationResult, StatusType } from '../types';
import { Toast } from './Toast';

export const UrlProcessor: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<TransformationResult[]>([]);
  const [status, setStatus] = useState<StatusType>(StatusType.IDLE);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const msDownloadUrl =
    'https://computricals-my.sharepoint.com/:f:/g/personal/gnanapragasam_grok-digital_com/IgDQIDvd8NYBR6kdntIDXJ0TAQWpqeDz_rz5fQPwAlHwoHk?e=3bkxDu';

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const openProcessedLink = (url: string) => {
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) {
      showToast('Popup blocked. Allow popups to open the processed link.', 'error');
    }
  };

  const openMsDownload = () => {
    const opened = window.open(msDownloadUrl, '_blank', 'noopener,noreferrer');
    if (!opened) {
      showToast('Popup blocked. Allow popups to open the MS download link.', 'error');
    }
  };

  const handleProcess = useCallback(async (text: string) => {
    if (!text || !isValidUrl(text)) {
      showToast('Please provide a valid URL', 'error');
      setStatus(StatusType.ERROR);
      return;
    }

    setStatus(StatusType.PROCESSING);
    
    try {
      const processed = transformUrl(text);
      setResult(processed);
      
      // Copy to clipboard automatically
      await navigator.clipboard.writeText(processed);

      // Open processed link in a new tab
      openProcessedLink(processed);
      
      // Update history
      const newEntry: TransformationResult = {
        original: text,
        processed,
        timestamp: Date.now()
      };
      setHistory(prev => [newEntry, ...prev].slice(0, 10));
      
      setStatus(StatusType.SUCCESS);
      showToast('Processed and copied to clipboard!', 'success');
    } catch (err) {
      console.error('Processing error:', err);
      showToast('Failed to access clipboard or process URL', 'error');
      setStatus(StatusType.ERROR);
    }
  }, []);

  const handlePasteAndProcess = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (!clipboardText) {
        showToast('Clipboard is empty', 'error');
        return;
      }
      setInput(clipboardText);
      await handleProcess(clipboardText);
    } catch (err) {
      showToast('Permission to read clipboard denied', 'error');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
    setStatus(StatusType.IDLE);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <button
        onClick={openMsDownload}
        className="fixed top-4 left-4 z-50 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
      >
        MS download
      </button>
      {/* Main Action Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          URL Transformer
        </h2>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter or paste archive URL (e.g., https://.../archive/.../file.tar.gz)"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all pr-24 text-slate-700"
            />
            <button
              onClick={handleClear}
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 px-2 py-1 text-sm ${!input && 'hidden'}`}
            >
              Clear
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handlePasteAndProcess}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Paste & Process</span>
            </button>
            
            <button
              disabled={!input}
              onClick={() => handleProcess(input)}
              className="sm:w-auto px-8 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Process Current
            </button>
          </div>
        </div>

        {/* Result Area */}
        {result && (
          <div className="mt-8 p-4 bg-indigo-50 border border-indigo-100 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2 block">
              Processed & Copied
            </label>
            <div className="flex items-center justify-between gap-4">
              <code className="text-sm text-indigo-900 break-all font-mono select-all">
                {result}
              </code>
              <button 
                onClick={() => {
                   navigator.clipboard.writeText(result);
                   showToast('Copied to clipboard', 'success');
                }}
                className="shrink-0 text-indigo-600 hover:text-indigo-800 p-2"
                title="Copy again"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-3 8h3m-3 4h3" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* History Card */}
      {history.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
            Recent Transformations
          </h3>
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.timestamp} className="group border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                   <p className="text-xs text-slate-400 font-medium">
                     {new Date(item.timestamp).toLocaleTimeString()}
                   </p>
                   <button 
                     onClick={() => {
                        navigator.clipboard.writeText(item.processed);
                        showToast('Copied to clipboard', 'success');
                     }}
                     className="opacity-0 group-hover:opacity-100 text-indigo-600 text-xs font-medium transition-opacity"
                   >
                     Copy Result
                   </button>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-400 line-through truncate" title={item.original}>
                    {item.original}
                  </p>
                  <p className="text-sm text-slate-700 font-medium truncate" title={item.processed}>
                    {item.processed}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
