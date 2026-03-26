let documentHeight = Math.max(
    document.body.scrollHeight, 
    document.documentElement.scrollHeight, 
    document.body.offsetHeight, 
    document.documentElement.offsetHeight, 
    document.body.clientHeight, 
    document.documentElement.clientHeight
);

let getScroll = () => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;