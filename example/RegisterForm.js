import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { customInput, customRadio } from "../../componentsDumb/Fields/Fields";
import { required, requiredCheck } from "../../validation";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import MainPage from "../../pages/MainPage";
import PhotoAlbumExamples from "../../pages/PhotoAlbumExamples";
import Button from "../Button/Button";
import { reduxFormBlur } from "../../redux/actions/initReduxBlur";
import "./RegisterForm.css";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isSubmitted: false,
      isConfirmed: false
    };
  }

  handleChange = e => {
    this.setState({ value: e.target.value.toUpperCase() });
  };

  sendAndRedirect = () => {
    this.setState({ isConfirmed: false }, () => {
      this.props.sendSessionSubmitted();
      if (this.state.isConfirmed == "confirmed") {
        this.props.history.push("/thank_you_page");
      } else if (this.state.isConfirmed == "denied") {
        this.props.history.push("/");
      }
    });
  };

  render() {
    const { ff, handleSubmit, regData } = this.props;
    let { tariffName, albumPrice } = this.props;

    if (!tariffName && !albumPrice) {
      //undefined check
      tariffName = "Alex";
      albumPrice = "100";
    }

    this.radioValues1 = [
      { text: regData.data.how_many.ALL, value: "ALL" },
      { text: regData.data.how_many.MOST, value: "MOST" },
      { text: regData.data.how_many.BEST, value: "BEST" },
      { text: regData.data.how_many.DES_TASTE, value: "DES_TASTE" }
    ];
    this.radioValues2 = [
      { text: regData.data.background.MY, value: "MY" },
      { text: regData.data.background.MIXED, value: "MIXED" },
      { text: regData.data.background.ABSTR, value: "ABSTR" },
      { text: regData.data.background.DES_TASTE, value: "DES_TASTE" }
    ];
    this.radioValues3 = [
      { text: regData.data.how_photos_page.FEW, value: "FEW" },
      { text: regData.data.how_photos_page.MEDIUM, value: "MEDIUM" },
      { text: regData.data.how_photos_page.MANY, value: "MANY" },
      { text: regData.data.how_photos_page.DES_TASTE, value: "DES_TASTE" }
    ];
    this.radioValues4 = [
      { text: regData.data.frames_for_photos.USE, value: "USE" },
      { text: regData.data.frames_for_photos.NOT_USE, value: "NOT_USE" },
      { text: regData.data.frames_for_photos.BLUR, value: "BLUR" },
      { text: regData.data.frames_for_photos.DES_TASTE, value: "DES_TASTE" }
    ];
    this.radioValues5 = [
      { text: regData.data.decorations.YES, value: "YES" },
      { text: regData.data.decorations.SOME, value: "SOME" },
      { text: regData.data.decorations.NO, value: "NO" },
      { text: regData.data.decorations.DES_TASTE, value: "DES_TASTE" }
    ];

    if (this.state.isConfirmed) {
      return (
        <div className="first-page">
          <button onClick={() => this.setState({ isConfirmed: false })}>
            {"<--"} {regData.data.back_button}
          </button>
          <br />
          <h1>{regData.data.thank_you_header}</h1>
          <p>{regData.data.info_about_order}</p>
          <Link to={`/`}>{regData.data.main_page_button}</Link>
        </div>
      );
    }
    if (!this.state.isSubmitted) {
      return (
        <div className="second-page">
          <form
            onSubmit={e => {
              e.preventDefault();
              this.setState({ isSubmitted: true });
              this.props.onSubmit();
            }}
          >
            <Route exact path="/" component={MainPage} />
            <Link to={`/`}>
              {"<--"} {regData.data.back_button}
            </Link>
            <h1>{regData.data.order_header}</h1>
            <p>
              {regData.data.ordering} "{tariffName}" {regData.data.at_a_price} "
              {albumPrice}"
            </p>
            <Field
              name="firstname"
              component={customInput}
              type="text"
              validate={[required]}
              placeholder={regData.data.name_placeholder}
              onChange={this.handleChange}
              onBlur={e => {
                this.props.reduxFormBlur();
              }}
            />
            <Field
              name="surname"
              component={customInput}
              type="number"
              validate={[required]}
              placeholder={regData.data.phone_placeholder}
              onChange={this.handleChange}
              onBlur={e => {
                this.props.reduxFormBlur();
              }}
            />
            <Field
              name="link"
              component={customInput}
              type="text"
              validate={[required]}
              placeholder={regData.data.link_placeholder}
              onChange={this.handleChange}
              onBlur={e => {
                this.props.reduxFormBlur();
              }}
            />
            <Field
              name="albumname"
              component={customInput}
              type="text"
              validate={[required]}
              placeholder={regData.data.album_name_placeholder}
              onChange={this.handleChange}
              onBlur={e => {
                this.props.reduxFormBlur();
              }}
            />
            <Field
              name="request"
              component={customInput}
              type="text"
              validate={[required]}
              placeholder={regData.data.requet_placeholder}
              onChange={this.handleChange}
              onBlur={e => {
                this.props.reduxFormBlur();
              }}
            />
            <label className="privacy-policy">
              <Field
                name="policy"
                component={customInput}
                validate={[requiredCheck]}
                type="checkbox"
                onBlur={e => {
                  this.props.reduxFormBlur();
                }}
              />
              <span>{regData.data.private_policy}</span>
            </label>
            <Route
              path="/photo_album_examples"
              component={PhotoAlbumExamples}
            />
            <Link to={`/photo_album_examples`}>
              {regData.data.see_examples_button}
            </Link>
            {ff.register && !ff.register.syncErrors ? (
              <Button buttonName={regData.data.order_button} type="submit" />
            ) : (
              <Button
                buttonName={regData.data.order_button}
                type="submit"
                disabled
                validate={[requiredCheck]}
              />
            )}

            <div className="radio-area">
              <p>{regData.data.answer}</p>
              <Field
                name="radiobone"
                component={customRadio}
                type="text"
                radioID="howMany"
                label={`1.${regData.data.how_many.name}`}
                values={this.radioValues1}
                validate={[required]}
                checkedValue={"DES_TASTE"}
              />
              <Field
                name="radiobtwo"
                component={customRadio}
                type="text"
                radioID="background"
                label={`2.${regData.data.background.name}`}
                values={this.radioValues2}
                validate={[required]}
                checkedValue={"DES_TASTE"}
              />
              <Field
                name="radiobthree"
                component={customRadio}
                type="text"
                radioID="photosOnPage"
                label={`3.${regData.data.how_photos_page.name}`}
                values={this.radioValues3}
                validate={[required]}
                checkedValue={"DES_TASTE"}
              />
              <Field
                name="radiobfour"
                component={customRadio}
                type="text"
                radioID="framesForPhotos"
                label={`4.${regData.data.frames_for_photos.name}`}
                values={this.radioValues4}
                validate={[required]}
                checkedValue={"DES_TASTE"}
              />
              <Field
                name="radiobfive"
                component={customRadio}
                type="text"
                radioID="decoration"
                label={`5.${regData.data.decorations.name}`}
                values={this.radioValues5}
                validate={[required]}
                checkedValue={"DES_TASTE"}
              />
            </div>
            {ff.register && !ff.register.syncErrors ? (
              <Button buttonName={regData.data.order_button} type="submit" />
            ) : (
              <Button
                buttonName={regData.data.order_button}
                disabled
                type="submit"
              />
            )}
          </form>
        </div>
      );
    } else {
      return (
        <div className="third-page">
          <button onClick={() => this.setState({ isSubmitted: false })}>
            {"<--"} {regData.data.back_button}
          </button>
          <h1>{regData.data.confirm_header}</h1>
          <p>{regData.data.check_order}</p>
          <br />
          <input disabled value={this.props.ff.register.values.firstname} />
          <input disabled value={this.props.ff.register.values.surname} />
          <input disabled value={this.props.ff.register.values.link} />
          <input disabled value={this.props.ff.register.values.albumname} />
          <input disabled value={this.props.ff.register.values.request} />
          <div>
            <div className="checked-radio-button">
              <p>{regData.data.how_many.name}</p>
              <label className="disabled-label">
                {
                  this.radioValues1.find(el => {
                    return this.props.ff.register.values.radiobone == el.value;
                    //Elements comparison. Return the element, that gets true first 
                  }).text
                }
                <input className="disabled-iput" type="radio" checked />
              </label>
            </div>
            <div className="checked-radio-button">
              <p>{regData.data.background.name}</p>
              <label className="disabled-label">
                {
                  this.radioValues2.find(el => {
                    return this.props.ff.register.values.radiobtwo == el.value;
                  }).text
                }
                <input className="disabled-iput" type="radio" checked />
              </label>
            </div>
            <div className="checked-radio-button">
              <p>{regData.data.how_photos_page.name}</p>
              <label className="disabled-label">
                {
                  this.radioValues3.find(el => {
                    return (
                      this.props.ff.register.values.radiobthree == el.value
                    );
                  }).text
                }
                <input className="disabled-iput" type="radio" checked />
              </label>
            </div>
            <div className="checked-radio-button">
              <p>{regData.data.frames_for_photos.name}</p>
              <label className="disabled-label">
                {
                  this.radioValues4.find(el => {
                    return this.props.ff.register.values.radiobfour == el.value;
                  }).text
                }
                <input className="disabled-iput" type="radio" checked />
              </label>
            </div>
            <div className="checked-radio-button">
              <p>{regData.data.decorations.name}</p>
              <label className="disabled-label">
                {
                  this.radioValues5.find(el => {
                    return this.props.ff.register.values.radiobfive == el.value;
                  }).text
                }
                <input className="disabled-iput" type="radio" checked />
              </label>
            </div>
          </div>
          <br />

          <Link to={`/photo_album_examples`}>
            {regData.data.see_examples_button}
          </Link>
          <Button
            buttonName={regData.data.confirm_button}
            onClick={() => {
              sessionStorage.setItem("is_order_confirmed", "true");
              this.setState({ isConfirmed: true }, () => {
                this.props.reduxFormBlur();
              });
            }}
          />
        </div>
      );
    }
  }
}

RegisterForm = reduxForm({
  form: "register"
})(RegisterForm);

const mapStateToProps = state => ({
  ff: state.form,
  initialValues: {
    radiobone: "DES_TASTE",
    radiobtwo: "DES_TASTE",
    radiobthree: "DES_TASTE",
    radiobfour: "DES_TASTE",
    radiobfive: "DES_TASTE"
  }
});
const mapDispatchToProps = dispatch => ({
  reduxFormBlur() {
    dispatch(reduxFormBlur());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
