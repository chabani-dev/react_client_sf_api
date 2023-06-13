import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Single from './components/Single';
import Category from './components/Category';
import Author from './components/Author';
import CreateUser from './components/CreateUser';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Single />} />
        <Route path="/categorie/:name" element={<Category />} />
        <Route path="/auteur/:name" element={<Author />} />
        <Route path="/createUser" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
