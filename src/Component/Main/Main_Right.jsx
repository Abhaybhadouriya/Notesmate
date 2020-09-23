import React, { Component } from "react";
import Axios from "axios";
import MaterialTable from "material-table";

class Main_Right extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      datacity: [],
    };
  }

  componentDidMount() {
    Axios.get("https://api.covid19india.org/data.json")
      .then((response) => {
        // console.log(response);
        this.setState({
          data: response.data,
        });
      })
      .catch();

    Axios.get("https://api.covid19india.org/v4/data.json")
      .then((response) => {
        this.setState({
          datacity: response.data,
        });
      })
      .catch();
  }

  render() {
    const data = this.state.data;
    const datacity1 = this.state.datacity
   
    // const result = obj.map(entry => {
     //  console.log(datacity1['MH'])
    // });
    // for(var i=0;i<datacity1.length;i++){
     
    // }
    // data.statewise.map(statewise=>console.log(statewise.statecode))
      //console.log(data.statewise.statecode)
      // datacity1.map((element, index) => {console.log(index)})
    
     
      var i=0
//       var result = Object.keys(datacity1).map(datacity11 => {
//         return({
//          id : datacity11 ,

//      { state : datacity1[datacity11]}

// }
//       )
//       })
      
      //console.log(datacity1['MH']['districts'])
      var viewData = { 
        dataq : [] 
       };
    
      var result={}
      for(var arrayIndex in datacity1){
      
       if(arrayIndex!='TT'){
       for(var ind in (datacity1[arrayIndex]['districts'])){
        var state={}
        state["statename"]=arrayIndex  
        state['state'] =ind 
        state['active'] = datacity1[arrayIndex]['districts'][ind]['total']['tested']
        state['recovered'] = datacity1[arrayIndex]['districts'][ind]['total']['recovered']
        state['confirmed'] = datacity1[arrayIndex]['districts'][ind]['total']['confirmed']
        state['deaths'] = datacity1[arrayIndex]['districts'][ind]['total']['deaths']
        viewData.dataq.push(state)
       } 
      }
      
      }
      
      

      var completeData = viewData.dataq

      console.log(completeData)
     // console.log(data.statewise)
    
    return data.statewise ? (
      <div>
        <MaterialTable
          columns={[
            {
              title: "Name",
              field: "state",
              sorting: false,
              cellStyle: {
                backgroundColor: "#039be5",
                color: "#FFF",
                width: 100,
              },
              headerStyle: {
                backgroundColor: "#039be5",
                color: "#FFF",
              },
            },
            {
              title: "Active",
              defaultSort: "desc",
              field: "active",
              searchable: false,
              type: "numeric",
              cellStyle: {
                backgroundColor: "#fff",

                color: "#039be5",
                width: 120,
              },
              headerStyle: {
                backgroundColor: "#039be5",
                color: "#FFF",
              },
            },
            {
              title: "Recovered",
              field: "recovered",
              type: "numeric",
              searchable: false,
              cellStyle: {
                backgroundColor: "#fff",

                color: "#00cc00",
                width: 120,
              },
              headerStyle: {
                backgroundColor: "#039be5",
                color: "#FFF",
              },
            },
            {
              title: "Confirmed",
              field: "confirmed",
              type: "numeric",
              searchable: false,
              cellStyle: {
                backgroundColor: "#fff",

                color: "#e62e00",
                width: 120,
              },
              headerStyle: {
                backgroundColor: "#039be5",
                color: "#FFF",
              },
            },
            {
              title: "Death",
              field: "deaths",
              searchable: false,
              type: "numeric",
              cellStyle: {
                backgroundColor: "#fff",

                width: 120,
              },
              headerStyle: {
                backgroundColor: "#039be5",
                color: "#FFF",
              },
            },
          ]}
          data={data.statewise}
          //parentChildData={(row,rows) => rows.find(a => a.id ===  row.perid)}

          //parentChildData={(datacity, rows) => rows.find(a => a.statecode === datacity.data)}
          options={{
            sorting: true,
            align: "right",
            paging: false,
            showTitle: false,
            exportButton: true,
            loadingType: "linear",
          }}
        />
      </div>
    ) : null;
  }
}
{
  /* <div>{
  data.data ?
      data.data.statewise.map(post => <div> {post.state}</div>):
 null}

</div>  */
}
export default Main_Right;
{
  /* 
     <MaterialTable
    title="Non Sorting Field Preview"
    columns={[
      { title: "Name", field: "state", sorting: false },
      //   { title: "Active", field: "active", type: "numeric" },
      //   { title: "Recovered", field: "recovered", type: "numeric" },
      //   { title: "Confiemed", field: "confirmed", type: "numeric" },
      //   { title: "Death", field: "death", type: "numeric" },
    ]}
    data={[dataa]}
    options={{
      sorting: true,
    }}
  /> */
}
