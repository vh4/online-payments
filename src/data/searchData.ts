type SearchData = {
  id: string
  name: string
  url: string
  excludeLang?: boolean
  icon: string
  section: string
  shortcut?: string
}

const data: SearchData[] = [
  {
    id: '1',
    name: 'CRM',
    url: '/dashboards/crm',
    icon: 'ri-pie-chart-2-line',
    section: 'Dashboards'
  },
]

export default data
