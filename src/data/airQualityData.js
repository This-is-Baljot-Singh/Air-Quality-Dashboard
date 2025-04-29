export const airQualityData = {
  timeSeriesData: {
    labels: [],
    datasets: [
      {
        label: "Nitrogen Dioxide (NO₂)",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4
      },
      {
        label: "Ozone (O₃)",
        data: [],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4
      },
      {
        label: "Particulate Matter (PM2.5)",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4
      }
    ]
  },
  compositionData: {
    labels: ["Nitrogen (N₂)", "Oxygen (O₂)", "Argon (Ar)", "Carbon Dioxide (CO₂)", "Other gases"],
    datasets: [
      {
        data: [78.08, 20.95, 0.93, 0.04, 0.00],
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 159, 64, 0.8)"
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  },
  gasesData: [
    {
      id: 1,
      name: "Nitrogen (N₂)",
      percentage: 78.08,
      description: "Nitrogen is the most abundant gas in Earth's atmosphere. It's relatively inert and doesn't readily react with other substances.",
      healthEffects: "Nitrogen itself is harmless to humans. We breathe it in and out without any effect.",
      environmentalImpact: "Essential for plant growth when converted to forms plants can use."
    },
    {
      id: 2,
      name: "Oxygen (O₂)",
      percentage: 20.95,
      description: "Oxygen is the second most abundant gas in our atmosphere and is essential for most life forms.",
      healthEffects: "Essential for human respiration. Low oxygen levels can cause hypoxia, leading to impaired cognitive function and eventually death.",
      environmentalImpact: "Supports combustion and is vital for aerobic organisms."
    },
    {
      id: 3,
      name: "Argon (Ar)",
      percentage: 0.93,
      description: "Argon is a noble gas that is completely inert and doesn't form compounds under normal conditions.",
      healthEffects: "Argon is non-toxic but can cause asphyxiation in confined spaces by displacing oxygen.",
      environmentalImpact: "No significant environmental impact."
    },
    {
      id: 4,
      name: "Carbon Dioxide (CO₂)",
      percentage: 0.04,
      description: "Carbon dioxide is a greenhouse gas produced by respiration and combustion of carbon-containing fuels.",
      healthEffects: "At high concentrations, can cause headaches, dizziness, and at very high levels, unconsciousness.",
      environmentalImpact: "Major contributor to global warming and climate change. Rising levels are a significant environmental concern."
    },
    {
      id: 5,
      name: "Methane (CH₄)",
      percentage: 0.00018,
      description: "Methane is a potent greenhouse gas produced by natural processes and human activities.",
      healthEffects: "Not directly harmful to human health at typical atmospheric concentrations.",
      environmentalImpact: "Powerful greenhouse gas with 25 times the warming potential of CO₂ over a 100-year period."
    },
    {
      id: 6,
      name: "Nitrous Oxide (N₂O)",
      percentage: 0.00003,
      description: "Nitrous oxide is a greenhouse gas produced by both natural and human activities.",
      healthEffects: "At very high concentrations can cause euphoria (laughing gas) and eventually asphyxiation.",
      environmentalImpact: "Potent greenhouse gas with 298 times the warming potential of CO₂ over a 100-year period."
    },
    {
      id: 7,
      name: "Ozone (O₃)",
      percentage: 0.000004,
      description: "Ozone is a form of oxygen that occurs naturally in the upper atmosphere and can be formed at ground level by pollutants.",
      healthEffects: "Ground-level ozone can irritate the respiratory system, reduce lung function, and aggravate asthma.",
      environmentalImpact: "Stratospheric ozone protects Earth from harmful UV radiation, while ground-level ozone is a harmful pollutant."
    },
    {
      id: 8,
      name: "Particulate Matter (PM2.5)",
      percentage: 0.000001,
      description: "Tiny particles suspended in the air, often from combustion, industrial processes, and natural sources.",
      healthEffects: "Can penetrate deep into lungs and bloodstream, causing respiratory and cardiovascular issues.",
      environmentalImpact: "Reduces visibility, affects climate, and can damage ecosystems when deposited."
    }
  ]
};