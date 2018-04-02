import React, { Component } from 'react';


export class CardHeader extends Component{
    render(){
        return (
            <div className="card card-plain">
                <div className="header">
                    <h4 className="title">{this.props.title}</h4> 
                </div>
                <div className="content">  
                    {this.props.content}                    
                </div>
            </div>
        );
    }
}

export default CardHeader;

