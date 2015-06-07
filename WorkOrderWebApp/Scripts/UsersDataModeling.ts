module UsersDataModeling {

    export class UsersDataModel {
        public ID = ko.observable<number>();
        public FirstName = ko.observable<string>();
        public LastName = ko.observable<string>();
        public FullName = ko.pureComputed(function () {
            return this.FirstName() + " " + this.LastName();
        }, this);
        public Email = ko.observable<string>();
        public WebUser = ko.observable<boolean>();
        public WebUserText = ko.pureComputed(function () {
            return this.WebUser() ? "Yes" : "No";
        }, this);
        public Admin = ko.observable<boolean>();
        public AdminText = ko.pureComputed(function () {
            return this.Admin() ? "Yes" : "No";
        }, this);
        public Enabled = ko.observable<boolean>();
        public EnabledText = ko.pureComputed(function () {
            return this.Enabled() ? "Yes" : "No";
        }, this);
    }

    export var UsersDataActions = function (data: string) {
        var self = this;

        self.viewDisabledData = ko.observable<boolean>(false);

        self.referenceName = ko.observable<string>();

        self.recordsPerPage = 7;
        self.pageNumber = ko.observable(0);

        self.allUsersData = ko.observableArray();

        self.allEnabledUsersData = ko.computed(function () {
            var enabledUsersData: UsersDataModel[] = new Array<UsersDataModel>();
            $(self.allUsersData()).each(function (i, e: any) {
                if (e.Enabled())
                    enabledUsersData.push(e);
            });
            return enabledUsersData;
        });

        self.loadUsersData = function (d) {
            if (d != undefined) {
                var jsonArray: any[] = JSON.parse(d);
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
        }

        self.sort = function (column: string, sortDescending: boolean) {
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

        self.addUsersDataRecord = function (d: UsersDataModel) {
            self.allUsersData.push(d);
        }

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
        }

        self.nextPage = function () {
            if (self.pageNumber() < self.totalPossiblePages())
                self.pageNumber(self.pageNumber() + 1);
        }

        self.loadUsersData(data);
    };
}