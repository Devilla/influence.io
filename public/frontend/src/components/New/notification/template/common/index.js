import React, { Component } from 'react';


export class Card extends Component{
    render(){
        return (
            <div className={this.props.isDisabled ? "card card-plain inner-display" : "card card-plain inner-display disabled"}>
                <div className="header">
                    <h4 className="title">{this.props.title}</h4>
                    <div className="status">
                        {this.props.status}
                    </div>
                </div>
                <div className="content">
                    {this.props.content}                    
                </div>
               
             
                <div className={this.props.isDisabled ? "overlays hide": "overlays "}></div>
               
            </div>
        );
    }
}

export default Card;
