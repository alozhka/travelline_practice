import './opblock.styles.css'


const createOpBlock = (): string => {
  return `
  <div class="opBlock hidden">
    <div class="opBlock-section">
      <div class="opBlock-section-header">
          <h4 class="opBlock-title"><span>Parameters:</span></h4>
      </div>
      <div class="opBlock-parameters">
        <div class="opBlock-table">
            <table>
            
            </table>
        </div>
      </div>
    </div>
    <div class="opBlock-result"></div>
  </div>
  `
}


export default createOpBlock
