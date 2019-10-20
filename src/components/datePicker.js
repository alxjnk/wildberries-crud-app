import React from 'react';
import { Field } from 'redux-form';

import { KeyboardDateTimePicker } from '@material-ui/pickers';

const renderDateTimePickerField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
	<KeyboardDateTimePicker
        inputVariant="outlined"
		ampm={false}
		label={label}
		value={input.value}
		onChange={(event, index, value) => input.onChange(value)}
		// onError={() => touched && error}
		disablePast
		format="yyyy/MM/dd HH:mm"
		{...input}
		{...custom}
		children={children}
	/>
);

const reduxDateTimePicker = (props) => (
	<Field
		component={renderDateTimePickerField}
		inputProps={{
			style: {
				paddingTop: '10px',
				paddingBottom: '10px',
				...props.inputStyles
			}
        }}
        {...props}
	/>
);

export default reduxDateTimePicker;