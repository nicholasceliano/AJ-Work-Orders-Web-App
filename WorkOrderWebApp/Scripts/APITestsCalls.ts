/// <reference path="typings/jquery/jquery.d.ts" />

module API {
    export module Devices {
        export function Get() {
            $('#lblDevicesGet').text(WebAPICall('Devices', HTTPType.Get));
        }
        export function Post() {
            var postData = { Value: $('#txtDevicesPost').val() };
            $('#lblDevicesPost').text(WebAPICall('Devices', HTTPType.Post, postData));
        }
        export function Delete() {
            var deleteIndex: string = $('#txtDevicesDelete').val();
            $('#lblDevicesDelete').text(WebAPICall('Devices', HTTPType.Delete, deleteIndex));
        }
    }

    export module Jobs {
        export function Get() {
            $('#lblJobsGet').text(WebAPICall('Jobs', HTTPType.Get));
        }
        export function Post() {
            var postData = { Value: $('#txtJobsPost').val() };
            $('#lblJobsPost').text(WebAPICall('Jobs', HTTPType.Post, postData));
        }
        export function Delete() {
            var deleteIndex: string = $('#txtJobsDelete').val();
            $('#lblJobsDelete').text(WebAPICall('Jobs', HTTPType.Delete, deleteIndex));
        }
    }

    export module ManageDevices {
        export function Get() {
            $('#lblManageDevicesGet').text(WebAPICall('ManageDevices', HTTPType.Get));
        }
        export function Post() {
            var postData: string = $('#txtManageDevicesPost').val();
            $('#lblManageDevicesPost').text(WebAPICall('ManageDevices', HTTPType.Post, postData));
        }
        export function Delete() {
            var deleteIndex: string = $('#txtManageDevicesDelete').val();
            $('#lblManageDevicesDelete').text(WebAPICall('ManageDevices', HTTPType.Delete, deleteIndex));
        }
    }

    export module Users {
        export function Get() {
            $('#lblUsersGet').text(WebAPICall('Users', HTTPType.Get));
        }
        export function Post() {
            var postData = { Value: $('#txtUsersPost').val() };
            $('#lblUsersPost').text(WebAPICall('Users', HTTPType.Post, postData));
        }
        export function Delete() {
            var deleteIndex: string = $('#txtUsersDelete').val();
            $('#lblUsersDelete').text(WebAPICall('Users', HTTPType.Delete, deleteIndex));
        }
    }

    export module WorkOrders {
        export function Get() {
            $('#lblWorkOrdersGet').text(WebAPICall('WorkOrders', HTTPType.Get));
        }
        export function Post() {
            var postData = {
                JobID: 2,
                DeviceGUID: '14d1ed2c7438fb6',
                Subject: 'test',
                RegWorkHours: 2.5,
                OvertimeWorkHours: 0,
                Description: 'aac zxc asd ada dnqwidbqw boiqw ndqownd oiqnw oiqwnd'
            }
            $('#lblWorkOrdersPost').text(WebAPICall('WorkOrders', HTTPType.Post, postData));
        }
    }

    function WebAPICall(APICallURI: string, HTTPCall: string, httpData: any = null): string {
        var returnData;
        if (HTTPCall == HTTPType.Post) { //Post Call
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
        } else { //Get and Delete Calls
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
    }
}