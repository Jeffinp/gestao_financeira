import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/layout/Layout";
import ThemeTransition from "./components/layout/ThemeTransition";
import Dashboard from "./pages/Dashboard";
import Gastos from "./pages/Gastos";
import Ganhos from "./pages/Ganhos";
import Historico from "./pages/Historico";
import Agenda from "./pages/Agenda";
import Loja from "./pages/Loja";
import ProdutoDetalhe from "./pages/ProdutoDetalhe";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ThemeTransition />
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gastos" element={<Gastos />} />
            <Route path="/ganhos" element={<Ganhos />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/loja/produto" element={<ProdutoDetalhe />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
