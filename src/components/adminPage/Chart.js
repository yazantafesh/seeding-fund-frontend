import React from 'react';
import { Pie } from 'react-chartjs-2';

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
      <div className='header'>
        <h1 className='title'>Projects</h1>
      </div>
      <div style={{width:'300px', height:'300px'}}>
        <Pie data={data} />
      </div>
    </>
  )
};

export default Chart;