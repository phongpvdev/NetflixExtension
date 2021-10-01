function getOptions() {
    return new Promise(resolve => {
        chrome.storage.sync.get('netflixOptions', items => {
            let options = items['netflixOptions'];
            if (options == null || options === "{}") {
                options = {};
            }
            options.autoSkipIntro = options.hasOwnProperty('autoSkipIntro') ? options.autoSkipIntro : false;
            options.autoNextEpisode = options.hasOwnProperty('autoNextEpisode') ? options.autoNextEpisode : false;
            resolve(options);
        })
    });
}

const autoClick = function(mutations, observer) {
    for (let mutation of mutations) {
        for (let node of mutation.addedNodes) {
            if (node.nodeType == 1) {
                let isClickSkip = node.classList.contains('watch-video--skip-content');
                let isClickNext = node.dataset.uia == 'next-episode-seamless-button';
                if (isClickSkip || isClickNext) {
                    getOptions().then(option => {
                        if (option.autoSkipIntro && isClickSkip) {
                            node.firstChild.click();
                        }
                        if (option.autoNextEpisode && isClickNext) {
                            node.firstChild.click();
                        }
                    })
                }
            }
        }
    }
};
const mutationObserver = new MutationObserver(autoClick);
const element = document.documentElement;
const config = { attributes: true, childList: true, subtree: true };
mutationObserver.observe(element, config);