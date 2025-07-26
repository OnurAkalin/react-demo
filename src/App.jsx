import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BrandList from './pages/BrandList';
import ModelList from './pages/ModelList';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav className="navbar">
                    <div className="nav-brand">
                        <h1>Demo Uygulama</h1>
                    </div>
                    <div className="nav-links">
                        <Link to="/" className="nav-link">Ana Sayfa</Link>
                        <Link to="/brands" className="nav-link">Markalar</Link>
                        <Link to="/models" className="nav-link">Modeller</Link>
                    </div>
                </nav>

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={
                            <div className="welcome-page">
                                <h2>Hoş Geldiniz! 👋</h2>
                                <p>Bu demo uygulamada marka ve model listeleme, ekleme, güncelleme ve silme işlemleri yapabilirsiniz.</p>
                                <div className="welcome-actions">
                                    <Link to="/brands" className="btn btn-primary">Markaları Görüntüle</Link>
                                    <Link to="/models" className="btn btn-secondary">Modelleri Görüntüle</Link>
                                </div>
                            </div>
                        } />
                        <Route path="/brands" element={<BrandList />} />
                        <Route path="/models" element={<ModelList />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;