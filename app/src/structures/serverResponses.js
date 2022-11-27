module.exports = class ServerResponse {
  constructor(client, patterns, options) {
    this.client = client
    this.patterns = patterns
    
    this.config = {
			name: options.name || null,
      priority: options.priority || 0,
      ignoreDevs: options.ignoreDevs || false,
      regex: new RegExp(this.patterns.map(p => `(${p})`).join(" ?"), "ig"),
      disable: options.disable || false,
		}
	}
  
  regex() {
    return {
      "WHERE_IT_IS_PT": "como|onde|qual|existe|tem( )?jeito|ajuda|quero|queria|tem algum",
      "WHERE_IT_IS_EN": "how|where|what|is there|can|help|want|could|would|does",
      "ACTIVATE_OR_CHANGE_PT": "pega|pego|coloc|clc|faço|faco|fasso|alter|boto|bota|ativ|troc|mud",
      "ACTIVATE_OR_CHANGE_EN": "get|set|do|change|enable|configure|disable"
    }
  }
}