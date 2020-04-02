import React, { Component } from 'react';
import './App.css';
import Paper from './Paper/Paper.js';
import data from './summaries.json';
import paper from './Paper/Paper.js';

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
			<div className="App">
				<h1>Hey, we need your help</h1>
				<p>Do sentences in the abstract below answer your questions about smoking as a risk factor?</p>
				{papers.map(paper => {
					return (
						<Paper
							key={paper.doc_id}
							title={paper.title}
							authors={paper.authors}
							doi={paper.doi}
							journal={paper.journal}
							abstract={paper.abstract}
							summary={paper.scibert_summary}
						/>);
				})}

				<button onClick={this.loadMoreHandler}>Load More</button>
				<p>{this.state.winSize}</p>

			</div>
		);
	}
}

export default App;
