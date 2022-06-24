import _ from 'lodash'
import moment from 'moment'

export const formatDate = (date: string) => {
  return moment(date).format('YYYY/MM/DD')
}

export const formatDateTime = (date?: string | null) => {
  if (!date) return ''
  return moment(date).format('YYYY/MM/DD HH:mm')
}

export const formatStoreList = (
  stores: { label?: string | null; value?: number | null }[],
  shopIds?: number[] | null
) => {
  if (!shopIds || !shopIds.length) return '本部'
  return shopIds.map(
    (shopId) => _.find(stores, (store) => store.value === shopId)?.label
  )
}

export const formatNull = (value: any) => {
  return value || 'ー'
}

export const formatSex = (value: number): string => {
  let name = ''
  if (value === 0) name = '男性'
  if (value === 1) name = '女性'
  return name
}

export const formatCustomerKind = (value: number) => {
  let customerKind = ''
  if (value === 0) customerKind = '個人'
  if (value === 1) customerKind = '法人'
  return customerKind
}
