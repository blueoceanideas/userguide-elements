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


const rulesForCallout = {
    tag: 'callout',
    before: function(state, tagInfo) {
        let token = state.push('div_open', 'div', 1);
        token.attrs = [];
        token.attrs.push(['class', addDashedClasses( 'callout', tagInfo.attrs['type'])]);
    },
    after: function(state) {
        state.push('div_close', 'div', -1);
     }
};

const rulesForCalloutTitle = {
    tag: 'callouttitle',
    before: function(state, tagInfo) {
        let token = state.push('h4_open', 'h4', 1);
        token.attrs = [];
        token.attrs.push(['class', 'callout__title']);
    },
    after: function(state) {
        state.push('h4_close', 'h4', -1);
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

const rulesForNote = {
    tag: 'note',
    before: function(state, tagInfo) {
        let token = state.push('div_open', 'div', 1);
        token.attrs = [];
        token.attrs.push(['class', addDashedClasses( 'note', tagInfo.attrs['type'])]);
    },
    after: function(state) {
        state.push('div_close', 'div', -1);
     }
};

const rulesForNoteTitle = {
    tag: 'notetitle',
    before: function(state, tagInfo) {
        let token = state.push('h4_open', 'h4', 1);
        token.attrs = [];
        token.attrs.push(['class', 'note-title']);
    },
    after: function(state) {
        state.push('h4_close', 'h4', -1);
     }
};

const rulesForTabs = {
    tag: 'tabs',
    before: function(state, tagInfo) {
        let token = state.push('div_open', 'div', 1);
        token.attrs = [];
        token.attrs.push(['class', addDashedClasses( 'tabs', tagInfo.attrs['type'])]);

        console.log(token);
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

        console.log(token.content);
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

        console.log(token.content);
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

        token.attrs = [];
        token.attrs.push(['class', 'tab '+tagInfo.attrs['_default']]);
        
        console.log(token, state);

        token = state.push("html_inline")

        
    },
    after: function(state) {
        state.push('div_close', 'div', -1);
     }
}

const rulesForTable = {
    tag: 'table',
    before: function(state, tagInfo) {
        let token = state.push('table_open', 'table', 1);
        token.attrs = [];
        token.attrs.push(['class', addDashedClasses( 'table', tagInfo.attrs['type'])]);
    },
    after: function(state) {
        state.push('table_close', 'table', -1);
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
        md.block.bbcode.ruler.push("notetitle", rulesForNoteTitle);
        md.block.bbcode.ruler.push("callout", rulesForCallout);
        md.block.bbcode.ruler.push("callouttitle", rulesForCalloutTitle);
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

        // Tables
        //md.block.bbcode.ruler.push("table", rulesForTable);

        // Links/Buttons

    });
}

