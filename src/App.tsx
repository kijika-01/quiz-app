import './App.css';
import Quiz from './components/Quiz';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* ここでクイズアプリとしている */}
        <h1 className="question-text">花言葉クイズ</h1>
      </header>
      <main>
        {/* クイズコンポーネントを呼び出す */}
        <Quiz />
      </main>
    </div>
  );
}

export default App;

