// js 版的 media query
const md = 768;
const lg = 1200;

const min = (value) => `(min-width: ${value}px)`;
const max = (value) => `(max-width: ${value - 1}px)`;
const between = (min, max) => `(min-width: ${min}px) and (max-width: ${max - 1}px)`;

const phone = window.matchMedia(max(md));
const padDown = window.matchMedia(max(lg));
const pad = window.matchMedia(between(md, lg));
const padUp = window.matchMedia(min(md));
const pcDown = window.matchMedia(max(lg));
const pc = window.matchMedia(min(lg));
const pcUp = window.matchMedia(min(lg));
const wide = window.matchMedia(min(lg));

let media = Vue.observable({
    isPhone: false,
    isPadDown: false,
    isPad: false,
    isPadUp: false,
    isPcDown: false,
    isPc: false,
    isPcUp: false,
    isWide: false
});

setMediaQuery();
addListener(phone);
addListener(pad);
addListener(pc);
addListener(wide);

function addListener(matchMedia) {
    matchMedia.addListener((query) => {
        if (query.matches) {
            console.log(query.matches)
            setMediaQuery();
        }
    });
}

function setMediaQuery() {
    media.isPhone = phone.matches;
    media.isPadDown = padDown.matches;
    media.isPad = pad.matches;
    media.isPadUp = padUp.matches;
    media.isPcDown = pcDown.matches;
    media.isPc = pc.matches;
    media.isPcUp = pcUp.matches;
    media.isWide = wide.matches;
}