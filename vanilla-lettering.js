/**
 * Vanilla JS port of lettering.js (github.com/davatron5000/Lettering.js) to be used without the need of jQuery.
 *
 * @author Koos Bloemsma - kb@git.wizdom.de
 * @date 22.07.2022
 * @version 1.1.1
 *
 * @usage
 *
 */

(function(global, factory) {
    if (typeof define === "function" && define.amd) define(factory);        // AMD
    else if (typeof module === "object") module.exports = factory();        // CommonJS
    else {                                                                  // global context
        const lettering = factory();
        // on document ready
        document.addEventListener("DOMContentLoaded", function() {
            const DATA_ATTR = 'data-lettering',
                  METHODS = ['chars', 'words', 'lines'];
            for(let i = 0; i < METHODS.length; i++) {
                let method = METHODS[i];
                // auto execute on attribute data-lettering='method' if found
                let nodes = document.querySelectorAll('['+DATA_ATTR+'="'+method+'"]');
                if(nodes.length > 0) {
                    // run on default method chars but data-lettering value is used instead.
                    lettering(nodes, method);
                }
            }
        });

        if (typeof document.Tools === 'undefined') document.Tools = {};
        document.Tools.lettering = lettering;
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
                let wrap = wrappable[s],
                    span = document.createElement('span');

                span.classList.add(klass + '' + ( wrap === ' ' ? '-space' : s+1));
                span.textContent = wrap;

                node.appendChild(span);

                if(typeof after !== 'undefined') {
                    node.appendChild(document.createTextNode(after));
                }
            }
        }
    }

    /**
     * Convert a single element to a NodeList.
     * @param nodes
     * @returns {*}
     */
    function convert(nodes) {
        if(!Object.prototype.isPrototypeOf.call(NodeList.prototype, nodes)) {
            let list = document.createDocumentFragment();
            list.appendChild(nodes);
            return list.childNodes;
        }

        return nodes;
    }

    /**
     * Validate method
     * @param method
     * @returns {boolean}
     */
    function valid(method) {
        return typeof method === 'string' && typeof methods[method] !== 'undefined';
    }

    /**
     * Call method
     * @param method
     * @param nodes
     * @returns {*}
     */
    function call(method, nodes) {
        // make sure nodes is a NodeList.
        nodes = convert(nodes);

        return methods[method](nodes);
    }
    /**
     * Main lettering method, e.g. the init version of lettering.js
     * @param selector
     * @param type
     */
    function lettering(selector, method = 'chars') {
        if(!selector) {
            throw new Error('selector/element is invalid');
        }
        let nodes = typeof selector === 'string' ?
            document.querySelectorAll(selector) : selector;

        if(!valid(method))
            throw new Error('unknown method `'+method+'`');

        return call(method, nodes);
    }

    return lettering;

}));
