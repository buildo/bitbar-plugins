import bitbar from 'bitbar'
import { pick, flatten, zip } from 'lodash'
import fetch from './fetch'
import {
  GITHUB_COM_API, GITHUB_COM, PATHS, GITHUB_ICON,
  PURPLE, GREEN, BLUE, ORANGE, RED
} from './constants'
import { toQueryString, toGHSearchQueryString } from './util'

export default (config) => (...githubQueries) => {

  const {
    GITHUB_COM_TOKEN,
    GITHUB_ENTERPRISE_TOKEN,
    GITHUB_ENTERPRISE,
    GITHUB_ENTERPRISE_API
  } = config

  const fetchGithubCounters = (...searches) => fetch(...searches.map(makeApiUrl))

  const makeApiUrl = ({ name = '', enterprise = false, ...query }) => {
    const GITHUB_API = enterprise ? GITHUB_ENTERPRISE_API : GITHUB_COM_API
    const access_token =  enterprise ? GITHUB_ENTERPRISE_TOKEN : GITHUB_COM_TOKEN
    const q = toGHSearchQueryString(query)
    const QUERY_STRING = toQueryString({ q, access_token })
    return `${GITHUB_API}${PATHS.SEARCH}?${QUERY_STRING}`
  }

  const makeWebUrl = ({ name = '', enterprise = false, repo, ...query }) => {
    const GITHUB = enterprise ? GITHUB_ENTERPRISE : GITHUB_COM
    const REPO = repo ? `/${repo}` : ''
    const q = toGHSearchQueryString(query)
    const QUERY_STRING = toQueryString({ q })
    return encodeURI(`${GITHUB}${REPO}${PATHS.ISSUES}?${QUERY_STRING}`)
  }

  const bitBarDisplay = (...rows) => bitbar(flatten(rows.map(row => ([row, bitbar.sep]))))

  const showLines = (...queries) => (results) => bitBarDisplay(
    showHeader(...results),
    ...zip(queries, results).map(([query, result]) => showCount(query)(result))
  )

  const showHeader = (...results) => ({
    text: results.map(r => r.total_count).join('.'),
    emojize: true,
    color: BLUE,
    image: GITHUB_ICON,
  });

  const nameEmojiMap = {
    'BACKLOG': '📥',
    'TODO': '🕒',
    'DOING': '🚴',
    'TO REVIEW': '👀',
    'IN REVIEW': '👀',
    'DONE': '✅',
    'ICEBOX': '😕',
  };

  const showCount = ({ name = '', ...query }) => ({ total_count: t }) => ({
    text: `${nameEmojiMap[name] || ''} ${name}: ${t}`,
    emojize: true,
    color: (t > 0 && t < 20) ? (t < 5 ? GREEN : (t < 9 ? BLUE : (t < 13 ? ORANGE : RED))) : PURPLE,
    href: makeWebUrl(query)
  });

  return fetchGithubCounters(...githubQueries).then(showLines(...githubQueries))

}
