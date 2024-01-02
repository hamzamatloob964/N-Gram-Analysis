import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../App.css';

function Index() {

	const [tableLength, setTableLength] = useState(30);
	const [nGramLength, setNGramLength] = useState(4);
	const [caseSensitive, setCaseSensitive] = useState(true);
	const [cipherInputText, setCipherInputText] = useState('The quick brown fox jumps over the lazy dog');
	const [nGramsArr, setNGramsArr] = useState([]);
	const [counter, setCounter] = useState(0);

	const handleTableLengthChange = (e) => {
    setTableLength(e.target.value);
		checkCounter(caseSensitive,cipherInputText,nGramLength,e.target.value)
  }
	const handleNGramChange = (e) => {
    setNGramLength(e.target.value);
		checkCounter(caseSensitive,cipherInputText,e.target.value,tableLength)
  }
	const handleTextInput = (e) => {
    setCipherInputText(e.target.value);
		checkCounter(caseSensitive,e.target.value,nGramLength,tableLength)
  }
	const handlecaseSensitive = (e) => {
    setCaseSensitive(!caseSensitive);
		checkCounter(e.target.checked,cipherInputText,nGramLength,tableLength)
  }
	const handleSubmit = () => {
		if(counter === 0){
			!caseSensitive? computeNGrams(cipherInputText.toUpperCase(),nGramLength,tableLength) : computeNGrams(cipherInputText,nGramLength,tableLength)
			setCounter(1)
		}
  }
	const checkCounter = (value,inputText,nGram,tLength) => {
		if(counter > 0){
			!value? computeNGrams(inputText.toUpperCase(),nGram,tLength) : computeNGrams(inputText,nGram,tLength)
		}
  }
	const computeNGrams = (inputText,nGram,tLength) => {
		const arr = []
		for (let x = 1; x <= nGram; x++) {
			const finalText = inputText.replace(/ /g, '')
			const nGObj = {};
			for (let i = 0; i <= finalText.length - x; i++) {
				const gram = finalText.substr(i, x);
				if (!nGObj[gram]) {
					nGObj[gram] = 1
				} else {
					nGObj[gram]++
				}
			}
			const nGArr = []
			const textLength = finalText.length
			for (const gram in nGObj) {
				const absolute = nGObj[gram]
				const relative = (absolute / textLength) * 100
				nGArr.push({ key: gram, absolute, relative: relative.toFixed(2) })
			}
			nGArr.sort((a, b) => b.absolute - a.absolute)
			arr.push(nGArr.slice(0, tLength))
		}
		setNGramsArr(arr)
  };

  return (
    <div className='main-container'>
			<div className='sub-cont'>
				<div className='header'>
					<h2>Tabular N-Gram Analysis</h2>
				</div>
				<Tabs className="mt-5" >
					<TabList>
						<Tab><span className='selected-tab'>Analysis</span></Tab>
						<Tab><span className='selected-tab'>Description</span></Tab>
					</TabList>
					<TabPanel>
						<div className="form-group mt-4">
							<label className='mb-2'>Your text (Ciphertext):</label>
							<textarea className="form-control" rows="6" value={cipherInputText} onChange={handleTextInput} placeholder="Enter your text here..."></textarea>
						</div>

						<div className="form-inline mb-3 justify-content-between noselect d-flex flex-wrap">
							<div className="form-group mr-2 mt-3 mb-2">
								<input type="number" className=" form-control-sm text-center mr-1" value={tableLength} onChange={handleTableLengthChange}/>
								<label>: Length of the Table</label>
							</div>
							<div className="form-group mr-2 mt-3 mb-2">
								<input type="number" className="form-control-sm text-center" value={nGramLength} onChange={handleNGramChange}/>
								<label >-gram</label>
							</div>
							<div className="form-group custom-control text-center mr-2 mt-3 mb-2">
								<input className='marginT-right-5px checkBox-size ' type="checkbox" checked={caseSensitive} onChange={handlecaseSensitive}/>
								<label>Case Sensitive</label>
							</div>
						</div>

						<button type="button" className="btn btn-primary btn-lg btn-block mt-4 mb-4" onClick={handleSubmit}>
							Analyse
						</button>
						<div className='table-cont'>

							{ nGramsArr.length > 0 &&
									
									nGramsArr.map((arr,i) => (
										
										<table className="table table-bordered" key={i}>
											<thead className="thead-dark">
												<tr>
													<th className='text-center custom-color'>Rank</th>
													<th className='text-center custom-color' >{i+1}-gram</th>
													<th className='text-center custom-color' >Abs.</th>
													<th className='text-center custom-color' >Rel.</th>
												</tr>
											</thead>
											<tbody>
												{arr.map((gram, index) => (
													<tr key={index}>
														<td>{index+1}</td>
														<td>{gram.key}</td>
														<td>{gram.absolute}</td>
														<td>{gram.relative}</td>
													</tr>
												))}
											</tbody>
										</table>
									))
							}
						</div>
					</TabPanel>
					<TabPanel>
						<h6>The N-gram analysis determines the frequency of different N-grams in a text. Especially the gaps between equal N-grams can potentially be very useful for cracking a cipher because they can point to the key length. The following German sentence results in the N-Gram Analysis shown below.

								"Dieser Beispieltext führt bei einer n-Gramm-Analyse nach Histogrammen, Bigrammen und Trigrammen zu nachfolgendem Ergebnis, wenn lediglich die 20 häufigsten Treffer berücksichtigt werden."
						</h6>
					</TabPanel>
				</Tabs>
			</div>
    </div>
  );
}

export default Index;