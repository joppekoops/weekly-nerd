import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import ejs from 'ejs';
import sirv from 'sirv';

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
app.get('/', (req, res) => {
	res.send('test');
});