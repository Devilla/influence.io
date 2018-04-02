import React, { Component } from 'react';

export class Website extends Component{
    
    handleCheckbox = event => {
        const target = event.target;
        console.log(event.target);
        this.setState({
            [target.name]: target.checked
        });
    };
    

    
    render(){     
       let tasks=[];
        for (var i = 0; i < this.props.data.length; i++) {
           tasks.push(
                <tr key={i}>                   
                    <td><i className="fas fa-globe"></i> {this.props.data[i].domain}</td>
                </tr>
            );
        }
        return (
            <tbody>
              {this.props.render && 
                 tasks
                
              }
             {!this.props.render && 
                <tr><td><img src='loader.gif' alt="loader"/></td></tr>
             }  
            </tbody>
        );
    }
}

export default Website;
