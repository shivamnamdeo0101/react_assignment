import React,{useState,useEffect} from 'react';
import firebase from "../base";
import "./comp.css";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";

function ListComp() {

	const [loading, setLoading] = useState("");
	const [parts_data, set_parts_data] = useState([]);

	useEffect(() => {
    const subscriber = firebase.firestore()
          .collection('parts_data')
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        
        const parts_data_ = [];
  
        querySnapshot.forEach(doc => {
        		parts_data_.push({
        		  	...doc.data(),
          	 		 key: doc.id
        		 });
        });
    
        set_parts_data(parts_data_);
        setLoading(false);
      });
  
    return () => subscriber();
  }, []); 


	return (
		<div className="list_comp">
			<div className="form_heading">
				<h2>Parts List Items</h2>
			</div>

			<div className="parts_data_list">
				{
					parts_data.map((item,index)=>(
						<div key={item.key} className="parts_data_comp">


							<div className="row_part">

								<p>S.No.</p>
								<p>{index+1}</p>
							</div>
							<div className="row_part">
								<p>Thumbnail</p>
								<img src={item.thumbnail} alt=""/>
							</div>
							<div className="row_part">
								<p>Part Number</p>
								<p>{item.part_number}</p>
							</div>


							
							<div className="row_part">
								<p>Part Name</p>
								<p>{item.part_name}</p>
							</div>
							<div className="row_part">
								<p>CAD url</p>
								<p>{item.cad_url}</p>
							</div>
							<div className="row_part">
								<p>Cost</p>
								<p>{item.cost}</p>
							</div>
							<div className="row_part">
								<p>Measurement</p>
								<p>{item.measurement}</p>
							</div>
							<div className="row_part">
								<p>Part Category</p>
								<p>{item.part_category}</p>
							</div>
							<div className="row_part">
								<p>Part Description</p>
								<p>{item.part_description}</p>
							</div>
							<div className="row_part">
								<p>Part Procurement</p>
								<p>{item.part_procurement}</p>
							</div>
							<div className="row_part">
								<p>Primary Part</p>
								<p>{item.primary_part}</p>
							</div>
							<div className="row_part">
								<p>Timestamp</p>
								<p>{moment(item.timestamp).fromNow()}</p>
							</div>
							
							
							
							
							
							
							
							
							
							

						</div>
					))
				}	

			</div>

		</div>
	)
}

export default ListComp