import React, { useState, useEffect } from 'react';
import { Grid, Typography, Chip, Button, Link } from '@material-ui/core';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, getFormValues, initialize, focus, getFormSyncErrors, submit } from 'redux-form';
import { deleteArticle, editArticle } from '../reducers/article-reducer';

import Input from '../components/reduxInput';

const AddArticleComponent = (props) => {
	const { articles, match, history, initializeArticle, deleteArticle, articleFormValues, editArticle } = props;

	const isEdit = history.location.search.replace(/^.*?\=/, ''); // edit mode
	let { id } = match.params;
	id = id.split('-')[0]; // get article id

	const [ edit, setEdit ] = useState(isEdit);
	const [ tags, setTags ] = useState([]);

	const initialFormValue = {
		name: '',
		slug: '',
		content: '',
		dateFrom: new Date().toDateString(),
		dateTo: new Date().toDateString(),
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
		editArticle(id, newArticle);
		setTags([ ...newArticle.tags ]);
	};

	const handleAddTag = (tag) => {
		let newArticle = articleFormValues;
		newArticle.tags.push(tag);
		editArticle(id, newArticle);
		setTags([ ...newArticle.tags ]);
	};

	return (
		<Grid container spacing={2} direction="column">
			<Grid item xs={12}>
				<Button variant="outlined" color="secondary" onClick={() => history.push('/')}>
					{'< НАЗАД'}
				</Button>
			</Grid>
			<Grid item xs={12} style={{ width: '100%' }}>
				{edit ? <Input name="name" placeholder="Title" /> : <Typography variant="h4">{name}</Typography>}
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
								style={{ marginLeft: 5 }}
								onDelete={edit ? () => handleDeleteTag(i) : null}
							/>
						))}
					</Grid>
					{edit ? (
						<Grid item xs={12} style={{ width: '100%' }}>
							<Grid container justify="space-between">
								<Grid item xs={10}>
									<Input name="tag" placeholder="Tag" />{' '}
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
						{edit ? <Input name="slug" placeholder="Slug" /> : <Link>{slug}</Link>}
					</Grid>
					{edit ? (
						<Grid item xs={1}>
							<Button color="primary" onClick={() => handleSaveArticle(id, articleFormValues)}>
								Save
							</Button>
						</Grid>
					) : (
						<Grid item xs={4} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
							<Button color="secondary" onClick={() => handleDeleteArticle(id)}>
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
