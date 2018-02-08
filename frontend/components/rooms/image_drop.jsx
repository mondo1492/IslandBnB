import React from 'react';
import request from 'superagent';
import Dropzone from 'react-dropzone';
const CLOUDINARY_UPLOAD_PRESET = 'ox1h6aai';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dluh2fsyd/upload';


class DropForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFileCloudinaryUrl: ''
    };
    this.defaultUrl = this.defaultUrl.bind(this);
    this.resetPic = this.resetPic.bind(this);
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.props.updateUrl(response.body.secure_url);
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  defaultUrl(e) {
    e.preventDefault();
    console.log("HELLO");
    const defaultURL = 'https://i.ytimg.com/vi/r5U2RLT-Gg4/maxresdefault.jpg';
    this.props.updateUrl(defaultURL);
    this.setState({uploadedFileCloudinaryUrl: defaultURL})
  }

  fileUpload(){
    return(
      <div className="FileUpload">
        <Dropzone
          className="dropzone"
          multiple={false}
          accept="image/*"
          onDrop={this.onImageDrop.bind(this)}>
          <p>Drop an image or click to select a file to upload.</p>
            <p className='dropzone-default-option'
              onClick={this.defaultUrl}>
              Or use a deafult image
            </p>
        </Dropzone>

      </div>
    );
  }

  resetPic() {
    this.setState({uploadedFileCloudinaryUrl: ""});
  }

  displayFile() {
    return(
      <div>
        {this.state.uploadedFileCloudinaryUrl === '' ? null :
        <div className="img-drop-container">
          <img src={this.state.uploadedFileCloudinaryUrl} />
          <button onClick={this.resetPic}>Change picture</button>
        </div>}
      </div>
    );
  }

  render() {
    const displayType = this.state.uploadedFileCloudinaryUrl ?  this.displayFile() : this.fileUpload();
    return(
      <div>
        {displayType}
      </div>
    );
  }
}
export default DropForm;
