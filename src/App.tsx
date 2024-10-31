import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Upload, FileText, Globe2 } from 'lucide-react';
import { URLInput } from './components/URLInput';
import { Controls } from './components/Controls';
import { VoiceSettings } from './components/VoiceSettings';
import { ContentDisplay } from './components/ContentDisplay';
import { FileUpload } from './components/FileUpload';
import { TextInput } from './components/TextInput';
import { TabSelector } from './components/TabSelector';
import { SpeechSettings, Language, Tab } from './types';
import { fetchUrlContent } from './utils/fetchContent';

const languages: Language[] = [
  { code: 'ta-IN', name: 'Tamil' },
  { code: 'en-US', name: 'English (US)' },
  { code: 'hi-IN', name: 'Hindi' },
  { code: 'te-IN', name: 'Telugu' },
  { code: 'ml-IN', name: 'Malayalam' },
  { code: 'kn-IN', name: 'Kannada' },
  { code: 'bn-IN', name: 'Bengali' },
  { code: 'gu-IN', name: 'Gujarati' },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('text');
  const [text, setText] = useState('');
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<SpeechSettings>({
    rate: 1,
    pitch: 1,
    volume: 1,
    autoScroll: true,
    autoNext: true,
  });
  const [selectedLanguage, setSelectedLanguage] = useState('ta-IN');
  const speechSynthesis = window.speechSynthesis;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (text) {
      const newLines = text.split(/[।.!?।\n]/).filter(line => line.trim());
      setLines(newLines);
      setCurrentLineIndex(0);
    }
  }, [text]);

  const fetchContent = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const content = await fetchUrlContent(url);
      setText(content);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error fetching content');
    } finally {
      setIsLoading(false);
    }
  };

  const speak = (line?: string) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    const textToSpeak = line || lines[currentLineIndex];
    if (textToSpeak) {
      utteranceRef.current = new SpeechSynthesisUtterance(textToSpeak);
      utteranceRef.current.lang = selectedLanguage;
      utteranceRef.current.rate = settings.rate;
      utteranceRef.current.pitch = settings.pitch;
      utteranceRef.current.volume = settings.volume;
      
      utteranceRef.current.onend = () => {
        setIsPlaying(false);
        if (settings.autoNext) {
          nextLine();
        }
      };
      
      utteranceRef.current.onerror = () => {
        setIsPlaying(false);
        setError('Error playing speech. Please try again.');
      };
      
      speechSynthesis.speak(utteranceRef.current);
      setIsPlaying(true);
    }
  };

  const nextLine = () => {
    if (currentLineIndex < lines.length - 1) {
      setCurrentLineIndex(prev => prev + 1);
      if (settings.autoScroll) {
        document.getElementById(`line-${currentLineIndex + 1}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      speak(lines[currentLineIndex + 1]);
    }
  };

  const previousLine = () => {
    if (currentLineIndex > 0) {
      setCurrentLineIndex(prev => prev - 1);
      if (settings.autoScroll) {
        document.getElementById(`line-${currentLineIndex - 1}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      speak(lines[currentLineIndex - 1]);
    }
  };

  const handleSettingChange = (setting: keyof SpeechSettings, value: number | boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
    if (utteranceRef.current && typeof value === 'number') {
      utteranceRef.current[setting as keyof SpeechSynthesisUtterance] = value;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <Volume2 className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-800">Voice Reader</h1>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="flex gap-4 items-end flex-wrap">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            <Controls
              isPlaying={isPlaying}
              onPlay={() => speechSynthesis.paused ? speechSynthesis.resume() : speak()}
              onPause={() => speechSynthesis.pause()}
              onStop={() => speechSynthesis.cancel()}
              onNext={nextLine}
              onPrevious={previousLine}
              isPaused={speechSynthesis.paused}
            />
          </div>

          <TabSelector
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={[
              { id: 'text', label: 'Text', icon: FileText },
              { id: 'url', label: 'URL', icon: Globe2 },
              { id: 'file', label: 'File', icon: Upload },
            ]}
          />

          <div className="mt-4">
            {activeTab === 'text' && (
              <TextInput
                value={text}
                onChange={setText}
                placeholder="Enter or paste your text here..."
              />
            )}
            {activeTab === 'url' && (
              <URLInput
                url={url}
                onUrlChange={setUrl}
                onFetch={fetchContent}
                isLoading={isLoading}
              />
            )}
            {activeTab === 'file' && (
              <FileUpload onTextLoaded={setText} />
            )}
          </div>

          <ContentDisplay
            lines={lines}
            currentLineIndex={currentLineIndex}
            onLineClick={(index) => {
              setCurrentLineIndex(index);
              speak(lines[index]);
            }}
          />
          
          <VoiceSettings
            settings={settings}
            onSettingChange={handleSettingChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;