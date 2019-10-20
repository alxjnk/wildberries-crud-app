import React from 'react';
import { Field } from 'redux-form';
import TextField from '@material-ui/core/TextField';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
	return <TextField label={label} helperText={touched && error} error={touched && error} {...input} {...custom} />;
};

const reduxInput = (props) => (
	<Field
		{...props}
		component={renderTextField}
		variant="outlined"
		fullWidth
		inputProps={{
			style: {
				paddingTop: '10px',
				paddingBottom: '10px',
				...props.inputStyles
			}
		}}
	/>
);

export default reduxInput;
