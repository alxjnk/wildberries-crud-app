import { articles } from '../utils/mock';

const DELETE_ARTICLE = 'DELETE_ARTICLE';
const EDIT_ARTICLE = 'EDIT_ARTICLE';

export const moduleName = 'articles';

// actions

export const editArticle = (id, article) => ({
	type: EDIT_ARTICLE,
	payload: { id, article }
});

export const deleteArticle = (id) => ({
	type: DELETE_ARTICLE,
	payload: id
});

const initialState = {
	articles: articles.reduce((prev, cur) => {
		prev[cur.id] = {
			...cur
		};
		return prev;
	}, {})
};

const articleReducer = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_ARTICLE: {
			const id = action.payload;
			let articles = { ...state.articles };
			delete articles[id];
			return { ...state, articles };
		}
		case EDIT_ARTICLE: {
			const { id, article } = action.payload;
			let articles = { ...state.articles };
			articles[id] = article;
			return {
				...state,
				articles: {
					...articles,
					[id]: {
						...article,
						tags: article.tags
					}
				}
			};
		}
		default:
			return state;
	}
};

export default articleReducer;
