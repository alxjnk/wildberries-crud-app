import React, { useState, useEffect } from 'react';
import { Grid, Typography, Chip, Button, Link } from '@material-ui/core';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, getFormValues, initialize, focus, getFormSyncErrors, submit } from 'redux-form';
import { deleteArticle, editArticle } from '../reducers/article-reducer';

import Input from '../components/reduxInput';
import DateTime from '../components/datePicker';
import Modal from '../components/modal';

import { ModalHook } from '../hooks/modal-hook';

import { replaceSpace, maxLength } from '../utils';

import { formatDistanceStrict, format } from 'date-fns';

const AddArticleComponent = (props) => {
	const { articles, match, history, initializeArticle, deleteArticle, articleFormValues, editArticle } = props;

	const { open, handleClickOpen, handleClose } = ModalHook();

	const isEdit = history.location.search.replace(/^.*?\=/, ''); // edit mode
	let { id } = match.params;
	id = id.split('-')[0]; // get article id

	const [ edit, setEdit ] = useState(isEdit);
	const [ tags, setTags ] = useState([]);

	const today = new Date();

	const initialFormValue = {
		name: '',
		slug: '',
		content: '',
		dateFrom: new Date(),
		dateTo: new Date(today.getTime() + 24 * 60 * 60 * 1000),
		tag: '',
		tags: []
	};

	useEffect(
		() => {
			if (articles && articles[id]) {
				//set tags on load
				setTags(articles[id].tags);
			}
		},
		[ articles, id ]
	);

	useEffect(
		// set form values on load
		() => {
			if (edit && articles && id && articles[id]) {
				//if edit existing
				initializeArticle({ ...articles[id], tag: '' });
			} else {
				// if newly created
				initializeArticle(initialFormValue);
			}
		},
		[ id, articles, edit, initializeArticle ]
	);

	if (!articles && !articleFormValues) return null;

	const { name, slug, content, dateFrom, dateTo } = articles[id] || initialFormValue;

	const handleSaveArticle = (id, article) => {
		props.submit();
		if (Object.keys(props.errors).every((el) => !el)) {
			//check for errors
			article.id = id;
			editArticle(id, article);
			setEdit(false);
		}
	};

	const handleDeleteArticle = (id) => {
		deleteArticle(id);
		history.push('/');
	};

	const handleDeleteTag = (i) => {
		let newArticle = articleFormValues;
		newArticle.tags.splice(i, 1);
		setTags([ ...newArticle.tags ]);
	};

	const handleAddTag = (tag) => {
		let newArticle = articleFormValues;
		newArticle.tags.push(tag);
		setTags([ ...newArticle.tags ]);
		initializeArticle({...newArticle, tag: ''})
	};

	return (
		<Grid container spacing={2} direction="column">
			<Modal handleOk={() => handleDeleteArticle(id)} open={open} handleClose={handleClose} />
			<Grid item xs={12}>
				<Grid container spaceing={2} justify="space-between">
					<Grid item xs={2}>
						<Button variant="outlined" color="secondary" onClick={() => history.push('/')}>
							{'< BACK'}
						</Button>
					</Grid>

					<Grid item xs={4}>
						{edit ? (
							<DateTime name="dateFrom" label={'Time started'} maxDate={dateTo} />
						) : (
							<Button variant="outlined" color="primary" style={{cursor: 'auto', backgroundColor: 'transparent'}} disableFocusRipple disableRipple>from {format(dateFrom, 'd/M/u H:M')}</Button>
						)}
					</Grid>
					<Grid item xs={4}>
						{edit ? (
							<DateTime name="dateTo" label={'Time finished'} minDate={dateFrom} />
						) : (
							<Button variant="outlined" color="secondary" style={{cursor: 'auto', backgroundColor: 'transparent'}} disableFocusRipple disableRipple>to {format(dateTo, 'd/M/u H:M')}</Button>
						)}
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} style={{ width: '100%' }}>
				{edit ? (
					<Input name="name" placeholder="Title" normalize={maxLength(60)} />
				) : (
					<Typography variant="h4">{name}</Typography>
				)}
			</Grid>
			<Grid item xs={12} style={{ width: '100%' }}>
				{edit ? (
					<Input name="content" placeholder="Content" multiline />
				) : (
					<Typography variant="body1">{content}</Typography>
				)}
			</Grid>
			<Grid item xs={12} style={{ width: '100%' }}>
				<Grid container direction="column" spacing={2}>
					<Grid item xs={12}>
						{tags.map((el, i) => (
							<Chip
								key={el + i}
								label={el}
								variant="outlined"
								style={{ marginLeft: 5, marginTop: 5 }}
								onDelete={edit ? () => handleDeleteTag(i) : null}
							/>
						))}
					</Grid>
					{edit ? (
						<Grid item xs={12} style={{ width: '100%' }}>
							<Grid container justify="space-between">
								<Grid item xs={10}>
									<Input name="tag" placeholder="Tag" normalize={maxLength(10)} />{' '}
								</Grid>
								<Grid item xs={1}>
									<Button
										color="primary"
										variant="contained"
										onClick={() => handleAddTag(articleFormValues.tag)}
									>
										Add
									</Button>
								</Grid>
							</Grid>
						</Grid>
					) : null}
				</Grid>
			</Grid>
			<Grid item xs={12} style={{ width: '100%' }}>
				<Grid container justify="space-between">
					<Grid item xs={3}>
						{edit ? <Input name="slug" placeholder="Slug" normalize={replaceSpace} /> : <Link>{slug}</Link>}
					</Grid>
					{edit ? (
						<Grid item xs={1}>
							<Button color="primary" onClick={() => handleSaveArticle(id, articleFormValues)}>
								Save
							</Button>
						</Grid>
					) : (
						<Grid item xs={4} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
							<Button color="secondary" onClick={handleClickOpen}>
								Delete
							</Button>
							<Button color="primary" onClick={() => setEdit(!edit)}>
								Edit
							</Button>
						</Grid>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};

const validate = (values) => {
	const errors = {};

	const requiredFields = {
		name: 'title',
		slug: 'slug',
		content: 'content',
		dateTo: 'date and time till article exists',
		dateFrom: 'date and time from article exists'
	};
	Object.keys(requiredFields).forEach((key) => {
		if (!values[key]) {
			errors[key] = 'Please, fill in ' + requiredFields[key];
		}
		if (values['dateFrom'] && values['dateTo']) {
			if (values['dateFrom'].length < 24) {
				errors['dateFrom'] = 'error';
			}
			if (values['dateTo'].length < 24) {
				errors['dateTo'] = 'error';
			}
		}
	});

	return errors;
};

const mapStateToProps = (state) => ({
	articleFormValues: getFormValues('articleForm')(state),
	articles: state.articles.articles,
	errors: getFormSyncErrors('articleForm')(state)
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			initializeArticle: (data) => initialize('articleForm', data),
			push,
			deleteArticle,
			editArticle,
			focus
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(
	reduxForm({
		form: 'articleForm',
		validate,
		onSubmit: submit
	})(AddArticleComponent)
);
