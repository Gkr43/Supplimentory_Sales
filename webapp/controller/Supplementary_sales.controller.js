sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("supplementarysales.controller.Supplementary_sales", {
        onInit: function () {
            debugger;
            this.oModel = this.getOwnerComponent().getModel();
           var oJSONModel = new sap.ui.model.json.JSONModel();
           this.OnExcellFileReadTable();

        },
        
       
        OnExcellFileReadTable: function(){
            debugger;
            var oModel = this.getOwnerComponent().getModel();
            var oJSONModel = new sap.ui.model.json.JSONModel();
            var that=this;
            //  /ZCPR_UPDT
             oModel.read("/ZCPR_UPDT",{
                         success: function(response)
                         {
                             debugger;
                           //  oJSONModel.setData(oresponse);
                             oJSONModel.setData(response.results);
                             that.getView().setModel(oJSONModel,"localModel");
                            // that.getView().setModel(oJSONModel);
                             sap.m.MessageToast.show("Excell file Record Display Successfully");
                         }.bind(that),
                         error: function(error){
                            sap.m.MessageToast.show("Excell file Data Found");
                        }
                    });
                },
        
                onValueHelpPoamno:function(){
            debugger;
           var oModel = this.getOwnerComponent().getModel();
            var oJSONModel = new sap.ui.model.json.JSONModel();
            var that = this;
        
                this.oModel.read("/ZCPR_VA01", {
            
              success: function(response) {
                sap.m.MessageToast.show("Record Display Successfully");
               
                if(! that.fragment){
                that.fragment = new sap.ui.xmlfragment("Supplementary_sales.fragments.sales", that);  
            }
                that.getView().addDependent(that.fragment);
                var oJSONModel = new sap.ui.model.json.JSONModel();
               oJSONModel.setData(response.results);
                that.fragment.setModel(oJSONModel);
                that.fragment.open();
              },
              error: function(oErr) {
                sap.m.MessageToast.show("No Data Found");
              }
            });
        },
        
        onSearchpoamno:function(oEvent){
            debugger;
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("amdno", FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },
        
        onConfirmpoamno:function(oEvent){
            debugger;
            var selectedItem = oEvent.getParameter("selectedItem").getTitle();
             var oTable = this.byId("UITable");
             var oBinding = oTable.getBinding("rows").oList;
            if (selectedItem !== "") {
                var fil = [new sap.ui.model.Filter("amdno", "Contains", selectedItem)];

                oTable.getBinding('rows').filter(new sap.ui.model.Filter(fil, false));
                      } else {
           
            oTable.getBinding("rows").filter([]);
                      }
                      this.byId("POAMNumber").setValue(selectedItem);
    },

    //
    onSubmitpoamno: function(oEvent){
        debugger;
        //var selectedItem = oEvent.getParameter("selectedItem").getTitle();
        var value = oEvent.getSource().getValue();
        var oTable = this.byId("UITable");
        var oBinding = oTable.getBinding("rows").oList;
       if (value !== "") {
           var fil = [new sap.ui.model.Filter("amdno", "Contains", value)];
           oTable.getBinding('rows').filter(new sap.ui.model.Filter(fil, false));
                 } else {

      
       oTable.getBinding("rows").filter([]);
                 }


    },

        onLiveChangePoamNO:function(Evt){
            debugger;
            var val = Evt.getParameter('value');
            if (val !== "") {
     var fil = [new sap.ui.model.Filter("amdno", "Contains", val)];
      this.fragment.getBinding('items').filter(new sap.ui.model.Filter(fil, false));
            } else {
            this.fragment.getBinding("items").filter([]);
            }

        },


        formatID: function(sStatus) {
            if (sStatus === "Pending") {
                return new sap.ui.core.Icon({
                    src: "sap-icon://status-in-process",
                    color: "yellow"
                }).addStyleClass("sapUiTinyMarginBeginEnd");
            } else if (sStatus === "Approved") {
                return new sap.ui.core.Icon({
                    src: "sap-icon://status-completed",
                    color: "green"
                }).addStyleClass("sapUiTinyMarginBeginEnd");
            } else {
                return sStatus;
            }
        }


    });
});

    

