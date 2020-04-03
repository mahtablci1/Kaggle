import React, { Component } from 'react';
import './App.css';
import PaperComponent from './Paper/Paper.js';
import data from './summaries.json';

class App extends Component {
	state = {
		paperRefs: data,
		winSize: 10
	}

	prevArticleHandler = () => {
		if (this.state.curIndex > 0) {
			this.setState({
				curIndex: this.state.curIndex - 1
			});
		}
	}

	nextArticleHandler = () => {
		if (this.state.curIndex < this.state.paperRefs.length) {
			this.setState({
				curIndex: this.state.curIndex + 1
			});
		}
	}

	loadMoreHandler = () => {
		this.setState({
			winSize: this.state.winSize + 10
		})
	}

	render() {
		const style = {
			backgroundColor: 'white',
			font: 'inherit',
			border: '1px solid blue',
			padding: '8px',
			cursor: 'pointer'
		};
		const csvFilePath = 'smoke_df_summarized.csv';

		const papers = this.state.paperRefs.slice(this.state.curIndex,
			this.state.winSize);


		console.log(this.state.paperRefs);


		return (
			<div>
				<div className="app-header">
					<h1>Hey, we need your help!</h1>
					<h4>Please select the sentences in each summary that are relevant to the following Covid-19 risk factors</h4>
				</div>

				<div>
					{papers.map(paper => {
						return (
							<PaperComponent
								paper={paper}
							/>);
					})}
				</div>

				<button onClick={this.loadMoreHandler}>Load More</button>
				<p>{this.state.winSize}</p>

			</div>
		);
	}
}

export default App;
