import moment from 'moment'

export const fmtDate = (time, fmt) => {
  if (!time) {
    return ''
  }
  return moment(time).format(fmt);
}
