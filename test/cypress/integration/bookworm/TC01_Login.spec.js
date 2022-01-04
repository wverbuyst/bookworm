/// <reference types="cypress" />

import AppBar from '../components/appBar'
import BooksPage from '../pages/booksPage'
import LoginPage from '../pages/loginPage'

describe('Login', function () {
	beforeEach(function () {
		cy.fixture('bookworm').as('data')
	})

	const appBar = new AppBar()
	const booksPage = new BooksPage()
	const loginPage = new LoginPage()

	it('should login successfully with valid credentials', function () {
		cy.bookwormLogin(this.data.email, this.data.password)
		booksPage.checkUrl()
		booksPage.checkTitleIsVisible()
		appBar.clickLogOutButton()
		booksPage.checkTitleIsVisible()
	})

	it('should display error message with invalid credentials', function () {
		cy.bookwormLogin(this.data.email, this.data.wrongPassword)
		loginPage.displayErrorMessage()
	})
})
