var JSONCalls;
(function (JSONCalls) {
    function GetAllUserNames() {
        return WebAPICall('Users', HTTPType.Get);
    }
    JSONCalls.GetAllUserNames = GetAllUserNames;
    function AddUserName(data) {
        return WebAPICall('Users', HTTPType.Post, data);
    }
    JSONCalls.AddUserName = AddUserName;
    function DeleteUserName(data) {
        return WebAPICall('Users', HTTPType.Delete, data);
    }
    JSONCalls.DeleteUserName = DeleteUserName;
    function GetAllDevicesNames() {
        return WebAPICall('Devices', HTTPType.Get);
    }
    JSONCalls.GetAllDevicesNames = GetAllDevicesNames;
    function AddDevices(data) {
        return WebAPICall('Devices', HTTPType.Post, data);
    }
    JSONCalls.AddDevices = AddDevices;
    function DeleteDevices(data) {
        return WebAPICall('Devices', HTTPType.Delete, data);
    }
    JSONCalls.DeleteDevices = DeleteDevices;
    function GetSites() {
        return WebAPICall('Sites', HTTPType.Get);
    }
    JSONCalls.GetSites = GetSites;
    function AddSites(data) {
        return WebAPICall('Sites', HTTPType.Post, data);
    }
    JSONCalls.AddSites = AddSites;
    function DeleteSites(data) {
        return WebAPICall('Sites', HTTPType.Delete, data);
    }
    JSONCalls.DeleteSites = DeleteSites;
    function GetJobs(data) {
        return WebAPICall('Jobs', HTTPType.Get, data);
    }
    JSONCalls.GetJobs = GetJobs;
    function AddJobs(data) {
        return WebAPICall('Jobs', HTTPType.Post, data);
    }
    JSONCalls.AddJobs = AddJobs;
    function DeleteJobs(data) {
        return WebAPICall('Jobs', HTTPType.Delete, data);
    }
    JSONCalls.DeleteJobs = DeleteJobs;
    function GetWorkOrders() {
        return WebAPICall('WorkOrders', HTTPType.Get);
    }
    JSONCalls.GetWorkOrders = GetWorkOrders;
    function UpdateWorkOrder(data) {
        return WebAPICall('WorkOrders', HTTPType.Post, data);
    }
    JSONCalls.UpdateWorkOrder = UpdateWorkOrder;
    function DeleteWorkOrder(data) {
        return WebAPICall('WorkOrders', HTTPType.Delete, data);
    }
    JSONCalls.DeleteWorkOrder = DeleteWorkOrder;
    function GetManageDevices() {
        return WebAPICall('ManageDevices', HTTPType.Get);
    }
    JSONCalls.GetManageDevices = GetManageDevices;
    function InsertManageDevices(data) {
        return WebAPICall('ManageDevices', HTTPType.Post, data);
    }
    JSONCalls.InsertManageDevices = InsertManageDevices;
    function DeleteManageDevices(data) {
        return WebAPICall('ManageDevices', HTTPType.Delete, data);
    }
    JSONCalls.DeleteManageDevices = DeleteManageDevices;
    function WebAPICall(APICallURI, HTTPCall, httpData) {
        if (httpData === void 0) { httpData = null; }
        var returnData;
        if (HTTPCall == HTTPType.Post) {
            $.ajax({
                data: JSON.stringify(httpData),
                type: HTTPType.Post,
                contentType: 'application/json',
                url: '/api/' + APICallURI,
                async: false,
                success: function (d) {
                    returnData = d;
                }
            });
        }
        else {
            $.ajax({
                dataType: 'JSON',
                type: HTTPCall,
                url: '/api/' + APICallURI + (httpData == null ? '' : '/' + httpData),
                async: false,
                success: function (d) {
                    returnData = d;
                }
            });
        }
        return returnData;
    }
    var HTTPType = {
        Get: 'GET',
        Post: 'POST',
        Delete: 'DELETE'
    };
})(JSONCalls || (JSONCalls = {}));
//# sourceMappingURL=JSONCalls.js.map