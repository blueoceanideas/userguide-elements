# name: userguide-elements
# about: Add BBCode and Markdown for SailAMX user guide
# version: 0.1
# authors: Tim Long
# url: 

enabled_site_setting :sail_markdown_elements_enabled

# register_asset "javascripts/spoiler.js"
# register_asset "stylesheets/discourse_spoiler_alert.css"

after_initialize do

  # black out spoilers in emails
  # Email::Styles.register_plugin_style do |fragment|
  #   fragment.css(".spoiler").each do |spoiler|
  #     spoiler["style"] = "color: #000; background-color: #000;"
  #   end
  # end

  # remove spoilers in embedded comments
  # on(:reduce_cooked) do |fragment|
  #   fragment.css(".spoiler").remove
  # end

end
