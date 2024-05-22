import './controlButtons.styles.css'
import { Endpoint } from '../../types.ts'
import { propertiesToObject } from '../opblock/opblock.ts'


const createControlButtons = (path: string, method: string): string => {
  return `
    <div class="control-buttons-wrapper">
      <button id="execute-button!${path}!${method}" class="control-buttons-execute">Execute</button> 
      <button class="control-buttons-clear">Clear</button> 
    </div>
  `
}

const addExecutionListener = (el: HTMLElement, endpoint: Endpoint) => {
  const requestBody = document.getElementById(`requestBody!${endpoint.path}!${endpoint.method}`) as (HTMLPreElement | undefined)
  const responseArea = document.getElementById(`responseArea!${endpoint.path}!${endpoint.method}`) as HTMLDivElement

  const executeButton = el.getElementsByClassName('control-buttons-execute')[0]
  executeButton.addEventListener('click', async (e: Event) => {
    const buttonsArea = (e.currentTarget as HTMLButtonElement).parentElement || undefined
    buttonsArea?.classList.add('control-buttons-expand')
    responseArea.classList.remove('hidden')
    
    const body = requestBody ? requestBody.innerHTML : null
    const response = await executeRequest(endpoint.path, endpoint.method, body)
    await renderResponse(responseArea, response)
  })

  const clearButton = el.getElementsByClassName('control-buttons-clear')[0]

  clearButton.addEventListener('click', (e: Event) => {
    const buttonsArea = (e.currentTarget as HTMLButtonElement).parentElement || undefined
    buttonsArea?.classList.remove('control-buttons-expand')
    responseArea.classList.add('hidden')
  })
  if (endpoint.requestBody) {
    const props = endpoint.requestBody.properties
    clearButton.addEventListener('click', () => {
      requestBody && (requestBody.innerHTML = JSON.stringify(propertiesToObject(props), null, 2))
    })
  }

}

const executeRequest = async (path: string, method: string, body: string | null): Promise<Response> => {
  return fetch(`http://localhost:5154${path}`, {
    method,
    body
  })
}


const renderResponse = async (responseArea: HTMLDivElement, response: Response): Promise<void> => {
  const wrappers = Array.from(responseArea.getElementsByTagName('code'));
  let headers = ''
  response.headers.forEach((value:string, key: string) => {
    headers += `${key}: ${value}\n`
  })
  
  wrappers[0].innerText = response.url
  wrappers[1].innerText = `${response.status} ${response.statusText}`
  wrappers[2].innerText = JSON.stringify(await response.json(), null, 2)
  wrappers[3].innerText = headers
}


export { addExecutionListener }
export default createControlButtons
