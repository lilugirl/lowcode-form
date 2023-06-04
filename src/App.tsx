import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Preview from './pages/Preview'
import { DndProvider } from './Context'
import './App.css'

function App() {
 

  return (
   <BrowserRouter>
    <DndProvider >
     <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/preview' element={<Preview/>} />
     </Routes>
     </DndProvider>
   </BrowserRouter>
  )
}

export default App
