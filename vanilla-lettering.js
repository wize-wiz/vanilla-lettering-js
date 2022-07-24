/**
 * Vanilla JS port of lettering.js (github.com/davatron5000/Lettering.js) to be used without the need of jQuery.
 *
 * @author Koos Bloemsma - kb@git.wizdom.de
 * @date 22.07.2022
 * @version 1.0.1
 *
 * @usage
 *
 */

(function(global, factory){
    if (typeof define === "function" && define.amd) define(factory);        // AMD
    else if (typeof module === "object") module.exports = factory();        // CommonJS
    else {                                                                  // global context
        if (typeof document.Tools === 'undefined') document.Tools = {};
        document.Tools.lettering = factory();
    }
}(this, function() {
    "use strict";

    const HASH = 'eefec303079ad17405c889e092e105b0';

    /**
     * Methods for chars, words and lines.
     */
    let methods = {
        chars: function(nodes) {
            return inject(nodes, '', 'char');
        },
        words: function(nodes) {
            return inject(nodes, ' ', 'word', ' ');
        },
        lines: function(nodes) {

            // replace <br> with md5 hash eefec303079ad17405c889e092e105b0
            for(let n = nodes.length-1; n > -1; n--) {
                let node = nodes[n],
                    children = node.children;

                for (let i = children.length - 1; i > -1; i--) {
                    let child = children[i];

                    if (child.nodeName.toUpperCase() === 'BR') {
                        child.parentNode.replaceChild(document.createTextNode(HASH), child);
                    }
                }

            }

            return inject(nodes, HASH, 'line');
        }
    };


    /**
     * Inject spans
     * @param nodes
     * @param splitter
     * @param klass
     */
    function inject(nodes, splitter, klass, after) {
        for (let n = 0; n < nodes.length; n++) {
            let node = nodes[n],
                wrappable = node.innerText.split(splitter);

            if(typeof wrappable.length === 'undefined') return;

            node.innerHTML = '';

            for(let s = 0; s < wrappable.length; s++) {
                let span = document.createElement('span');
                span.classList.add(klass + '' + (s+1));
                span.ariaHidden = "true";
                span.textContent = wrappable[s];

                node.appendChild(span);

                if(typeof after !== 'undefined') {
                    node.appendChild(document.createTextNode(after));
                }
            }
        }
    }

    /**
     * Main lettering method, e.g. the init version of lettering.js
     * @param selector
     * @param type
     */
    function lettering(selector, method = 'chars') {
        if (!document.querySelectorAll)
            return;
        let nodes = document.querySelectorAll(selector);

        if(typeof methods[method] === 'undefined')
            return;

        return methods[method](nodes);
    }

    return lettering;

}));
