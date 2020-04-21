import React from 'react';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const PhoneInputField = React.forwardRef(
    ({ name, onChange, formik, ...rest }, ref) => (
        <PhoneInput {...rest} ref={ref} name={name} placeholder="Enter phone number" defaultCountry="US" onChange={onChange} />
    )
);

PhoneInputField.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default PhoneInputField;
