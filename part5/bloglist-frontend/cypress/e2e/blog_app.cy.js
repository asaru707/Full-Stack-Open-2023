describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users', {
      name: 'test',
      username: 'test',
      password: 'test',
    })

    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('.username').type('test')
      cy.get('.password').type('test')
      cy.contains('login').click()

      cy.contains('blogs')
      cy.contains('test logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('.username').type('root')
      cy.get('.password').type('tor')

      cy.contains('login').click()

      cy.get('.notification').should('contain', 'wrong username and password')
    })

    it('notification shown with unsuccessful login is displayed red', function () {
      cy.get('.username').type('root')
      cy.get('.password').type('tor')
      
      cy.contains('login').click()

      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('.username').type('test')
      cy.get('.password').type('test')

      cy.contains('login').click()

      cy.contains('create new blog').click()

      cy.get('.title').type('blog title')
      cy.get('.author').type('author')
      cy.get('.url').type('blog url')

      cy.get('.create-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()

      cy.get('.title').type('title of the blog')
      cy.get('.author').type('author of the blog')
      cy.get('.url').type('url of the blog')

      cy.get('.create-button').click()

      cy.contains('a new blog title of the blog by author of the blog added')
      cy.contains('title of the blog author of the blog')
    })

    it('Users can like blogs', function () {
      cy.get('.hide-view').click()

      cy.get('.likes-button').click()

      cy.get('.likes').contains('1')
    })

    it('User who created a blog can delete it', function () {
      cy.get('.hide-view').click()

      cy.get('.remove-button').click()

      cy.get('div').should('not.contain', 'blog title author')
    })

    it('Only creator can see the delete button of a blog', function () {
      cy.request('POST', 'http://localhost:3003/api/users', {
        name: 'test1',
        username: 'test1',
        password: 'test1',
      })

      cy.contains('logout').click()

      cy.get('.username').type('test1')
      cy.get('.password').type('test1')

      cy.contains('login').click()

      cy.get('.hide-view').click()

      cy.get('.remove-button').should('not.exist')
    })

    it('blogs are ordered according to likes with the blog with the most likes being first', function () {
      cy.contains('create new blog').click()

      cy.get('.title').type('blog with most likes')
      cy.get('.author').type('author')
      cy.get('.url').type('blog url')

      cy.get('.create-button').click()

      cy.get('.hide-view').eq(1).click()

      cy.get('.likes-button').click()

      cy.get('.blog').eq(0).should('contain', 'blog with most likes')
    })
  })
})
