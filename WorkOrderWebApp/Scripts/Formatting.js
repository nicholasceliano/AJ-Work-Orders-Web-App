var Formatting;
(function (Formatting) {
    function TodaysDateTime(DateOnly) {
        var day = new Date().getDate(), month = new Date().getMonth() + 1, year = new Date().getFullYear(), hour = new Date().getHours(), minute = new Date().getMinutes().toString();
        var timeframe = hour > 12 ? 'PM' : 'AM'; //
        hour = hour > 12 ? hour - 12 : hour, minute = parseInt(minute) < 10 ? '0' + minute : minute;
        var date = month + '/' + day + '/' + year, time = hour + ':' + minute + ' ' + timeframe;
        if (DateOnly)
            return date;
        else
            return date + ' ' + time;
    }
    Formatting.TodaysDateTime = TodaysDateTime;
    function HandlePossibleStringDBNull(value) {
        if (value == null)
            return '';
        else
            return value;
    }
    Formatting.HandlePossibleStringDBNull = HandlePossibleStringDBNull;
    function FormatDate(val) {
        var d = new Date(val);
        return new Date(d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear());
    }
    Formatting.FormatDate = FormatDate;
    function FormatDateTime(val) {
        if (val == null)
            return null;
        var day = new Date(val).getDate(), month = new Date(val).getMonth() + 1, year = new Date(val).getFullYear(), hour = new Date(val).getHours(), minute = new Date(val).getMinutes().toString();
        var timeframe = hour > 12 ? 'PM' : 'AM'; //
        hour = hour > 12 ? hour - 12 : hour, minute = parseInt(minute) < 10 ? '0' + minute : minute;
        var date = month + '/' + day + '/' + year, time = hour + ':' + minute + ' ' + timeframe;
        return date + ' ' + time;
    }
    Formatting.FormatDateTime = FormatDateTime;
    function ContainsObject(obj, list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i] === obj)
                return true;
        }
        return false;
    }
    Formatting.ContainsObject = ContainsObject;
    function CompareForLowestDate(currLow, compareVal) {
        if (new Date(compareVal.toString()) < new Date(currLow.toString()))
            return compareVal;
        else
            return currLow;
    }
    Formatting.CompareForLowestDate = CompareForLowestDate;
    function sortAsc(a, b) {
        return (a < b) ? -1 : ((a > b) ? 1 : 0);
    }
    Formatting.sortAsc = sortAsc;
    function sortDesc(a, b) {
        return (a > b) ? -1 : ((a < b) ? 1 : 0);
    }
    Formatting.sortDesc = sortDesc;
    function DropDownSelectionChange(e) {
        var sel = $(e.currentTarget);
        $(sel.children()).each(function (i, e) {
            if (sel.val() == $(e).val())
                $(e).attr('selected', 'selected');
        });
    }
    Formatting.DropDownSelectionChange = DropDownSelectionChange;
    function ConvertNumberToHours(num) {
        if (num == null || num == 'null')
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
    Formatting.ConvertNumberToHours = ConvertNumberToHours;
    function BuildTimeJson(hours) {
        if (hours === void 0) { hours = 8; }
        var hoursArray = [];
        for (var i = 1; i <= hours; i = i + .5) {
            hoursArray.push({
                ID: i.toString(),
                Value: ConvertNumberToHours(i)
            });
        }
        return JSON.stringify(hoursArray);
    }
    Formatting.BuildTimeJson = BuildTimeJson;
    function EmailValidator(v) {
        var r = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        return (v.match(r) == null) ? false : true;
    }
    Formatting.EmailValidator = EmailValidator;
    function ProduceNextID(dataList) {
        var maxID = 0;
        $.each(dataList, function (i, e) {
            if (e.ID() > maxID)
                maxID = e.ID();
        });
        return maxID + 1;
    }
    Formatting.ProduceNextID = ProduceNextID;
})(Formatting || (Formatting = {}));
var Msg;
(function (Msg) {
    Msg.Admin_Err_AlreadyExists_Title = 'Record Already Exists';
    Msg.Admin_Err_Job_AlreadyExists_Msg = 'Error: Record with that Job Number already extists. It may be disabled';
    Msg.Admin_Err_RefData_AlreadyExists_Msg = 'Record with that value already exists. It may be disabled';
    Msg.Admin_Err_RefData_EnterVal_Title = 'Must Enter a Value';
    Msg.Admin_Err_RefData_EnterVal_Msg = 'Must enter a value to add to the list';
    Msg.Admin_ErrDisableSite_Title = 'Cannot Disable Site';
    Msg.Admin_ErrDisableJob_Title = 'Cannot Disable Job';
    Msg.Admin_ErrDisableDevice_Title = 'Cannot Disable Device';
    Msg.Admin_ErrDisableSite_Msg = 'Cannot disable Sites with outstanding Work Orders';
    Msg.Admin_ErrDisableJob_Msg = 'Cannot disable Jobs with outstanding Work Orders';
    Msg.Admin_ErrDisableDevice_Msg = 'Cannot disable Device which is currently attached to Users';
    Msg.Admin_Job_BlankSite = 'Select a Site to populate Jobs';
    Msg.Admin_Tooltip_ToggleDisabled = 'Toggle Enabled/All Records';
    Msg.Dropdown_Job_Blank = 'Select Site to populate Jobs';
    Msg.Delete_Msg = 'Are you sure you want to delete this record?';
    Msg.Disable_Msg = 'Are you sure you want to disable this record?<div id="diaMsg"></div>';
    Msg.Delete_Title = 'Are you sure?';
    Msg.Disable_Title = 'Are you sure?';
    Msg.Err_BlankField = 'Error: All fields must be filled out';
    Msg.Err_Invalid_Email = 'Error: Email address not valid';
    Msg.Err_Title = 'Error';
    Msg.Err_UserAlreadyAssocEmail = 'User is already associated to that Email address. Note that the user may be disabled';
    Msg.ManageDevice_ErrComboAlreadyExists = 'Record with that User/Device or Device/GUID combo already exists';
    Msg.ManageDevice_ErrPendingWorkOrders_Title = 'Cannot Delete Device';
    Msg.ManageDevice_ErrPendingWorkOrders_Msg = 'Record cannot be deleted. User has pending Work Orders.';
    Msg.ManageDevice_New_Title = 'Add New User-Device Pair';
    Msg.Search_Title = 'Search Work Orders';
    Msg.User_New_Title = 'Add New User';
    Msg.WorkOrder_New_Title = 'Add New Work Order';
})(Msg || (Msg = {}));
//# sourceMappingURL=Formatting.js.map