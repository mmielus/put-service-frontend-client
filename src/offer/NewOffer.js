import React, {Component} from 'react';
import {createOffer} from '../util/APIUtils';
import {MAX_CHOICES, POLL_CHOICE_MAX_LENGTH, POLL_QUESTION_MAX_LENGTH} from '../constants';
import './NewOffer.css';
import {Button, Col, Form, Icon, Input, notification, Select} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const {TextArea} = Input

class NewOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: {
                text: ''
            },
            dimensions: [{
                text: ''
            }, {
                text: ''
            }],
            phoneNumber: {
                text: ''
            },
            email: {
                text: ''
            },
            city: {
                text: ''
            },
            street: {
                text: ''
            },
            houseNumber: {
                text: ''
            },
            payment: {
                text: ''
            },
            offerLength: {
                days: 1,
                hours: 0
            }
        };
        this.addDimension = this.addDimension.bind(this);
        this.removeDimension = this.removeDimension.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDimensionChange = this.handleDimensionChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleHouseNumberChange = this.handleHouseNumberChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleStreetChange = this.handleStreetChange.bind(this);
        this.handlePaymentChange = this.handlePaymentChange.bind(this);
        this.handlePollDaysChange = this.handlePollDaysChange.bind(this);
        this.handlePollHoursChange = this.handlePollHoursChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    addDimension(event) {
        const dimensions = this.state.dimensions.slice();
        this.setState({
            dimensions: dimensions.concat([{
                text: ''
            }])
        });
    }

    removeDimension(dimensionNumber) {
        const dimensions = this.state.dimensions.slice();
        this.setState({
            dimensions: [...dimensions.slice(0, dimensionNumber), ...dimensions.slice(dimensionNumber + 1)]
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const offerData = {
            description: this.state.description.text,
            dimensions: this.state.dimensions.map(dimension => {
                return {text: dimension.text}
            }),
            phoneNumber: this.state.phoneNumber.text,
            email: this.state.email.text,
            city: this.state.city.text,
            street: this.state.street.text,
            houseNumber: this.state.houseNumber.text,
            payment: this.state.payment.text,
            offerLength: this.state.offerLength
        };

        createOffer(offerData)
            .then(response => {
                this.props.history.push("/");
            }).catch(error => {
            if (error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create offer.');
            } else {
                notification.error({
                    message: 'PutService App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });
    }

    validateDescription = (descriptionText) => {
        if (descriptionText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter your description!'
            }
        } else if (descriptionText.length > POLL_QUESTION_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Question is too long (Maximum ${POLL_QUESTION_MAX_LENGTH} characters allowed)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({
            description: {
                text: value,
                ...this.validateDescription(value)
            }
        });
    }

    validateDimension = (dimensionText) => {
        if (dimensionText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a dimension!'
            }
        } else if (dimensionText.length > POLL_CHOICE_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Dimension value is too long (Maximum ${POLL_CHOICE_MAX_LENGTH} characters allowed)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleDimensionChange(event, index) {
        const dimensions = this.state.dimensions.slice();
        const value = event.target.value;

        dimensions[index] = {
            text: value,
            ...this.validateDimension(value)
        }

        this.setState({
            dimensions: dimensions
        });
    }

    handlePhoneNumberChange(event) {
        const value = event.target.value;
        this.setState({
            phoneNumber: {
                text: value,
                ...this.validatePhoneNumber(value)
            }
        });
    }

    validatePhoneNumber = (phoneNumberText) => {
        if (phoneNumberText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a phone number'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleEmailChange(event) {
        const value = event.target.value;
        this.setState({
            email: {
                text: value,
                ...this.validateEmail(value)
            },
        });
    }

    validateEmail = (emailText) => {
        if (emailText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter an email'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleCityChange(event) {
        const value = event.target.value;
        this.setState({
            city: {
                text: value,
                ...this.validateCity(value)
            }

        });
    }

    validateCity = (cityText) => {
        if (cityText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a city'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleStreetChange(event) {
        const value = event.target.value;
        this.setState({
            street: {
                text: value,
                ...this.validateStreet(value)
            }
        });
    }

    validateStreet = (streetText) => {
        if (streetText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a street'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleHouseNumberChange(event) {
        const value = event.target.value;
        this.setState({
            houseNumber: {
                text: value,
                ...this.validateHouseNumber(value)
            }

        });
    }

    validateHouseNumber = (houseNumber) => {
        if (houseNumber.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a number of house'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handlePaymentChange(event) {
        const value = event.target.value;
        this.setState({
            payment: {
                text: value,
                ...this.validatePayment(value)
            }

        });
    }

    validatePayment = (payment) => {
        if (payment.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a payment value'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }


    handlePollDaysChange(value) {
        const offerLength = Object.assign(this.state.offerLength, {days: value});
        this.setState({
            offerLength: offerLength
        });
    }

    handlePollHoursChange(value) {
        const offerLength = Object.assign(this.state.offerLength, {hours: value});
        this.setState({
            offerLength: offerLength
        });
    }

    isFormInvalid() {
        if (this.state.description.validateStatus !== 'success') {
            return true;
        }

        for (let i = 0; i < this.state.dimensions.length; i++) {
            const dimension = this.state.dimensions[i];
            if (dimension.validateStatus !== 'success') {
                return true;
            }
        }
    }

    render() {
        const dimensionViews = [];
        this.state.dimensions.forEach((dimension, index) => {
            dimensionViews.push(<PollChoice key={index} dimension={dimension} dimensionNumber={index}
                                            removeDimension={this.removeDimension}
                                            handleDimensionChange={this.handleDimensionChange}/>);
        });

        return (
            <div className="new-poll-container">
                <h1 className="page-title">Create Offer</h1>
                <div className="new-poll-content">
                    <Form onSubmit={this.handleSubmit} className="create-poll-form">
                        <FormItem validateStatus={this.state.description.validateStatus}
                                  help={this.state.description.errorMsg} className="poll-form-row">
                        <TextArea
                            placeholder="Enter your offer description"
                            style={{fontSize: '16px'}}
                            autosize={{minRows: 3, maxRows: 6}}
                            name="question"
                            value={this.state.description.text}
                            onChange={this.handleDescriptionChange}/>
                        </FormItem>
                        {dimensionViews}
                        <FormItem className="poll-form-row">
                            <Button type="dashed" onClick={this.addDimension}
                                    disabled={this.state.dimensions.length === MAX_CHOICES}>
                                <Icon type="plus"/> Add a dimension
                            </Button>
                        </FormItem>
                        <FormItem className="poll-form-row">
                            <Input
                                placeholder={'Phone number'}
                                size="large"
                                value={this.state.phoneNumber.text}
                                className={"optional-choice"}
                                onChange={(event) => this.handlePhoneNumberChange(event)}/>
                        </FormItem>
                        <FormItem className="poll-form-row">
                            <Input
                                placeholder={'Email'}
                                size="large"
                                value={this.state.email.text}
                                onChange={this.handleEmailChange}/>
                        </FormItem>
                        <FormItem className="poll-form-row">
                            <Input
                                placeholder={'City'}
                                size="large"
                                value={this.state.city.text}
                                onChange={(event) => this.handleCityChange(event)}/>
                        </FormItem>
                        <FormItem className="poll-form-row">
                            <Input
                                placeholder={'Street'}
                                size="large"
                                value={this.state.street.text}
                                onChange={(event) => this.handleStreetChange(event)}/>
                        </FormItem>
                        <FormItem className="poll-form-row">
                            <Input
                                placeholder={'House number'}
                                size="large"
                                value={this.state.houseNumber.text}
                                onChange={(event) => this.handleHouseNumberChange(event)}/>
                        </FormItem>
                        <FormItem className="poll-form-row">
                            <Input
                                placeholder={'Payment'}
                                size="large"
                                value={this.state.payment.text}
                                onChange={(event) => this.handlePaymentChange(event)}/>
                        </FormItem>
                        <FormItem className="poll-form-row">
                            <Col xs={24} sm={4}>
                                Offer length:
                            </Col>
                            <Col xs={24} sm={20}>    
                                <span style={{marginRight: '18px'}}>
                                    <Select
                                        name="days"
                                        defaultValue="1"
                                        onChange={this.handlePollDaysChange}
                                        value={this.state.offerLength.days}
                                        style={{width: 60}}>
                                        {
                                            Array.from(Array(8).keys()).map(i =>
                                                <Option key={i}>{i}</Option>
                                            )
                                        }
                                    </Select> &nbsp;Days
                                </span>
                                <span>
                                    <Select
                                        name="hours"
                                        defaultValue="0"
                                        onChange={this.handlePollHoursChange}
                                        value={this.state.offerLength.hours}
                                        style={{width: 60}}>
                                        {
                                            Array.from(Array(24).keys()).map(i =>
                                                <Option key={i}>{i}</Option>
                                            )
                                        }
                                    </Select> &nbsp;Hours
                                </span>
                            </Col>
                        </FormItem>
                        <FormItem className="poll-form-row">
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    disabled={this.isFormInvalid()}
                                    className="create-poll-form-button">Create Offer</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

function PollChoice(props) {
    return (
        <FormItem validateStatus={props.dimension.validateStatus}
                  help={props.dimension.errorMsg} className="poll-form-row">
            <Input
                placeholder={'Dimension ' + (props.dimensionNumber + 1)}
                size="large"
                value={props.dimension.text}
                className={props.dimensionNumber > 1 ? "optional-choice" : null}
                onChange={(event) => props.handleDimensionChange(event, props.dimensionNumber)}/>

            {
                props.dimensionNumber > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="close"
                        disabled={props.dimensionNumber <= 1}
                        onClick={() => props.removeDimension(props.dimensionNumber)}
                    />) : null
            }
        </FormItem>
    );
}


export default NewOffer;