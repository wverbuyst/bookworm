import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import ToolBar from '../../components/ToolBar'
import LoginPage from '../../pages/loginPage'
import HomePage from '../../pages/homePage'

const homePage = new HomePage()
const loginPage = new LoginPage()
const toolbar = new ToolBar()

beforeEach(function () {
	cy.fixture('bookworm').as('data')
})

Given(/^I open the login page$/, function () {
	cy.visit('/')
	toolbar.clickLogInButton()
})

When(/^I login with valid credentials$/, function () {
	cy.fixture('bookworm').as('data')
	cy.bookwormLogin(this.data.email, this.data.password)
})

Then(/^I should see the home page$/, function () {
	homePage.checkUrl()
	homePage.checkTitleIsVisible()
})

Then(/^I should see a welcome message$/, function () {
	homePage.checkWelcomeText()
})

Given(/^I open the login page$/, function () {
	cy.visit('/')
	toolbar.clickLogInButton()
})

When(/^I login with invalid credentials$/, function () {
	cy.fixture('bookworm').as('data')
	cy.bookwormLogin(this.data.email, this.data.wrongPassword)
})

Then(/^I should see an error message$/, function () {
	loginPage.displayErrorMessage()
})
