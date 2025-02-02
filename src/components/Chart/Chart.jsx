import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({data:{confirmed, deaths, recovered}, country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
       const fetchAPI = async () => {
         setDailyData(await fetchDailyData());
       }

       //console.log(dailyData);

       fetchAPI();
    },[]);

    const lineChart = (
        dailyData.length
          ?(
            <Line
                data={{
                    labels: dailyData.map(({ date }) => date ),
                    datasets:[{
                        data:dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        boarderColor: '#3333ff',
                        fill: true,
                    }, {
                        data:dailyData.map(({ deaths }) => deaths),
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

    console.log(confirmed, recovered, deaths);


    const BarChart  =(
        confirmed?(
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets:[{
                        label:'People',
                        backgroundColor:['rgba(0, 0, 255, 0.5)','rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)' ],
                        data:[confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend:{display:false},
                    title: {display:true, text:`current state in ${country}`}
                }}
            />
        ): null
    )
    return (
        <div className={styles.container}>
            {country? BarChart : lineChart}
        </div>
    )
}
export default Chart;
