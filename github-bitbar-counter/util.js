import { map, flatten, compact } from 'lodash';

export const toQueryString = obj => map(obj, (value, key) => `${key}=${value}`).join('&')

export const toGHSearchQueryString = obj => flatten(map(obj, (value, key) => {
  if (key === 'labelsIn' ) {
    return value.map(label => `label:"${label}"`)
  }
  if (key === 'labelsOut') {
    return value.map(label => `-label:"${label}"`)
  }
  if (key === 'milestone' && value === null) {
    return `no:milestone`;
  }
  return `${key}:"${value}"`
})).join('+')
