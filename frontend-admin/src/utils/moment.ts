import moment from 'moment'

export const formatDateTime = <T>(date: T) => {
  return moment(date).format('YYYY/MM/DD HH:mm')
}

export const formatDate = <T>(date: T) => {
  return moment(date).format('YYYY/MM/DD')
}
