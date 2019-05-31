# change-day-night
Listening to day night changes


## install
npm install --save npm i change-day-night

## create
new DayNightTheme({ dayStart, dayEnd, didChangeDayNight });
###### sample
*new DayNightTheme({ dayEnd: { hour: 14, minute: 26 }, didChangeDayNight: this.didChangeDayNight });*

## arguments
- dayStart - start of the day session. [moment](https://momentjs.com/) acceptable object which defines hour and minute. optional, default is { hour: 6 }
- dayEnd - end of the day session. [moment](https://momentjs.com/) acceptable object which defines hour and minute. optional, default is { hour: 18 }
- didChangeDayNight - triggers with the theme value after changing the day to night or night to day. this is required.

## methods
- start - start listening to day/night changes.
- stop - stop listening to day/night changes.
