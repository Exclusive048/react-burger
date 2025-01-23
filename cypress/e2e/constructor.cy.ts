import { selectors } from '../../src/utils/selectors';
import { baseURL } from '../../src/utils/base-url';
import { scenario } from '../../src/utils/cypress';

describe('constructor', () => {
	beforeEach(() => {
		cy.intercept('GET', `${baseURL}/auth/user`, {
			fixture: 'user.json',
		})
		cy.intercept('POST', `${baseURL}/orders`, {
			fixture: 'order.json',
		}).as('make-order')
		cy.setCookie('accessToken', 'test-access-token');
		cy.visit('')
	})

	it('should interaction with modal ingredient details', () => {
		cy.get(scenario(selectors.burgerIngredient)).eq(1).click()
		cy.get(scenario(selectors.modal)).as('modal')

		cy.get('@modal')
			.should('be.visible')
			.find(scenario(selectors.modalTitle))
			.should('have.text', 'Детали ингредиента ')

		cy.fixture('ingredient-details.json').then(
			({ name, proteins, fat, calories, carbohydrates }) => {
				cy.get('@modal')
					.find(scenario(selectors.ingredientName))
					.should('have.text', name)

				cy.get('@modal')
					.find(scenario(selectors.ingredientCalories))
					.should('have.text', calories)

				cy.get('@modal')
					.find(scenario(selectors.ingredientProteins))
					.should('have.text', proteins)
				cy.get('@modal')
					.find(scenario(selectors.ingredientFat))
					.should('have.text', fat)
				cy.get('@modal')
					.find(scenario(selectors.ingredientCarbohydrates))
					.should('have.text', carbohydrates)
			}
		)

		cy.get('@modal').find(scenario(selectors.closeModal)).click({ force: true })
		cy.url().should('include', '');
	})

	it('should interaction with modal order details', () => {
		cy.get(scenario(selectors.burgerIngredient)).eq(1).trigger('dragstart')
		cy.get(scenario(selectors.constructorPage)).trigger('drop')

		cy.get(scenario(selectors.submitButton)).click()
		cy.wait('@make-order',{ timeout: 20000 })
		cy.get(scenario(selectors.modal))
			.as('modal')
			.should('be.visible')

		cy.fixture('order.json').then(({ order }) => {
			cy.get('@modal')
				.find(scenario(selectors.orderNumber))
				.should('have.text', order.number)
		})

		cy.get('@modal').find(scenario(selectors.closeModal)).click({ force: true })
		cy.url().should('include', '');
	})

	it('should d&d a bun ingredient into constructor', () => {
		cy.get(scenario(selectors.burgerIngredient)).eq(1).trigger('dragstart')
		cy.get(scenario(selectors.constructorPage)).trigger('drop')

		cy.get(scenario(selectors.constructorBun))
			.should('be.visible')
	})
})