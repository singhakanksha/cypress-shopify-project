// // import { expect } from "chai"
// import BasePage from "../../page-objects/BasePage"
// import Navbar from "../../page-objects/components/navbar"
// import CartPage from "../../page-objects/pages/CartPage"
// import HomePage from "../../page-objects/pages/homePage"
// import ProductDetailsPage from "../../page-objects/pages/ProductDetailsPage"
// import ProductsPage from "../../page-objects/pages/ProductsPage"

// describe('Checkout actions suite', () => {
//     let products
//     before(function () {
//         HomePage.load()
//         cy.fixture('chair-data').then(function (data) {
//             products = data
//              return products
//         })
//     })

//     it('Can see error message on invalid coupon', () => {
//         Navbar.clickChairs()
//         ProductsPage.clickOnProduct(products.product02)
//         ProductDetailsPage.clickAddToCart()
//         Navbar.clickCart()
//         CartPage.isLoaded()
//         CartPage.enterCoupon('123451')
//         CartPage.clickApply()
//         BasePage.pause(1000)
//         CartPage.validateErrorMessage()
//     })

//     it('Can see Total price remain same upon invalid coupon', () =>{
//         Navbar.clickChairs()
//         ProductsPage.clickOnProduct(products.product02)
//         ProductDetailsPage.clickAddToCart()
//         CartPage.load()
//         CartPage.isLoaded()
//         cy.get(CartPage.checkoutTotalPrice).invoke('text').as('$priceBeforeInvalidCoupon')
//         CartPage.enterCoupon('12345123451234512345')
//         CartPage.clickApply()
//         cy.get(CartPage.checkoutTotalPrice).invoke('text').as('$priceAfterInvalidCoupon')
//         cy.then(function(){
//             expect(this.$priceBeforeInvalidCoupon).to.equal(this.$priceAfterInvalidCoupon)
//         })
//     })

//     it('Can enter only a max. of 15 characters in discounts box', () => {
//         CartPage.load()
//         CartPage.isLoaded()
//         CartPage.enterCoupon('12345123451234512345')
//         cy.get(CartPage.discountTextBox)
//             .invoke('attr', 'maxlength')
//             .should('match', new RegExp(15))  //max. coupon code length
//     })
// })
