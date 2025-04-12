
import "./chartinfo";
import React, { useEffect } from 'react';

export default function ChartMain(){
   
const barData = {
    labels: [
        'Purok I',
        'Purok II',
        'Purok III',
        'Purok IV',
        'Purok V',
        'Purok VI',
        'Purok VII'
      ],
    datasets: [{
      axis: 'y',
      label: 'Population Summary Per Purok',
      data: [300, 50, 100, 200, 30, 245, 123],
      fillColor: "rgba(151,187,205,0.8)",
        strokeColor: "rgba(151,187,205,0.8)",
        highlightFill: "rgba(151,187,205,0.75)",
        highlightStroke: "rgba(151,187,205,1)",
   
      borderWidth: 1
    }]
  };

  const pieData = {
    labels: [
        'Child',
        'Youth',
        'Parent',
        'Senior Citizen'
      ],
      datasets: [{
        label: 'Population Category',
        data: [3000, 5000, 1000, 3000],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
  };

  const doughnutData2 = {
    labels: [
      'Male',
      'Female'
    ],
    datasets: [{
      label: 'Gender',
      data: [800, 500],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)'
      ],
      hoverOffset: 4
    }]
  };
  
    useEffect(() => {
        
      
            new Chart("dashReport", {
                type: 'bar',
                data: barData,
                options: {
                    indexAxis: 'y'
                
                }
                
            });

            new Chart("chart-area3", {
                type: 'pie',
                data: pieData
                
            });

            new Chart("chart-area4", {
                type: 'doughnut',
                data: doughnutData2
                
            });

  
    }, []);
   
}