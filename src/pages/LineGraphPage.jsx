
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { airQualityData } from '@/data/airQualityData';
import { useFilter } from '@/contexts/FilterContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, Wind, Droplets, Thermometer, Calendar, Filter } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
);

const LineGraphPage = () => {
  const [chartData, setChartData] = useState(airQualityData.timeSeriesData);
  const [isLoading, setIsLoading] = useState(true);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  
  // Use global filter state
  const { selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, clearFilters } = useFilter();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    // Get available months and years
    const { months, years } = airQualityData.getAvailableMonths();
    setAvailableMonths(months);
    setAvailableYears(years);
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter data when month or year changes
    if (selectedMonth !== 'all' && selectedYear !== 'all') {
      const filteredData = airQualityData.getFilteredData(parseInt(selectedMonth), parseInt(selectedYear));
      setChartData(filteredData);
    } else {
      setChartData(airQualityData.timeSeriesData);
    }
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const getChartTitle = () => {
    if (selectedMonth !== 'all' && selectedYear !== 'all') {
      return `Air Quality Trends - ${monthNames[parseInt(selectedMonth) - 1]} ${selectedYear}`;
    }
    return 'Air Quality Trends (January 2024 - July 2025)';
  };

  const getChartOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: getChartTitle(),
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Concentration (μg/m³)',
          font: {
            size: 14
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 14
          }
        },
        grid: {
          display: false
        },
        ticks: {
          maxTicksLimit: selectedMonth !== 'all' ? undefined : 20,
          callback: function(value, index, values) {
            if (selectedMonth !== 'all') {
              // Show all dates for monthly view
              return this.getLabelForValue(value);
            } else {
              // Show fewer labels for full dataset
              if (index % Math.ceil(values.length / 10) === 0) {
                return this.getLabelForValue(value);
              }
              return '';
            }
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: selectedMonth !== 'all' ? 4 : 2,
        hoverRadius: selectedMonth !== 'all' ? 7 : 5
      }
    }
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-none shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <Wind className="h-6 w-6" />
              Air Quality Trends
            </CardTitle>
            <CardDescription className="text-blue-100">
              Monitoring daily air pollutant levels from January 2024 to July 2025
            </CardDescription>
          </CardHeader>
          
          {/* Filter Controls */}
          <div className="p-6 border-b bg-gray-50/50">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              
              <div className="flex items-center gap-2">
                <label htmlFor="year-select" className="text-sm text-gray-600">Year:</label>
                <select
                  id="year-select"
                  value={selectedYear}
                  onChange={handleYearChange}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Years</option>
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <label htmlFor="month-select" className="text-sm text-gray-600">Month:</label>
                <select
                  id="month-select"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  disabled={selectedYear === 'all'}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="all">All Months</option>
                  {availableMonths.map(month => (
                    <option key={month} value={month}>{monthNames[month - 1]}</option>
                  ))}
                </select>
              </div>
              
              {(selectedMonth !== 'all' || selectedYear !== 'all') && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 text-sm"
                >
                  <Filter className="h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="h-[400px] w-full relative">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-b-blue-700 border-l-blue-500 border-r-blue-700 animate-spin"></div>
                </div>
              ) : (
                <Line data={chartData} options={getChartOptions()} />
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data Summary Card */}
      {(selectedMonth !== 'all' && selectedYear !== 'all') && (
        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-md bg-gradient-to-br from-green-50 to-emerald-100">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-green-700">
                <Info className="h-5 w-5" />
                Data Summary - {monthNames[parseInt(selectedMonth) - 1]} {selectedYear}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/70 rounded-lg">
                  <h4 className="font-semibold text-red-700">NO₂ Average</h4>
                  <p className="text-2xl font-bold text-red-600">
                    {chartData.datasets[0]?.data.length > 0 
                      ? Math.round(chartData.datasets[0].data.reduce((a, b) => a + b, 0) / chartData.datasets[0].data.length)
                      : 0} μg/m³
                  </p>
                </div>
                <div className="text-center p-4 bg-white/70 rounded-lg">
                  <h4 className="font-semibold text-blue-700">O₃ Average</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {chartData.datasets[1]?.data.length > 0 
                      ? Math.round(chartData.datasets[1].data.reduce((a, b) => a + b, 0) / chartData.datasets[1].data.length)
                      : 0} μg/m³
                  </p>
                </div>
                <div className="text-center p-4 bg-white/70 rounded-lg">
                  <h4 className="font-semibold text-teal-700">PM2.5 Average</h4>
                  <p className="text-2xl font-bold text-teal-600">
                    {chartData.datasets[2]?.data.length > 0 
                      ? Math.round(chartData.datasets[2].data.reduce((a, b) => a + b, 0) / chartData.datasets[2].data.length)
                      : 0} μg/m³
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                Data points: {chartData.labels?.length || 0} days
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-md bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-blue-700">
                <Info className="h-5 w-5" />
                What is AQI?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                The Air Quality Index (AQI) is a standardized indicator for reporting daily air quality. It tells you how clean or polluted your air is, and what associated health effects might be a concern.
              </p>
              <Button variant="link" className="p-0 mt-2 text-blue-600">
                Learn more about AQI
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-md bg-gradient-to-br from-cyan-50 to-cyan-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-cyan-700">
                <Droplets className="h-5 w-5" />
                Humidity Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Humidity can significantly affect how air pollutants behave. High humidity can trap pollutants closer to the ground, while low humidity may allow for better dispersion.
              </p>
              <Button variant="link" className="p-0 mt-2 text-cyan-600">
                Explore humidity effects
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-md bg-gradient-to-br from-teal-50 to-teal-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-teal-700">
                <Thermometer className="h-5 w-5" />
                Temperature Correlation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Temperature inversions can trap pollution near the ground, leading to higher concentrations. Warmer temperatures can also accelerate the formation of ground-level ozone.
              </p>
              <Button variant="link" className="p-0 mt-2 text-teal-600">
                View temperature data
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LineGraphPage;
