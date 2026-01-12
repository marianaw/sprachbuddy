'use client';

import { UserSettings, CEFRLevel, StrictnessLevel } from '@/types';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
}

export default function SettingsDrawer({ isOpen, onClose, settings, onSettingsChange }: SettingsDrawerProps) {
  const cefrLevels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const strictnessLevels: StrictnessLevel[] = ['lenient', 'moderate', 'strict'];

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-lg z-50 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            {/* CEFR Level */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                CEFR Level
              </label>
              <select
                value={settings.cefrLevel}
                onChange={(e) => onSettingsChange({ ...settings, cefrLevel: e.target.value as CEFRLevel })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {cefrLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Your current German proficiency level</p>
            </div>

            {/* Learning Goals */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Learning Goals
              </label>
              <textarea
                value={settings.goals}
                onChange={(e) => onSettingsChange({ ...settings, goals: e.target.value })}
                placeholder="e.g., Prepare for B2 exam, practice conversation..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">What do you want to achieve?</p>
            </div>

            {/* Strictness */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Correction Strictness
              </label>
              <select
                value={settings.strictness}
                onChange={(e) => onSettingsChange({ ...settings, strictness: e.target.value as StrictnessLevel })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {strictnessLevels.map(level => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">How strictly should errors be corrected?</p>
            </div>

            {/* Correct Me Toggle */}
            <div>
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="text-sm font-semibold">Correct My Mistakes</div>
                  <p className="text-xs text-gray-500">Actively point out and correct errors</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={settings.correctMe}
                    onChange={(e) => onSettingsChange({ ...settings, correctMe: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                </div>
              </label>
            </div>

            {/* German Only Toggle */}
            <div>
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="text-sm font-semibold">German Only Mode</div>
                  <p className="text-xs text-gray-500">Responses only in German</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={settings.germanOnly}
                    onChange={(e) => onSettingsChange({ ...settings, germanOnly: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
