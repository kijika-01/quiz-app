import './App.css';
import Quiz from './components/Quiz';
import About from './About';
import Contact from './Contact';
import PrivacyPolicy from './PrivacyPolicy';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1 className="question-text">花言葉クイズ</h1>
        </header>
        <main>
          <Quiz />
          <About />
          <Routes>
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
