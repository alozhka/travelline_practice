import arrowIcon from './icon-arrow-up.svg'
import './endpoints.styles.css'
import createOpBlock from '../opblock/opblock.ts'
import { Endpoint } from '../../types.ts'


const createEndpoints = (endpoints: Endpoint[]): string[] => {
  const rawEndpointsHTML: string[] = []
  
  endpoints.forEach((endpoint) => {
    const opBlock: string = createOpBlock(endpoint)

    rawEndpointsHTML.push(
      `
        <div method="${endpoint.method}"
             path="${endpoint.path}" 
             id="route-${endpoint.path}!${endpoint.method}" 
             class="route route-${endpoint.method}">
          <div class="route-header">
            <div class="route-summary">
              <div class="route-summary-method route-summary-method-${endpoint.method}">${endpoint.method}</div>
              <span class="route-summary-path">${endpoint.path}</span>
              <div class="route-summary-arrow"><img class="arrow" src=${arrowIcon} alt="arrow up"/></div>
            </div>
          </div>
          ${opBlock}
        </div>
        `)
  })

  return rawEndpointsHTML
}


const toggleEndpointInfo = (event: Event) => {
  const endpointHeader = event.currentTarget as HTMLDivElement
  const arrow = endpointHeader.getElementsByTagName('img')[0]
  const opBlock = (endpointHeader.parentNode as HTMLElement).getElementsByClassName('opBlock')[0]
  arrow.classList.toggle("arrow-expand")
  opBlock.classList.toggle("hidden")
}

const addEndpointListener = (endpoint: HTMLElement) => {
  const endpointHeader = endpoint.getElementsByClassName('route-header')[0];
  endpointHeader.addEventListener('click', toggleEndpointInfo)
}


export { addEndpointListener }
export default createEndpoints
