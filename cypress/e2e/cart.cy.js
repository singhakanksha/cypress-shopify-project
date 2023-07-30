
import BasePage from "../pageObjects/BasePage"
import Footer from "../pageObjects/common-components/footer"
import Navbar from "../pageObjects/common-components/navbar"
import CartPage from "../pageObjects/pages/CartPage.mjs"
import HomePage from "../pageObjects/pages/homePage"
import ProductDetailsPage from "../pageObjects/pages/ProductDetailsPage"
import ProductsPage from "../pageObjects/pages/ProductsPage"


describe("Cart actions suite", () => {

    let chairsData
    beforeEach(function () {
        HomePage.load()
        cy.fixture('chair-data').then(function (data) {
            chairsData = data
            return chairsData
        })
    })

    it.only('Can add chair to cart from Header Menu', () => {
        Navbar.clickChairs()
        ProductsPage.isLoaded()
        ProductsPage.clickOnProduct(chairsData.product01)
        // ProductDetailsPage.isLoaded()
        ProductDetailsPage.clickAddToCart()
        Navbar.verifyCartCount('(1)')
    })

    it('Can add chair to cart from Body Categories', () => {
        Navbar.clickLogo()
        HomePage.isLoaded()
        HomePage.clickChairsCard()
        ProductsPage.isLoaded()
        ProductsPage.clickOnProduct(chairsData.product02)
        ProductDetailsPage.isLoaded()
        ProductDetailsPage.clickAddToCart()
        Navbar.verifyCartCount('(1)')
    })

    it('Can add chair to cart from Footer Menu', () => {
        Footer.clickChairs()
        ProductsPage.isLoaded()
        ProductsPage.clickOnProduct(chairsData.product03)
        ProductDetailsPage.isLoaded()
        ProductDetailsPage.clickAddToCart()
        Navbar.verifyCartCount('(1)')
    })

    it('Can see same name & price in cart page as in detailed view', function () {
        Navbar.clickChairs()
        ProductsPage.clickOnProduct(chairsData.product04)
        cy.then(() => {
            ProductDetailsPage.invokeProductNameText()
            ProductDetailsPage.invokeProductPriceText()
            ProductDetailsPage.clickAddToCart()
            Navbar.verifyCartCount('(1)')
            Navbar.clickCart()
        }).then(() => {
            CartPage.verifyProductName(this.expectedName)
            CartPage.verifyProductPrice(this.expectedPrice)
        })
    })

    it('Can see same chair image in cart as in detailed page', () => {
        Navbar.clickChairs()
        ProductsPage.clickOnProduct(chairsData.product05)
        ProductDetailsPage.clickAddToCart()
        cy.get(ProductDetailsPage.productImage).invoke('attr', 'src').then(($expectedImage) => {
            Navbar.clickCart()
            cy.get(CartPage.productImage).invoke('attr', 'src').then(($actualImage) => {
                expect($actualImage).to.equal($expectedImage)
            })
        })
    })

    it('Can see same multiple chair images in cart as in detailed page',() => {
        Navbar.clickChairs()
        ProductsPage.clickOnProduct(chairsData.product01)
        ProductDetailsPage.clickAddToCart()
        cy.get(ProductDetailsPage.productImage).invoke('attr', 'src').then(($expectedImage) => {
            Navbar.clickCart()
            cy.get(CartPage.productImage).invoke('attr', 'src').then(($actualImage) => {
                expect($actualImage).to.equal($expectedImage)
                CartPage.removeOneQuantity()
            }).then(function() {
                Navbar.clickChairs()
                ProductsPage.isLoaded()
                ProductsPage.clickOnProduct(chairsData.product04)
                ProductDetailsPage.clickAddToCart()
                cy.get(ProductDetailsPage.productImage).invoke('attr', 'src').then(($expectedImage01) =>{
                    Navbar.clickCart()
                    cy.get(CartPage.productImage).invoke('attr', 'src').then(($actualImage01) => {
                        expect($actualImage01).to.equal($expectedImage01)
                })
              })
            })
        })
    })

    it('Can see cart count updating correctly in navbar', () => {
        Navbar.clickChairs()
        ProductsPage.clickOnProduct(chairsData.product06)
        ProductDetailsPage.clickAddToCart()
        Navbar.verifyCartCount('(1)')
        Navbar.clickCart()
        CartPage.isLoaded()
        CartPage.addOneQuantity()
        Navbar.verifyCartCount('(2)')
        CartPage.removeOneQuantity()
        Navbar.verifyCartCount('(1)')
    })

    it('Can increase and decrease quantity in cart page', () => {
        Navbar.clickChairs()
        ProductsPage.clickOnProduct(chairsData.product07)
        ProductDetailsPage.clickAddToCart()
        Navbar.clickCart()
        CartPage.verifyProductCounter('1')
        CartPage.addOneQuantity()
        CartPage.addOneQuantity()
        CartPage.verifyProductCounter('3')
        CartPage.removeOneQuantity()
        CartPage.verifyProductCounter('2')
    })

    it('Can add multiple IN STOCK chairs to cart', () => {
        Navbar.clickChairs()
        ProductsPage.clickOnProduct(chairsData.product01)
        ProductDetailsPage.clickAddToCart()
        Navbar.clickChairs()
        ProductsPage.clickOnProduct(chairsData.product03)
        ProductDetailsPage.clickAddToCart()
        Navbar.verifyCartCount('(2)')
        Navbar.clickCart()
        CartPage.isLoaded()
    })

    it("Can see SOLD OUT msg when trying to add sold-out chair to cart", () => {
        Navbar.clickChairs()
        ProductsPage.isLoaded()
        ProductsPage.clickOnProduct(chairsData.product08)
        ProductsPage.verifySoldOutMessage()
    })

    it('Can continue to shop from SOLD OUT message popup', () => {
        HomePage.load()
        Navbar.clickChairs()
        ProductsPage.clickOnProduct(chairsData.product09)
        ProductsPage.verifySoldOutMessage()
        cy.isVisible(ProductsPage.soldOutModalContinueButton)
        ProductsPage.clickSoldOutContinue()
        cy.isVisible(ProductsPage.productsPageLayout)
    })

    it('Can remove chair from cart and see empty cart message', () => {
        Navbar.clickChairs()
        ProductsPage.isLoaded()
        ProductsPage.clickOnProduct(chairsData.product02)
        ProductDetailsPage.clickAddToCart()
        Navbar.clickCart()
        CartPage.isLoaded()
        CartPage.removeOneQuantity()
        CartPage.verifyEmptyCartMessage()
    })
})

