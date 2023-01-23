const fs = require("fs");
const { BaseConfigTokenStoreAdapter } = require("..");
const YAML = require("yaml");

class FileConfigTokenStoreAdapter extends BaseConfigTokenStoreAdapter {
  /**
   * Create new instance
   *
   * @name constructor
   * @param {*} config
   */
  constructor(server, config) {
    super(...arguments);
  }

  /**
   * Retrieve to the token with the given id
   *
   * @param {*} id
   */
  async getTokenInternal(id) {
    const adapter = this;
    adapter.server.logger.debug("adapter config: %j", adapter.config);

    try {
      let data = fs.readFileSync(adapter.config.options.path, "utf8");
      data = YAML.parse(data);
      let token;
      token = data[id];

      return JSON.stringify(token);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = {
  FileConfigTokenStoreAdapter,
};
