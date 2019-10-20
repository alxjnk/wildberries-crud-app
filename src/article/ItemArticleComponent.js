import React from 'react';
import { Paper, Grid, Typography, Chip, Button } from '@material-ui/core';

import { formatDistanceStrict, format } from 'date-fns';

const ItemArticleComponent = (props) => {
	const { deleteArticle, article, history } = props;
	return (
		<Paper square style={{ padding: 15 }}>
			<Grid container direction="column" spacing={2}>
				<Grid item>
					<Grid container justify='space-between'>
						<Grid item xs={7}>
							<Typography variant="h5">{article.name}</Typography>
						</Grid>
						<Grid item xs={5}>
							<Button
								variant="outlined"
								color="primary"
								style={{ cursor: 'auto', backgroundColor: 'transparent' }}
								disableFocusRipple
								disableRipple
							>
								online for {formatDistanceStrict(article.dateFrom, article.dateTo)}{' '}
								till {format(article.dateTo, 'd/M/u H:M')}
							</Button>
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
								<Chip label={el} variant="outlined" style={{ marginLeft: 5, marginTop: 5 }} key={i} />
							))}
						</Grid>
						<Grid item xs={2}>
							<Button
								color="primary"
								onClick={() => history.push(`/articles/${article.id}-${article.slug}`)}
							>
								Read
							</Button>
						</Grid>
						<Grid item xs={2}>
							<Button
								color="primary"
								onClick={() => history.push(`/articles/${article.id}-${article.slug}?edit=true`)}
							>
								Edit
							</Button>
						</Grid>
						<Grid item xs={2}>
							<Button color="secondary" onClick={deleteArticle}>
								Delete
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default ItemArticleComponent;
