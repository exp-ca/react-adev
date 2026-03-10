import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import { Development } from './pages/Development';
import { Design } from './pages/Design';
import { Branding } from './pages/Branding';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="expertise/developpement" element={<Development />} />
          <Route path="expertise/design" element={<Design />} />
          <Route path="expertise/branding" element={<Branding />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
