module Formatting {

    export function TodaysDateTime(DateOnly?:boolean): string {
        var day = new Date().getDate(),
            month = new Date().getMonth() + 1,//zero based
            year = new Date().getFullYear(),
            hour = new Date().getHours(),
            minute = new Date().getMinutes().toString();
        var timeframe = hour > 12 ? 'PM' : 'AM';//
        hour = hour > 12 ? hour - 12 : hour,//Configure AM PM ^
        minute = parseInt(minute) < 10 ? '0' + minute : minute;
        var date = month + '/' + day + '/' + year,
            time = hour + ':' + minute + ' ' + timeframe;
        

        if (DateOnly)
            return date;
        else
            return date + ' ' + time;
    }

    export function HandlePossibleStringDBNull(value: any): string {
        if (value == null)
            return '';
        else
            return value;
    }

    export function FormatDate(val:string):Date {
        var d = new Date(val);
        return new Date(d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear());
    }

    export function FormatDateTime(val: string): string {
        if (val == null)
            return null;
        var day = new Date(val).getDate(),
            month = new Date(val).getMonth() + 1,//zero based
            year = new Date(val).getFullYear(),
            hour = new Date(val).getHours(),
            minute = new Date(val).getMinutes().toString();
        var timeframe = hour > 12 ? 'PM' : 'AM';//
        hour = hour > 12 ? hour - 12 : hour,//Configure AM PM ^
        minute = parseInt(minute) < 10 ? '0' + minute : minute;

        var date = month + '/' + day + '/' + year,
            time = hour + ':' + minute + ' ' + timeframe;

        return date + ' ' + time;
    }

    export function ContainsObject(obj, list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i] === obj)
                return true;
        }
        return false;
    }

    export function CompareForLowestDate(currLow, compareVal): string {
        if (new Date(compareVal.toString()) < new Date(currLow.toString()))
            return compareVal;
        else
            return currLow;
    }

    export function sortAsc(a, b) {
        return (a < b) ? -1 : ((a > b) ? 1 : 0)
    }

    export function sortDesc(a, b) {
        return (a > b) ? -1 : ((a < b) ? 1 : 0);
    }

    export function DropDownSelectionChange(e) {
        var sel = $(e.currentTarget);
        $(sel.children()).each(function (i,e:any) {
            if (sel.val() == $(e).val())
                $(e).attr('selected', 'selected');
        });
    }

    export function ConvertNumberToHours(num: number) {
        if (num == null || <any>num == 'null')
            return '';
        else {
            var wholeHours = num.toString().split('.')[0];
            var decHours = num.toString().split('.')[1];
            var minutes = '00';

            if (decHours == '5')
                minutes = '30';
        
            return wholeHours + ':' + minutes;
        }
    }

    export function BuildTimeJson(hours: number = 8) {
        var hoursArray = [];

        for (var i = 1; i <= hours; i = i + .5) {
            hoursArray.push({
                ID: i.toString(),
                Value: ConvertNumberToHours(i)
            });
        }
        return JSON.stringify(hoursArray);
    }

    export function EmailValidator(v: string) : boolean {
        var r = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        return (v.match(r) == null)? false : true;
    }

    export function ProduceNextID(dataList):number {
        var maxID = 0;
        $.each(dataList, function (i, e) {
            if (e.ID() > maxID)
                maxID = e.ID();
        });

        return maxID + 1;
    }
} 

module Msg {
    export var Admin_Err_AlreadyExists_Title: string = 'Record Already Exists';
    export var Admin_Err_Job_AlreadyExists_Msg: string = 'Error: Record with that Job Number already extists. It may be disabled';
    export var Admin_Err_RefData_AlreadyExists_Msg: string = 'Record with that value already exists. It may be disabled';
    export var Admin_Err_RefData_EnterVal_Title: string = 'Must Enter a Value';
    export var Admin_Err_RefData_EnterVal_Msg: string = 'Must enter a value to add to the list';
    export var Admin_ErrDisableSite_Title: string = 'Cannot Disable Site';
    export var Admin_ErrDisableJob_Title: string = 'Cannot Disable Job';
    export var Admin_ErrDisableDevice_Title: string = 'Cannot Disable Device';
    export var Admin_ErrDisableSite_Msg: string = 'Cannot disable Sites with outstanding Work Orders';
    export var Admin_ErrDisableJob_Msg: string = 'Cannot disable Jobs with outstanding Work Orders';
    export var Admin_ErrDisableDevice_Msg: string = 'Cannot disable Device which is currently attached to Users';
    export var Admin_Job_BlankSite: string = 'Select a Site to populate Jobs';
    export var Admin_Tooltip_ToggleDisabled: string = 'Toggle Enabled/All Records';
    export var Dropdown_Job_Blank: string = 'Select Site to populate Jobs';
    export var Delete_Msg: string = 'Are you sure you want to delete this record?';
    export var Disable_Msg: string = 'Are you sure you want to disable this record?<div id="diaMsg"></div>';
    export var Delete_Title: string = 'Are you sure?';
    export var Disable_Title: string = 'Are you sure?';
    export var Err_BlankField: string = 'Error: All fields must be filled out';
    export var Err_Invalid_Email: string = 'Error: Email address not valid';
    export var Err_Title: string = 'Error';
    export var Err_UserAlreadyAssocEmail: string = 'User is already associated to that Email address. Note that the user may be disabled';
    export var ManageDevice_ErrComboAlreadyExists: string = 'Record with that User/Device or Device/GUID combo already exists';
    export var ManageDevice_ErrPendingWorkOrders_Title: string = 'Cannot Delete Device';
    export var ManageDevice_ErrPendingWorkOrders_Msg: string = 'Record cannot be deleted. User has pending Work Orders.';
    export var ManageDevice_New_Title: string = 'Add New User-Device Pair';
    export var Search_Title: string = 'Search Work Orders';
    export var User_New_Title: string = 'Add New User';
    export var WorkOrder_New_Title: string = 'Add New Work Order';
}