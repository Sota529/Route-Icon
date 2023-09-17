import { Icon } from './components/Icon'
import './App.css'
import { Draggable } from './components/Draggable'
export const App = () => {
  return (
    <div className="app">
      <Draggable>
        <Icon src="gopher.png" className="box-border" />
      </Draggable>
    </div>
  )
}

export default App
