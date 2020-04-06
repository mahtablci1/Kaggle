import React, { Component } from 'react';
import './App.css';
import PaperComponent from './Paper/Paper.js';
import data from './risk_covid_join.json'

class App extends Component {

	constructor() {
		super();
		// sort papers by whethere they're covid related
		let _papers = data.sort((p1, p2) => {
			if (p1.is_covid_related && !p2.is_covid_related) return -1;
			else if (p2.is_covid_related && !p1.is_covid_related) return 1;
			else if (p1.is_covid_related && p2.is_covid_related) {
				return p2.publish_time - p1.publish_time
			}
			else return 0;
		})

		// clean risk_factor column
		_papers.forEach(p => {
			// use double quotes
			p.risk_factor = p.risk_factor.replace(/\'/g, '"')
			// remove duplicates
			p.risk_factor = [...new Set(JSON.parse(p.risk_factor))]
		});

		_papers = _papers.reduce((acc, paper) => {
			if (acc[paper.doc_id]) {
				acc[paper.doc_id].risk_factor.push(...paper.risk_factor)
			} else {
				acc[paper.doc_id] = paper
			}
			return acc;
		}, {})

		const papers = Object.values(_papers)
		console.log(papers);
		this.state = {
			paperRefs: papers,
			winSize: 10
		}
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

		console.log(papers)


		return (
			<div>
				<div className="app-header">
					<h1>What do we know about COVID-19 risk factors? What have we learned from epidemiological studies?</h1>
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
