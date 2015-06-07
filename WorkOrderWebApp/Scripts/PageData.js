var viewModel;
var PageData;
(function (PageData) {
    function LoadManageDevices() {
        viewModel = {
            md: new ManageDevicesModeling.ManageDevicesActions(JSONCalls.GetManageDevices())
        };
        ko.applyBindings(viewModel);
    }
    PageData.LoadManageDevices = LoadManageDevices;
    function LoadWorkOrders() {
        var val = JSONCalls.GetWorkOrders();
        var searchFilters = SearchPanel.SearchFilters(new WorkOrderModeling.WorkOrderActions(val));
        viewModel = {
            wo: new WorkOrderModeling.WorkOrderActions(val),
            sites: searchFilters.sites,
            submittedBy: searchFilters.subBy,
            oldestSubmitDate: searchFilters.subDtMin
        };
        ko.applyBindings(viewModel);
        SearchPanel.Show();
    }
    PageData.LoadWorkOrders = LoadWorkOrders;
    function LoadAdminPanel() {
        AdminPanel.LoadTooltips();
        viewModel = {
            sites: new ReferenceDataModeling.ReferenceDataActions(JSONCalls.GetSites()),
            jobs: new ReferenceDataModeling.ReferenceDataActions(JSONCalls.GetJobs(-1)),
            devices: new ReferenceDataModeling.ReferenceDataActions(JSONCalls.GetAllDevicesNames()),
            users: new UsersDataModeling.UsersDataActions(JSONCalls.GetAllUserNames())
        };
        ko.applyBindings(viewModel);
    }
    PageData.LoadAdminPanel = LoadAdminPanel;
    function Sort() {
        var element = $(window.event.srcElement) || $(window.event.target), isSearch = false;
        if ($(element).is('img'))
            element = $(element).parent();
        if ($(element).is('#search')) {
            isSearch = true;
            $('#pageTable tr th').each(function (i, e) {
                if ($(e).children('img').length == 1)
                    element = $(e);
                else
                    return;
            });
        }
        //Set correct sort image
        $($(element).parent().parent().parent()).find('thead').find('tr').find('th').each(function (i, e) {
            var thID = $(e).attr('id');
            if (thID == element.attr('id')) {
                if ($(e).children('img').length == 1) {
                    if (isSearch) {
                        if ($(e).children('img').attr('id') == 'sortAsc')
                            GetvmInstance().sort(thID, false); //sort Asc
                        else
                            GetvmInstance().sort(thID, true); //sort Desc
                    }
                    else {
                        if ($(e).children('img').attr('id') == 'sortAsc') {
                            GetvmInstance().sort(thID, true); //sort Desc
                            $(e).children('img').remove();
                            $(e).append("<img id='sortDesc' class='sort' src='../Content/images/up-16.png' />");
                        }
                        else {
                            GetvmInstance().sort('hID', false); //sort Default(on ID)
                            $(e).children('img').remove();
                        }
                    }
                }
                else {
                    $(e).append("<img id='sortAsc' class='sort' src='../Content/images/down-16.png' />");
                    GetvmInstance().sort(thID, false); //sort Asc
                }
            }
            else
                $(e).children('img').remove();
        });
    }
    PageData.Sort = Sort;
    function NextPage() {
        GetvmInstance().nextPage();
    }
    PageData.NextPage = NextPage;
    function PreviousPage() {
        GetvmInstance().previousPage();
    }
    PageData.PreviousPage = PreviousPage;
    function GetvmInstance() {
        var vmInstance;
        if (page == 1)
            vmInstance = viewModel.wo;
        else if (page == 2)
            vmInstance = viewModel.md;
        else if (page == 3) {
            var viewModelSubInstance;
            $($(event.srcElement).parents('table')).each(function (i, e) {
                if ($(e).attr('id') != 'pageTitle')
                    viewModelSubInstance = $(e).attr('id');
            });
            if (viewModelSubInstance == 'sites') {
                viewModel.sites.referenceName('sites');
                vmInstance = viewModel.sites;
            }
            else if (viewModelSubInstance == 'jobs') {
                viewModel.jobs.referenceName('jobs');
                vmInstance = viewModel.jobs;
            }
            else if (viewModelSubInstance == 'devices') {
                viewModel.devices.referenceName('devices');
                vmInstance = viewModel.devices;
            }
            else if ($(event.srcElement).parent().parent().attr('id') == 'usersPageControl') {
                viewModel.users.referenceName('users');
                vmInstance = viewModel.users;
            }
        }
        return vmInstance;
    }
    PageData.GetvmInstance = GetvmInstance;
})(PageData || (PageData = {}));
//# sourceMappingURL=PageData.js.map