import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export class CardTable extends Component{
    render(){
        return (
            <div className="card card-plain">                
                <div className="content">  
                    <Scrollbars style={{ height: 300 }}>
                        {this.props.content}     
                    </Scrollbars>               
                </div>
            </div>
        );
    }
}

export default CardTable;

