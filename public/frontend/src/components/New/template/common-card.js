import React, { Component } from 'react';
import {
    Breadcrumb, Panel 
} from 'react-bootstrap';

export class CommonCard extends Component{
    render(){
        return (
            <div className="card card-plain">
                <div className="header">
                <Breadcrumb>
                     <Breadcrumb.Item href="#"><i className="fas fa-globe"></i> {this.props.url}</Breadcrumb.Item>
                     <Breadcrumb.Item active>{this.props.notification}</Breadcrumb.Item>  
                 </Breadcrumb>    
                    
                </div>
                <div className="content">  
                    {this.props.content}            
                </div>
            </div>
        );
    }
}

export default CommonCard;

