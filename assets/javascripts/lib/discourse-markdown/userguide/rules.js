const ruleHelpers = require("rule-helpers.js");

const rulesForAccordion = {
    tag: 'accordion',
    wrap: 'div.accordion'
};

const rulesForCallout = {
    tag: 'callout',
    before: function(state, tagInfo) {
        let token = state.push('div_open', 'div', 1);
        token.attrs = [];
        token.attrs.push(['class', ruleHelpers.addDashedClasses( 'callout', tagInfo.attrs['type'])]);
    },
    after: function(state) {
        state.push('div_close', 'div', -1);
     }
};

const rulesForNotes = {};

var rulesForTabs = {
    tag: 'tabs',
    before: function(state, tagInfo) {
        let token = state.push('div_open', 'div', 1);
        token.attrs = [];
        token.attrs.push(['class', ruleHelpers.addDashedClasses( 'tabs', tagInfo.attrs['type'])]);

        token = state.push("div_open", "div", 1);
        token.attrs = [["class", "tabs-menu"]];
        token = state.push("div_close", "div", -1);
    },
    after: function(state) {
        state.push('div_close', 'div', -1);
     }
}

module.exports = {
    Rules : {
        accordion: rulesForAccordion,
        callout:   rulesForCallout,
        tabs:      rulesForTabs,
        notes:     rulesForNotes
    }
}