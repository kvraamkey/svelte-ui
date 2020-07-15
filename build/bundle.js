
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }
    class HtmlTag {
        constructor(anchor = null) {
            this.a = anchor;
            this.e = this.n = null;
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                this.e = element(target.nodeName);
                this.t = target;
                this.h(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = node.ownerDocument;
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = program.b - t;
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.24.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const url = writable('Introduction');

    /* src/components/Header.svelte generated by Svelte v3.24.0 */

    const file = "src/components/Header.svelte";

    function create_fragment(ctx) {
    	let div;
    	let span1;
    	let svg0;
    	let line0;
    	let line1;
    	let line2;
    	let t0;
    	let span0;
    	let t2;
    	let a;
    	let svg1;
    	let path;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span1 = element("span");
    			svg0 = svg_element("svg");
    			line0 = svg_element("line");
    			line1 = svg_element("line");
    			line2 = svg_element("line");
    			t0 = space();
    			span0 = element("span");
    			span0.textContent = "Svelte UI";
    			t2 = space();
    			a = element("a");
    			svg1 = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(line0, "x1", "3");
    			attr_dev(line0, "y1", "12");
    			attr_dev(line0, "x2", "21");
    			attr_dev(line0, "y2", "12");
    			add_location(line0, file, 13, 3, 329);
    			attr_dev(line1, "x1", "3");
    			attr_dev(line1, "y1", "6");
    			attr_dev(line1, "x2", "21");
    			attr_dev(line1, "y2", "6");
    			add_location(line1, file, 14, 3, 372);
    			attr_dev(line2, "x1", "3");
    			attr_dev(line2, "y1", "18");
    			attr_dev(line2, "x2", "21");
    			attr_dev(line2, "y2", "18");
    			add_location(line2, file, 15, 3, 413);
    			attr_dev(svg0, "stroke", "currentColor");
    			attr_dev(svg0, "fill", "none");
    			attr_dev(svg0, "stroke-width", "2");
    			attr_dev(svg0, "viewBox", "0 0 24 24");
    			attr_dev(svg0, "stroke-linecap", "round");
    			attr_dev(svg0, "stroke-linejoin", "round");
    			attr_dev(svg0, "height", "23");
    			attr_dev(svg0, "width", "23");
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg0, file, 2, 2, 114);
    			attr_dev(span0, "class", "w3-margin-left logo svelte-yd8ws5");
    			add_location(span0, file, 17, 2, 464);
    			attr_dev(span1, "class", "w3-bar-item w3-large center flex-1 center svelte-yd8ws5");
    			add_location(span1, file, 1, 1, 55);
    			attr_dev(path, "d", "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577\n\t\t\t\t0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633\n\t\t\t\t17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809\n\t\t\t\t1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93\n\t\t\t\t0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267\n\t\t\t\t1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24\n\t\t\t\t2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81\n\t\t\t\t1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592\n\t\t\t\t24 12.297c0-6.627-5.373-12-12-12");
    			add_location(path, file, 32, 3, 804);
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg1, "viewBox", "0 0 24 24");
    			attr_dev(svg1, "class", "svelte-h2unzw");
    			attr_dev(svg1, "width", "22");
    			attr_dev(svg1, "height", "22");
    			attr_dev(svg1, "fill", "currentColor");
    			add_location(svg1, file, 24, 2, 654);
    			attr_dev(a, "href", "https://github.com/kvraamkey/svelte-ui");
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "class", "w3-bar-item w3-hover-opacity w3-right center");
    			add_location(a, file, 19, 1, 525);
    			attr_dev(div, "class", "w3-bar w3-white w3-border-bottom center");
    			add_location(div, file, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span1);
    			append_dev(span1, svg0);
    			append_dev(svg0, line0);
    			append_dev(svg0, line1);
    			append_dev(svg0, line2);
    			append_dev(span1, t0);
    			append_dev(span1, span0);
    			append_dev(div, t2);
    			append_dev(div, a);
    			append_dev(a, svg1);
    			append_dev(svg1, path);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Header", $$slots, []);
    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const getUrlParam = (key) => {
    	const urlParams = new URLSearchParams(window.location.search);
    	return urlParams.get(key);
    };

    const toCamelCase = (string) => {
    	return string.charAt(0).toUpperCase() + string.slice(1);
    };

    /* src/components/Aside.svelte generated by Svelte v3.24.0 */
    const file$1 = "src/components/Aside.svelte";

    function create_fragment$1(ctx) {
    	let div;
    	let button0;
    	let t1;
    	let button1;
    	let t3;
    	let button2;
    	let t5;
    	let button3;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			button0.textContent = "Introduction";
    			t1 = space();
    			button1 = element("button");
    			button1.textContent = "Button";
    			t3 = space();
    			button2 = element("button");
    			button2.textContent = "Link 2";
    			t5 = space();
    			button3 = element("button");
    			button3.textContent = "Link 3";
    			attr_dev(button0, "data-url", "introduction");
    			attr_dev(button0, "class", "w3-bar-item w3-button");
    			add_location(button0, file$1, 1, 1, 55);
    			attr_dev(button1, "data-url", "button");
    			attr_dev(button1, "class", "w3-bar-item w3-button");
    			add_location(button1, file$1, 4, 1, 167);
    			attr_dev(button2, "data-url", "alert");
    			attr_dev(button2, "class", "w3-bar-item w3-button");
    			add_location(button2, file$1, 5, 1, 262);
    			attr_dev(button3, "data-url", "accordian");
    			attr_dev(button3, "class", "w3-bar-item w3-button");
    			add_location(button3, file$1, 6, 1, 356);
    			attr_dev(div, "class", "w3-sidebar w3-bar-block w3-border-right svelte-i9a8rq");
    			add_location(div, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button0);
    			append_dev(div, t1);
    			append_dev(div, button1);
    			append_dev(div, t3);
    			append_dev(div, button2);
    			append_dev(div, t5);
    			append_dev(div, button3);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*navigation*/ ctx[0], false, false, false),
    					listen_dev(button1, "click", /*navigation*/ ctx[0], false, false, false),
    					listen_dev(button2, "click", /*navigation*/ ctx[0], false, false, false),
    					listen_dev(button3, "click", /*navigation*/ ctx[0], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	function navigation(e) {
    		let comp = e.target.dataset.url;
    		window.history.replaceState(null, null, `?c=${comp}`);
    		url.update(u => toCamelCase(comp));
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Aside> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Aside", $$slots, []);
    	$$self.$capture_state = () => ({ url, toCamelCase, navigation });
    	return [navigation];
    }

    class Aside extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Aside",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function slide(node, { delay = 0, duration = 400, easing = cubicOut }) {
        const style = getComputedStyle(node);
        const opacity = +style.opacity;
        const height = parseFloat(style.height);
        const padding_top = parseFloat(style.paddingTop);
        const padding_bottom = parseFloat(style.paddingBottom);
        const margin_top = parseFloat(style.marginTop);
        const margin_bottom = parseFloat(style.marginBottom);
        const border_top_width = parseFloat(style.borderTopWidth);
        const border_bottom_width = parseFloat(style.borderBottomWidth);
        return {
            delay,
            duration,
            easing,
            css: t => `overflow: hidden;` +
                `opacity: ${Math.min(t * 20, 1) * opacity};` +
                `height: ${t * height}px;` +
                `padding-top: ${t * padding_top}px;` +
                `padding-bottom: ${t * padding_bottom}px;` +
                `margin-top: ${t * margin_top}px;` +
                `margin-bottom: ${t * margin_bottom}px;` +
                `border-top-width: ${t * border_top_width}px;` +
                `border-bottom-width: ${t * border_bottom_width}px;`
        };
    }

    /* src/components/demo/DemoPanel.svelte generated by Svelte v3.24.0 */
    const file$2 = "src/components/demo/DemoPanel.svelte";
    const get_result_slot_changes = dirty => ({});
    const get_result_slot_context = ctx => ({});
    const get_action_slot_changes = dirty => ({});
    const get_action_slot_context = ctx => ({});

    // (7:1) {#if codeVisible}
    function create_if_block(ctx) {
    	let div;
    	let div_transition;
    	let current;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "hljs w3-code");
    			add_location(div, file$2, 7, 2, 251);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			div.innerHTML = /*code*/ ctx[0];
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*code*/ 1) div.innerHTML = /*code*/ ctx[0];		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div_transition) div_transition = create_bidirectional_transition(div, slide, {}, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div_transition) div_transition = create_bidirectional_transition(div, slide, {}, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching && div_transition) div_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(7:1) {#if codeVisible}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div2;
    	let div0;
    	let span0;
    	let t1;
    	let span1;
    	let t3;
    	let t4;
    	let div1;
    	let t5;
    	let t6;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*codeVisible*/ ctx[1] && create_if_block(ctx);
    	const default_slot_template = /*$$slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);
    	const action_slot_template = /*$$slots*/ ctx[3].action;
    	const action_slot = create_slot(action_slot_template, ctx, /*$$scope*/ ctx[2], get_action_slot_context);
    	const result_slot_template = /*$$slots*/ ctx[3].result;
    	const result_slot = create_slot(result_slot_template, ctx, /*$$scope*/ ctx[2], get_result_slot_context);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			span0.textContent = "Example";
    			t1 = space();
    			span1 = element("span");
    			span1.textContent = `${"{}"}`;
    			t3 = space();
    			if (if_block) if_block.c();
    			t4 = space();
    			div1 = element("div");
    			if (default_slot) default_slot.c();
    			t5 = space();
    			if (action_slot) action_slot.c();
    			t6 = space();
    			if (result_slot) result_slot.c();
    			attr_dev(span0, "class", "title w3-bar-item");
    			add_location(span0, file$2, 2, 2, 71);
    			attr_dev(span1, "class", "title w3-bar-item w3-right");
    			add_location(span1, file$2, 3, 2, 120);
    			attr_dev(div0, "class", "toolbar w3-bar");
    			add_location(div0, file$2, 1, 1, 40);
    			attr_dev(div1, "class", "demo svelte-1tcuj5i");
    			add_location(div1, file$2, 12, 1, 329);
    			attr_dev(div2, "class", "demo-panel w3-light-gray");
    			add_location(div2, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, span0);
    			append_dev(div0, t1);
    			append_dev(div0, span1);
    			append_dev(div2, t3);
    			if (if_block) if_block.m(div2, null);
    			append_dev(div2, t4);
    			append_dev(div2, div1);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			append_dev(div1, t5);

    			if (action_slot) {
    				action_slot.m(div1, null);
    			}

    			append_dev(div2, t6);

    			if (result_slot) {
    				result_slot.m(div2, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(span1, "click", /*click_handler*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*codeVisible*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*codeVisible*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div2, t4);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 4) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[2], dirty, null, null);
    				}
    			}

    			if (action_slot) {
    				if (action_slot.p && dirty & /*$$scope*/ 4) {
    					update_slot(action_slot, action_slot_template, ctx, /*$$scope*/ ctx[2], dirty, get_action_slot_changes, get_action_slot_context);
    				}
    			}

    			if (result_slot) {
    				if (result_slot.p && dirty & /*$$scope*/ 4) {
    					update_slot(result_slot, result_slot_template, ctx, /*$$scope*/ ctx[2], dirty, get_result_slot_changes, get_result_slot_context);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(default_slot, local);
    			transition_in(action_slot, local);
    			transition_in(result_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(default_slot, local);
    			transition_out(action_slot, local);
    			transition_out(result_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (if_block) if_block.d();
    			if (default_slot) default_slot.d(detaching);
    			if (action_slot) action_slot.d(detaching);
    			if (result_slot) result_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { code } = $$props;
    	let codeVisible = false;
    	const writable_props = ["code"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<DemoPanel> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("DemoPanel", $$slots, ['default','action','result']);
    	const click_handler = () => $$invalidate(1, codeVisible = !codeVisible);

    	$$self.$set = $$props => {
    		if ("code" in $$props) $$invalidate(0, code = $$props.code);
    		if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ slide, code, codeVisible });

    	$$self.$inject_state = $$props => {
    		if ("code" in $$props) $$invalidate(0, code = $$props.code);
    		if ("codeVisible" in $$props) $$invalidate(1, codeVisible = $$props.codeVisible);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [code, codeVisible, $$scope, $$slots, click_handler];
    }

    class DemoPanel extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { code: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DemoPanel",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*code*/ ctx[0] === undefined && !("code" in props)) {
    			console.warn("<DemoPanel> was created without expected prop 'code'");
    		}
    	}

    	get code() {
    		throw new Error("<DemoPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set code(value) {
    		throw new Error("<DemoPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/demo/Description.svelte generated by Svelte v3.24.0 */

    const file$3 = "src/components/demo/Description.svelte";

    function create_fragment$3(ctx) {
    	let section;
    	let h3;
    	let t1;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			section = element("section");
    			h3 = element("h3");
    			h3.textContent = "Description";
    			t1 = space();
    			if (default_slot) default_slot.c();
    			add_location(h3, file$3, 1, 1, 11);
    			add_location(section, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h3);
    			append_dev(section, t1);

    			if (default_slot) {
    				default_slot.m(section, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 1) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[0], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Description> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Description", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, $$slots];
    }

    class Description extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Description",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/components/demo/Properties.svelte generated by Svelte v3.24.0 */

    const file$4 = "src/components/demo/Properties.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    const get_name_slot_changes = dirty => ({});
    const get_name_slot_context = ctx => ({});

    // (1:18)   
    function fallback_block(ctx) {
    	let h4;

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			h4.textContent = "Properties";
    			add_location(h4, file$4, 1, 1, 20);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(1:18)   ",
    		ctx
    	});

    	return block;
    }

    // (16:5) {#if item.type}
    function create_if_block_1(ctx) {
    	let small;
    	let t_value = /*item*/ ctx[3].type + "";
    	let t;

    	const block = {
    		c: function create() {
    			small = element("small");
    			t = text(t_value);
    			attr_dev(small, "class", "svelte-hxl94e");
    			add_location(small, file$4, 16, 6, 256);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, small, anchor);
    			append_dev(small, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1 && t_value !== (t_value = /*item*/ ctx[3].type + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(small);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(16:5) {#if item.type}",
    		ctx
    	});

    	return block;
    }

    // (29:5) {:else}
    function create_else_block(ctx) {
    	let html_tag;
    	let raw_value = /*item*/ ctx[3].def + "";
    	let html_anchor;

    	const block = {
    		c: function create() {
    			html_anchor = empty();
    			html_tag = new HtmlTag(html_anchor);
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1 && raw_value !== (raw_value = /*item*/ ctx[3].def + "")) html_tag.p(raw_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(29:5) {:else}",
    		ctx
    	});

    	return block;
    }

    // (24:5) {#if item.def && (item.def[0] === '#' || item.def.indexOf('rgb') === 0)}
    function create_if_block$1(ctx) {
    	let span;
    	let span_style_value;
    	let t0;
    	let t1_value = /*item*/ ctx[3].def + "";
    	let t1;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(span, "style", span_style_value = `display:inline-block;width:11px;height:11px;border:1px solid #bbb;background-color:${/*item*/ ctx[3].def}`);
    			add_location(span, file$4, 24, 6, 439);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1 && span_style_value !== (span_style_value = `display:inline-block;width:11px;height:11px;border:1px solid #bbb;background-color:${/*item*/ ctx[3].def}`)) {
    				attr_dev(span, "style", span_style_value);
    			}

    			if (dirty & /*data*/ 1 && t1_value !== (t1_value = /*item*/ ctx[3].def + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(24:5) {#if item.def && (item.def[0] === '#' || item.def.indexOf('rgb') === 0)}",
    		ctx
    	});

    	return block;
    }

    // (12:2) {#each data as item}
    function create_each_block(ctx) {
    	let tr;
    	let td0;
    	let code;
    	let t0_value = /*item*/ ctx[3].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let td1;
    	let raw_value = /*item*/ ctx[3].desc + "";
    	let t3;
    	let td2;
    	let show_if;
    	let t4;
    	let if_block0 = /*item*/ ctx[3].type && create_if_block_1(ctx);

    	function select_block_type(ctx, dirty) {
    		if (show_if == null || dirty & /*data*/ 1) show_if = !!(/*item*/ ctx[3].def && (/*item*/ ctx[3].def[0] === "#" || /*item*/ ctx[3].def.indexOf("rgb") === 0));
    		if (show_if) return create_if_block$1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx, -1);
    	let if_block1 = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			code = element("code");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block0) if_block0.c();
    			t2 = space();
    			td1 = element("td");
    			t3 = space();
    			td2 = element("td");
    			if_block1.c();
    			t4 = space();
    			attr_dev(code, "class", "svelte-hxl94e");
    			add_location(code, file$4, 14, 5, 204);
    			attr_dev(td0, "class", "svelte-hxl94e");
    			add_location(td0, file$4, 13, 4, 194);
    			attr_dev(td1, "class", "svelte-hxl94e");
    			add_location(td1, file$4, 19, 4, 308);
    			attr_dev(td2, "class", "svelte-hxl94e");
    			add_location(td2, file$4, 22, 4, 350);
    			attr_dev(tr, "class", "svelte-hxl94e");
    			add_location(tr, file$4, 12, 3, 185);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, code);
    			append_dev(code, t0);
    			append_dev(td0, t1);
    			if (if_block0) if_block0.m(td0, null);
    			append_dev(tr, t2);
    			append_dev(tr, td1);
    			td1.innerHTML = raw_value;
    			append_dev(tr, t3);
    			append_dev(tr, td2);
    			if_block1.m(td2, null);
    			append_dev(tr, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1 && t0_value !== (t0_value = /*item*/ ctx[3].name + "")) set_data_dev(t0, t0_value);

    			if (/*item*/ ctx[3].type) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					if_block0.m(td0, null);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty & /*data*/ 1 && raw_value !== (raw_value = /*item*/ ctx[3].desc + "")) td1.innerHTML = raw_value;
    			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(td2, null);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			if (if_block0) if_block0.d();
    			if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(12:2) {#each data as item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let t0;
    	let div;
    	let table;
    	let tr;
    	let th0;
    	let t2;
    	let th1;
    	let t4;
    	let th2;
    	let t6;
    	let current;
    	const name_slot_template = /*$$slots*/ ctx[2].name;
    	const name_slot = create_slot(name_slot_template, ctx, /*$$scope*/ ctx[1], get_name_slot_context);
    	const name_slot_or_fallback = name_slot || fallback_block(ctx);
    	let each_value = /*data*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			if (name_slot_or_fallback) name_slot_or_fallback.c();
    			t0 = space();
    			div = element("div");
    			table = element("table");
    			tr = element("tr");
    			th0 = element("th");
    			th0.textContent = "Name";
    			t2 = space();
    			th1 = element("th");
    			th1.textContent = "Description";
    			t4 = space();
    			th2 = element("th");
    			th2.textContent = "Default";
    			t6 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(th0, "class", "svelte-hxl94e");
    			add_location(th0, file$4, 7, 3, 93);
    			attr_dev(th1, "class", "svelte-hxl94e");
    			add_location(th1, file$4, 8, 3, 110);
    			attr_dev(th2, "class", "svelte-hxl94e");
    			add_location(th2, file$4, 9, 3, 134);
    			attr_dev(tr, "class", "svelte-hxl94e");
    			add_location(tr, file$4, 6, 2, 85);
    			attr_dev(table, "class", "svelte-hxl94e");
    			add_location(table, file$4, 5, 1, 75);
    			attr_dev(div, "class", "properties");
    			add_location(div, file$4, 4, 0, 49);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (name_slot_or_fallback) {
    				name_slot_or_fallback.m(target, anchor);
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, table);
    			append_dev(table, tr);
    			append_dev(tr, th0);
    			append_dev(tr, t2);
    			append_dev(tr, th1);
    			append_dev(tr, t4);
    			append_dev(tr, th2);
    			append_dev(table, t6);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(table, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (name_slot) {
    				if (name_slot.p && dirty & /*$$scope*/ 2) {
    					update_slot(name_slot, name_slot_template, ctx, /*$$scope*/ ctx[1], dirty, get_name_slot_changes, get_name_slot_context);
    				}
    			}

    			if (dirty & /*data*/ 1) {
    				each_value = /*data*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(table, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(name_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(name_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (name_slot_or_fallback) name_slot_or_fallback.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { data = [] } = $$props;
    	const writable_props = ["data"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Properties> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Properties", $$slots, ['name']);

    	$$self.$set = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ data });

    	$$self.$inject_state = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [data, $$scope, $$slots];
    }

    class Properties extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { data: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Properties",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get data() {
    		throw new Error("<Properties>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<Properties>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/pages/home/Home.svelte generated by Svelte v3.24.0 */

    // (1:0) <Description>
    function create_default_slot(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("This is a demo of work in progress...");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(1:0) <Description>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let description;
    	let current;

    	description = new Description({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(description.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(description, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const description_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				description_changes.$$scope = { dirty, ctx };
    			}

    			description.$set(description_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(description.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(description.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(description, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Home", $$slots, []);
    	$$self.$capture_state = () => ({ DemoPanel, Description, Properties });
    	return [];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n);}function r(t){return "function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(t){t.parentNode.removeChild(t);}function a(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}let i;function f(t){i=t;}function l(){const t=function(){if(!i)throw new Error("Function called outside component initialization");return i}();return (n,e)=>{const o=t.$$.callbacks[n];if(o){const r=function(t,n){const e=document.createEvent("CustomEvent");return e.initCustomEvent(t,!1,!1,n),e}(n,e);o.slice().forEach(n=>{n.call(t,r);});}}}const s=[],d=[],h=[],m=[],p=Promise.resolve();let $=!1;function g(t){h.push(t);}let y=!1;const b=new Set;function x(){if(!y){y=!0;do{for(let t=0;t<s.length;t+=1){const n=s[t];f(n),E(n.$$);}for(s.length=0;d.length;)d.pop()();for(let t=0;t<h.length;t+=1){const n=h[t];b.has(n)||(b.add(n),n());}h.length=0;}while(s.length);for(;m.length;)m.pop()();$=!1,y=!1,b.clear();}}function E(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(g);}}const _=new Set;function v(t,n){-1===t.$$.dirty[0]&&(s.push(t),$||($=!0,p.then(x)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31;}function k(c,a,l,s,d,h,m=[-1]){const p=i;f(c);const $=a.props||{},y=c.$$={fragment:null,ctx:null,props:h,update:t,not_equal:d,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(p?p.$$.context:[]),callbacks:e(),dirty:m};let b=!1;if(y.ctx=l?l(c,$,(t,n,...e)=>{const o=e.length?e[0]:n;return y.ctx&&d(y.ctx[t],y.ctx[t]=o)&&(y.bound[t]&&y.bound[t](o),b&&v(c,t)),n}):[],y.update(),b=!0,o(y.before_update),y.fragment=!!s&&s(y.ctx),a.target){if(a.hydrate){const t=function(t){return Array.from(t.childNodes)}(a.target);y.fragment&&y.fragment.l(t),t.forEach(u);}else y.fragment&&y.fragment.c();a.intro&&((E=c.$$.fragment)&&E.i&&(_.delete(E),E.i(k))),function(t,e,c){const{fragment:u,on_mount:a,on_destroy:i,after_update:f}=t.$$;u&&u.m(e,c),g(()=>{const e=a.map(n).filter(r);i?i.push(...e):o(e),t.$$.on_mount=[];}),f.forEach(g);}(c,a.target,a.anchor),x();}var E,k;f(p);}function w(n){let e,c,i,f,l;return {c(){var t,o,r,u,a;t="button",e=document.createElement(t),o=n[0],c=document.createTextNode(o),r=e,u="class",null==(a="w3-button")?r.removeAttribute(u):r.getAttribute(u)!==a&&r.setAttribute(u,a);},m(o,u){var s;!function(t,n,e){t.insertBefore(n,e||null);}(o,e,u),function(t,n){t.appendChild(n);}(e,c),f||(l=[a(e,"click",n[2]),(s=i=n[1].call(null,e),s&&r(s.destroy)?s.destroy:t)],f=!0);},p(t,[n]){1&n&&function(t,n){n=""+n,t.wholeText!==n&&(t.data=n);}(c,t[0]);},i:t,o:t,d(t){t&&u(e),f=!1,o(l);}}}function A(t,n,e){let{name:o="Label"}=n;const r=l(),c=(u=i,t=>{const n=Object.keys(u.$$.callbacks),e=[];return n.forEach(n=>e.push(a(t,n,t=>function(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(t=>t(n));}(u,t)))),{destroy:()=>{e.forEach(t=>t());}}});var u;return t.$set=t=>{"name"in t&&e(0,o=t.name);},[o,c,function(t){r("change");}]}class C extends class{$destroy(){!function(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[]);}(this,1),this.$destroy=t;}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1);}}$set(){}}{constructor(t){super(),k(this,t,A,w,c,{name:0});}}

    var code = "<pre><code class=\"language-javascript\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">Button</span> <span class=\"hljs-attr\">name</span>=<span class=\"hljs-string\">&quot;Click Me&quot;</span> <span class=\"hljs-attr\">on:click</span>=<span class=\"hljs-string\">{increment}</span> /&gt;</span>\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"javascript\">\n    <span class=\"hljs-keyword\">import</span> { Button } <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#x27;@kvraamkey/svelte-ui&#x27;</span>;\n\n    <span class=\"hljs-keyword\">let</span> counter = <span class=\"hljs-number\">0</span>;\n\n    <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">increment</span>(<span class=\"hljs-params\"></span>) </span>{\n        counter += <span class=\"hljs-number\">1</span>;\n    }\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span></code></pre>\n";

    var doc = "<p>Button component contains two major types of buttons, namely, regular (default) and icon button (when setting icon property). Icon button can be configured as FAB (Floating Action Button) by setting fab property. The button can become a toggle by setting the toggle property</p>\n";

    var properties = [
    	{
    		name: 'class',
    		def: "''",
    		type: 'string',
    		desc: 'Custom global CSS class name',
    	},
    ];

    var custom = [
    	{
    		name: '--button-font-family',
    		def: "<span style='font-family:Roboto, Helvetica, sans-serif'>Roboto, Helvetica, sans-serif</span>",
    		desc: "Button's font family",
    	},
    	{
    		name: '--primary',
    		def: '#1976d2',
    		desc: 'Primary color',
    	},
    	{
    		name: '--accent',
    		def: '#f50057',
    		desc: 'Accent color',
    	},
    ];

    /* src/pages/button/Button.svelte generated by Svelte v3.24.0 */
    const file$5 = "src/pages/button/Button.svelte";

    // (1:0) <DemoPanel {code}>
    function create_default_slot_2(ctx) {
    	let button;
    	let current;

    	button = new C({
    			props: { name: "counter: " + /*counter*/ ctx[0] },
    			$$inline: true
    		});

    	button.$on("click", /*increment*/ ctx[1]);

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};
    			if (dirty & /*counter*/ 1) button_changes.name = "counter: " + /*counter*/ ctx[0];
    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(1:0) <DemoPanel {code}>",
    		ctx
    	});

    	return block;
    }

    // (5:0) <Description>
    function create_default_slot_1(ctx) {
    	let html_tag;
    	let html_anchor;

    	const block = {
    		c: function create() {
    			html_anchor = empty();
    			html_tag = new HtmlTag(html_anchor);
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(doc, target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(5:0) <Description>",
    		ctx
    	});

    	return block;
    }

    // (12:1) <h4 slot="name" class="w3-margin-top">
    function create_name_slot(ctx) {
    	let h4;

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			h4.textContent = "CSS custom properties";
    			attr_dev(h4, "slot", "name");
    			attr_dev(h4, "class", "w3-margin-top");
    			add_location(h4, file$5, 11, 1, 197);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_name_slot.name,
    		type: "slot",
    		source: "(12:1) <h4 slot=\\\"name\\\" class=\\\"w3-margin-top\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let demopanel;
    	let t0;
    	let description;
    	let t1;
    	let properties0;
    	let t2;
    	let properties1;
    	let current;

    	demopanel = new DemoPanel({
    			props: {
    				code,
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	description = new Description({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	properties0 = new Properties({
    			props: { data: properties },
    			$$inline: true
    		});

    	properties1 = new Properties({
    			props: {
    				data: custom,
    				$$slots: { name: [create_name_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(demopanel.$$.fragment);
    			t0 = space();
    			create_component(description.$$.fragment);
    			t1 = space();
    			create_component(properties0.$$.fragment);
    			t2 = space();
    			create_component(properties1.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(demopanel, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(description, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(properties0, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(properties1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const demopanel_changes = {};

    			if (dirty & /*$$scope, counter*/ 5) {
    				demopanel_changes.$$scope = { dirty, ctx };
    			}

    			demopanel.$set(demopanel_changes);
    			const description_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				description_changes.$$scope = { dirty, ctx };
    			}

    			description.$set(description_changes);
    			const properties1_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				properties1_changes.$$scope = { dirty, ctx };
    			}

    			properties1.$set(properties1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(demopanel.$$.fragment, local);
    			transition_in(description.$$.fragment, local);
    			transition_in(properties0.$$.fragment, local);
    			transition_in(properties1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(demopanel.$$.fragment, local);
    			transition_out(description.$$.fragment, local);
    			transition_out(properties0.$$.fragment, local);
    			transition_out(properties1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(demopanel, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(description, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(properties0, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(properties1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let counter = 0;

    	const increment = e => {
    		$$invalidate(0, counter += 1);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Button", $$slots, []);

    	$$self.$capture_state = () => ({
    		Button: C,
    		DemoPanel,
    		Description,
    		Properties,
    		code,
    		doc,
    		properties,
    		custom,
    		counter,
    		increment
    	});

    	$$self.$inject_state = $$props => {
    		if ("counter" in $$props) $$invalidate(0, counter = $$props.counter);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [counter, increment];
    }

    class Button_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button_1",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    const components = {
    	Introduction: Home,
    	Button: Button_1,
    };

    /* src/App.svelte generated by Svelte v3.24.0 */
    const file$6 = "src/App.svelte";

    function create_fragment$7(ctx) {
    	let header;
    	let t0;
    	let section;
    	let asise;
    	let t1;
    	let div;
    	let h2;
    	let t2;
    	let t3;
    	let switch_instance;
    	let current;
    	header = new Header({ $$inline: true });
    	asise = new Aside({ $$inline: true });

    	var switch_value = /*$url*/ ctx[0]
    	? components[/*$url*/ ctx[0]]
    	: components["Introduction"];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			section = element("section");
    			create_component(asise.$$.fragment);
    			t1 = space();
    			div = element("div");
    			h2 = element("h2");
    			t2 = text(/*$url*/ ctx[0]);
    			t3 = space();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			add_location(h2, file$6, 4, 2, 108);
    			attr_dev(div, "class", "w3-container w3-padding main svelte-u7klrg");
    			add_location(div, file$6, 3, 1, 63);
    			attr_dev(section, "class", "content w3-text-black svelte-u7klrg");
    			add_location(section, file$6, 1, 0, 11);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			mount_component(asise, section, null);
    			append_dev(section, t1);
    			append_dev(section, div);
    			append_dev(div, h2);
    			append_dev(h2, t2);
    			append_dev(div, t3);

    			if (switch_instance) {
    				mount_component(switch_instance, div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*$url*/ 1) set_data_dev(t2, /*$url*/ ctx[0]);

    			if (switch_value !== (switch_value = /*$url*/ ctx[0]
    			? components[/*$url*/ ctx[0]]
    			: components["Introduction"])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(asise.$$.fragment, local);
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(asise.$$.fragment, local);
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    			destroy_component(asise);
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let $url;
    	validate_store(url, "url");
    	component_subscribe($$self, url, $$value => $$invalidate(0, $url = $$value));

    	onMount(async () => {
    		url.update(u => getUrlParam("c")
    		? toCamelCase(getUrlParam("c"))
    		: "Introduction");
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	$$self.$capture_state = () => ({
    		onMount,
    		url,
    		Header,
    		Asise: Aside,
    		Components: components,
    		getUrlParam,
    		toCamelCase,
    		$url
    	});

    	return [$url];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {},
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
