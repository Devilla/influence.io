import React, {Component} from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';
import ChartistGraph from 'react-chartist';
import StatsCard from './Stats'
import Website from './Website'
import Card from './Card'
import {Scrollbars} from 'react-custom-scrollbars';
import {dataSales, optionsSales, responsiveSales, legendSales} from 'components/utils/variable.jsx';
import { getCookie, ajaxgetrequest } from 'components';
import { fetchElastic } from 'ducks/elastic';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      render: false,
      arrs: [],
      UniqueVisitor: 0
    }
  }

  componentWillMount() {
    this.props.fetchElastic("json.value.trackingId:INF-azg2fhewkjfwstxof");
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.elastic.message, "====elasticsearch");
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i}></i>);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  // checkauth(){
  //     var k = this;
  //     var usertoken = getCookie("usertoken");
  //     var data = ajaxgetrequest('http://localhost:3000/website',usertoken);
  //     window.setTimeout(function(){
  //         for(var i=0;i<data.length;i++){
  //             k.setState({
  //                 arrs :  [...k.state.arrs, data[i]],
  //                 render: true,
  //                 UniqueVisitor: data[i].domain?data[i].domain.length:0
  //             })
  //         }
  //
  //         console.log(k.state.arrs)
  //
  //     },3000)
  //
  //
  // }

  render() {
    return (<div className="content">
      <Grid fluid="fluid">

        <Row>
          <Col md={6}>
            <Row>
              <Col lg={6} sm={6}>
                <Row>
                  <Col lg={12}>
                    <Card title="Websites with Pixel" category="" content={<div className = "table-full-width" > <Scrollbars style={{
                          height: 150
                        }}>
                        <table className="table">
                          <Website data={this.state.arrs} render={this.state.render}/>
                        </table>
                      </Scrollbars>
                    </div>}/>
                  </Col>
                </Row>
                {/* <Row>
                  <Col lg={12}>
                    <div className="card card-stats ga-connect">
                      <div className="content">
                        <Row>
                          <Col xs={12}>
                            <div className="icon-big text-center">
                              <i className="pe-7s-lock"></i>
                            </div>
                            <div className="txt">
                              <a href="#">Connect to GA for more</a>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row> */}
              </Col>
              <Col lg={6} sm={6}>

                <Row>
                  <Col lg={12} sm={12}>
                    <StatsCard statsClass="card card-stats  eqheight" statsText="Unique Visitors" statsValue={this.state.UniqueVisitor}/>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} sm={12}>
                    <StatsCard statsClass="card card-stats  eqheight" statsText="Notifications Shown" statsValue="0"/>
                  </Col>
                </Row>
              </Col>
            </Row>

          </Col>

          <Col md={6}>
            <Row>
              <Col lg={12}>
                <Card
                  statsIcon="fa fa-history"
                  id="chartHours"
                  title="Website Traffic"
                  category="24 Hours performance"
                  stats="Updated 3 minutes ago"
                  content={
                    <div className = "ct-chart">
                      <ChartistGraph
                        data={dataSales}
                        type="Line"
                        options={optionsSales}
                        responsiveOptions={responsiveSales}
                      />
                    </div>
                  }
                  legend={
                    <div className = "legend" >
                      {this.createLegend(legendSales)}
                    </div>
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="text-center">
              Get one of our experts to do it all for you! &nbsp;
              {/* <a href="javascript:;">Click here</a> */}
            </p>
          </Col>
        </Row>
      </Grid>
    </div>);
  }
}

const mapStateToProps = state => ({
  elastic: state.getIn(['elastic', 'elastic']),
});

const mapDispatchToProps = {
  fetchElastic
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
