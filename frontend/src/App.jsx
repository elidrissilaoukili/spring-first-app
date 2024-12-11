import Header from './components/Header/Header'
import Dashboard from './pages/Dashboard';
import NoMatch from './pages/NoMatch';
import { Route, Routes } from 'react-router-dom';
import PostEmployee from './pages/PostEmployee';

function App() {


  return (
    <>
      <Header />
      <div style={{ maxWidth: '1000px', margin: 'auto' }}>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='*' element={<NoMatch />} />
          <Route path='/post' element={<PostEmployee />} />
        </Routes>
      </div>
    </>
  )
}

export default App
