import React from 'react';

/*import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';*/

import {Cards, Chart, CountryPicker} from './components/';
import styles from './App.module.css'
import { fetchData } from './api'


import coronaimage from './imgs/covidimg.png'

class App extends React.Component {

    state = {
        data:{},
        country: '',
    }

    async componentDidMount(){
        const feachedData = await fetchData();

        this.setState({ data:feachedData });
    }

    handleCountryChange = async (country) => {
    const data = await fetchData(country);
    this.setState({data: data, country: country});
}

    render(){
        const { data, country } = this.state;
        return(
            <div className={styles.container}>
                <img className={styles.image} src={coronaimage} alt="COVID-19"/>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>

            </div>
        )
    }

}
export default App;