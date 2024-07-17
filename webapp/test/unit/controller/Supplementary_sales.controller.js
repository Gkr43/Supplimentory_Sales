/*global QUnit*/

sap.ui.define([
	"supplementary_sales/controller/Supplementary_sales.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Supplementary_sales Controller");

	QUnit.test("I should test the Supplementary_sales controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
