import React, { useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';

import ItemArticleComponent from './ItemArticleComponent';
import Modal from '../components/modal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteArticle } from '../reducers/article-reducer';

import { ModalHook } from '../hooks/modal-hook';

const ListArticleComponent = (props) => {
	const { deleteArticle, articles, history } = props;
	const { open, handleClickOpen, handleClose } = ModalHook();

	const [ idToDelete, setIdToDelete ] = useState(null);

	return (
		<Grid container direction="column" spacing={2} justify="center">
			<Modal handleOk={() => deleteArticle(idToDelete)} open={open} handleClose={handleClose} />
			<Grid item>
				<Grid container justify="space-between">
					<Grid item>
						<Typography variant="h4">Wildberries Articles</Typography>
					</Grid>
					<Grid item>
						<Button
							color="primary"
							variant="contained"
							onClick={() => history.push(`/articles/${Object.keys(articles).length}?edit=true`)}
						>
							create article
						</Button>
					</Grid>
				</Grid>
			</Grid>
			{Object.keys(articles).map((key) => {
				return (
					<Grid item key={articles[key].id}>
						<ItemArticleComponent
							deleteArticle={() => {
								handleClickOpen();
								setIdToDelete(articles[key].id);
							}}
							article={articles[key]}
							history={history}
						/>
					</Grid>
				);
			})}
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	articles: state.articles.articles
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			deleteArticle
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(ListArticleComponent);
