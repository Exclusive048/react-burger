import { baseURL  } from '../../src/utils/base-url';
import { scenario } from '../../src/utils/cypress';

describe('constructor', () => {
	beforeEach(() => {
		cy.intercept('GET', `${baseURL}/auth/user`, {
			fixture: 'user.json',
		})
		cy.intercept('POST', `${baseURL}/orders`, {
			fixture: 'order.json',
		}).as('make-order')
		cy.visit('')
	})

	it('should interaction with modal ingredient details', () => {
		cy.get(scenario('burger_ingredient_elem')).eq(1).click()
		cy.get(scenario('modal')).as('modal')

		cy.get('@modal')
			.should('be.visible')
			.find(scenario('modal_title'))
			.should('have.text', 'Детали ингредиента ')

		cy.fixture('ingredient-details.json').then(
			({ name, proteins, fat, calories, carbohydrates }) => {
				cy.get('@modal')
					.find(scenario('ingredient_name'))
					.should('have.text', name)

				cy.get('@modal')
					.find(scenario('ingredient_calories'))
					.should('have.text', calories)

				cy.get('@modal')
					.find(scenario('ingredient_proteins'))
					.should('have.text', proteins)
				cy.get('@modal')
					.find(scenario('ingredient_fat'))
					.should('have.text', fat)
				cy.get('@modal')
					.find(scenario('ingredient_carbohydrates'))
					.should('have.text', carbohydrates)
			}
		)

		cy.get('@modal').find(scenario('close_modal')).click({ force: true })
		cy.url().should('include', '');
	})

	it('should interaction with modal order details', () => {
		cy.get(scenario('burger_ingredient_elem')).eq(1).trigger('dragstart')
		cy.get(scenario('constructor_page')).trigger('drop')

		cy.get(scenario('button_submit')).click()
		cy.wait('@make-order', { timeout: 30000 })
		cy.get(scenario('modal'))
			.as('modal')
			.should('be.visible')

		cy.fixture('order.json').then(({ order }) => {
			cy.get('@modal')
				.find(scenario('order_number'))
				.should('have.text', order.number)
		})

		cy.get('@modal').find(scenario('close_modal')).click({ force: true })
		cy.url().should('include', '');
	})

	it('should d&d a bun ingredient into constructor', () => {
		cy.get(scenario('burger_ingredient_elem')).eq(1).trigger('dragstart')
		cy.get(scenario('constructor_page')).trigger('drop')

		cy.get(scenario('constructor_bun'))
			.should('be.visible')
	})
})
