var ReferenceDataModeling;
(function (ReferenceDataModeling) {
    var ReferenceDataModel = (function () {
        function ReferenceDataModel() {
            this.ID = ko.observable();
            this.Value = ko.observable();
            this.Enabled = ko.observable();
        }
        return ReferenceDataModel;
    })();
    ReferenceDataModeling.ReferenceDataModel = ReferenceDataModel;
    ReferenceDataModeling.ReferenceDataActions = function (data) {
        var self = this;
        self.viewDisabledData = ko.observable(false);
        self.referenceName = ko.observable();
        self.recordsPerPage = 7;
        self.pageNumber = ko.observable(0);
        self.allReferenceData = ko.observableArray();
        self.allEnabledReferenceData = ko.computed(function () {
            var enabledReferenceData = new Array();
            $(self.allReferenceData()).each(function (i, e) {
                if (e.Enabled())
                    enabledReferenceData.push(e);
            });
            return enabledReferenceData;
        });
        self.loadReferenceData = function (d) {
            if (d != undefined) {
                var jsonArray = JSON.parse(d);
                for (var i = 0; i < jsonArray.length; i++) {
                    var item = new ReferenceDataModel();
                    item.ID(jsonArray[i].ID);
                    item.Value(jsonArray[i].Value);
                    item.Enabled(jsonArray[i].Enabled);
                    self.allReferenceData.push(item);
                }
            }
        };
        self.clearReferenceData = function () {
            self.allReferenceData.removeAll();
        };
        self.sort = function (column, sortDescending) {
            switch (column) {
                case "hID":
                    self.allReferenceData.sort(function (a, b) {
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hValue":
                    self.allReferenceData.sort(function (a, b) {
                        if (a.Value() !== b.Value())
                            return sortDescending ? Formatting.sortDesc(a.Value(), b.Value()) : Formatting.sortAsc(a.Value(), b.Value());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                default:
                    break;
            }
        };
        self.addReferenceDataRecord = function (d) {
            self.allReferenceData.push(d);
        };
        self.referenceDataPage = ko.computed(function () {
            var first = self.pageNumber() * self.recordsPerPage;
            return self.viewDisabledData() ? self.allReferenceData().slice(first, first + self.recordsPerPage) : self.allEnabledReferenceData().slice(first, first + self.recordsPerPage);
        });
        self.totalPossiblePages = ko.computed(function () {
            var div = Math.floor((self.viewDisabledData() ? self.allReferenceData().length : self.allEnabledReferenceData().length) / self.recordsPerPage);
            div += (self.viewDisabledData() ? self.allReferenceData().length : self.allEnabledReferenceData().length) % self.recordsPerPage > 0 ? 1 : 0;
            return div - 1;
        });
        self.previousPage = function () {
            if (self.pageNumber() > 0)
                self.pageNumber(self.pageNumber() - 1);
        };
        self.nextPage = function () {
            if (self.pageNumber() < self.totalPossiblePages())
                self.pageNumber(self.pageNumber() + 1);
        };
        self.loadReferenceData(data);
    };
})(ReferenceDataModeling || (ReferenceDataModeling = {}));
//# sourceMappingURL=ReferenceDataModeling.js.map