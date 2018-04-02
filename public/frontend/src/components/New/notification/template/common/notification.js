import React, { Component } from 'react';
import power from './power.svg'

export class Notification extends Component {

	render() {
		const { radius, borderWidth, borderColor, shadow, blur, backgroundColor, color, fontFamily, fontWeight} = this.props.notificationPanelStyle;

		const notificationPanelStyle = {
			backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
			borderStyle: 'solid',
			borderWidth: `${borderWidth}px`,
			borderColor: `rgba(${borderColor.r}, ${borderColor.g}, ${borderColor.b}, ${borderColor.a})`,
			color: `rgb(${color.r}, ${color.g}, ${color.b})`,
			boxShadow: `${shadow}px ${shadow}px ${blur}px #000`,
			borderRadius: `${radius}px`,
			fontFamily,
			fontWeight
		};

		return (
			<div className="notification">
				<div className="edit"><a href="javascript:;">Click to Edit Content</a></div>
				<div className="wrapper" style={notificationPanelStyle}>
					<div className="imgwrapper">
						<img src="https://placeimg.com/80/80/people" style={{ borderRadius: `${radius}px` }} />
					</div>
					<div className="content">
						<div className="line first"><span>First Name</span>  from  <span>City</span>, <span>Country</span></div>
						<div className="line activity">Recently signed up for Influence</div>
						<div className="line time"><span>Time </span> ago <small> <img src={power} /> <em>Influence</em></small></div>
					</div>
				</div>
				<div className="desc">Best suited for Signups, Subscriptions etc.</div>
			</div>
		);
	}
}

export default Notification;