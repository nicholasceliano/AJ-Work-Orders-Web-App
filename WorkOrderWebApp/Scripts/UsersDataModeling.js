var UsersDataModeling;
(function (UsersDataModeling) {
    var UsersDataModel = (function () {
        function UsersDataModel() {
            this.ID = ko.observable();
            this.FirstName = ko.observable();
            this.LastName = ko.observable();
            this.FullName = ko.pureComputed(function () {
                return this.FirstName() + " " + this.LastName();
            }, this);
            this.Email = ko.observable();
            this.WebUser = ko.observable();
            this.WebUserText = ko.pureComputed(function () {
                return this.WebUser() ? "Yes" : "No";
            }, this);
            this.Admin = ko.observable();
            this.AdminText = ko.pureComputed(function () {
                return this.Admin() ? "Yes" : "No";
            }, this);
            this.Enabled = ko.observable();
            this.EnabledText = ko.pureComputed(function () {
                return this.Enabled() ? "Yes" : "No";
            }, this);
        }
        return UsersDataModel;
    })();
    UsersDataModeling.UsersDataModel = UsersDataModel;
    UsersDataModeling.UsersDataActions = function (data) {
        var self = this;
        self.viewDisabledData = ko.observable(false);
        self.referenceName = ko.observable();
        self.recordsPerPage = 7;
        self.pageNumber = ko.observable(0);
        self.allUsersData = ko.observableArray();
        self.allEnabledUsersData = ko.computed(function () {
            var enabledUsersData = new Array();
            $(self.allUsersData()).each(function (i, e) {
                if (e.Enabled())
                    enabledUsersData.push(e);
            });
            return enabledUsersData;
        });
        self.loadUsersData = function (d) {
            if (d != undefined) {
                var jsonArray = JSON.parse(d);
                for (var i = 0; i < jsonArray.length; i++) {
                    var item = new UsersDataModel();
                    item.ID(jsonArray[i].ID);
                    item.FirstName(jsonArray[i].FirstName);
                    item.LastName(jsonArray[i].LastName);
                    item.Email(jsonArray[i].Email);
                    item.WebUser(jsonArray[i].WebUser);
                    item.Admin(jsonArray[i].Admin);
                    item.Enabled(jsonArray[i].Enabled);
                    self.allUsersData.push(item);
                }
            }
        };
        self.clearUsersData = function () {
            self.allUsersData.removeAll();
        };
        self.sort = function (column, sortDescending) {
            switch (column) {
                case "hID":
                    self.allUsersData.sort(function (a, b) {
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hFirstName":
                    self.allUsersData.sort(function (a, b) {
                        if (a.FirstName() !== b.FirstName())
                            return sortDescending ? Formatting.sortDesc(a.FirstName(), b.FirstName()) : Formatting.sortAsc(a.FirstName(), b.FirstName());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hLastName":
                    self.allUsersData.sort(function (a, b) {
                        if (a.LastName() !== b.LastName())
                            return sortDescending ? Formatting.sortDesc(a.LastName(), b.LastName()) : Formatting.sortAsc(a.LastName(), b.LastName());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hEmail":
                    self.allUsersData.sort(function (a, b) {
                        if (a.Email() !== b.Email())
                            return sortDescending ? Formatting.sortDesc(a.Email(), b.Email()) : Formatting.sortAsc(a.Email(), b.Email());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hWebUser":
                    self.allUsersData.sort(function (a, b) {
                        if (a.WebUser() !== b.WebUser())
                            return sortDescending ? Formatting.sortDesc(a.WebUser(), b.WebUser()) : Formatting.sortAsc(a.WebUser(), b.WebUser());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hAdmin":
                    self.allUsersData.sort(function (a, b) {
                        if (a.Admin() !== b.Admin())
                            return sortDescending ? Formatting.sortDesc(a.Admin(), b.Admin()) : Formatting.sortAsc(a.Admin(), b.Admin());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hActive":
                    self.allUsersData.sort(function (a, b) {
                        if (a.Active() !== b.Active())
                            return sortDescending ? Formatting.sortDesc(a.Active(), b.Active()) : Formatting.sortAsc(a.Active(), b.Active());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                default:
                    break;
            }
        };
        self.addUsersDataRecord = function (d) {
            self.allUsersData.push(d);
        };
        self.usersDataPage = ko.computed(function () {
            var first = self.pageNumber() * self.recordsPerPage;
            return self.viewDisabledData() ? self.allUsersData().slice(first, first + self.recordsPerPage) : self.allEnabledUsersData().slice(first, first + self.recordsPerPage);
        });
        self.totalPossiblePages = ko.computed(function () {
            var div = Math.floor((self.viewDisabledData() ? self.allUsersData().length : self.allEnabledUsersData().length) / self.recordsPerPage);
            div += (self.viewDisabledData() ? self.allUsersData().length : self.allEnabledUsersData().length) % self.recordsPerPage > 0 ? 1 : 0;
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
        self.loadUsersData(data);
    };
})(UsersDataModeling || (UsersDataModeling = {}));
//# sourceMappingURL=UsersDataModeling.js.map