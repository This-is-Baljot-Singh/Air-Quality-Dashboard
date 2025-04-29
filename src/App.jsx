
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import LineGraphPage from '@/pages/LineGraphPage';
import GasListPage from '@/pages/GasListPage';
import PieChartPage from '@/pages/PieChartPage';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Layout>
          <Routes>
            <Route path="/" element={<LineGraphPage />} />
            <Route path="/gases" element={<GasListPage />} />
            <Route path="/pie-chart" element={<PieChartPage />} />
          </Routes>
        </Layout>
      </AnimatePresence>
      <Toaster />
    </Router>
  );
}

export default App;
