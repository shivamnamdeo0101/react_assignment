import React,{useState} from 'react';
import "./comp.css";
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import firebase from "../base";

function AddForm() {


	const [form_data, set_form_data] = useState({"part_number":"BOLT00000"+Math.floor(Math.random() * 10)});

	const [work_id, set_work_id] = useState("");
	const [file, setFile] = useState("");
	const [uploading, set_uploading] = useState(0);


	const [url, setURL] = useState("");

	function handleChange(evt) {
  		const value = evt.target.value;
  		set_form_data({
    		...form_data,
    		[evt.target.name]: value
  		});
	}
	

	

	function handleUpload(e) {
		setFile(e.target.files[0].name);
	  	return new Promise(async (res, rej) => {
	    	const uploadTask = firebase.storage().ref(`thumbnails/${Date.now()}.png`).put(e.target.files[0]);
	    		uploadTask.on("state_changed", snapshot => { 
	    			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	    			set_uploading('Upload is ' + progress + '% done');
	    			}, err => {
	                	rej(err);
	            	},
	                async () => {
	                    const url = await uploadTask.snapshot.ref.getDownloadURL();
	                    set_uploading(0);
	                    setURL(url);

	                    res(url);
	                }
	        	)
	    })
	  }


	const on_submit = (e)=>{
		e.preventDefault();
		firebase.firestore()
		.collection('parts_data')
		.add({...form_data,timestamp:Date.now(),thumbnail:url});
		alert("Data Saved...");
		window.location.reload();
	}

	const cancel = () => { 
	  document.getElementById("form").reset();
	  set_form_data({});
	}



	return (
		<div className="form">
			<div className="form_heading">
				<h2>Add New Part</h2>
			</div>


				<div>
					<form id="form" onSubmit={on_submit}>
						<div className="form_bg">
							<div className="form_input_grid">
								<div className="form_input_comp input_row">
									<label>Category</label>
									<h4>Metal</h4>
								</div>
								<div className="form_input_comp input_row">
									<label>SubCategory</label>
									<h4>Bolts</h4>
								</div>
							</div>
							<div className="form_input_grid">
								<div className="form_input_comp input_col">
									<label>Part Number</label>
									<input type="text" placeholder="BOLT00000..."  name="part_number" value={form_data.part_number} onChange={handleChange} required disabled/>
								</div>
								<div className="form_input_comp input_col">
									<label>
										<mark>*</mark>Part Name 
										<Tooltip title="Important" ><InfoIcon fontSize="small" /></Tooltip>
									</label>
									<input type="text" placeholder="3mm bolt"  name="part_name" value={form_data.part_name} onChange={handleChange} required/>
								</div>
							</div>
							<div className="form_input_grid">
								<div className="form_input_comp input_col">
									<label>Part Description</label>
									<textarea rows="3" placeholder="Some brief description comes here"   name="part_description" value={form_data.part_description} onChange={handleChange} required/>
								</div>
								
							</div>


							<div className="form_input_grid">
								<div className="form_input_comp input_col">
									<label> <mark>*</mark>Part Category
										<Tooltip title="Important" ><InfoIcon fontSize="small" /></Tooltip>
									</label>
									<div className="radio_grid">

										<div className="radio_row">
											<input type="radio"   name="part_category" value="Primary Part" onChange={handleChange} required/>
											<p>Primary Part</p>
										</div>

										<div className="radio_row">
											<input type="radio"  name="part_category" value="Substitute Part" onChange={handleChange} required/>
											<p>Substitute Part</p>
										</div>

									</div>


								</div>

								<div className="form_input_comp input_col">
									<label>
										<mark>*</mark>Select Primary Part
										<Tooltip title="Important" ><InfoIcon fontSize="small" /></Tooltip>
									</label>
									<input type="text"  placeholder="Primary Part"name="primary_part" value={form_data.primary_part} onChange={handleChange} required/>
								</div>
							</div>
							<div className="form_input_grid">
								<div className="form_input_comp input_col">
									<label> <mark>*</mark>Part Procurement
										<Tooltip title="Important" ><InfoIcon fontSize="small" /></Tooltip>
									</label>
									<div className="radio_grid">

										<div className="radio_row">
											<input type="radio" name="part_procurement" value="Bought out Part" onChange={handleChange} required/>
											<p>Bought out Part</p>
										</div>

										<div className="radio_row">
											<input type="radio"  name="part_procurement" value="Inhouse Part" onChange={handleChange} required/>
											<p>Inhouse Part</p>
										</div>

									</div>


								</div>
								
								<div >
								</div>
							</div>
							<div className="form_input_grid">
								<div className="form_input_comp input_col">
									<label>Unit Of Measure</label>
									<select  value={form_data.unit_of_measure} name="unit_of_measure" value={form_data.unit_of_measure} onChange={handleChange} required>
										{
											["Milimeters (mm)","cm","meter"].map((item)=>(
												<option key={item} value={item} >{item}</option>
											))
										}														
									</select>									
								</div>
								<div className="form_input_comp input_col">
									<label> <mark>*</mark>Measurement
									<Tooltip title="Important" ><InfoIcon fontSize="small" /></Tooltip>
									</label>
									<select  value={form_data.measurement} name="measurement" value={form_data.measurement} onChange={handleChange} required>
										{
											["10*20*30","20*30","30*20"].map((item)=>(
												<option key={item} value={item} >{item}</option>
											))
										}														
									</select>
								</div>
							</div>
							<div className="form_input_grid">
								
								<div className="form_input_comp input_col">
									<label> <mark>*</mark>Status
									<Tooltip title="Important" ><InfoIcon fontSize="small" /></Tooltip>
									</label>
									<input type="text" placeholder="In Work"  name="measurement" value={form_data.status} onChange={handleChange} required/>
								</div>
								<div>
								</div>
							</div>
							<div className="form_input_grid">
								<div className="form_input_comp input_col">
									<label><mark>*</mark>3D CAD Url
									<Tooltip title="Important" ><InfoIcon fontSize="small" /></Tooltip>
									</label>

									<input type="text" placeholder="abcd e"  name="cad_url" value={form_data.cad_url} onChange={handleChange} required/>
								</div>
								<div className="form_input_comp input_col">
									<label> <mark>*</mark>Cost
									<Tooltip title="Important" ><InfoIcon fontSize="small" /></Tooltip>
									</label>
									<input type="text" placeholder="Enter cost for the part"  name="cost" value={form_data.cost} onChange={handleChange} required/>
								</div>
							</div>

							<div className="form_input_grid">
								<div className="form_input_comp input_col" htmlFor="upload">
									<div className="form_input_comp" htmlFor="thumbnail">	
										<div className="file-input">
									      <input
									        type="file"
									        
									        id="thumbnail"
									        className="file-input__input"
									        onChange={handleUpload}
									        
									      />
									      <label className="file-input__label" htmlFor="thumbnail">
									        <CloudUploadIcon   />
									        <span>Upload file </span></label
									      >

									    </div>
									   <label> {file}</label>
									</div>                  
                       
									
								</div>
								
							</div>


						</div>

						<div className="form_submit">
							<button type="cancel" onClick={cancel} className="cancel_button">Cancel</button>
							<button type="submit"className="submit_button">Done</button>
						</div>
					</form>
				</div>
		</div>
	)
}

export default AddForm