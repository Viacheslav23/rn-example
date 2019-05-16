import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { FormValidation } from "calidation";
import { connect } from "react-redux";

import { reviewSubmitted } from "../../actions/review";

import Button from "../Button/Button";

import "./ModalFeedback.css";
import { throws } from "assert";

class ModalFeedback extends Component {
  constructor(props) {
    super(props);
    this.config = {
      name: {
        isRequired: "Enter name",
        isMinLength: {
          message: "No less than 2 symbols",
          length: 2
        }
      },

      email: {
        isEmail: "Enter correct email",
        isRequired: "Enter email"
      },

      text: {
        isRequired: "Please, enter message",
        isMinLength: {
          message: "No less than 3 symbols",
          length: 3
        }
      }
    };
  }

  handleSubmit = ({ errors, fields, isValid }) => {
    if (isValid) {
      let { name, email, text } = fields;
      this.props.reviewSubmitted(name, email, text);
    }
  };
  render() {
    return (
      <Dialog
        className="popup-shop-container"
        onClose={this.props.onClose}
        open={this.props.visible}
      >
        <p onClick={this.props.onClose} className="popup-close-button">
          ╳
        </p>
        <div
          className="review-form-wrapper"
          style={this.props.visible ? {} : { display: "none" }}
        >
          <FormValidation
            id="registrate"
            onSubmit={this.handleSubmit}
            config={this.config}
          >
            {({ fields, errors, submitted }) => (
              <>
                <form id="feedback-form" onSubmit={this.handleSubmit}>
                  <label className="popup-window-element">
                    <p className="popup-element-header-styles">
                      Name:<p>*</p>
                      {submitted && errors.name && <p>{errors.name}</p>}
                    </p>
                    <input
                      className="popup-input-element"
                      type="text"
                      name="name"
                      placeholder="Введіть Ваше ім'я"
                      value={fields.name}
                    />
                  </label>
                  <label className="popup-window-element">
                    <p className="popup-element-header-styles">
                      e-mail:
                      <p>*</p>
                      {submitted && errors.email && <p>{errors.email}</p>}
                    </p>
                    <input
                      className="popup-input-element"
                      type="email"
                      name="email"
                      placeholder="Введіть Ваш e-mail"
                      value={fields.email}
                    />
                  </label>
                  <label className="popup-window-element">
                    <p className="popup-element-header-styles">
                      Message:
                      <p>*</p>
                      {submitted && errors.text && <p>{errors.text}</p>}
                    </p>
                    <textarea
                      className="popup-text-area-element"
                      name="text"
                      placeholder="Введіть Ваш відгук"
                      rows="4"
                      style={{ resize: "none" }}
                      value={fields.text}
                    />
                  </label>
                  <div className="popup-button-container">
                    <Button
                      className="popup-shop-button"
                      type="submit"
                      form="feedback-form"
                      buttonName="SEND"
                    />
                  </div>
                </form>
              </>
            )}
          </FormValidation>
        </div>
      </Dialog>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  reviewSubmitted: (name, email, text) => {
    dispatch(reviewSubmitted(name, email, text));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(ModalFeedback);
