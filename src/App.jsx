import './App.css'
import Anotacoes from './components/anotacoes/anotacoes'
import Cadastro from './components/cadastro/cadastro';
import Login from './components/login/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/index/anotacoes/:id_usuario' element={<Anotacoes />} />
          <Route path='/index/login' element={<Login />} />
          <Route path='/index/cadastrar' element={<Cadastro />} />
          <Route path='*' element={<div><a href='http://localhost:5173/index/login'>Redirecionar</a></div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App