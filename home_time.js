const plus0 = num => {
    let plus0
    if (num < 10) {
        plus0 = "0" + num
    } else {
        plus0 = num
    } return plus0
}
const clock = () => {
        const now = new Date();

        let month = plus0(now.getMonth() + 1)
        let hours = plus0(now.getHours())
        let Minutes = plus0(now.getMinutes())
        

        document.getElementById('clock_time').textContent 
        = hours + ":" + Minutes
}
clock()
setInterval(clock, 1000)