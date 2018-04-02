import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const data = [
      {name: '10/03/2018', click: 4000, visit: 2400, active: 10},
      {name: '11/03/2018', click: 3000, visit: 1398, active: 1200},
      {name: '12/03/2018', click: 2000, visit: 9800, active: 1250},
      {name: '13/03/2018', click: 2780, visit: 3908, active: 6200},
      {name: '14/03/2018', click: 1890, visit: 4800, active: 1140},
      {name: '15/03/2018', click: 2390, visit: 3800, active: 4120},
      {name: '16/03/2018', click: 3490, visit: 4300, active: 7145},
];
class Graph extends Component {   
  constructor(){
    super();
   }
   componetDidMount(){
        console.log(this.props.url) 
   }  
    handleClosePopup(){
        this.props.callbackFromParent(false)
    }    
    render() { 
       const arrs = [
        {name:this.props.signups},
        {name: this.props.liveuser},
        {name: this.props.conversion}
       ]   
     
       
        return (            
                <div className="graph">
                    { this.props.showGraph && 

                     <div className="chart">
                     <h3>{this.props.website}</h3>  
                     <a href="javascript:;" onClick={this.handleClosePopup.bind(this)}><i className="far fa-times-circle"></i></a>
                      <LineChart width={600} height={300} data={data}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                       <XAxis dataKey="name"/>
                       <YAxis/>
                       <CartesianGrid strokeDasharray="3 3"/>
                       <Tooltip/>
                       <Legend />
                       <Line type="monotone" dataKey="click" stroke="#8884d8" activeDot={{r: 8}}/>
                       <Line type="monotone" dataKey="visit" stroke="#82ca9d" />
                       <Line type="monotone" dataKey="active" stroke="#fb404b" />
                      </LineChart>
                     </div>

                        
                    }
                    { this.props.showGraph && 
                             <div className="overlay"></div>  
                    }
                </div>
           
        );
    }
}

export default Graph;
