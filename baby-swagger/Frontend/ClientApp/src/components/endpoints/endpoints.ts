import arrowIcon from './icon-arrow-up.svg'


type EndpointData = {
  tags: string[]
  requestBody: {
    content: object
  }
  responses: Record<string, { description: string }>
}
type Endpoint = Record<string, EndpointData>
type Endpoints = Record<string, Endpoint>;


const createEndpoints = (endpoints: Endpoints): string[] => {
  const rawEndpointsHTML: string[] = []
  for (const path in endpoints) {
    for (const method in endpoints[path]) {
      rawEndpointsHTML.push(
        `
        <div class="route route-${method}">
          <div class="route-header">
            <button class="route-summary">
              <div class="route-summary-method">${method}</div>
              <span class="route-summary-path">${path}</span>
              <div class="route-summary-arrow"><img class="arrow" src=${arrowIcon} alt="arrow up"/></div>
            </button>
          </div>
        </div>
        `)
    }
  }

  return rawEndpointsHTML
}


export type { Endpoints }
export default createEndpoints
