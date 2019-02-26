import { withPluginApi } from "discourse/lib/plugin-api";
import { Tag } from "discourse/lib/to-markdown";

export default {
    name: "apply-markdown-elements",
    initialize(container) {
      const siteSettings = container.lookup("site-settings:main");
      if (siteSettings.sail_markdown_elements_enabled) {
        //withPluginApi("0.5", initializeSpoiler);
      }
    }
  };