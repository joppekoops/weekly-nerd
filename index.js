import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import ejs from 'ejs';
import sirv from 'sirv';
import fs from 'node:fs';

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

	const posts = await fs.promises.readFile("posts.json", { encoding: "utf-8" });

	console.log(posts);

	res.send('test');
});