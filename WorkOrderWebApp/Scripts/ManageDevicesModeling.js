var ManageDevicesModeling;
(function (ManageDevicesModeling) {
    var ManageDevicesModel = (function () {
        function ManageDevicesModel() {
            this.ID = ko.observable();
            this.UserID = ko.observable();
            this.FirstName = ko.observable();
            this.LastName = ko.observable();
            this.UserName = ko.pureComputed(function () {
                return this.FirstName() + ' ' + (this.LastName().length > 0 ? ' ' : '') + this.LastName();
            }, this);
            this.DeviceName = ko.observable();
            this.GUID = ko.observable();
            this.LastUpdatedBy = ko.observable();
            this.LastUpdatedDate = ko.observable();
        }
        return ManageDevicesModel;
    })();
    ManageDevicesModeling.ManageDevicesModel = ManageDevicesModel;
    ManageDevicesModeling.ManageDevicesActions = function (data) {
        var self = this;
        self.recordsPerPage = 25;
        self.pageNumber = ko.observable(0);
        self.allDevices = ko.observableArray();
        self.loadDevices = function (d) {
            if (d != undefined) {
                var jsonArray = JSON.parse(d);
                for (var i = 0; i < jsonArray.length; i++) {
                    var item = new ManageDevicesModel();
                    item.ID(jsonArray[i].ID);
                    item.UserID(jsonArray[i].UserID);
                    item.FirstName(jsonArray[i].UserNameFirstName);
                    item.LastName(jsonArray[i].UserNameLastName);
                    item.DeviceName(jsonArray[i].DeviceName);
                    item.GUID(jsonArray[i].GUID);
                    item.LastUpdatedBy(Formatting.HandlePossibleStringDBNull(jsonArray[i].LastUpdateBy));
                    item.LastUpdatedDate(Formatting.HandlePossibleStringDBNull(Formatting.FormatDateTime(jsonArray[i].LastUpdateDate)));
                    self.allDevices.push(item);
                }
            }
        };
        self.sort = function (column, sortDescending) {
            switch (column) {
                case "hID":
                    self.allDevices.sort(function (a, b) {
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hUserName":
                    self.allDevices.sort(function (a, b) {
                        if (a.UserName() !== b.UserName())
                            return sortDescending ? Formatting.sortDesc(a.UserName(), b.UserName()) : Formatting.sortAsc(a.UserName(), b.UserName());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hDeviceName":
                    self.allDevices.sort(function (a, b) {
                        if (a.DeviceName() !== b.DeviceName())
                            return sortDescending ? Formatting.sortDesc(a.DeviceName(), b.DeviceName()) : Formatting.sortAsc(a.DeviceName(), b.DeviceName());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hGUID":
                    self.allDevices.sort(function (a, b) {
                        if (a.GUID() !== b.GUID())
                            return sortDescending ? Formatting.sortDesc(a.GUID(), b.GUID()) : Formatting.sortAsc(a.GUID(), b.GUID());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hLastUpBy":
                    self.allDevices.sort(function (a, b) {
                        if (a.LastUpdatedBy() !== b.LastUpdatedBy())
                            return sortDescending ? Formatting.sortDesc(a.LastUpdatedBy(), b.LastUpdatedBy()) : Formatting.sortAsc(a.LastUpdatedBy(), b.LastUpdatedBy());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hLastUpDt":
                    self.allDevices.sort(function (a, b) {
                        if (a.LastUpdatedDate() !== b.LastUpdatedDate())
                            return sortDescending ? Formatting.sortDesc(a.LastUpdatedDate(), b.LastUpdatedDate()) : Formatting.sortAsc(a.LastUpdatedDate(), b.LastUpdatedDate());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                default:
                    break;
            }
        };
        self.manangeDevicesPage = ko.computed(function () {
            var first = self.pageNumber() * self.recordsPerPage;
            return self.allDevices.slice(first, first + self.recordsPerPage);
        });
        self.totalPossiblePages = ko.computed(function () {
            var div = Math.floor(self.allDevices().length / self.recordsPerPage);
            div += self.allDevices().length % self.recordsPerPage > 0 ? 1 : 0;
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
        self.loadDevices(data);
    };
})(ManageDevicesModeling || (ManageDevicesModeling = {}));
//# sourceMappingURL=ManageDevicesModeling.js.map