import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CSVReader from 'react-csv-reader';
import Papa from 'papaparse';
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
const PaperComponent = ({paper}) => {
	let {
		doc_id, journal, title, authors, doi,
		text_body, abstract, scibert_summary
	} = paper;

	// todo: skip splitting when abstract is retrieved as string[] directly
	const sentences = abstract.split(/(?<=\.\s+)/);
	const onevent = evt => title = 'hi';
	return (
		<div className="paper-container">
			<div className="paper-metadata">
				<h4>Title:</h4> <span>{title}</span>
				<h4>Journal:</h4> <span>{journal}</span>
				<h4>Authors:</h4> <span>{authors}</span>
				<h4>Doi:</h4> <span>{doi}</span>
			</div>

			<div className="paper-data">
				<div className="paper-summary">
					<h4>Abstract</h4>
					<p>{sentences.map((sentence, idx) => <span key={idx} className="sentence">{sentence}</span>)}</p>
				</div>
			</div>

		</div>
	)
};

export default PaperComponent;
