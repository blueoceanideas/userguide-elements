import { registerOption } from "pretty-text/pretty-text";

registerOption((siteSettings, opts) => {
    opts.features["userguide-elements"] = !!siteSettings.sail_markdown_elements_enabled;
  });

function addDashedClasses (elementClass, tagInfoAttrs = false ) {
    if ( !tagInfoAttrs ) return elementClass;
    let prefix = elementClass + "--";
    return elementClass + " " + prefix + tagInfoAttrs;
} 

const rulesForAccordion = {
    tag: 'accordion',
    wrap: 'div.accordion'
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

const rulesForTabs = {
    tag: 'tabs',
    before: function(state, tagInfo) {
        let token = state.push('div_open', 'div', 1);
        token.attrs = [];
        token.attrs.push(['class', addDashedClasses( 'tabs', tagInfo.attrs['type'])]);

        console.log(token.content);
    },
    after: function(state) {
        state.push('div_close', 'div', -1);
     }
}

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
        md.block.bbcode.ruler.push("accordion", rulesForAccordion);
        md.block.bbcode.ruler.push("callout", rulesForCallout);
        md.block.bbcode.ruler.push("note", rulesForNote);
        md.block.bbcode.ruler.push("tabs", rulesForTabs);
        md.block.bbcode.ruler.push("releasenotes", rulesForReleaseNotes);
    });
}

