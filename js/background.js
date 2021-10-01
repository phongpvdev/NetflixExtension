let netflixOptions = {
    autoSkipIntro: false,
    autoNextEpisode: false
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ netflixOptions });
    console.log('Default background color set to: %', `${netflixOptions}`);
});