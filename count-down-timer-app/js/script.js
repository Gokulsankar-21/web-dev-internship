//-----Interactive Design using JS-----//

// Get Element using getElementById
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

// Countdown timer
function updateTime() {
    const currentYear = new Date();
    const nextYear = new Date(`1 jan ${currentYear.getFullYear() + 1} 00:00:00`);
    const differ = nextYear - currentYear;

    const d = Math.floor(differ / 1000 / 60 / 60 / 24);
    const h = Math.floor(differ / 1000 / 60 / 60) % 24;
    const m = Math.floor(differ / 1000 / 60) % 60;
    const s = Math.floor(differ / 1000) % 60;

    // for debug
    console.log(d + " " + h + " " + m + " " + s);

    //----DOM Manipulation----//
    days.innerHTML = d < 10 ? '0' + d : d;
    hours.innerHTML = h < 10 ? '0' + h : h;
    minutes.innerHTML = m < 10 ? '0' + m : m;
    seconds.innerHTML = s < 10 ? '0' + s : s;
}


setInterval(updateTime, 1000);

/*
    Note :
        setInterval() : function to be called by itself with given time
*/

