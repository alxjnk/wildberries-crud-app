import React from 'react';
import { Paper, Grid, Typography, Chip, Link } from '@material-ui/core';

const ItemArticleComponent = (props) => {
	const { deleteArticle, article, history } = props;
	return (
		<Paper square style={{ padding: 15 }}>
			<Grid container direction="column" spacing={2}>
				<Grid item>
					<Grid container>
						<Grid item xs={10}>
							<Typography variant="h5">{article.name}</Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography variant="subtitle2">from {article.dateFrom}</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container>
						<Grid item style={{ width: '55vw' }}>
							<Typography variant="body1" display="block" noWrap>
								{article.content}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container>
						<Grid item xs={6}>
							{article.tags.map((el, i) => (
								<Chip label={el} variant="outlined" style={{ marginLeft: 5 }} key={i} />
							))}
						</Grid>
						<Grid item xs={2}>
							<Link
								onClick={(e) => {
									e.preventDefault();
									history.push(`/articles/${article.id}-${article.slug}`);
								}}
								href={'#'}
							>
								Read
							</Link>
						</Grid>
						<Grid item xs={2}>
							<Link
								onClick={(e) => {
									e.preventDefault();
									history.push(`/articles/${article.id}-${article.slug}?edit=true`);
								}}
								href={'#'}
							>
								Edit
							</Link>
						</Grid>
						<Grid item xs={2}>
							<Link
								href="#"
								onClick={(e) => {
									e.preventDefault();
									deleteArticle();
								}}
							>
								Delete
							</Link>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default ItemArticleComponent;
