import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import * as UserState from '../store/UserState';

class About extends React.Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		return <div>
			<div className="container">
				<h2 id='privacidad' className="my-4">About</h2>
				<h3 id='privacidad' className="my-4">Static Content</h3>
				<div className="row">
					<div className="col-12">
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat, nibh vehicula porttitor auctor, nibh lacus ornare turpis, quis faucibus tellus mauris eget tellus. Morbi a orci sit amet tellus ultricies placerat. Sed id mollis dui. Aenean tempor ultricies consequat. Nulla elementum, elit et tincidunt suscipit, libero sem pulvinar elit, viverra ullamcorper magna magna nec libero. Vivamus efficitur.</p>
					</div>
				</div>
			</div>
		</div >;
	}
}

About.propTypes = {
	legalPolicyContent: PropTypes.string
}

export default connect(
	state => ({
		legalPolicyContent: state.user.legalPolicyContent
	}),
	UserState.actionCreators
)(About);
