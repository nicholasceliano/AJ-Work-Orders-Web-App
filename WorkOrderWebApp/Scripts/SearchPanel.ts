module SearchPanel {
    export function Show() {
        var woSearch = $('#workOrderSearch'),
            header = woSearch.siblings('div'),
            headerText = woSearch.children('h3').children('t'),
            panel = woSearch.children('div:first');

        woSearch.accordion({
            icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" }
        });

        //setup Search Panel
        headerText.text(Msg.Search_Title);
        panel.html(BuildSearchPanel());
        $("#txtDateFrom").datepicker({
            minDate: viewModel.oldestSubmitDate,
            maxDate: 0,
            onSelect: function (selected, event) {
                var toDt = $("#txtDateTo");
                if (new Date(toDt.val()) < new Date(selected))
                    toDt.val('');
                toDt.datepicker('destroy').datepicker({
                    minDate: selected,
                    maxDate: 0
                });
            }
        });
    }

    export function Toggle() {
        var woSearch = $('#workOrderSearch'),
            header = woSearch.siblings('div'),
            headerIcon = woSearch.children('h3').children('span'),
            panel = woSearch.children('div:first');
        
        //toggle header +/- button
        if (panel.is(':visible'))
            headerIcon.removeClass('ui-accordion-header-icon ui-icon ui-icon-minus').addClass('ui-accordion-header-icon ui-icon ui-icon-plus');
        else
            headerIcon.removeClass('ui-accordion-header-icon ui-icon ui-icon-plus').addClass('ui-accordion-header-icon ui-icon ui-icon-minus')
        
        //toggle header visibility
        panel.slideToggle(500, 'swing');
    }

    export function Search() {
        //filter results based on the selections
        var cSite = $('#selSite').val(),
            cSubBy = $('#selSubBy').val(),
            cSubDateFrom = $('#txtDateFrom').val(),
            cSubDateTo = $('#txtDateTo').val(),
            cStatus = $('#selStatus').val(),
            filteredWOList = new Array<WorkOrderModeling.WorkOrderModel>();
        var searchCriteriaSelected: boolean = cSite.length > 0 || cSubBy.length > 0 || cStatus.length > 0 || (cSubDateFrom.length > 0 && cSubDateTo.length > 0);
        
        $(viewModel.wo.allWorkOrders()).each(function (i, e: any) {
            if (searchCriteriaSelected) {        
                if (cSite) {
                    if (!(e.Site() == cSite))
                        return;
                }

                if (cSubBy) {
                    if (!(e.SubmittedBy() == cSubBy))
                        return;
                }

                if (cSubDateFrom.length > 0 && cSubDateTo.length > 0) {
                    if (!((new Date(e.SubmittedDate()) > new Date(cSubDateFrom)) && (new Date(e.SubmittedDate()) < new Date(cSubDateTo))))
                        return;
                }

                if (cStatus) {
                    if (!((e.Reviewed() == cStatus) || (e.Reviewed() == null && cStatus == "null")))
                        return;
                }
            } 
            filteredWOList.push(e);
        });

        viewModel.wo.alterWorkOrdersView(filteredWOList);
        PageData.Sort();
    }

    export function SearchFilters(data): WorkOrderSearchList {
        var list: WorkOrderSearchList = new WorkOrderSearchList();

        $(data.allWorkOrders()).each(function (i: number, d) {
            if (!Formatting.ContainsObject(d.Site(), list.sites))
                list.sites.push(d.Site());

            if (!Formatting.ContainsObject(d.SubmittedBy(), list.subBy))
                list.subBy.push(d.SubmittedBy());

            list.subDtMin = Formatting.CompareForLowestDate(new Date(list.subDtMin), d.SubmittedDate());
        });
        return list;
    }

    export class WorkOrderSearchList {
        public sites: Array<string> = [];
        public subBy: Array<string> = [];
        public subDtMin: string = Formatting.TodaysDateTime(true);
    }

    export function Clear() {
        //Clear All Search Criteria
        $('#selSite').val($("#selSite option:first").val());
        $('#selSubBy').val($("#selSubBy option:first").val());
        $('#txtDateFrom').val('');
        $('#txtDateTo').val('');
        $('#selStatus').val($("#selStatus option:first").val());
    }

    function BuildSearchPanel():string {
        var html;
        html = '<table id="searchPanel"><tr>';
        html += '<td><span>Site: </span><select id="selSite"><option></option>';
            $(viewModel.sites).each(function(i,e) { html += '<option value="' + e + '">' + e + '</option>'; });
        html += '</select></td > ';
        html += '<td><span>Assigned To: </span><select id="selSubBy"><option></option>';
            $(viewModel.submittedBy).each(function(i,e) { html += '<option value="' + e + '">' + e + '</option>'; });
        html += '</select></td>';
        html += '<td><div><span>Assigned Date: </span></div><table><tr><td>From:</td><td><input id="txtDateFrom" type="textbox" readonly="true" /></td></tr><tr><td>To:</td><td><input id="txtDateTo" type="textbox" readonly="true" /></td></tr></table></td>';
        html += '<td><span>Status: </span><select id="selStatus">';
        html += '<option></option>';
        html += '<option value="1">Approved</option>';
        html += '<option value="0">Rejected</option>';
        html += '<option value="null">Not Reviewed</option>';
        html += '</select></td >';
        html += '<td><input id="search" type="button" value="Search" onclick="SearchPanel.Search();" /><input id="clear" type="button" value="Clear" onclick="SearchPanel.Clear();" /></td>';
        html += '</tr></table>';
        return html;
    }
} 