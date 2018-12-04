import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Col, Form, FormGroup, Label, Input, Alert } from 'reactstrap';



import * as bookActions from '../../redux/actions/bookActions';

class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      selectedBookCoverFiles: [],
      submitFormProgress: 0,
      isSubmittingForm: false,
      didFormSubmissionComplete: false,
      visible: true
    };
    this.onDismiss = this.onDismiss.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  handleSubmit = () => {
    let formData = this.buildFormData();
    this.props.createBook(formData).then(() => {
      this.context.router.history.push('/books');
    });
  }

  handleChange =(e) => {
    let name = e.target.name,
      value = e.target.value;
    this.setState({[name]: value});
  }

  buildFormData() {
    let formData = new FormData();
    formData.append('book[title]', this.state.title);
    formData.append('book[description]', this.state.description);

    let { selectedBookCoverFiles } = this.state;
    for (let i = 0; i < selectedBookCoverFiles.length; i++) {
      let file = selectedBookCoverFiles[i];
      if (file.id) {
        if (file._destroy) {
          formData.append(`book[covers_attributes][${i}][id]`, file.id);
          formData.append(`book[covers_attributes][${i}][_destroy]`, '1');
        }
      } else {
        formData.append(
          `book[covers_attributes][${i}][photo]`,
          file,
          file.name
        );
      }
    }
    return formData;
  }

  getNumberOfSelectedFiles() {
    return this.state.selectedBookCoverFiles.filter(el => {
      return el._destroy !== true;
    }).length;
  }

  renderUploadCoversButton() {
    let numberOfSelectedCovers = this.getNumberOfSelectedFiles();
    return (
      <div>
        <input
          name="covers[]"
          ref={field => (this.bookCoversField = field)}
          type="file"
          disabled={this.state.isSubmittingForm}
          multiple={true}
          accept="image/*"
          style={{
            width: 0.1,
            height: 0.1,
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: -1
          }}
          id="book_covers"
          onChange={e => this.handleBookCoversChange(e)}
          className="form-control"
        />
        <label
          disabled={this.state.isSubmittingForm}
          className="btn btn-success"
          htmlFor="book_covers">
          <span className="glyphicon glyphicon-cloud-upload" />
          &nbsp; &nbsp;
          {numberOfSelectedCovers === 0
            ? 'Upload Files'
            : `${numberOfSelectedCovers} file${numberOfSelectedCovers !== 1
                ? 's'
                : ''} selected`}
        </label>
      </div>
    );
  }

  handleBookCoversChange() {
    let selectedFiles = this.bookCoversField.files;
    let { selectedBookCoverFiles } = this.state;
    for (let i = 0; i < selectedFiles.length; i++) {
      selectedBookCoverFiles.push(selectedFiles.item(i));
    } //end for

    this.setState(
      {
        selectedBookCoverFiles: selectedBookCoverFiles
      },
      () => {
        this.bookCoversField.value = null;
      }
    );
  }

  renderSelectedBookCoverFiles() {
    let fileDOMs = this.state.selectedBookCoverFiles.map((el, index) => {
      if (el._destroy) { // we use _destroy to mark the removed photo
        return null;
      }
      return (
        <li key={index}>
          <div className="photo">
            <img
              width={150}
              alt="cover"
              src={el.id ? el.url : URL.createObjectURL(el)}
              style={{ alignSelf: 'center' }}
            />
            <div
              className="remove"
              onClick={() => this.removeSelectedBookCoverFile(el, index)}>
              <span style={{ top: 2 }} className="glyphicon glyphicon-remove" />
            </div>
          </div>
          <div className="file-name">
            {el.name}
          </div>
        </li>
      );
    });

    return (
      <ul className="selected-covers">
        {fileDOMs}
      </ul>
    );
  }

  removeSelectedBookCoverFile(cover, index) {
    let { selectedBookCoverFiles } = this.state;
    if (cover.id) { // cover file that has been uploaded will be marked as destroy
      selectedBookCoverFiles[index]._destroy = true;
    } else {
      selectedBookCoverFiles.splice(index, 1);
    }

    this.setState({
      selectedBookCoverFiles: selectedBookCoverFiles
    });
  }

  renderUploadFormProgress() {
    if (this.state.isSubmittingForm === false) {
      return null;
    }

    return (
      <div className="progress">
        <div
          className={
            'progress-bar progress-bar-info progress-bar-striped' +
            (this.state.submitFormProgress < 100 ? 'active' : '')
          }
          role="progressbar"
          aria-valuenow={this.state.submitFormProgress}
          areaValuemin="0"
          areaValuemax="100"
          style={{ width: this.state.submitFormProgress + '%' }}>
          {this.state.submitFormProgress}% Complete
        </div>
      </div>
    );
  }

  getElementClass = (el, currentClassName, validator) => {
    return((validator && validator[el]) ? currentClassName + ' text-error' : currentClassName);
  }

  getErrorMessage = (el, validator) => {
    return(
      validator && validator[el] && <p className="error">{validator[el]}</p>
    )
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    const {validator} = this.props;
    return (
      <React.Fragment>
        <h3>Create Book</h3>
        <Form className="book-form">
          {validator &&
            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
              There are some errors with your submission.
            </Alert>}
          <FormGroup row>
            <Label for="title" sm={2}>Title</Label>
            <Col sm={10}>
              <Input type="text" name="title" className={this.getElementClass('title', 'form-control', validator)} onChange={(e) => this.handleChange(e)} />
              {this.getErrorMessage('title', validator)}
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="title" sm={2}>Description</Label>
            <Col sm={10}>
              <textarea name="description" className={this.getElementClass('description', 'form-control', validator)} onChange={(e) => this.handleChange(e)}/>
              {this.getErrorMessage('description', validator)}
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="title" sm={2}>Covers</Label>
            <Col sm={10}>
              {this.renderUploadCoversButton()}
              {this.renderSelectedBookCoverFiles()}
            </Col>
          </FormGroup>

          {this.renderUploadFormProgress()}
          <input type="button" onClick={this.handleSubmit} value="Continue" className="btn btn-default"/>
        </Form>
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  ...state.books,
}),{
  ...bookActions,
})(BookForm);