import './App.css'
import ReviewForm from './components/Review/ReviewForm/ReviewForm.tsx'

function App() {
  const reviews = localStorage.getItem('reviews') || []
  return (
      <ReviewForm/>
  )
}

export default App
