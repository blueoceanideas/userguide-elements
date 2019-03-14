import { registerOption } from "pretty-text/pretty-text";

registerOption((siteSettings, opts) => {
    opts.features["userguide-elements"] = !!siteSettings.sail_markdown_elements_enabled;
  });

function addDashedClasses (elementClass, tagInfoAttrs = false ) {
    if ( !tagInfoAttrs ) return elementClass;
    let prefix = elementClass + "--";

    // checks & handles single/multiple classes
    tagInfoAttrs =
        tagInfoAttrs.search("\b \b")
        ? tagInfoAttrs
            .split(" ")
            .map( ( attr ) => prefix + attr )
            .reduce( ( attrs, attr ) => attrs += " " + attr )
        : prefix + tagInfoAttrs;
    return elementClass + " " + tagInfoAttrs;
}

const rulesForAccordion = {
    tag: 'accordion',
    before: function(state, tagInfo) {
        let token = state.push('div_open', 'div', 1);
        token.attrs = [];
        token.attrs.push(['class', addDashedClasses( 'accordion', tagInfo.attrs['type'])]);
    },
    after: function(state) {
        state.push('div_close', 'div', -1);
     }
};

const rulesForAccordionItem = {
    tag: 'accordionitem',
    before: function(state, tagInfo) {
        let token = state.push('div_open', 'div', 1);
        token.attrs = [];
        token.attrs.push(['class', 'accordion__item']);
    },
    after: function(state) {
        state.push('div_close', 'div', -1);
     }
};

const rulesForAccordionTitle = {
    tag: 'accordiontitle',
    before: function(state, tagInfo) {
        let token = state.push('div_open', 'div', 1);
        token.attrs = [];
        token.attrs.push(['class', 'accordion__item-title']);
    },
    after: function(state) {
        state.push('div_close', 'div', -1);
     }
};

const rulesForAccordionContent = {
    tag: 'accordioncontent',
    before: function(state, tagInfo) {
        let token = state.push('div_open', 'div', 1);
        token.attrs = [];
        token.attrs.push(['class', 'accordion__item-content']);
    },
    after: function(state) {
        state.push('div_close', 'div', -1);
     }
};

const rulesForReleaseNotes = {
  tag: 'releasenotes',
  before: function(state, tagInfo) {
      let token = state.push('div_open', 'div', 1);
      token.attrs = [];
      token.attrs.push(['class', 'callout callout--transparent']);
  },
  after: function(state) {
      state.push('div_close', 'div', -1);
   }
};

const rulesForCallout = {
    tag: 'callout',
    wrap: function(token, tagInfo) {
      token.attrs = [['class', addDashedClasses( 'callout', tagInfo.attrs['type'])]];
      return true;
    }
};

const rulesForCalloutTitle = {
    tag: 'callouttitle',
    wrap: 'h4.callout__title'
};

const rulesForNote = {
    tag: 'note',
    wrap: function(token, tagInfo) {
      token.attrs = [['class', addDashedClasses( 'note', tagInfo.attrs['type'])]];
      return true;
    }
};

const rulesForNoteTitle = {
    tag: 'notetitle',
    wrap: 'h4.note-title'
};

const rulesForTabs = {
    tag: 'tabs',
    before: function(state, tagInfo) {
        let token = state.push('div_open', 'div', 1);
        token.attrs = [];
        token.attrs.push(['class', addDashedClasses( 'tabs', tagInfo.attrs['type'])]);
    },
    after: function(state) {
        state.push('div_close', 'div', -1);
     }
}

const rulesForTabMenu = {
    tag: 'tabmenu',
    before: function(state, tagInfo) {
        let token = state.push('div_open', 'div', 1);
        token.attrs = [];
        token.attrs.push(['class', 'tabs-menu']);
    },
    after: function(state) {
        state.push('div_close', 'div', -1);
     }
}

const rulesForTabLink = {
    tag: 'tablink',
    before: function(state, tagInfo) {
        let token = state.push('div_open', 'div', 1);
        token.attrs = [];
        token.attrs.push(['class', 'tabs-link '+tagInfo.attrs['_default']]);
    },
    after: function(state) {
        state.push('div_close', 'div', -1);
     }
}

const rulesForTab = {
    tag: 'tab',
    before: function(state, tagInfo) {
        let token = state.push('div_open', 'div', 1);
        let title = tagInfo.attrs['title'];
        if(tagInfo.attrs['_default']) {
          token.attrs = [];
          token.attrs.push(['class', 'tab '+tagInfo.attrs['_default']]);
        }
        token = state.push("html_inline")
    },
    after: function(state) {
        state.push('div_close', 'div', -1);
     }
}

const rulesForLink = {
  tag: 'link',
  wrap: function(startToken, endToken, tagInfo, content) {
    const url = ( tagInfo.attrs['href'] || tagInfo.attrs['_default'] || content ).trim();

    if( simpleUrlRegex.test(url) ) {
      startToken = { type: "a_open", tag: "a", attrs: [["href", url]], content: "", nesting: 1 };
      endToken   = { type: "a_close", tag: "a", content: "", nesting: -1 };
    } else {
      endToken.content = '';
      startToken.content = '';
      startToken.type = 'html_inline';
    }

    return false;
  }
};

const rulesForButton = {
  tag: 'button',
  wrap: function(token, tagInfo) {
    tagInfo.attrs['type'] ? tagInfo.attrs['type'] : 'primary';
    token.attrs = [];
    token.attrs.push(['class', addDashedClasses( 'btn', tagInfo.attrs['type'])]);
    token.attrs.push(['href', tagInfo.attrs['url']]);
    token.attrs.push(['target', '_blank']);
    return true;
  }
};

// setup() gets called when the editor is loaded
export function setup(helper) {
    console.log("markdown-elements setup()");

    if(!helper.markdownIt) { return; }

    // any functions that need to run can go here.
    console.log("userguide-elements scripts initialized");
    // html elements to be allowed
    // helper.whiteList([
    //     'div.accordion',
    //     'div.callout',
    // ]);

    //markdown component to register go here
    helper.registerPlugin( md => {
        console.log(md.block.bbcode.ruler);

        md.block.bbcode.ruler.push("note", rulesForNote);
        md.inline.bbcode.ruler.push("notetitle", rulesForNoteTitle);
        md.block.bbcode.ruler.push("callout", rulesForCallout);
        md.inline.bbcode.ruler.push("callouttitle", rulesForCalloutTitle);
        md.block.bbcode.ruler.push("releasenotes", rulesForReleaseNotes);

        // Accordion
        md.block.bbcode.ruler.push("accordion", rulesForAccordion);
        md.block.bbcode.ruler.push("accordionitem", rulesForAccordionItem);
        md.block.bbcode.ruler.push("accordiontitle", rulesForAccordionTitle);
        md.block.bbcode.ruler.push("accordioncontent", rulesForAccordionContent);

        // Tabs
        md.block.bbcode.ruler.push("tabs", rulesForTabs);
        md.block.bbcode.ruler.push("tabmenu", rulesForTabMenu);
        md.block.bbcode.ruler.push("tablink", rulesForTabLink);
        md.block.bbcode.ruler.push("tab", rulesForTab);

        // Links/Buttons
        md.block.bbcode.ruler.push("link", rulesForLink);
        //md.block.bbcode.ruler.push("button", rulesForButton);

    });
}

