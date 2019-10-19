import React from 'react';
import { Field } from 'redux-form';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';

const styles = () => ({
	label: {
		fontSize: '0.8rem'
	}
});

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
	return (
		<TextField
			label={label}
			floatingLabelText={label}
			helperText={touched && error}
			error={touched && error}
			{...input}
			{...custom}
		/>
	);
};

const reduxInput = (props) => (
	<div style={{ display: 'flex', flexDirection: 'column', ...props.styles }}>
		<FormLabel className={props.classes.label} component="legend">
			{props.label}
		</FormLabel>
		<Field
			multiline={props.multiline}
			name={props.name}
			component={props.component || renderTextField}
			required={props.required}
			normalize={props.normalize}
			variant="outlined"
			disabled={props.disabled}
			placeholder={props.placeholder}
			fullWidth
			inputProps={{
				style: {
					paddingTop: '10px',
					paddingBottom: '10px',
					...props.inputStyles
				}
			}}
		/>
	</div>
);

export default withStyles(styles)(reduxInput);
