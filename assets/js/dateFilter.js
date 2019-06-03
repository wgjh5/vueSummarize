export default {
	//获取今天日期
    getToday(value) {
        let now = new Date();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        if (month < 10) month = '0' + month
        if (day < 10) day = '0' + day
        if (value) {
            return now.getFullYear() + '-' + month
        }
        return now.getFullYear() + '-' + month + '-' + day
    },
    //获取前几天的日期，参数day为天数
    getDay(day) {　　
        let today = new Date();　　
        let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;　　
        today.setTime(targetday_milliseconds);　　
        let tYear = today.getFullYear();　　
        let tMonth = today.getMonth();　　
        let tDate = today.getDate();　　
        tMonth = this.doHandleMonth(tMonth + 1);　　
        tDate = this.doHandleMonth(tDate);　　
        return tYear + "-" + tMonth + "-" + tDate;

    },
    doHandleMonth(month) {　　
        let m = month;　　
        if (month.toString().length == 1) {　　　　 m = "0" + month;　　 }　　
        return m;
    },
    //获取date的n个月前的今天的日期
    getPreMonth(date, n) {
        let arr = date.split('-');
        let tYear = arr[0]; //获取当前日期的年份
        let tMonth = arr[1]; //获取当前日期的月份
        let tDate = arr[2]; //获取当前日期的日

        let days = new Date(tYear, tMonth, 0);
        days = days.getDate(); //获取当前日期中月的天数
        let year2 = tYear;
        let month2 = parseInt(tMonth) - parseInt(n);
        if (month2 <= 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12 + month2;
        }
        let day2 = tDate;
        let days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        let t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
    }
}