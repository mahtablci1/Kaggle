import React, { Component } from 'react';
import './App.css';
import PaperComponent from './Paper/Paper.js';
// import data from './data/risk_covid_join.json'
// import diabete_data from "./data/diabete.json";
// import tuberclosis_data from "./data/tuberclosis.json";
// import pregnan_data from "./data/pregnan.json";
// import smoke_data from "./data/smoke.json";
import enriched_data from "./data/enriched_covid_df.json";

// const rankedRiskFactors = {
// 	pregnancy: pregnan_data,
// 	smoking: smoke_data,
// 	diabetes: diabete_data,
// 	tuberculosis: tuberclosis_data,
// }

// const riskFactors = [
// 	"pregnancy", "smoking", "diabetes", 'tuberculosis',
// 	"hypertension", "race", "heart disease", "nursing home",
// 	"cancer", "immigration", "elderly", "education",
// 	"insurance", "neonates", "income",
// 	"ethnicity", "housing", "health workers", "hospital staff", "staff"
// ];

function unstemRiskFactor(stemmedRiskFactor) {
	if (stemmedRiskFactor === 'pregnan') return 'pregnancy';
	else if (stemmedRiskFactor === 'smok' || stemmedRiskFactor === 'lung' || stemmedRiskFactor === 'immun') return 'smoking';
	else if (stemmedRiskFactor === 'tubercul' || stemmedRiskFactor === 'tb' || stemmedRiskFactor === 'sputum') return 'tuberculosis';
	else if (stemmedRiskFactor === 'diabete') return 'diabetes';
	else if (stemmedRiskFactor === 'comorbidit') return 'comorbidity';
	else if (stemmedRiskFactor === 'hyperten') return 'hypertension';
	return stemmedRiskFactor;
}

function unstemDesign(stemmedDesign) {
	return stemmedDesign;
}

class App extends Component {
	riskFactors;


	constructor() {
		super();
		const papers = this.cleanPapers(enriched_data);
		this.state = {
			papers: enriched_data,
			cleanedPapers: papers,
			paperRefs: papers,
			winStart: 0,
			winSize: 10,
		}

		this.filterByRiskFactor = this.filterByRiskFactor.bind(this);
	}

	cleanPapers(data) {
		console.log(data);

		let papers = data.sort((p1, p2) => {
			return p1.total_rank - p2.total_rank;
		})

		this.cleanRiskFactors(papers);
		this.cleanDesigns(papers)

		console.log(papers);
		return papers;
	}

	cleanRiskFactors(papers) {
		this.riskFactors = new Set();
		papers.forEach(p => {
			if (typeof p.risk_factors === 'string') {
				p.risk_factors = this.handleStringRiskFactors(p.risk_factors);
			}
			if (!Array.isArray(p.risk_factors)) {
				console.error('risk_factor column must be array of strings!', p.risk_factors);
			}
			p.risk_factors = this.makeFlatUnique(p.risk_factors);
			p.risk_factors = p.risk_factors.map(f => unstemRiskFactor(f.trim()));
			p.risk_factors.forEach(f => this.riskFactors.add(f));
		});
	}

	cleanDesigns(papers) {
		papers.forEach(p => {
			p.design_x = this.makeFlatUnique(p.design_x).map(d =>unstemDesign(d));
		})
	}

	makeFlatUnique(arr) {
		return [...new Set(arr.flat())]
	}

	handleStringRiskFactors(risk_factors) {
		// use double quotes
		risk_factors = risk_factors.replace(/'/g, '"');
		// remove duplicates
		risk_factors = JSON.parse(risk_factors);
		return risk_factors
	}

	render() {
		const papers = this.state.paperRefs.slice(this.state.winStart, this.state.winStart + this.state.winSize);

		console.log(papers)


		return (
			<div>

				<header>
					<div className="app-header">
						<h1>What do we know about COVID-19 risk factors? What have we learned from epidemiological studies?</h1>
					</div>

					<div className="searchbar">
						<h4>Filters:</h4>
						<div className="filters">
							<label>
								Risk Factor:
								<select onChange={this.filterByRiskFactor}>
									<option value=""></option>
									{this.getRiskFactorOptions()}
								</select>
							</label>
						</div>
					</div>

				</header>

				<div>
					{papers.map(paper => {
						return (
							<PaperComponent
								key={paper.doc_id}
								paper={paper}
							/>);
					})}
				</div>

				<button onClick={this.loadMoreHandler}>Load More</button>
				<p>{this.state.winSize}</p>

			</div>
		);
	}

	filterByRiskFactor({target}) {
		const factor = target.value;
		this.setState({
			paperRefs:
				factor
					? this.state.cleanedPapers.filter(p => p.risk_factors.includes(factor))
					: this.state.cleanedPapers,
			winSize: 10
		})
	}

	getRiskFactorOptions() {
		return [...this.riskFactors].map(f => {
			const factorLabel = f[0].toUpperCase() + f.slice(1);
			return (
				<option
				  key={f}
					value={f}
					className="title-case">
					{factorLabel}
				</option>
			)
		})
	}

	loadMoreHandler = () => {
		this.setState({
			winSize: this.state.winSize + 10
		})
	}

}

export default App;
