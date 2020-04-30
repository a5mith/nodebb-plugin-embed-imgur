(function () {

    const replacements = [{
        regex: /<a href="(?:https?:\/\/)?(?:imgur\.com)\/(?:gallery|a)\/?([\w\-_]+)(#[^"]*)?"[^>]*>[^<]+<\/a>/g,
        replacement: '<blockquote class="imgur-embed-pub" lang="en" data-id="a/$1"></blockquote>',
    }, {
        regex: /<a href="(?:https?:\/\/)?(?:imgur\.com)\/?([\w\-_]+)(#[^"]*)?">.+<\/a>/g,
        replacement: '<blockquote class="imgur-embed-pub" lang="en" data-id="$1"></blockquote>',
    }];

    function insertScript(url) {
        const script_el = document.createElement("script")
        script_el.src = url
        script_el.async = true
        document.head.appendChild(script_el)
    }

    function replaceLink(element) {
        replacements.some((replacement) => {
            const matches = element.outerHTML.match(replacement.regex)
            if (matches) {
                element.outerHTML = element.outerHTML.replace(replacement.regex, replacement.replacement)
                setTimeout(() => { insertScript('//s.imgur.com/min/embed.js') })
                return true;
            }
        });
    }

    function replaceInPost(pid) {
        document.querySelectorAll(`[component="post"][data-pid="${pid}"] [component="post/content"] a`).forEach(replaceLink);
    }

    document.querySelectorAll('[component="post"][data-pid]').forEach((element) => {
        const pid = parseInt(element.getAttribute("data-pid"), 10);
        if (pid) {
            replaceInPost(pid);
        }
    });

    $(window).on('action:posts.loaded', function (event, data) {
        data.posts.forEach((p) => replaceInPost(p.pid));
    });

    $(window).on('action:posts.edited', function (event, data) {
        replaceInPost(data.post.pid);
    });
}());
