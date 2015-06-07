module DialogBox {
    export function ShowWorkOrder(workOrder: WorkOrderModeling.WorkOrderModel) {
        $('#workOrderDialog')
            .html(WorkOrderBuilder(workOrder))
            .dialog({
                buttons: [
                    {
                        id: 'dialogBtnDelete',
                        text: "Delete",
                        disabled: workOrder.Reviewed() == null ? false : true,
                        click: function () {
                            //Remove from page
                            $(viewModel.wo.allWorkOrders()).each(function (i, e: any) {
                                if (e.ID() == workOrder.ID()) {
                                    viewModel.wo.allWorkOrders.splice(i, 1);
                                    return false;
                                }
                            });

                            JSONCalls.DeleteWorkOrder(workOrder.ID());             
                            RebindSortPage(true);
                            $(this).dialog("close");
                        }
                    },
                    {
                        text: "Edit",
                        disabled: workOrder.Reviewed() == null || workOrder.Reviewed() == false ? false : true,
                        click: function () {
                            $('#workOrderDialog')
                                .html(WorkOrderBuilder(workOrder, true))
                                .dialog({
                                buttons: [
                                    {
                                        text: "Cancel Edit",
                                        click: function () {
                                            ShowWorkOrder(workOrder);   
                                        }
                                    },
                                    {
                                        text: "Save Changes",
                                        click: function () {
                                            SaveWorkOrder(this, true, workOrder);
                                        }
                                    }
                                ],
                                title: 'Edit Work Order #' + workOrder.ID().toString(),
                                resizable: false,
                                draggable: false,
                                modal: true,
                                width: "600px"
                            }).dialog('open');
                        }
                    },
                    {
                        text: "Reject",
                        disabled: workOrder.Reviewed() == true ? true : false,
                        click: function () {
                            workOrder.Reviewed(false);
                            workOrder.LastUpdatedBy(sessionUserName);
                            workOrder.LastUpdatedDate(Formatting.TodaysDateTime());

                            JSONCalls.UpdateWorkOrder({
                                ID: workOrder.ID(),
                                Reviewed: workOrder.Reviewed(),
                                LastUpdatedBy: sessionUserID
                            });
                            $(this).dialog("close");
                        }
                    },
                    {
                        id: "btnDialogAccept",
                        text: "Approve",
                        disabled: workOrder.Reviewed() == true ? true : false,
                        click: function () {
                            workOrder.Reviewed(true);
                            workOrder.LastUpdatedBy(sessionUserName);
                            workOrder.LastUpdatedDate(Formatting.TodaysDateTime());

                            JSONCalls.UpdateWorkOrder({
                                ID: workOrder.ID(),
                                Reviewed: workOrder.Reviewed(),
                                LastUpdatedBy: sessionUserID
                            });
                            $(this).dialog("close");
                        }
                    },
                    {
                        text: "Ok",
                        disabled: workOrder.Reviewed() == true ? false : true,
                        click: function () {
                            $(this).dialog("close");
                        }
                    }
                ],
                title: "Work Order #" + workOrder.ID().toString(),
                resizable: false,
                draggable: false,
                modal: true,
                width: "600px"
            })
            .dialog('open');
        $('#btnDialogAccept').focus(); //highlights 'Accept' button
    }

    export function ShowManageDevice(device: ManageDevicesModeling.ManageDevicesModel) {
        $('#manageDevicesDialog')
            .html(ManageDevicesBuilder(device))
            .dialog({
            buttons: [
                {
                    id: 'dialogBtnDelete',
                    text: "Delete",
                    click: function () {
                        var parentDialog = this;
                        ShowDevicesErrorPopUp(Msg.Delete_Title, Msg.Delete_Msg, [
                            {
                                text: "No",
                                click: function () {
                                    $(this).dialog("close");
                                }
                            },
                            {
                                text: "Yes",
                                click: function () {
                                    var secondParent = this,
                                        deviceCtForUser = 0,
                                        delDevice = true;

                                    $(viewModel.md.allDevices()).each(function (i, e: any) {
                                        if (e.UserID() == device.UserID())
                                            deviceCtForUser++;
                                    });

                                    //Error checking to see if work order attached to device is pending    
                                    $($.parseJSON(JSONCalls.GetWorkOrders())).each(function (i, e: any) {
                                        if ((e.Reviewed == false || e.Reviewed == null) && (e.SubmittedByUserID == device.UserID() && deviceCtForUser <= 1)) {
                                            ShowDevicesErrorPopUp(Msg.ManageDevice_ErrPendingWorkOrders_Title, Msg.ManageDevice_ErrPendingWorkOrders_Msg,
                                                [{
                                                    text: "Ok",
                                                    click: function () {
                                                        $(secondParent).dialog("close");
                                                        $(this).dialog("close");
                                                    }
                                                }]);
                                            delDevice = false;
                                            return false;
                                        }
                                    });

                                    if (delDevice) {
                                        JSONCalls.DeleteManageDevices(device.ID());
                                        viewModel.md.allDevices.remove(device);
                                        $(secondParent).dialog("close");
                                        $(parentDialog).dialog("close");
                                    }
                                    return false;
                                }
                            }
                        ]);
                    }
                },
                {
                    text: "Edit",
                    click: function () {
                        $(this)
                            .html(ManageDevicesBuilder(device, true))
                            .dialog({
                            buttons: [
                                {
                                    text: "Cancel",
                                    click: function () {
                                        DialogBox.ShowManageDevice(device);//reverts back to previous page and removes edits
                                    }
                                },
                                {
                                    text: "Save",
                                    click: function () {
                                        SaveDevice(this, true, device);
                                    }
                                }
                            ]
                        });
                    }
                },
                {
                    id: "btnDialogOk",
                    text: "Ok",
                    click: function () { $(this).dialog("close"); }
                }
            ],
            title: device.UserName() + "'s " + device.DeviceName(),
            resizable: false,
            draggable: false,
            modal: true,
            width: "400px"
        })
            .dialog('open');
        $('#btnDialogOk').focus(); //highlights 'Ok' button
    }

    export function ShowUser(user: UsersDataModeling.UsersDataModel) {
        $('#adminUserDialog')
            .html(UserBuilder(user))
            .dialog({
            buttons: [
                {
                    id: 'dialogBtnDelete',
                    text: "Deactivate",
                    disabled: user.Enabled() ? false : true,
                    click: function () {
                        var parentDialog = this;
                        ShowDevicesErrorPopUp(Msg.Delete_Title, Msg.Delete_Msg, [
                            {
                                text: "No",
                                click: function () {
                                    $(this).dialog("close");
                                }
                            },
                            {
                                text: "Yes",
                                click: function () {
                                    $(viewModel.users.allUsersData()).each(function (i, e: any) {
                                        if (e.ID() == user.ID()) {
                                            JSONCalls.DeleteUserName(e.ID());
                                            user.Enabled(false);
                                        }
                                    });

                                    $(this).dialog("close");
                                    $(parentDialog).dialog("close");
                                }
                            }
                        ]);
                    }
                },
                {
                    text: "Edit",
                    click: function () {
                        $(this)
                            .html(UserBuilder(user, true))
                            .dialog({
                            buttons: [
                                {
                                    text: "Cancel",
                                    click: function () {
                                        DialogBox.ShowUser(user);//reverts back to previous page and removes edits
                                    }
                                },
                                {
                                    text: "Save",
                                    click: function () {
                                        SaveUser(this, true, user);
                                    }
                                }
                            ]
                        });
                    }
                },
                {
                    id: "btnDialogOk",
                    text: "Ok",
                    click: function () { $(this).dialog("close"); }
                }
            ],
            title: user.FullName() + "'s Info",
            resizable: false,
            draggable: false,
            modal: true,
            width: "400px"
        })
            .dialog('open');
        $('#btnDialogOk').focus(); //highlights 'Ok' button

    }

    export function AddNewWorkOrder() {
        $('#workOrderDialog')
            .html(WorkOrderBuilder(null, true))
            .dialog({
            buttons: [
                {
                    text: "Cancel",
                    click: function () {
                        $(this).dialog("close");
                    }
                },
                {
                    text: "Save",
                    click: function () {
                        SaveWorkOrder(this, false);
                    }
                }
            ],
            title: Msg.WorkOrder_New_Title,
            resizable: false,
            draggable: false,
            modal: true,
            width: "600px"
        }).dialog('open');
    }

    export function AddNewUser() {
        $('#adminUserDialog')
            .html(UserBuilder(null, true))
            .dialog({
            buttons: [
                {
                    text: "Cancel",
                    click: function () {
                        $(this).dialog("close");
                    }
                },
                {
                    text: "Save",
                    click: function () {
                        SaveUser(this, false);
                    }
                }
            ],
            title: Msg.User_New_Title,
            resizable: false,
            draggable: false,
            modal: true,
            width: "400px"
        }).dialog('open');
    }

    export function AddNewManageDevice() {
        $('#manageDevicesDialog')
            .html(ManageDevicesBuilder(null, true))
            .dialog({
            buttons: [
                {
                    text: "Cancel",
                    click: function () {
                        $(this).dialog("close");
                    }
                },
                {
                    text: "Save",
                    click: function () {
                        SaveDevice(this, false);
                    }
                }
            ],
            title: Msg.ManageDevice_New_Title,
            resizable: false,
            draggable: false,
            modal: true,
            width: "400px"
        })
            .dialog('open');
    }

    export function DisableReferenceDataDialog(refData: ReferenceDataModeling.ReferenceDataModel, refName: string) {
        ShowDevicesErrorPopUp(Msg.Disable_Title, Msg.Disable_Msg, [
            {
                text: "No",
                click: function () {
                    $(this).dialog("close");
                }
            },
            {
                id: 'btnDialogYes',
                text: "Yes",
                click: function () {
                    var delRec = true;

                    if (refName == 'sites') {
                        $.each(new WorkOrderModeling.WorkOrderActions(JSONCalls.GetWorkOrders()).allWorkOrders(), function (i, e) {
                            if (e.Site() == refData.Value()) {
                                if (e.Reviewed() == null || e.Reviewed() == false) {
                                    delRec = false;
                                    ShowDevicesErrorPopUp(Msg.Admin_ErrDisableSite_Title, Msg.Admin_ErrDisableSite_Msg, [{
                                        text: "Ok",
                                        click: function () {
                                            $(this).dialog("close");
                                        }
                                    }]);
                                    return false;
                                }
                            }
                        });

                        if (delRec) {
                            JSONCalls.DeleteSites(refData.ID());
                            viewModel.jobs.clearReferenceData();//clear out jobs
                            $('#jobs .lblSubTitle').text(Msg.Admin_Job_BlankSite);
                            $('#jobs .addRow').attr('style', 'display:none;');
                        }
                    } else if (refName == 'jobs') {
                        $.each(new WorkOrderModeling.WorkOrderActions(JSONCalls.GetWorkOrders()).allWorkOrders(), function (i, e) {
                            if (e.Job() == refData.Value()) {
                                if (e.Reviewed() == null || e.Reviewed() == false) {
                                    delRec = false;
                                    ShowDevicesErrorPopUp(Msg.Admin_ErrDisableJob_Title, Msg.Admin_ErrDisableJob_Msg, [{
                                        text: "Ok",
                                        click: function () {
                                            $(this).dialog("close");
                                        }
                                    }]);
                                    return false;
                                }
                            }
                        });

                        if (delRec)
                            JSONCalls.DeleteJobs(refData.ID());
                    }
                    else if (refName == 'devices') {
                        $.each(new ManageDevicesModeling.ManageDevicesActions(JSONCalls.GetManageDevices()).allDevices(), function (i, e) {
                            if (e.DeviceName() == refData.Value()) {
                                delRec = false;
                                ShowDevicesErrorPopUp(Msg.Admin_ErrDisableDevice_Title, Msg.Admin_ErrDisableDevice_Msg, [{
                                    text: "Ok",
                                    click: function () {
                                        $(this).dialog("close");
                                    }
                                }]);
                                return false;
                            }
                        });

                        if (delRec)
                            JSONCalls.DeleteDevices(refData.ID());
                    }
                    else if (refName == 'users')
                        JSONCalls.DeleteUserName(refData.ID());

                    if (delRec)
                        refData.Enabled(false);

                    $(this).dialog("close");
                }
            }
        ], '.disableReferenceDataDialog');

        $('#btnDialogYes').focus(); //highlights 'Yes' button   
    }

    export function AddReferenceJobDialog() {
        $('.disableReferenceDataDialog')
            .html(RefJobBuilder())
            .dialog({
            buttons: [
                {
                    text: "Cancel",
                    click: function () {
                        $(this).dialog("close");
                    }
                },
                {
                    id: 'btnDialogAdd',
                    text: "Add",
                    click: function () {
                        var siteID = $('#jobs .hdnParentID').val(),
                            jobNumber = $('#txtJobNumber').val(),
                            jobName = $('#txtJobName').val(),
                            errCt = 0;

                        //Error Checking
                        if (jobName.length == 0 || jobNumber.length == 0) {
                            $('#lblAddRefJobError').text(Msg.Err_BlankField);
                            errCt++;
                            return false;
                        }

                        //Check if job number exists already
                        var jobs = new ReferenceDataModeling.ReferenceDataActions(JSONCalls.GetJobs(null));
                        $.each(jobs.allReferenceData(), function (i, e) {
                            var jobNum = e.Value().split('-')[0];

                            if (jobNumber.trim() == jobNum.trim()) {
                                $('#lblAddRefJobError').text(Msg.Admin_Err_Job_AlreadyExists_Msg);
                                errCt++;
                                return false;
                            }
                        });

                        if (errCt > 0)
                            return false;

                        //Add to database
                        JSONCalls.AddJobs({
                            SiteID: siteID,
                            JobNumber: jobNumber,
                            Value: jobName,
                            Enabled: true
                        });

                        //Add to Page
                        var newRec = new ReferenceDataModeling.ReferenceDataModel();
                        newRec.ID(Formatting.ProduceNextID(viewModel.jobs.allReferenceData()))
                        newRec.Value(jobNumber + ' - ' + jobName);
                        newRec.Enabled(true);
                        viewModel.jobs.allReferenceData.push(newRec);
                        
                        $(this).dialog("close");
                    }
                }
            ],
            title: "Add Job",
            resizable: false,
            draggable: false,
            modal: true,
            width: "300px"
        }).dialog('open');
    }

    export function ReferenceDataError(inputElement, title: string, errText: string) {
        ShowDevicesErrorPopUp(title, errText, [{
                id: 'btnDialogOk',
                text: "Ok",
                click: function () {
                    $(this).dialog("close");
                    $(inputElement).focus().select();
                }
        }], '.disableReferenceDataDialog');

        $('#btnDialogOk').focus(); //highlights 'Ok' button 
    }

    export function ShowDevicesErrorPopUp(title: string, errText: string, buttons, elementIdentifier: string = '#diaMsg') {
        $(elementIdentifier)
            .html(errText)
            .dialog({
            buttons: buttons,
            title: title,
            resizable: false,
            draggable: false,
            modal: true,
            width: "300px"
        }).dialog('open');
    }

    function RefJobBuilder():string {
        var html = "<table>";
        html = html + "<tr><td class='fieldLabel'>Job Number:</td><td><input id='txtJobNumber' type='text' /></td></tr>";
        html = html + "<tr><td class='fieldLabel'>Job Name:</td><td><input id='txtJobName' type='text' /></td></tr>";
        html = html + "<tr><td colspan='2'><br /><span id='lblAddRefJobError' class='ErrorText'></span></td></tr>";
        html = html + "</table>";
        return html;
    }

    function WorkOrderBuilder(workOrder: WorkOrderModeling.WorkOrderModel, edit = false): string {
        var siteRawData = JSONCalls.GetSites();
        if (edit && workOrder != null) {//find Site ID
            var siteID = 'null';
            $($.parseJSON(siteRawData)).each(function (i, e: any) {
                if (workOrder.Site() == e.Value) {
                    siteID = e.ID;
                    return false;
                }
            });
        }
        return HTMLDictBuilder([{ key: 'Site:', val: (edit == false ? '<span>' + workOrder.Site() + '</span>' : BuildReferenceDataDropdownAndSelectValue('selNewSite" onchange="DialogBox.FilterNewWorkOrderJobs()', siteRawData,(workOrder == null ? null : workOrder.Site()), true)) },
            { key: 'Job:', val: (edit == false ? '<span>' + workOrder.Job() + '</span>' : (workOrder == null ? '<select id="selNewJobs"><option value="null">' + Msg.Dropdown_Job_Blank + '</option></select>' : BuildReferenceDataDropdownAndSelectValue('selNewJobs', JSONCalls.GetJobs(siteID),(workOrder == null ? null : workOrder.Job())))) },
            { key: 'Assigned To:', val: (edit == false ? '<span>' + workOrder.SubmittedBy() + '</span>' : BuildUsersDataDropdownAndSelectValue('selNewUserName', JSONCalls.GetAllUserNames(),(workOrder == null ? null : workOrder.SubmittedByUserID()), true)) },
            { key: 'Assigned Date:', val: (edit == false ? '<span>' + workOrder.SubmittedDate() + '</span>' : (workOrder == null ? '' : workOrder.SubmittedDate())) },
            { key: 'Reg Hours:', val: (edit == false ? '<span>' + workOrder.RegHoursWorkedFrmtd() + '</span>' : BuildReferenceDataDropdownAndSelectValue('selRegHours', Formatting.BuildTimeJson(),(workOrder == null ? null : workOrder.RegHoursWorkedFrmtd()), true)) },
            { key: 'Overtime Hours:', val: (edit == false ? '<span>' + workOrder.OvertimeHoursWorkedFrmtd() + '</span>' : BuildReferenceDataDropdownAndSelectValue('selOvertimeHours', Formatting.BuildTimeJson(),(workOrder == null ? null : workOrder.OvertimeHoursWorkedFrmtd()), true)) },
            { key: 'Subject:', val: (edit == false ? '<span>' + workOrder.Subject() + '</span>' : '<input id="txtNewSubject" type="text" style="width:415px;" value="' + (workOrder == null ? '' : workOrder.Subject()) + '" />') },
            { key: 'Description:', val: (edit == false ? '<span>' + workOrder.Description() + '</span>' : '<textarea id="txtNewDesc" style="width:415px;height:100px;resize:none;padding:0;margin:0;">' + (workOrder == null ? '' : workOrder.Description()) + '</textarea>') },
            { key: 'Last Updated By:', val: (edit == false ? '<span>' + workOrder.LastUpdatedBy() + '</span>' : (workOrder == null ? '' : workOrder.LastUpdatedBy())) },
            { key: 'Last Updated Date:', val: (edit == false ? '<span>' + workOrder.LastUpdatedDate() + '</span>' : (workOrder == null ? '' : workOrder.LastUpdatedDate())) }]);
    }

    function SaveWorkOrder(object, update: boolean, workOrder: WorkOrderModeling.WorkOrderModel = null) {
        var save = true,
            errMsg = '',
            siteVal = $('#selNewSite').val(),
            siteText = $('#selNewSite option[value="' + $('#selNewSite').val() + '"]').text(),
            jobVal = $('#selNewJobs').val(),
            jobText = $('#selNewJobs option[value="' + $('#selNewJobs').val() + '"]').text(),
            subByVal = $('#selNewUserName').val(),
            subByText = $('#selNewUserName option[value="' + $('#selNewUserName').val() + '"]').text(),
            regHrs = $('#selRegHours').val(),
            otHrs = $('#selOvertimeHours').val(),
            subjText = $('#txtNewSubject').val(),
            descText = $('#txtNewDesc').val();
        //do error checking
        if (siteVal == 'null') {
            errMsg = 'Must select Site';
            save = false;
        } else if (jobVal == null) {
            errMsg = 'Must select Job';
            save = false;
        } else if (subjText.trim().length == 0) {
            errMsg = 'Must enter Subject';
            save = false;
        }

        if (!save) {
            ShowDevicesErrorPopUp('Error', errMsg,
                [{
                    text: "Ok",
                    click: function () {
                        $(this).dialog("close");
                    }
                }]);
            return false;
        } else {
            if (update) {
                //Update page values
                workOrder.Site(siteText);
                workOrder.Job(jobText);
                workOrder.SubmittedByFirstName(subByText)
                workOrder.SubmittedByLastName('');
                workOrder.RegHoursWorked(regHrs);
                workOrder.OvertimeHoursWorked(otHrs);
                workOrder.Subject(subjText);
                workOrder.Description(descText);
                workOrder.LastUpdatedBy(sessionUserName);
                workOrder.LastUpdatedDate(Formatting.TodaysDateTime());
                            
                //add to database
                JSONCalls.UpdateWorkOrder({
                    ID: workOrder.ID(),
                    JobID: jobVal,
                    SubmittedUserID: subByVal,
                    RegWorkHours: regHrs,
                    OvertimeWorkHours: otHrs,
                    Subject: subjText,
                    Description: descText,
                    LastUpdatedBy: sessionUserID
                });
            } else {
                var newWO = new WorkOrderModeling.WorkOrderModel();
                newWO.ID(Formatting.ProduceNextID(viewModel.wo.allWorkOrders()));
                newWO.Site(siteText);
                newWO.Job(jobText);
                newWO.SubmittedByFirstName(subByText);//Hack just for data view...Put full name in FirstName slot
                newWO.SubmittedByLastName('');//And a blank value in LastName slot
                newWO.SubmittedDate(Formatting.TodaysDateTime());
                newWO.RegHoursWorked(regHrs);
                newWO.OvertimeHoursWorked(otHrs);
                newWO.Subject(subjText);
                newWO.Description(descText);
                newWO.LastUpdatedBy(sessionUserName);
                newWO.LastUpdatedDate(Formatting.TodaysDateTime());
                viewModel.wo.allWorkOrders.push(newWO);
                RebindSortPage(true);//Rebind and Sort Properly
                                                        
                //add to database
                JSONCalls.UpdateWorkOrder({
                    JobID: jobVal,
                    SubmittedUserID: subByVal,
                    RegWorkHours: regHrs,
                    OvertimeWorkHours: otHrs,
                    Subject: subjText,
                    Description: descText,
                    LastUpdatedBy: sessionUserID
                });
            }
            $(object).dialog("close");
        }
    }

    function UserBuilder(user: UsersDataModeling.UsersDataModel, edit = false): string {
        return HTMLDictBuilder([{ key: 'First Name:', val: (edit == false ? '<span>' + user.FirstName() + '</span>' : '<input id="txtFirstName" type="text" value="' + (user == null ? '' : user.FirstName()) + '" />') },
            { key: 'Last Name:', val: (edit == false ? '<span>' + user.LastName() + '</span>' : '<input id="txtLastName" type="text" value="' + (user == null ? '' : user.LastName()) + '" />') },
            { key: 'Email Address:', val: (edit == false ? '<span>' + user.Email() + '</span>' : '<input id="txtEmail" type="email" value="' + (user == null ? '' : user.Email()) + '" />') },
            { key: 'Web User?:', val: (edit == false ? '<span>' + user.WebUserText() + '</span>' : '<select id="selWebUser"><option value="1" ' + (user == null ? '' : (user.WebUser() == true ? 'selected="selected"' : '')) + '>Yes</option><option value="0" ' + (user == null ? 'selected="selected"' : (user.WebUser() == false ? 'selected="selected"' : '')) + '>No</option></select>') },
            { key: 'Admin:', val: (edit == false ? '<span>' + user.AdminText() + '</span>' : '<select id="selAdmin"><option value="1" ' + (user == null ? '' : (user.Admin() == true ? 'selected="selected"' : '')) + '>Yes</option><option value="0" ' + (user == null ? 'selected="selected"' : (user.Admin() == false ? 'selected="selected"' : '')) + '>No</option></select>') },
            { key: 'Active:', val: (edit == false ? '<span>' + user.EnabledText() + '</span>' : '<select id="selActive"><option value="1" ' + (user == null ? 'selected="selected"' : (user.Enabled() == true ? 'selected="selected"' : '')) + '>Yes</option><option value="0"' + (user == null ? '' : (user.Enabled() == false ? 'selected="selected"' : '')) + '>No</option></select>') }]);
    }

    function SaveUser(object, update: boolean, user: UsersDataModeling.UsersDataModel = null) {
        var save = true,
            errMsg = '',
            firstName = $('#txtFirstName').val(),
            lastName = $('#txtLastName').val(),
            email = $('#txtEmail').val(),
            webUser = $('#selWebUser').val() == 1 ? true : false,
            admin = $('#selAdmin').val() == 1 ? true : false,
            active = $('#selActive').val() == 1 ? true : false;
        //error checking
        if (firstName.trim().length == 0 || lastName.trim().length == 0 || email.trim().length == 0) {
            errMsg = Msg.Err_BlankField;
            save = false;
        } else if (!Formatting.EmailValidator(email)) {
            errMsg = Msg.Err_Invalid_Email;
            save = false;
        } else {
            $(viewModel.users.allUsersData()).each(function (i, e: any) {
                if (e.Email() == email) {
                    errMsg = Msg.Err_UserAlreadyAssocEmail;
                    if (update) {
                        if (user.ID == e.ID()) {
                            save = false;
                            return false;
                        }
                    } else {
                        save = false;
                        return false;
                    }
                }
            });
        }

        if (!save) {
            ShowDevicesErrorPopUp(Msg.Err_Title, errMsg, [{
                text: "Ok",
                click: function () {
                    $(this).dialog("close");
                }
            }]);
            return false;
        } else {
            if (update) {
                user.FirstName(firstName);
                user.LastName(lastName);
                user.Email(email);
                user.WebUser(webUser);
                user.Admin(admin);
                user.Enabled(active);

                //Save this to Database
                JSONCalls.AddUserName({
                    ID: user.ID(),
                    FirstName: firstName,
                    LastName: lastName,
                    EmailAddress: email,
                    WebUser: webUser,
                    Admin: admin,
                    Enabled: active
                });
            } else {
                //add to page list
                var newUsr = new UsersDataModeling.UsersDataModel();
                newUsr.ID(Formatting.ProduceNextID(viewModel.users.allUsersData()));
                newUsr.FirstName(firstName);
                newUsr.LastName(lastName);
                newUsr.Email(email);
                newUsr.WebUser(webUser);
                newUsr.Admin(admin);
                newUsr.Enabled(active);
                viewModel.users.allUsersData.push(newUsr);
                RebindSortPage(false);//Rebind and Sort Properly
                            
                //add to database
                JSONCalls.AddUserName({
                    FirstName: firstName,
                    LastName: lastName,
                    EmailAddress: email,
                    WebUser: webUser,
                    Admin: admin,
                    Enabled: active
                });
            }
            $(object).dialog("close");
        }
    }

    function ManageDevicesBuilder(device: ManageDevicesModeling.ManageDevicesModel, edit = false): string {
        return HTMLDictBuilder([{ key: 'User:', val: (edit ? BuildUsersDataDropdownAndSelectValue('selUserName', JSONCalls.GetAllUserNames(),(device == null ? null : device.UserID())) : device.UserName()) },
            { key: 'Device Name:', val: (edit ? BuildReferenceDataDropdownAndSelectValue('selDeviceName', JSONCalls.GetAllDevicesNames(),(device == null ? null : device.DeviceName())) : device.DeviceName()) },
            { key: 'Device GUID:', val: (edit ? '<input id="txtGUID" type="text" style="width:225px;" value="' + (device == null ? '' : device.GUID()) + '" />' : device.GUID()) },
            { key: 'Last Updated By:', val: (device == null ? '' : device.LastUpdatedBy()) },
            { key: 'Last Updated Date:', val: (device == null ? '' : device.LastUpdatedDate()) }]);
    }

    function HTMLDictBuilder(keyvalDict) {
        var html: string;
        html = '<table>';
        $.each(keyvalDict,function (i, e) {
            html = html + '<tr><td class="fieldLabel">' + e.key + '</td><td>' + e.val + '</td></tr>';
        });
        html = html + '</table><div id="diaMsg"></div>';
        return html;
    }

    function SaveDevice(object, update: boolean, device: ManageDevicesModeling.ManageDevicesModel = null) {
        var save: boolean = true,
            GUIDVal = $('#txtGUID').val(),
            userNameVal = $('#selUserName').val(),
            userNameText = $('#selUserName option[value="' + $('#selUserName').val() + '"]').text(),
            deviceNameVal = $('#selDeviceName').val(),
            deviceNameText = $('#selDeviceName option[value="' + $('#selDeviceName').val() + '"]').text();

        if (GUIDVal.length == 0) {
            ShowDevicesErrorPopUp(Msg.Err_Title, Msg.Err_BlankField,
                [{
                    text: "Ok",
                    click: function () {
                        $(this).dialog("close");
                        $('#txtGUID').focus();
                    }
                }]);
            save = false;
        }

        $(viewModel.md.allDevices()).each(function (i, e: any) {
            if ((e.UserID() == userNameVal && e.DeviceName() == deviceNameText && !update) || (e.DeviceName() == deviceNameText && (e.GUID() == GUIDVal && (update ? device.GUID() != GUIDVal : true)))) {
                ShowDevicesErrorPopUp(Msg.Err_Title, Msg.ManageDevice_ErrComboAlreadyExists,
                    [{
                        text: "Ok",
                        click: function () {
                            save = false;
                            $(this).dialog("close");
                        }
                    }]);
                save = false;
                return false;
            }
        });

        if (save) {
            if (update) {
                device.UserID(userNameVal);
                device.FirstName(userNameText);//Hack just for data view...Put full name in FirstName slot
                device.LastName('');//And a blank value in LastName slot
                device.DeviceName(deviceNameText);
                device.GUID(GUIDVal);
                device.LastUpdatedBy(sessionUserName);
                device.LastUpdatedDate(Formatting.TodaysDateTime());

                //Save this to Database
                JSONCalls.InsertManageDevices({
                    ID: device.ID(),
                    UserID: userNameVal,
                    DeviceID: deviceNameVal,
                    GUID: device.GUID(),
                    LastUpdateBy: sessionUserID
                });
            } else {
                var newRec = new ManageDevicesModeling.ManageDevicesModel()
                newRec.UserID(userNameVal);
                newRec.FirstName(userNameText);
                newRec.LastName('');
                newRec.DeviceName(deviceNameText);
                newRec.GUID(GUIDVal);
                newRec.LastUpdatedBy(sessionUserName);
                newRec.LastUpdatedDate(Formatting.TodaysDateTime());
                viewModel.md.allDevices.push(newRec);

                JSONCalls.InsertManageDevices({
                    ID: newRec.ID(),
                    UserID: userNameVal,
                    DeviceID: deviceNameVal,
                    GUID: newRec.GUID(),
                    LastUpdateBy: sessionUserID
                });
            }
            $(object).dialog('close');
        }
    }
    
    export function FilterNewWorkOrderJobs() {
        //Populate Jobs dropdown
        var parentVal = $('#selNewSite').val();

        $('#selNewJobs').find('option').remove();//clears all

        if (parentVal == 'null')
            $('#selNewJobs').append('<option value="null">' + Msg.Dropdown_Job_Blank + '</option>');

        $($.parseJSON(JSONCalls.GetJobs(parentVal))).each(function (i, e: any) {
            $('#selNewJobs').append('<option value="' + e.ID + '">' + e.Value + '</option>');
        });
    }

    function RebindSortPage(workOrderPage: boolean = false) {
        if (workOrderPage)
            SearchPanel.Search();

        $('#pageTable thead tr th').each(function (i, e) {
            var thID = $(e).attr('id'),
                childImg = $(e).children('img');

            if (childImg.length == 1) {
                var imgID = $(childImg).attr('id');
                if (imgID == 'sortAsc')
                    PageData.GetvmInstance().sort(thID, false);//sort Asc
                else
                    PageData.GetvmInstance().sort(thID, true);

                return false;
            }
        });
    }

    function BuildReferenceDataDropdownAndSelectValue(selectID: string, dataJSON:string, selectionValue: string, blankRow: boolean = false):string {
        var html = '<select id="' + selectID + '">';

        if (blankRow)
            html = html + '<option value="null"></option>';

        $($.parseJSON(dataJSON)).each(function (i, e:any) {
            html = html + '<option value="' + e.ID + '" ' + (selectionValue == e.Value ? 'selected="selected"' : '') + '>' + e.Value + '</option>';
        });
        html = html + '</select>';
        return html;
    }

    function BuildUsersDataDropdownAndSelectValue(selectID: string, dataJSON: string, selectionValue: number, deviceUsersOnly: boolean = false): string {
        var html = '<select id="' + selectID + '">',
            deviceUsers = null;

        if (deviceUsersOnly)
            deviceUsers = $.parseJSON(JSONCalls.GetManageDevices());

        $($.parseJSON(dataJSON)).each(function (i, e: any) {
            if (e.Enabled) {
                if (deviceUsers != null) {
                    $(deviceUsers).each(function (i2, e2: any) {
                        if (e.ID == e2.UserID) {
                            html = html + '<option value="' + e.ID + '" ' + (selectionValue == e.ID ? 'selected="selected"' : '') + '>' + e.FirstName + ' ' + e.LastName + '</option>';
                            return false;
                        }
                    });
                } else
                    html = html + '<option value="' + e.ID + '" ' + (selectionValue == e.ID ? 'selected="selected"' : '') + '>' + e.FirstName + ' ' + e.LastName + '</option>';
            }
        });

        html = html + '</select>';
        return html;
    }
}