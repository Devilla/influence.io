import React, {Component} from 'react';

class Footer extends Component {
	render() {
		return (
            <footer className="footer">
                                
                    <p className="copyright center">
                        Copyright  &copy; {(new Date()).getFullYear()} All rights reserved.
                    </p>
               
            </footer>
		);
	}
}

export default Footer;
