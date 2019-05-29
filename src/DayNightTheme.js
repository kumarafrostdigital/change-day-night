import moment from "moment";
import PropTypes from "prop-types";
import { ThemeTypes } from "./ThemeTypes";

class DayNightTheme {
  constructor({
    dayStart = { hour: 6 },
    dayEnd = { hour: 18 },
    didChangeDayNight
  }) {
    this.dayStart = dayStart;
    this.dayEnd = dayEnd;
    this.didChangeEvent = didChangeDayNight;
  }

  // #region Day night

  start() {
    console.log("started");

    const that = this;
    if (!!this.dayNightTimer) clearTimeout(this.dayNightTimer);

    this.dayNightTimer = setTimeout(function changeDayNight() {
      that.changeDayNight();
      that.dayNightTimer = setTimeout(
        changeDayNight,
        that.getCalculatedDayNightEnd()
      );
    }, that.getCalculatedDayNightEnd());
  }

  stop() {
    clearTimeout(this.dayNightTimer);
  }

  getCalculatedDayNightEnd = () => {
    const now = moment();
    const sixAM = moment({ ...this.dayStart });

    if (now.isBefore(sixAM)) {
      return sixAM.diff(now);
    }

    const sixPM = moment({ ...this.dayEnd });
    if (now.isBetween(sixAM, sixPM)) {
      return sixPM.diff(now);
    }

    if (now.isSameOrAfter(sixPM)) {
      const tomorrowSixAM = sixAM.clone().add(1, "d");
      return tomorrowSixAM.diff(now);
    }

    return 0;
  };

  getCurrentTheme = () => {
    const sixAM = moment({ ...this.dayStart });
    const sixPM = moment({ ...this.dayEnd });
    const now = moment();

    return now.isBetween(sixAM, sixPM) ? ThemeTypes.DAY : ThemeTypes.NIGHT;
  };

  changeDayNight = async () => {
    const currentTheme = this.getCurrentTheme();
    this.didChangeEvent(currentTheme);
  };

  // #endregion
}

DayNightTheme.propTypes = {
  dayStart: PropTypes.object,
  dayEnd: PropTypes.object,
  didChangeDayNight: PropTypes.func.isRequired
};

export default DayNightTheme;