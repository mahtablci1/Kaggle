import React, { Component } from 'react';
import './App.css';
import Paper from './Paper/Paper.js';
import data from './summaries.json';
import paper from './Paper/Paper.js';

class App extends Component {
	state = {
		paperRefs: data,
		curIndex: 0
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

	papers = this.state.paperRefs;
	index = this.state.curIndex;

	render() {
		const style = {
			backgroundColor: 'white',
			font: 'inherit',
			border: '1px solid blue',
			padding: '8px',
			cursor: 'pointer'
		};
		const csvFilePath = 'smoke_df_summarized.csv';

		console.log(this.state.paperRefs);


		return (
			<div className="App">
				<h1>Hey, we need your help</h1>
				<p>Do sentences in the abstract below answer your questions about smoking as a risk factor?</p>
				<Paper
					key={this.papers[this.state.curIndex].doc_id}
					title={this.papers[this.state.curIndex].title}
					authors={this.papers[this.state.curIndex].authors}
					doi={this.papers[this.state.curIndex].doi}
					journal={this.papers[this.state.curIndex].journal}
					abstract={this.papers[this.state.curIndex].abstract}
					summary={this.papers[this.state.curIndex].scibert_summary}
				/>
				<button onClick={this.prevArticleHandler}>Previous Article</button>
				<button onClick={this.nextArticleHandler}>Next Article</button>

			</div>
		);
	}
}

export default App;
