const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
mollit anim id est laborum." "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
qui officia deserunt mollit anim id est laborum." "Lorem ipsum dolor sit amet,
consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const articles = [
	{
		name: 'Big Article 0',
		id: 0,
		slug: 'big-article-0',
		dateFrom: new Date().toDateString(),
		dateTo: new Date().toDateString(),
		tags: [ 'tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6' ],
		content
	},
	{
		name: 'Big Article 4',
		id: 4,
		slug: 'big-article-4',
		dateFrom: new Date().toDateString(),
		dateTo: new Date().toDateString(),
		tags: [ 'tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6' ],
		content
	},
	{
		name: 'Big Article 1',
		id: 1,
		slug: 'big-article-1',
		dateFrom: new Date().toDateString(),
		dateTo: new Date().toDateString(),
		tags: [ 'tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6' ],
		content
	},
	{
		name: 'Big Article 2',
		id: 2,
		slug: 'big-article-2',
		dateFrom: new Date().toDateString(),
		dateTo: new Date().toDateString(),
		tags: [ 'tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6' ],
		content
	},
	{
		name: 'Big Article 3',
		id: 3,
		slug: 'big-article-3',
		dateFrom: new Date().toDateString(),
		dateTo: new Date().toDateString(),
		tags: [ 'tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6' ],
		content
	}
];

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
