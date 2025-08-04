# Air Quality Dashboard 🌬️

A modern, interactive web application for visualizing air quality data with real-time charts, filtering capabilities, and comprehensive atmospheric gas information.

![Air Quality Dashboard](https://img.shields.io/badge/Air%20Quality-Dashboard-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-4.5.13-646CFF?style=for-the-badge&logo=vite)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4.1-FF6384?style=for-the-badge&logo=chart.js)

## ✨ Features

### 📊 Interactive Data Visualization
- **Line Graph Page**: Real-time air quality trends with interactive filtering
- **Pie Chart Page**: Atmospheric gas composition visualization
- **Gas List Page**: Detailed information about atmospheric gases and their health impacts

### 🔍 Advanced Filtering
- **Month & Year Filters**: Filter data by specific time periods (2014-2024)
- **Persistent State**: Filter settings maintained across page navigation
- **Real-time Updates**: Charts update instantly when filters are applied

### 🌍 Real EPA Data Integration
- **Authentic Data**: Based on EPA monitoring from Fairhope, Alabama (2014-2024)
- **Ozone Measurements**: Real 8-hour average ozone concentrations
- **PM2.5 Data**: Actual fine particulate matter measurements
- **Smart Interpolation**: Intelligent gap-filling for missing data years

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Smooth Animations**: Framer Motion powered transitions
- **Tailwind CSS**: Clean, modern styling
- **Dark/Light Themes**: Adaptive color schemes

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/AegisX-dev/Air-Quality-Dashboard.git

# Navigate to project directory
cd Air-Quality-Dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the application.

## 📁 Project Structure

```
Air-Quality-Dashboard/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Main navigation layout
│   │   └── ui/                 # Reusable UI components
│   ├── contexts/
│   │   └── FilterContext.jsx   # Global state management
│   ├── data/
│   │   └── airQualityData.js   # EPA data and processing
│   ├── pages/
│   │   ├── LineGraphPage.jsx   # Time series visualization
│   │   ├── PieChartPage.jsx    # Composition charts
│   │   └── GasListPage.jsx     # Gas information
│   └── lib/
│       └── utils.js            # Utility functions
├── public/                     # Static assets
├── docs/                       # Documentation
└── package.json               # Dependencies and scripts
```

## 🛠️ Built With

- **[React](https://reactjs.org/)** - Frontend framework
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[Chart.js](https://www.chartjs.org/)** - Data visualization
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Icon library

## 📊 Data Sources

The dashboard integrates real EPA air quality monitoring data:

- **Station**: Fairhope High School, Alabama
- **Parameters**: Ozone (O₃), PM2.5
- **Time Period**: 2014-2024
- **Data Source**: EPA Annual Concentration by Monitor
- **Processing**: Daily values generated from annual means with seasonal patterns

## 🎯 Use Cases

- **Environmental Research**: Analyze air quality trends over time
- **Educational Tool**: Learn about atmospheric composition and air pollution
- **Public Health**: Monitor air quality impacts in specific regions
- **Data Visualization**: Demonstrate modern web-based charting techniques

## 📖 Documentation

- [Installation Guide](./INSTALLATION.md) - Detailed setup instructions
- [Data Documentation](./DATA.md) - Information about data sources and processing
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute to the project
- [Changelog](./CHANGELOG.md) - Version history and updates

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on:
- Code of conduct
- Development workflow
- Submitting pull requests
- Reporting issues

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **EPA (Environmental Protection Agency)** for providing open air quality data
- **Chart.js community** for excellent visualization tools
- **React ecosystem** for robust development frameworks
- **Tailwind CSS** for modern styling capabilities

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/AegisX-dev/Air-Quality-Dashboard/issues)
- **Discussions**: [GitHub Discussions](https://github.com/AegisX-dev/Air-Quality-Dashboard/discussions)
- **Documentation**: Check the `/docs` folder for detailed guides

---

<p align="center">
  Made with ❤️ for better air quality awareness
</p>