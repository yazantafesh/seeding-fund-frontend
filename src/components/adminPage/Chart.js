import React from 'react';
import { Pie } from 'react-chartjs-2';
import './adminPage.css';

const Chart = (props) => {

  const data = {
    labels: ['Declined', 'Pending', 'Accepted'],
    datasets: [
      {
        label: 'Project Status',
        data: [props.Declined, props.Pending, props.Accepted],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h3 className='title'>Projects Data</h3>
      <div id="chartContainer">
        <h3 className='chartTitle'> Project Status Chart</h3>
        <div id="chart">
          <Pie data={data} />
        </div>
      </div>
    </>
  )
};

export default Chart;