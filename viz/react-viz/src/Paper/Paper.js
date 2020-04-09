import React, { Component } from 'react';
import './Paper.css';

const handleForce = (data, fileInfo) => console.log(data, fileInfo);


/** Paper DTO
interface PaperDTO {
	// metadata
	doc_id: string;
	journal: string; // journal title
	title: string; // paper title
	authors: string; // paper authors
	doi: string; // digital object identifier
	publish_time: string;
	risk_factor: string // stringified array of risk factors
	design: string // design of the research experiment

	// data
	text_body: string; // paper full text
	abstract: string; // paper abstract
	scibert_summary: string; // paper summary

	transmission_indicator: boolean;
	smoke_indicator: boolean;
	// Unnamed: 0
	// Unnamed: 0.1
	// H index
}
*/

/**
 * Receives prop with paper DTO.
 */
class PaperComponent extends Component {

	constructor(props) {
		super(props)

		if (props.paper.doc_id === "5dc4268a42adf3d5c55c87b7f6518de600b057c5") {
			props.paper.relevant_section = `Breastfeeding is not contraindicated, based on current published guidelines – a
			retrospective analysis of COVID-19 in pregnancy showed that none of the women had
			detectable viral loads of SARS-CoV-2 in breastmilk. Regardless, if the patient chooses to
			breastfeed, a face mask should be worn due to the close proximity between mother and child
			to reduce the risk of droplet transmission. The presence of coronavirus antibodies in
			breastmilk depends on the gestation at which maternal infection occurred and if there was
			any preceding use of high-dose corticosteroids which could suppress maternal antibody
			responses`;
		}

		this.state = {
			paper: props.paper,
			excerpt: props.paper.relevant_section
		};
		this.state.paper.scibert_summary = this.state.paper.scibert_summary || 'lorem ipsum';
		this.setExcerpt = this.setExcerpt.bind(this);
	}


	// todo: skip splitting when abstract is retrieved as string[] directly
	render() {

		let {
			doc_id, journal, title, authors, doi,
			text_body, abstract, scibert_summary,
			relevant_section, design, risk_factor,
			publish_time,
		} = this.state.paper;

		const excerpt = this.state.excerpt;
		const relevant_section_sentences = excerpt.split(/(?<=\.\s+)/);
		// const scibert_summary_sentences = scibert_summary.split(/(?<=\.\s+)/);
		const link = `http://doi.org/${doi}`;
		// console.log(risk_factor, Array.isArray(risk_factor))
		// const riskFactors = JSON.parse(risk_factor);
		const riskFactors = risk_factor
		return (
			<div className="paper-container">
				<div className="paper-metadata">
					<h4>Title:</h4> <span>{title}</span>
					<h4>Journal:</h4> <span>{journal}</span>
					<h4>Publication Date:</h4> <span>{(new Date(publish_time)).toUTCString()}</span>

					{/* <h4>Authors:</h4> <span>{authors}</span> */}
					<h4>Doi:</h4> <span>{doi}</span>
					<h4>Design:</h4> <span className="title-case">{design}</span>
					<h4>Relevant Risk Factors</h4>
					<div className="btn-group-toggle" data-toggle="buttons">
						{riskFactors.map(riskFactor => {
							return (
								<label key={riskFactor} className="btn btn-secondary active title-case">{riskFactor}<input type="checkbox" checked onChange={() => {}} /></label>
							)
						})}
					</div>
					<h4><a href={link}>Reference</a></h4> <span></span>

				</div>

				<div className="paper-data">
					<div className="paper-summary">
						<h4>
							<label><span className={excerpt === relevant_section ? 'active' : ''}>Relevant Snippet</span> <input name={`${doc_id}-excerpt`} type="radio" checked={excerpt === relevant_section} onChange={this.setExcerpt.bind(this,relevant_section)}/></label>
							<label><span className={excerpt === scibert_summary ? 'active' : ''}>Extracted Summary</span> <input name={`${doc_id}-excerpt`} type="radio" checked={excerpt === scibert_summary} onChange={this.setExcerpt.bind(this,scibert_summary)}/></label>
						</h4>
						<p>{relevant_section_sentences.map((sentence, idx) => <span key={idx} className="sentence" className="">{sentence}</span>)}</p>
						{/* <p className={excerpt === scibert_summary ? 'active' : ''}>{scibert_summary_sentences.map((sentence, idx) => <span key={idx} className="sentence">{sentence}</span>)}</p> */}
					</div>
				</div>

			</div>
		)
	}

	setExcerpt(excerpt) {
		if (this.state.excerpt !== excerpt) {
			this.setState({excerpt: excerpt})
		}
	}

};

export default PaperComponent;
