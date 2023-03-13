import { Component } from "react";
import FiresList from "./components/FiresList";
import NoData from "./components/NoData";
import MonthSelector from "./components/MonthSelector";
import YearSelector from "./components/YearSelector";
import LoadingSpinner from "./components/LoadingSpinner";
import './App.css';

export default class App extends Component {

  constructor(props) {
    super()
    this.state = {
      monthValues: 'Select a Month',
      monthSelected: '',
      monthId: '',
      yearValues: 'Select a Year',
      yearSelected: '',
      selectValue: '',
      fireData: [],
      loading: false,
      isEmptyList: false
    }
  }

  //function responsible for fetching data by calling the wildfire api 
  fetchWildFires = () => {

    const MM = this.state.monthId
    const YYYY = this.state.yearSelected

    this.setState({ loading: true, isEmptyList: false, fireData: [] }, async () => {
        await fetch(`/fires?month=${MM}&year=${YYYY}`)
        .then( res => res.json())
        .then( json => {
          if( json.wildfires.length === 0 ){
            this.setState({ loading: false, isEmptyList: true, fireData: [] })
          } else {
            this.setState({ loading: false, isEmptyList: false, fireData: json.wildfires })
          }
        })
    })
  }
  //function responsible for setting month selected by user  
  clickOnMonth = (mm) => {
    this.setState({ monthId: mm.id, monthValues: mm.text, monthSelected: mm.text })
  }
  //function responsible for setting year selected by user 
  clickOnYear = (yy) => {
    this.setState({yearValues: yy, yearSelected: yy})
  }

  render(){ 
    return (
      <div className="container">

        <div className="container text-center">
          
          <div className="row">
            <div className="col-md-4"><h3>Wildfires API <span><h5><span className="badge rounded-pill text-bg-secondary">Powered by NASA</span></h5></span></h3></div>
            <div className="col-md-8"></div>
          </div>

          <div className="row">
            <div className="col-6 col-md-4">
              <div className="dropdown-center">
                {
                  <MonthSelector monthBtnValue={this.state.monthValues} onClick={this.clickOnMonth}/>
                }
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="dropdown-center">
                { 
                  <YearSelector yearBtnValue={this.state.yearValues} onClick={this.clickOnYear}/>
                }
              </div>
            </div>
            <div className="col-6 col-md-4">
              <button type="button" onClick={this.fetchWildFires} className="btn btn-danger">
                Find Wild Fires
              </button>
            </div>
          </div>
          
          <div className="row">
            <div className="col-6 col-md-4">
              <h3>{ this.state.monthSelected }</h3>
            </div>
            <div className="col-6 col-md-4">
              
                <h3>{ this.state.yearSelected }</h3>
              
            </div>
            <div className="col 6"></div>
          </div>

          <div className='row'>
            <div>
              { 
                this.state.loading ? <LoadingSpinner /> :
                this.state.isEmptyList ? <NoData /> :
                this.state.fireData.length !== 0 ? <FiresList firesData={this.state.fireData}/> : ''
              } 
          </div>
          </div>
        </div>
      </div>
    )
  }
}
