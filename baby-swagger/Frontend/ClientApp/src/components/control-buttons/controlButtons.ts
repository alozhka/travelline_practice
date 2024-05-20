import './controlButtons.styles.css'


const createControlButtons = (path: string, method: string): string => {
  return `
    <div class="control-buttons-wrapper">
      <button id="execute-button!${path}!${method}" class="control-buttons-execute">Execute</button> 
      <button class="control-buttons-clear">Clear</button> 
    </div>
  `
}

const addExecutionListener = (el: HTMLElement) => {
  const executeButton = el.getElementsByClassName('control-buttons-execute')[0]
  executeButton.addEventListener('click', executeRequest)
}

const executeRequest = (e: Event) => {
  const executed = (e.currentTarget as HTMLButtonElement).parentElement || undefined
  executed?.classList.add('control-buttons-expand')
  
  
}


export {addExecutionListener }
export default createControlButtons;
