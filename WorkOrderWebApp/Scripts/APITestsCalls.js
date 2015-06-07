/// <reference path="typings/jquery/jquery.d.ts" />
var API;
(function (API) {
    var Devices;
    (function (Devices) {
        function Get() {
            $('#lblDevicesGet').text(WebAPICall('Devices', HTTPType.Get));
        }
        Devices.Get = Get;
        function Post() {
            var postData = { Value: $('#txtDevicesPost').val() };
            $('#lblDevicesPost').text(WebAPICall('Devices', HTTPType.Post, postData));
        }
        Devices.Post = Post;
        function Delete() {
            var deleteIndex = $('#txtDevicesDelete').val();
            $('#lblDevicesDelete').text(WebAPICall('Devices', HTTPType.Delete, deleteIndex));
        }
        Devices.Delete = Delete;
    })(Devices = API.Devices || (API.Devices = {}));
    var Jobs;
    (function (Jobs) {
        function Get() {
            $('#lblJobsGet').text(WebAPICall('Jobs', HTTPType.Get));
        }
        Jobs.Get = Get;
        function Post() {
            var postData = { Value: $('#txtJobsPost').val() };
            $('#lblJobsPost').text(WebAPICall('Jobs', HTTPType.Post, postData));
        }
        Jobs.Post = Post;
        function Delete() {
            var deleteIndex = $('#txtJobsDelete').val();
            $('#lblJobsDelete').text(WebAPICall('Jobs', HTTPType.Delete, deleteIndex));
        }
        Jobs.Delete = Delete;
    })(Jobs = API.Jobs || (API.Jobs = {}));
    var ManageDevices;
    (function (ManageDevices) {
        function Get() {
            $('#lblManageDevicesGet').text(WebAPICall('ManageDevices', HTTPType.Get));
        }
        ManageDevices.Get = Get;
        function Post() {
            var postData = $('#txtManageDevicesPost').val();
            $('#lblManageDevicesPost').text(WebAPICall('ManageDevices', HTTPType.Post, postData));
        }
        ManageDevices.Post = Post;
        function Delete() {
            var deleteIndex = $('#txtManageDevicesDelete').val();
            $('#lblManageDevicesDelete').text(WebAPICall('ManageDevices', HTTPType.Delete, deleteIndex));
        }
        ManageDevices.Delete = Delete;
    })(ManageDevices = API.ManageDevices || (API.ManageDevices = {}));
    var Users;
    (function (Users) {
        function Get() {
            $('#lblUsersGet').text(WebAPICall('Users', HTTPType.Get));
        }
        Users.Get = Get;
        function Post() {
            var postData = { Value: $('#txtUsersPost').val() };
            $('#lblUsersPost').text(WebAPICall('Users', HTTPType.Post, postData));
        }
        Users.Post = Post;
        function Delete() {
            var deleteIndex = $('#txtUsersDelete').val();
            $('#lblUsersDelete').text(WebAPICall('Users', HTTPType.Delete, deleteIndex));
        }
        Users.Delete = Delete;
    })(Users = API.Users || (API.Users = {}));
    var WorkOrders;
    (function (WorkOrders) {
        function Get() {
            $('#lblWorkOrdersGet').text(WebAPICall('WorkOrders', HTTPType.Get));
        }
        WorkOrders.Get = Get;
        function Post() {
            var postData = {
                JobID: 2,
                DeviceGUID: '14d1ed2c7438fb6',
                Subject: 'test',
                RegWorkHours: 2.5,
                OvertimeWorkHours: 0,
                Description: 'aac zxc asd ada dnqwidbqw boiqw ndqownd oiqnw oiqwnd'
            };
            $('#lblWorkOrdersPost').text(WebAPICall('WorkOrders', HTTPType.Post, postData));
        }
        WorkOrders.Post = Post;
    })(WorkOrders = API.WorkOrders || (API.WorkOrders = {}));
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
})(API || (API = {}));
//# sourceMappingURL=APITestsCalls.js.map