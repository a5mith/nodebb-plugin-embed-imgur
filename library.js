(function(module) {
    "use strict";
    var Imgur = {},
        post = '<blockquote class="imgur-embed-pub" lang="en" data-id="$1"></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>',
        galleries = '<blockquote class="imgur-embed-pub" lang="en" data-id="a/$1"></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>'
    var	embedgallery = /<a href="(?:https?:\/\/)?(?:imgur\.com)\/gallery\/?([\w\-_]+)">.+<\/a>/g;
    var	embedpost = /<a href="(?:https?:\/\/)?(?:imgur\.com)\/?([\w\-_]+)">.+<\/a>/g;


    Imgur.parse = function(data, callback) {

        if (!data || !data.postData || !data.postData.content) {
            return callback(null, data);
        }
        if (data.postData.content.match(embedpost)) {
            data.postData.content = data.postData.content.replace(embedpost, post);
        }
        if (data.postData.content.match(embedgallery)) {
            data.postData.content = data.postData.content.replace(embedgallery, galleries);
        }

        callback(null, data);
    };

    module.exports = Imgur;
}(module));
