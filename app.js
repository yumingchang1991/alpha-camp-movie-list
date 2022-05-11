const express = require('express') 
const { engine } = require('express-handlebars')
const movies = require('./movies.json')

const app = express()
const port = 3000

app.engine('handlebars', engine({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index', { movies: movies.results})
})

app.get('/movies/:id', (req, res) => {
  res.render("show", { movie: movies.results[req.params.id] })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const regex = new RegExp(keyword, 'gi')
  const searchResult = movies.results.filter((movie) => movie.title.match(regex))
  res.render('index', {movies: searchResult, keyword})
})

app.listen(3000, () => console.log(`Express is listening on localhost:${port}`))