import _ from 'lodash'
export const DEFAULT_ITEMS_PER_PAGE = 50

export interface DataTableOptions {
  options: {
    page: number
    itemsPerPage: number
    sortBy: string[]
    sortDesc: boolean[]
  }
  footerProps: {
    itemsPerPageOptions: number[]
  }
}

export const defaultDataTableOptions = (
  sortBy: string,
  sortDesc: boolean
): DataTableOptions => {
  return {
    options: {
      page: 1,
      itemsPerPage: 50,
      sortBy: [sortBy],
      sortDesc: [sortDesc],
    },
    footerProps: {
      itemsPerPageOptions: [50, 100],
    },
  }
}

export function extractSearchParams(query: any, keys: string[]) {
  return _.pickBy(query, (value, key) => {
    return !_.isEmpty(value) && keys.includes(key)
  })
}

export const assignSearchParamsByQuery = (
  params: any,
  defaultParams: any,
  query: any
) => {
  params.value = Object.assign(
    {},
    defaultParams,
    extractSearchParams(query, Object.keys(defaultParams))
  )

  if (query.page) {
    params.value.options.page = parseInt(query.page as any)
  }

  if (query.itemsPerPage) {
    params.value.options.itemsPerPage = parseInt(query.itemsPerPage as any)
  }

  if (query.sortColumn) {
    params.value.options.sortBy = [query.sortColumn]
  }

  if (query.sortOrder) {
    params.value.options.sortDesc = [query.sortOrder === 'DESC']
  }
}
