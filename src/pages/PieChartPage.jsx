
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend,
  Title
} from 'chart.js';
import { airQualityData } from '@/data/airQualityData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart as PieChartIcon, Info, Leaf } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  Title
);

const PieChartPage = () => {
  const [chartData, setChartData] = useState(airQualityData.compositionData);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSegment, setActiveSegment] = useState(null);

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
        position: 'right',
        labels: {
          font: {
            size: 14
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: 'Atmospheric Composition',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.formattedValue || '';
            return `${label}: ${value}%`;
          }
        },
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
    animation: {
      animateScale: true,
      animateRotate: true
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setActiveSegment(index === activeSegment ? null : index);
      } else {
        setActiveSegment(null);
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

  const facts = [
    {
      title: "Nitrogen Dominance",
      content: "Nitrogen makes up about 78% of Earth's atmosphere. It's relatively inert and doesn't readily react with other substances under normal conditions."
    },
    {
      title: "Oxygen Evolution",
      content: "The oxygen-rich atmosphere we enjoy today wasn't always present. It developed over billions of years, largely due to photosynthetic organisms like cyanobacteria."
    },
    {
      title: "Carbon Dioxide Increase",
      content: "While CO₂ makes up only about 0.04% of the atmosphere, its concentration has increased by over 45% since pre-industrial times due to human activities."
    },
    {
      title: "Trace Gases Impact",
      content: "Despite their tiny concentrations, trace gases like methane and ozone have significant impacts on climate and air quality."
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="overflow-hidden border-none shadow-lg bg-white/80 backdrop-blur-sm h-full">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white">
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-6 w-6" />
                Atmospheric Composition
              </CardTitle>
              <CardDescription className="text-purple-100">
                Percentage breakdown of gases in Earth's atmosphere
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[400px] w-full relative">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full border-4 border-t-purple-500 border-b-purple-700 border-l-purple-500 border-r-purple-700 animate-spin"></div>
                  </div>
                ) : (
                  <Pie data={chartData} options={chartOptions} />
                )}
              </div>
              <div className="mt-4 text-center text-sm text-gray-500">
                Click on a segment to highlight it
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="overflow-hidden border-none shadow-lg bg-white/80 backdrop-blur-sm h-full">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
              <CardTitle className="flex items-center gap-2">
                <Info className="h-6 w-6" />
                Atmospheric Facts
              </CardTitle>
              <CardDescription className="text-indigo-100">
                Interesting information about our atmosphere
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {facts.map((fact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100"
                  >
                    <h3 className="font-medium text-indigo-800 flex items-center gap-2">
                      <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
                        Fact {index + 1}
                      </Badge>
                      {fact.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">{fact.content}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="border-b border-green-100">
            <CardTitle className="text-xl flex items-center gap-2 text-green-700">
              <Leaf className="h-5 w-5" />
              Why Air Composition Matters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="prose max-w-none text-gray-700">
              <p>
                The composition of our atmosphere is crucial for life on Earth. It provides the oxygen we breathe, 
                regulates our climate, and shields us from harmful radiation. Even small changes in atmospheric 
                composition can have significant impacts on global climate patterns and human health.
              </p>
              <p className="mt-4">
                Human activities have altered atmospheric composition through emissions of greenhouse gases, 
                particulate matter, and other pollutants. Monitoring these changes helps us understand their 
                impacts and develop strategies to mitigate harmful effects.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PieChartPage;
