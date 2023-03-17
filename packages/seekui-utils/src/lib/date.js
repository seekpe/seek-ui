import * as moment from 'moment'
import 'moment-timezone'

export function customDateTimeZone (date) {
  if (date) {
    const m = moment.tz(date, 'America/Lima')
    const tz = moment.tz.guess()
    const r = m.tz(tz)
    return r
  }
}

export function isFinishDate (serverDate, currentDate) {
  return serverDate.isBefore(currentDate)
}
