import "./App.css";
import React from "react";
import Sidebar from "./widgets/Sidebar";
import Topbar from "./widgets/Topbar";
import PDFViewer from "./widgets/PDFViewer";
import DiagramViewer from "./widgets/DiagramViewer";
import Utilities from "./Utilities";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfSrc: null
    };
  }

  changePDF = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState({ pdfSrc: e.target.result });
        this.uploadPDF(file);
      };
      reader.readAsDataURL(file);
    } else {
      Utilities.showError('Please select a PDF file.');
    }
  };

  uploadPDF = (file) => {
    alert("Hi");
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8080/uploadPdf', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        Utilities.showError(`Failed to upload PDF file: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      Utilities.showError('PDF file uploaded successfully:' + data);
      // Optionally, handle the response data
    })
    .catch(error => {
      Utilities.showError('Error uploading PDF file:' + error);
      // Optionally, display an error message or handle the error in some way
    });
  }

  render() {
    return (
      <div id="Fullscreen">
        <Sidebar onPDFChange={this.changePDF} />
        <div id="Main">
          <Topbar/>
          <div id="Views">  
            <PDFViewer onPDFChange={this.changePDF}
                       pdfSrc={this.state.pdfSrc} />
            <DiagramViewer/>
          </div>
        </div>
      </div>
    );
  }
}
 
export default App;
