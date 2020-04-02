import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CSVReader from 'react-csv-reader';
import Papa from 'papaparse';
import './Paper.css';

const handleForce = (data, fileInfo) => console.log(data, fileInfo);


const paper = (props) => {
	return (
		<div>
			<h2>Title: </h2>
			<h4>{props.title}</h4>
			<h2>Authors: </h2>
			<h4>{props.authors}</h4>
			<h5>DOI: {props.doi}</h5>
			<p>
				<h4>Abstract: </h4>
				<p>{props.abstract}</p>
			</p>
		</div>
	);
};

export default paper;