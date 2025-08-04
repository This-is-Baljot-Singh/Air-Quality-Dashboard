
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useFilter } from '@/contexts/FilterContext';
import { LineChart, List, PieChart, Filter } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  const { selectedMonth, selectedYear } = useFilter();
  
  const isFilterActive = selectedMonth !== 'all' || selectedYear !== 'all';

  const navItems = [
    { path: '/', label: 'Line Graph', icon: <LineChart className="h-5 w-5" /> },
    { path: '/gases', label: 'Gas List', icon: <List className="h-5 w-5" /> },
    { path: '/pie-chart', label: 'Pie Chart', icon: <PieChart className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-primary">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                  Air Quality Dashboard
                </span>
              </h1>
              {isFilterActive && (
                <div className="flex items-center gap-1 text-sm text-blue-600 mt-1">
                  <Filter className="h-4 w-4" />
                  <span>
                    {selectedYear !== 'all' && selectedMonth !== 'all' 
                      ? `Filtered: ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][parseInt(selectedMonth) - 1]} ${selectedYear}`
                      : selectedYear !== 'all' 
                        ? `Filtered: ${selectedYear}`
                        : 'Filters Active'
                    }
                  </span>
                </div>
              )}
            </div>
            <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200",
                    location.pathname === item.path
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                  )}
                >
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-md"
                      initial={false}
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center space-x-2">
                    {item.icon}
                    <span>{item.label}</span>
                    {item.path === '/' && isFilterActive && (
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" title="Filters active"></div>
                    )}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
      <footer className="bg-white shadow-inner py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2025 Air Quality Dashboard. All data is for demonstration purposes.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
