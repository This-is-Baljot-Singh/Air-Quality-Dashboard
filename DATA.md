# Data Documentation 📊

This document provides comprehensive information about the data sources, structure, and processing methods used in the Air Quality Dashboard.

## 📋 Table of Contents
- [Data Sources](#data-sources)
- [Data Structure](#data-structure)
- [Processing Methods](#processing-methods)
- [Data Quality](#data-quality)
- [API Reference](#api-reference)
- [Adding New Data](#adding-new-data)

## 🌍 Data Sources

### EPA Monitoring Data
The primary data source for this dashboard is the **U.S. Environmental Protection Agency (EPA)** air quality monitoring network.

#### Station Information
- **Station Name**: Fairhope High School
- **Location**: Fairhope, Alabama, USA
- **Coordinates**: 30.497478°N, 87.880258°W
- **Address**: 1 Pirate Drive, Fairhope, Alabama
- **EPA Site ID**: [Specific ID from EPA database]

#### Data Collection Period
- **Start Date**: January 1, 2014
- **End Date**: December 31, 2024
- **Total Duration**: 11 years
- **Update Frequency**: Annual summaries

### Monitored Parameters

#### 1. Ozone (O₃)
- **Parameter Code**: 44201
- **Measurement Type**: 8-hour average concentrations
- **Units**: Parts per million (ppm), converted to µg/m³
- **Conversion Factor**: 1 ppm = 1,960 µg/m³ (at 25°C)
- **Data Availability**: 2014-2017, 2022-2024 (gaps: 2018-2021)

**Annual Statistics:**
```javascript
{
  2014: { mean: 0.040769, max: 0.074, observations: 5749 },
  2015: { mean: 0.039581, max: 0.079, observations: 5447 },
  2016: { mean: 0.040624, max: 0.066, observations: 5674 },
  2017: { mean: 0.040086, max: 0.073, observations: 5426 },
  2022: { mean: 0.039545, max: 0.066, observations: 5860 },
  2023: { mean: 0.043288, max: 0.067, observations: 5345 },
  2024: { mean: 0.038857, max: 0.065, observations: 6948 }
}
```

#### 2. PM2.5 (Fine Particulate Matter)
- **Parameter Code**: 88101
- **Measurement Type**: Daily average concentrations
- **Units**: Micrograms per cubic meter (µg/m³)
- **Data Availability**: 2017, 2022-2024 (limited coverage)

**Annual Statistics:**
```javascript
{
  2017: { mean: 7.391818, max: 19.7, observations: 110 },
  2022: { mean: 7.317391, max: 33.6, observations: 115 },
  2023: { mean: 7.622321, max: 29.2, observations: 336 },
  2024: { mean: 6.144379, max: 17.2, observations: 169 }
}
```

#### 3. Nitrogen Dioxide (NO₂)
- **Data Type**: Synthetic/Simulated
- **Reason**: Not available in the EPA dataset for this station
- **Generation Method**: Based on typical seasonal patterns and urban air quality characteristics
- **Units**: Micrograms per cubic meter (µg/m³)

## 🔧 Data Structure

### File Organization
```
src/data/
└── airQualityData.js       # Main data file
    ├── realEpaData         # Raw EPA annual statistics
    ├── interpolation       # Gap-filling functions
    ├── timeSeriesData      # Chart.js formatted data
    ├── compositionData     # Pie chart data
    ├── gasesData          # Gas information array
    └── stationInfo        # Monitoring station metadata
```

### Data Objects

#### 1. Real EPA Data Object
```javascript
const realEpaData = {
  ozone: {
    [year]: {
      mean: number,        // Annual average concentration
      max: number,         // Maximum daily value
      observations: number // Number of valid measurements
    }
  },
  pm25: {
    [year]: {
      mean: number,        // Annual average concentration
      max: number,         // Maximum daily value
      observations: number // Number of valid measurements
    }
  }
}
```

#### 2. Time Series Data
```javascript
{
  labels: string[],          // Date labels for x-axis
  datasets: [
    {
      label: string,         // Dataset name
      data: number[],        // Y-axis values
      borderColor: string,   // Line color
      backgroundColor: string, // Fill color
      tension: number        // Line smoothness
    }
  ]
}
```

#### 3. Gas Information
```javascript
{
  id: number,
  name: string,              // Chemical name and formula
  percentage: number,        // Atmospheric concentration
  description: string,       // Scientific description
  healthEffects: string,     // Health impact information
  environmentalImpact: string // Environmental effects
}
```

## ⚙️ Processing Methods

### 1. Daily Data Generation
The dashboard generates daily data points from annual EPA means using realistic seasonal and temporal patterns.

#### Seasonal Adjustments
- **Summer Ozone**: 1.3x multiplier (photochemical reactions)
- **Winter Ozone**: 0.7x multiplier (reduced sunlight)
- **Winter PM2.5**: 1.4x multiplier (heating emissions)
- **Summer PM2.5**: 0.8x multiplier (better dispersion)

#### Temporal Variations
- **Weekend Effect**: 10-25% reduction in weekday pollutants
- **Daily Variation**: ±30-40% random variation around the mean
- **Bounds Checking**: Ensures realistic minimum/maximum values

### 2. Gap Interpolation
For missing data years (2018-2021), the system uses intelligent interpolation:

#### Ozone Interpolation
```javascript
const interpolateOzoneForMissingYear = (year, month) => {
  const baseValue = 0.04; // ppm
  const seasonalMultiplier = isSummer ? 1.3 : 0.8;
  const yearTrend = 1 + (year - 2014) * 0.002; // 0.2% annual increase
  return baseValue * seasonalMultiplier * yearTrend;
};
```

#### PM2.5 Interpolation
```javascript
const interpolatePm25ForMissingYear = (year, month) => {
  const baseValue = 7; // µg/m³
  const seasonalMultiplier = isWinter ? 1.3 : 0.9;
  const yearTrend = 1 - (year - 2014) * 0.01; // 1% annual decrease
  return baseValue * seasonalMultiplier * yearTrend;
};
```

### 3. Unit Conversions
- **Ozone**: PPM → µg/m³ (multiply by 1,960 at 25°C)
- **PM2.5**: Already in µg/m³
- **NO₂**: Generated directly in µg/m³

## 📊 Data Quality

### Quality Indicators
- **Observation Counts**: Higher counts indicate more reliable annual means
- **Data Gaps**: Clearly identified and handled with interpolation
- **Validation**: Annual means compared against EPA standards
- **Consistency**: Seasonal patterns align with atmospheric science

### Data Reliability
- **High Reliability**: Years with >5,000 observations (ozone)
- **Moderate Reliability**: Years with 100-1,000 observations (PM2.5)
- **Interpolated**: Missing years use scientific estimation methods

### EPA Data Quality Assurance
- **QAPP Compliance**: Follows EPA Quality Assurance Project Plans
- **Calibration**: Regular instrument calibration and maintenance
- **Validation**: Multi-level data validation and quality control
- **Traceability**: Data traceable to NIST standards

## 🔌 API Reference

### Data Access Functions

#### `getFilteredData(month, year)`
Returns filtered dataset for specific month and year.
```javascript
// Parameters
month: number (1-12)    // Month number
year: number (2014-2024) // Year

// Returns
{
  labels: string[],      // Filtered date labels
  datasets: object[]     // Filtered Chart.js datasets
}
```

#### `getAvailableMonths()`
Returns available months and years for filtering.
```javascript
// Returns
{
  months: number[],      // Available months [1-12]
  years: number[]        // Available years [2014-2024]
}
```

### Data Export Functions

#### `exportToCSV(data, filename)`
Export data to CSV format for external analysis.
```javascript
// Parameters
data: object           // Dataset to export
filename: string       // Output filename

// Usage
exportToCSV(airQualityData.timeSeriesData, 'air_quality_2024.csv');
```

## 📈 Adding New Data

### EPA Data Updates
1. **Download new EPA data** from [EPA Air Quality System](https://www.epa.gov/aqs)
2. **Process annual statistics** for each parameter
3. **Update `realEpaData` object** in `airQualityData.js`
4. **Regenerate daily data** by calling data generation functions
5. **Update documentation** with new date ranges

### Adding New Parameters
1. **Add parameter to EPA data object**
2. **Create interpolation function** for missing years
3. **Update data generation** to include new parameter
4. **Add to Chart.js datasets** with appropriate styling
5. **Update gas information** if applicable

### New Monitoring Stations
1. **Create new data file** for the station
2. **Add station information** object
3. **Process station-specific data** 
4. **Update UI** to support multiple stations
5. **Add station selector** component

## 🔬 Scientific Context

### Air Quality Standards
- **Ozone (8-hour)**: 70 ppb (137 µg/m³) - EPA NAAQS
- **PM2.5 (Annual)**: 12 µg/m³ - EPA NAAQS
- **PM2.5 (Daily)**: 35 µg/m³ - EPA NAAQS
- **NO₂ (Annual)**: 53 ppb (100 µg/m³) - EPA NAAQS

### Health Impact Levels
- **Good**: AQI 0-50 (Green)
- **Moderate**: AQI 51-100 (Yellow)
- **Unhealthy for Sensitive**: AQI 101-150 (Orange)
- **Unhealthy**: AQI 151-200 (Red)
- **Very Unhealthy**: AQI 201-300 (Purple)
- **Hazardous**: AQI 301+ (Maroon)

## 📚 References

- [EPA Air Quality System (AQS)](https://www.epa.gov/aqs)
- [National Ambient Air Quality Standards](https://www.epa.gov/criteria-air-pollutants/naaqs)
- [Air Quality Index (AQI) Basics](https://www.airnow.gov/aqi/aqi-basics/)
- [Quality Assurance Handbook](https://www.epa.gov/quality/quality-assurance-handbook)

---

For questions about data processing or to suggest improvements, please see our [Contributing Guide](./CONTRIBUTING.md) or open an issue on GitHub.
