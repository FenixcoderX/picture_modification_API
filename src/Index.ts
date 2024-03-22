import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

// app.get('/api', (req, res) => {
//     res.send('Hello, world!');
// });

//app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
app.use('/assets', express.static(`${__dirname}/../assets`));
app.use('/api', routes);
app.get('*', (req, res) => {
  res.status(400)
  .send(`<h2>Incorrect request: filename, width, height are needed as parameters</h2>
  <p>You should use the following example path:</p> 
  <h3>http://localhost:3000/api/pictures?filename=bridge&width=200&height=200</h3>
  <p>In this app you can change parameters in the path above: filename, width, heigth.</p>
  <p>The list of pictures is provided. Use the following filenames:</p>
    <li>bridge</li>
    <li>sunset</li>
  <p>Input width and height dimensions in amount of pixels you want to resize.</p>`);
});

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
