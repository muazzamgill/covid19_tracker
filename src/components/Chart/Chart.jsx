import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';
import { Container } from '@material-ui/core';

const Chart = () => {
    const [dailyData, setDailyData] = useState({});

    useEffect(() => {
       const fetchAPI = async () => {
         setDailyData(await fetchDailyData());
       }

       //console.log(dailyData);

       fetchAPI();
    });

    const lineChart = (
        dailyData[0]
          ?(
            <Line
                data={{
                    labels: dailyData(({ date }) => date ),
                    datasets:[{
                        data:dailyData(({ confirmed }) => confirmed),
                        label: 'Infected',
                        boarderColor: '#3333ff',
                        fill: true,
                    }, {
                        data:dailyData(({ deaths }) => deaths),
                        label: 'Infected',
                        boarderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    }],
                }}options={{
                scales : { xAxes : [ { gridLines : { display : false } } ], yAxes : [ { gridLines : { display : false } } ] }
            }}
            />) : null
    );

    return(

        <div className={styles.container}>
            {lineChart}
        </div>

        )

}
export default Chart;