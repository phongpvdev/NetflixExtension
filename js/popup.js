let netflixOptions = {};

window.onload = function() {
    getOptions().then(option => {
        netflixOptions = option;
        $("#autoSkipIntro").prop('checked', netflixOptions.autoSkipIntro);
        $("#autoNextEpisode").prop('checked', netflixOptions.autoNextEpisode);

        $('.toggle__input').change(function() {
            changeOption(this);
        });
    });

    $('.toggle__input').change(function() {
        changeOption(this);
    });
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function clickButton(elem) {
    debugger;
    switch (elem.id) {
        case "autoSkipIntro":
            netflixOptions.autoSkipIntro = $('#autoSkipIntro')[0].checked;
            break;
        case "autoNextEpisode":
            netflixOptions.autoNextEpisode = $('#autoNextEpisode')[0].checked;
            break;
    }

    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}

function getOptions() {
    return new Promise(resolve => {
        chrome.storage.sync.get('netflixOptions', items => {
            let option = items['netflixOptions'];
            if (option == null || option === "{}") {
                option = {};
            }
            option.autoSkipIntro = option.hasOwnProperty('autoSkipIntro') ? option.autoSkipIntro : false;
            option.autoNextEpisode = option.hasOwnProperty('autoNextEpisode') ? option.autoNextEpisode : false;
            resolve(option);
        })
    });
}

function changeOption(elem) {
    switch (elem.id) {
        case "autoSkipIntro":
            netflixOptions.autoSkipIntro = $('#autoSkipIntro')[0].checked;
            break;
        case "autoNextEpisode":
            netflixOptions.autoNextEpisode = $('#autoNextEpisode')[0].checked;
            break;
    }
    setOptions();
}

function setOptions() {
    chrome.storage.sync.set({
        'netflixOptions': netflixOptions
    });
}