import moment from "moment";
import PropTypes from 'prop-types';

export default class DayNightTheme {
	constructor(props) {
		this.props = props;
		console.log(this.props.dayStart);
	}

	// #region Day night

	start() {
		console.log("started");
		
		const that = this;
		if (!!this.dayNightTimer)
			clearTimeout(this.dayNightTimer);
		
		this.dayNightTimer = setTimeout(function changeDayNight() {
			that.changeDayNight();
			that.dayNightTimer = setTimeout(changeDayNight, that.getCalculatedDayNightEnd());
		}, that.getCalculatedDayNightEnd());
	}

	stop() {
		clearTimeout(this.dayNightTimer);
	}

	getCalculatedDayNightEnd = () => {
		const now = moment();
		const sixAM = moment({ hour: this.props.dayStart });

		if (now.isBefore(sixAM)) {
			return sixAM.diff(now);
		}

		const sixPM = moment({ hour: this.props.dayEnd });
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
		const sixAM = moment({ hour: this.props.dayStart });
		const sixPM = moment({ hour: this.props.dayEnd });
		const now = moment();

		return now.isBetween(sixAM, sixPM) ? THEME_TYPE.DAY : THEME_TYPE.NIGHT;
	};

	changeDayNight = async () => {
		const currentTheme = this.getCurrentTheme();
		this.props.didChangeDayNight(currentTheme);
	};

	// #endregion
}

DayNightTheme.defaultProps = {
	dayStart: 6,
	dayEnd: 18
};

DayNightTheme.propTypes = {
	dayStart: PropTypes.number,
	dayEnd: PropTypes.number,
	didChangeDayNight: PropTypes.func.isRequired
}

export const THEME_TYPE = {
  DAY: "day",
  NIGHT: "night"
};