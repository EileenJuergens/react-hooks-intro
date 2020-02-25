import React, { Component } from 'react';


class App extends Component {
	state = {
		counter: 0,
		isOn: false,
		x: null,
		y: null
	}

	componentDidMount() {
		document.title = `You have clicked ${this.state.counter} times`;
		window.addEventListener("mousemove", this.handleMouseMove);
	}

	componentDidUpdate() {
		document.title = `You have clicked ${this.state.counter} times`
	}

	componentWillUnmount() {
		window.removeEventListener("mousemove", this.handleMouseMove);
	}

	incrementCount = () => {
		this.setState(prevState => ({
			counter: prevState.counter + 1
		}))
	}

	toggleLight = () => {
		this.setState(prevState => ({
			isOn: !prevState.isOn
		}))
	}

	handleMouseMove = (event) => {
		this.setState({
			x: event.pageX,
			y: event.pageY
		})
	}

	render() {
		return (
			<>
				<h2>Counter</h2>
				<button onClick={this.incrementCount}>
					I was clicked {this.state.counter} times
      			</button>

				<h2>Toggle Light</h2>
				<div style={{
					height: "50px",
					width: "50px",
					background: this.state.isOn ? "yellow" : "grey"
					}}
					onClick={this.toggleLight}
				/>

				<h2>Mouse Position</h2>
				<p>x position: {this.state.x}</p>
				<p>y position: {this.state.y}</p>

			</>
		);
	}
}

export default App;
