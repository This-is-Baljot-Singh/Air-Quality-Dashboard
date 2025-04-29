
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { airQualityData } from '@/data/airQualityData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ThumbsUp, Info } from 'lucide-react';

const GasListPage = () => {
  const [gases, setGases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // Sort gases by percentage (highest to lowest)
      const sortedGases = [...airQualityData.gasesData].sort((a, b) => b.percentage - a.percentage);
      setGases(sortedGases);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

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

  const getPercentageColor = (percentage) => {
    if (percentage > 10) return "bg-blue-100 text-blue-800";
    if (percentage > 1) return "bg-cyan-100 text-cyan-800";
    if (percentage > 0.1) return "bg-teal-100 text-teal-800";
    if (percentage > 0.001) return "bg-amber-100 text-amber-800";
    return "bg-red-100 text-red-800";
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
          <CardHeader className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <Info className="h-6 w-6" />
              Atmospheric Gases Composition
            </CardTitle>
            <CardDescription className="text-teal-100">
              Detailed information about gases in our atmosphere and their health impacts
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="h-12 w-12 rounded-full border-4 border-t-teal-500 border-b-teal-700 border-l-teal-500 border-r-teal-700 animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {gases.map((gas, index) => (
                  <motion.div
                    key={gas.id}
                    variants={itemVariants}
                    className="relative"
                  >
                    <Card className="border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-teal-500 to-emerald-400"></div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl text-gray-800">{gas.name}</CardTitle>
                            <CardDescription className="text-gray-600 mt-1">{gas.description}</CardDescription>
                          </div>
                          <Badge className={`${getPercentageColor(gas.percentage)} ml-2 text-xs font-bold`}>
                            {gas.percentage > 0.001 
                              ? `${gas.percentage}%` 
                              : `${(gas.percentage * 1000000).toFixed(2)} ppm`}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div className="flex items-start space-x-2">
                            <div className="mt-1 bg-red-100 p-1.5 rounded-full">
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">Health Effects</h4>
                              <p className="text-sm text-gray-600 mt-1">{gas.healthEffects}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="mt-1 bg-green-100 p-1.5 rounded-full">
                              <ThumbsUp className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">Environmental Impact</h4>
                              <p className="text-sm text-gray-600 mt-1">{gas.environmentalImpact}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default GasListPage;
