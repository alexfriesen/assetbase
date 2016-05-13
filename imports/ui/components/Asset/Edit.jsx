import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import { Meteor } from 'meteor/meteor';

import { Slingshot } from 'meteor/edgee:slingshot';

import AssetFile from './File';

export default class EditAsset extends Component {

  constructor(props, context) {
    super(props, context);

    this.directiveName = 'assets';

    this.state = {
      uploadingFile: null,
      queuedFiles: [],
      uploadedFiles: [],
    };
  }

  uploadNextFile() {
    console.log("uploadNextFile", this.state.queuedFiles.length);
    if (this.state.queuedFiles.length > 0) {

      this.uploadFile(this.state.queuedFiles[0]);
    }
  }

  uploadFile(file) {
    console.log("uploadFile", file);
    const self = this;
    const uploader = new Slingshot.Upload(this.directiveName);

    if (file.isUploading === true) {
      return;
    }

    // lock file
    file.isUploading = true;

    uploader.send(file, function(error, downloadUrl) {
      if (error) {

        // Log service detailed response.
        console.error('Error uploading', uploader.xhr.response);
        alert(error);

      } else {
        console.log('finished', file);

        const fileData = {
          path: downloadUrl,
          sort: file.sort,
          name: file.name
        };

        // add this file to finished
        self.setState({
          uploadedFiles: self.state.uploadedFiles.concat([fileData])
        });

        // remove current file from queue
        const {queuedFiles} = self.state;
        self.setState({
          queuedFiles: queuedFiles.slice(1)
        });

        file.isUploading = false;

        // upload next
        self.uploadNextFile();

        return
      }
    });
  }

  handleFileDrop(files) {
    if (files.length <= 0) {
      return;
    }

    const {queuedFiles, uploadedFiles} = this.state;

    let highestSort = 0;

    // find highest sort value in asset data
    if (this.props.data) {

      for (let file of this.props.data.files) {
        if (file.sort > highestSort) {
          highestSort = file.sort;
        }
      }

    }

    // find highest sort value in previously queued files
    if (queuedFiles) {

      for (let file of queuedFiles) {
        if (file.sort > highestSort) {
          highestSort = file.sort;
        }
      }

    }

    if (uploadedFiles) {

      for (let file of uploadedFiles) {
        if (file.sort > highestSort) {
          highestSort = file.sort;
        }
      }

    }

    // assign and increase sort
    for (let file of files) {
      file.sort = ++highestSort;
    }

    this.setState({
      queuedFiles: this.state.queuedFiles.concat(files)
    });

    this.uploadNextFile();
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    const description = ReactDOM.findDOMNode(this.refs.description).value.trim();

    const published = ReactDOM.findDOMNode(this.refs.published).value === 1;
    const adult = ReactDOM.findDOMNode(this.refs.adult).value === 1;
    const commentsAllowed = ReactDOM.findDOMNode(this.refs.commentsAllowed).value === 1;

    const tags = ReactDOM.findDOMNode(this.refs.tags).value.trim().split(/[\s,]+/);
    const categoryId = ReactDOM.findDOMNode(this.refs.categoryId).value.trim();

    let {files} = this.props.asset || {};
    files = files || [];
    files = files.concat(this.state.uploadedFiles);

    if (this.props.asset && this.props.asset._id) {

      Meteor.call('assets.edit',
        this.props.asset._id,
        {
          $set: {
            title,
            description,
            published,
            adult,
            commentsAllowed,
            tags,
            categoryId,
            files
          }
        }
      );

    } else {

      Meteor.call('assets.insert',
        title,
        description,
        published,
        adult,
        commentsAllowed,
        tags,
        categoryId,
        files,
        (result) => {
          console.log(result);
        }
      );

    }
  }

  renderPreview(files) {
    if (files.length < 1) {
      return;
    }

    return files.map((file) => {
      if (!file) {
        return;
      }

      //TODO: add remove uploaded files function
      // const removeFileHandler = 
      //const removeButton = <button type="button" className="close" onClick={removeFileHandler}>&times;</button>;

      //TODO: make sortable via drag and drop

      return (
        <div className="col-sm-3" key={ file.path || file.name }>
          <img className="img-thumbnail" src={ file.path || file.preview } alt={ file.name } />
        </div>
        );
    });
  }

  render() {
    const {asset, currentUser} = this.props;
    const {title, description, published, adult, commentsAllowed, tags, categoryId} = asset || {};

    const {queuedFiles, uploadedFiles} = this.state;
    console.log(currentUser);

    let {files} = asset || {};
    files = files || [];

    if (queuedFiles) {
      files = files.concat(queuedFiles);

      // state updates not fast enough
      this.uploadNextFile();
    }

    if (uploadedFiles) {
      console.log(uploadedFiles);
      files = files.concat(uploadedFiles);
    }

    const accept = Slingshot.getRestrictions(this.directiveName).allowedFileTypes.join(',');

    return (
      <form className="form-horizontal" onSubmit={ this.handleSubmit.bind(this) }>
        <fieldset>
          <div className="row">
            <div className="col-lg-12">
              <input
                type="text"
                className="form-control"
                defaultValue={ title || "" }
                ref="title"
                placeholder="Asset Title" />
            </div>
            <div className="col-lg-12">
              <textarea
                rows="3"
                className="form-control"
                defaultValue={ description || "" }
                ref="description"
                placeholder="Description" />
            </div>
            <div className="col-lg-12">
              <div className="row">
                { this.renderPreview(files) }
              </div>
              <Dropzone
                className="dropfield"
                activeClassName="active"
                rejectClassName="reject"
                onDropAccepted={ this.handleFileDrop.bind(this) }
                accept={ accept }>
                <span className="text">Drop here</span>
              </Dropzone>
            </div>
            <div className="col-lg-4">
              <div className="checkbox">
                <label>
                  <input type="checkbox" defaultValue={ published || "" } ref="published" /> published
                </label>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="checkbox">
                <label>
                  <input type="checkbox" defaultValue={ adult || "" } ref="adult" /> adult
                </label>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="checkbox">
                <label>
                  <input type="checkbox" defaultValue={ commentsAllowed || "" } ref="commentsAllowed" /> commentsAllowed
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <input
                type="text"
                className="form-control"
                defaultValue={ tags || "" }
                ref="tags"
                placeholder="Tags" />
            </div>
            <div className="col-lg-12">
              <input
                type="text"
                className="form-control"
                defaultValue={ categoryId || "" }
                ref="categoryId"
                placeholder="categoryId" />
            </div>
            <div className="col-lg-12">
              <button type="submit" className="btn btn-primary btn-block">
                Save
              </button>
            </div>
          </div>
        </fieldset>
      </form>
      );
  }
}

EditAsset.propTypes = {
  asset: PropTypes.object,
  currentUser: PropTypes.object,
};