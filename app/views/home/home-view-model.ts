import { Observable } from '@nativescript/core';
import { File, Folder, knownFolders, path } from '@nativescript/core/file-system';
import * as permissions from 'nativescript-permissions';
import { TextToSpeech } from '@nativescript/core';

export class HomeViewModel extends Observable {
    private tts: TextToSpeech;
    private _inputText: string = '';
    private _urlInput: string = '';
    private _selectedFileName: string = '';
    private _isPlaying: boolean = false;
    private _isLoading: boolean = false;
    private _selectedTabIndex: number = 0;
    private _selectedLanguageIndex: number = 0;
    private _currentTime: string = '00:00';

    languages = [
        { id: 'ta-IN', name: 'Tamil' },
        { id: 'en-US', name: 'English (US)' },
        { id: 'hi-IN', name: 'Hindi' },
        { id: 'te-IN', name: 'Telugu' },
        { id: 'ml-IN', name: 'Malayalam' },
        { id: 'kn-IN', name: 'Kannada' },
        { id: 'bn-IN', name: 'Bengali' },
        { id: 'gu-IN', name: 'Gujarati' }
    ];

    constructor() {
        super();
        this.tts = new TextToSpeech();
    }

    get inputText(): string {
        return this._inputText;
    }

    set inputText(value: string) {
        if (this._inputText !== value) {
            this._inputText = value;
            this.notifyPropertyChange('inputText', value);
        }
    }

    get isPlaying(): boolean {
        return this._isPlaying;
    }

    set isPlaying(value: boolean) {
        if (this._isPlaying !== value) {
            this._isPlaying = value;
            this.notifyPropertyChange('isPlaying', value);
        }
    }

    async onPlayPause() {
        if (this.isPlaying) {
            await this.tts.pause();
        } else {
            const language = this.languages[this._selectedLanguageIndex].id;
            await this.tts.speak({
                text: this._inputText,
                language: language,
                speakRate: 1.0,
                pitch: 1.0,
                volume: 1.0
            });
        }
        this.isPlaying = !this.isPlaying;
    }

    async onStop() {
        await this.tts.stop();
        this.isPlaying = false;
    }

    async onSelectFile() {
        try {
            await permissions.requestPermission(
                android.Manifest.permission.READ_EXTERNAL_STORAGE
            );
            
            // File selection logic here
            // Note: In a real implementation, you'd use a proper file picker
            // This is just a placeholder
            this._selectedFileName = 'Selected file...';
            this.notifyPropertyChange('selectedFileName', this._selectedFileName);
        } catch (error) {
            console.error('Permission error:', error);
        }
    }

    async onFetchUrl() {
        if (!this._urlInput) return;

        this._isLoading = true;
        this.notifyPropertyChange('isLoading', true);

        try {
            const response = await fetch(this._urlInput);
            const html = await response.text();
            this.inputText = this.extractReadableText(html);
        } catch (error) {
            console.error('Fetch error:', error);
            // Show error dialog
        } finally {
            this._isLoading = false;
            this.notifyPropertyChange('isLoading', false);
        }
    }

    private extractReadableText(html: string): string {
        // Simple HTML to text conversion
        return html
            .replace(/<[^>]*>/g, '\n')
            .replace(/\s+/g, ' ')
            .trim();
    }
}