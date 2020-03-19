const displayTimeH2 = document.querySelector('.display__time-left');
const displayEndTimeP = document.querySelector('.display__end-time');


function timer(seconds){
    let countdown;
    clearInterval(countdown)
    const now = Date.now();
    const then = now + seconds * 1000;
    const secondsLeftStart = (then - now)/1000;
    displayEndTimeFunc(then);
    displayTime(secondsLeftStart);
    
    
    countdown = setInterval(()=>{
        let secondsLeft = Math.round((then - Date.now())/1000);
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        displayTime(secondsLeft, then)
    }, 1000)
}

function displayTime(seconds){
    const minutes = Math.floor(seconds/60);
    const remainderSeconds = seconds%60;
    const dis = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
    displayTimeH2.textContent= dis;
    document.title = dis;

}

function displayEndTimeFunc(timestamp){
    
    const end = new Date(timestamp);
    const hours = end.getHours();
    const disHours = hours > 12 ? hours-12 : hours;
    const minutes = end.getHours();
    const dis = `${disHours}:${minutes}`
    
    displayEndTimeP.textContent = `Be back at ${dis}` 
}