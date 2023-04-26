import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Restaurants from '../src/components/Restaurants/Restaurants';
import RestoDetails from '../src/components/restoDetails/restoDetails';
import Menus from '../src/components/Menus/Menus';

function App() {
  return (
    <>
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/restaurants" element={<Restaurants/>}/>
                    <Route path="/restaurants/:id" element={<RestoDetails/>}/>
                    <Route path="/menus/restaurant/:id" element={<Menus/>}/>
                </Routes>
            </div>
            
        </BrowserRouter>
    </>
  )
}

export default App
