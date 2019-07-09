function applyRoutes (app) {
  // Articles
  const articles = require('./controllers/articles')
  app.get('/articles', articles.all)
  app.post('/articles', articles.create)
  app.get('/articles/:articleId', articles.show)
  app.put('/articles/:articleId', articles.update)
  app.delete('/articles/:articleId', articles.destroy)

  // Authros
  const authors = require('./controllers/authors')
  app.get('/authors', authors.all)
  app.get('/authors/:authorId', authors.show)
  app.post('/authors', authors.create)
  app.put('/authors/:authorId', authors.update)

  // Countries
  const countries = require('./controllers/countries')
  app.get('/countries', countries.all)

  // Finish with setting up the articleId param
  app.param('articleId', articles.article)
  // Finish with setting up the authorId param
  app.param('authorId', authors.author)
}

module.exports = applyRoutes
