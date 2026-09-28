export class VoiceProvider {
  async prepare() { throw new Error('VoiceProvider.prepare() must be implemented'); }
}

export class MockVoiceProvider extends VoiceProvider {
  async prepare() { return {type: 'mock', src: null, label: 'Mock voice — ใช้จังหวะ subtitle แทนเสียง'}; }
}

export class UploadedVoiceProvider extends VoiceProvider {
  constructor(src) { super(); this.src = src; }
  async prepare() { return {type: 'upload', src: this.src, label: 'User supplied voice'}; }
}
