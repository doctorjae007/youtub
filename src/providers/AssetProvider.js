export class AssetProvider {
  async resolve() { throw new Error('AssetProvider.resolve() must be implemented'); }
}

export class CssSvgAssetProvider extends AssetProvider {
  async resolve(scene) { return {type: 'generated', sceneType: scene.type, usageRights: 'original-css-svg'}; }
}
