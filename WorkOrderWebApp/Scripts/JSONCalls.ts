module JSONCalls {
    export function GetAllUserNames() {
        return WebAPICall('Users', HTTPType.Get);
    }

    export function AddUserName(data) {
        return WebAPICall('Users', HTTPType.Post, data);
    }

    export function DeleteUserName(data) {
        return WebAPICall('Users', HTTPType.Delete, data);
    }

    export function GetAllDevicesNames() {
        return WebAPICall('Devices', HTTPType.Get);
    }

    export function AddDevices(data) {
        return WebAPICall('Devices', HTTPType.Post, data);
    }

    export function DeleteDevices(data) {
        return WebAPICall('Devices', HTTPType.Delete, data);
    }

    export function GetSites() {
        return WebAPICall('Sites', HTTPType.Get);
    }

    export function AddSites(data) {
        return WebAPICall('Sites', HTTPType.Post, data);
    }

    export function DeleteSites(data) {
        return WebAPICall('Sites', HTTPType.Delete, data);
    }

    export function GetJobs(data) {
        return WebAPICall('Jobs', HTTPType.Get, data);
    }

    export function AddJobs(data) {
        return WebAPICall('Jobs', HTTPType.Post, data);
    }

    export function DeleteJobs(data) {
        return WebAPICall('Jobs', HTTPType.Delete, data);
    }

    export function GetWorkOrders() {
        return WebAPICall('WorkOrders', HTTPType.Get);
    }

    export function UpdateWorkOrder(data) {
        return WebAPICall('WorkOrders', HTTPType.Post, data);
    }

    export function DeleteWorkOrder(data) {
        return WebAPICall('WorkOrders', HTTPType.Delete, data);
    }

    export function GetManageDevices() {
        return WebAPICall('ManageDevices', HTTPType.Get);
    }
    
    export function InsertManageDevices(data) {
        return WebAPICall('ManageDevices', HTTPType.Post, data);
    }

    export function DeleteManageDevices(data) {
        return WebAPICall('ManageDevices', HTTPType.Delete, data);
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