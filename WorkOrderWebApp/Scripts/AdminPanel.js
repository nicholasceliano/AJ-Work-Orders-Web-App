var AdminPanel;
(function (AdminPanel) {
    function LoadTooltips() {
        $('input[type=checkbox]').tooltip({
            content: Msg.Admin_Tooltip_ToggleDisabled
        });
    }
    AdminPanel.LoadTooltips = LoadTooltips;
    function AddRecord() {
        //add to view model
        var e = event.srcElement || event.target, inputVal, inputElement;
        $($(e).parent().parent().children()).each(function (i, e2) {
            if (inputElement == undefined || inputElement.length == 0) {
                inputElement = $(e2).children('input');
                if (inputElement.length > 0)
                    inputVal = $(inputElement).val();
            }
        });
        if (inputVal.length > 0) {
            var newRefDataRecord = new ReferenceDataModeling.ReferenceDataModel();
            var maxID = 0, save = true;
            $(PageData.GetvmInstance().allReferenceData()).each(function (i, e2) {
                if (e2.Value().toLowerCase() == inputVal.trim().toLowerCase()) {
                    DialogBox.ReferenceDataError(inputElement, Msg.Admin_Err_AlreadyExists_Title, Msg.Admin_Err_RefData_AlreadyExists_Msg);
                    save = false;
                }
                if (e2.ID() > maxID)
                    maxID = e2.ID();
            });
            if (save) {
                newRefDataRecord.ID(maxID + 1);
                newRefDataRecord.Value(inputVal);
                newRefDataRecord.Enabled(true);
                //Save
                var refName = PageData.GetvmInstance().referenceName(), dataVal = {
                    ID: newRefDataRecord.ID(),
                    Value: newRefDataRecord.Value()
                };
                if (refName == 'sites')
                    JSONCalls.AddSites(dataVal);
                else if (refName == 'devices')
                    JSONCalls.AddDevices(dataVal);
                else if (refName == 'users')
                    JSONCalls.AddUserName(dataVal);
                PageData.GetvmInstance().addReferenceDataRecord(newRefDataRecord);
            }
        }
        else
            DialogBox.ReferenceDataError(inputElement, Msg.Admin_Err_RefData_EnterVal_Title, Msg.Admin_Err_RefData_EnterVal_Msg);
    }
    AdminPanel.AddRecord = AddRecord;
    function DeleteRecord(d) {
        //Disable in database
        var refName = PageData.GetvmInstance().referenceName();
        DialogBox.DisableReferenceDataDialog(d, refName);
    }
    AdminPanel.DeleteRecord = DeleteRecord;
    function ShowDisabledRefData(dataList) {
        if (dataList == 'sites')
            viewModel.sites.viewDisabledData() ? viewModel.sites.viewDisabledData(false) : viewModel.sites.viewDisabledData(true);
        else if (dataList == 'jobs')
            viewModel.jobs.viewDisabledData() ? viewModel.jobs.viewDisabledData(false) : viewModel.jobs.viewDisabledData(true);
        else if (dataList == 'devices')
            viewModel.devices.viewDisabledData() ? viewModel.devices.viewDisabledData(false) : viewModel.devices.viewDisabledData(true);
        else if (dataList == 'users')
            viewModel.users.viewDisabledData() ? viewModel.users.viewDisabledData(false) : viewModel.users.viewDisabledData(true);
    }
    AdminPanel.ShowDisabledRefData = ShowDisabledRefData;
    function PopulateChildReferenceData(d, event, child) {
        if (child == 'jobs') {
            var jobs = new ReferenceDataModeling.ReferenceDataActions(JSONCalls.GetJobs(d.ID()));
            viewModel.jobs.clearReferenceData();
            $.each(jobs.allReferenceData(), function (i, e) {
                viewModel.jobs.allReferenceData.push(e);
            });
            $('#jobs .lblSubTitle').text('Selected Site: ' + d.Value());
            $('#jobs .hdnParentID').val(d.ID().toString()); //add hidden variable
            $('#jobs .addRow').removeAttr('style');
            //Parent Table Style modifications
            $('#sites .ReferenceParentCell').each(function (i, e) {
                $(e).attr('style', 'font-weight:normal');
            });
            $(event.currentTarget).attr('style', 'font-weight:bold');
        }
    }
    AdminPanel.PopulateChildReferenceData = PopulateChildReferenceData;
})(AdminPanel || (AdminPanel = {}));
//# sourceMappingURL=AdminPanel.js.map