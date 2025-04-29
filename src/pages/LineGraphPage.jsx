
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, Wind, Droplets, Thermometer } from 'lucide-react';

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

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Air Quality Trends (April 2025)',
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
        radius: 3,
        hoverRadius: 6
      }
    }
  };

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
              Monitoring daily air pollutant levels over the past month
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[400px] w-full relative">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-b-blue-700 border-l-blue-500 border-r-blue-700 animate-spin"></div>
                </div>
              ) : (
                <Line data={chartData} options={chartOptions} />
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

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
