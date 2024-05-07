import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import ejs from 'ejs';
import sirv from 'sirv';
import fs from 'node:fs';

function formatDate(date) {

	const timestamp = Date.parse(date);

	const dateObject = new Date(timestamp);

	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}

	return dateObject.toLocaleDateString('nl-NL', options);
}

// Create the app
const app = new App();

app
	.use(logger())
	.listen(process.env.PORT || 3000, () => console.log('Server running...'));

// Set static directory
app.use('/', sirv('static'));

// Set view engine to ejs
app
	.set('view engine', 'ejs')
	.engine('ejs', ejs.renderFile);



// Routes
app.get('/', async(req, res) => {

	const json = await fs.promises.readFile("posts.json", { encoding: "utf-8" });

	const data = await JSON.parse(json);

	res.render('index', {posts: data.blogPost, formatDate});
});

app.get('/post/:id', async(req, res) => {
	fs.access(`views/${req.params.id}.ejs`, (err) => {
		if (err) {
			res.status(404);
			res.render('404');
		} else {
			res.render(req.params.id);
		}
	});
	
})