AJWorkOrders Web App
===============================

**Objective**: Create an application for my family's small business which would replace the manual process of HVAC techs filling out Work orders by hand in the field and hand delivering them to the office on a weekly basis.

**Application Description**: This application was initiated along with the distribution of Android tablets to HVAAC field techs. The application has four tiers. The back end is a relational SQL database which ties in directly to the web app and is also exposed via web services. The middle-ware is written using C# and consists of the logic behind the Web App and a Web API which is exposed for use by the Android app. The Web App was developing implementing jQuery, jQuery-UI, Knockout.js, and TypeScript and is intended for an office manager as a place to review Work Orders and manage Android devices, access and application data. The last tier, the Android application(see https://github.com/nicholasceliano/AJWorkOrders-AndroidApp), serves the HVAC field techs and allows them to submit new work orders based on job site/hours works and also allows them to review and revise past work orders they've submitted which were either rejected by their manager or haven't been reviewed yet. The SQL database and .NET application both live on Azure.

**Conclusion**: This application was implemented a couple of months ago and has been in beta testing with a couple of the more tech savvy HVAC techs. From what I understand it seems to be working well but there's hesitation on the transition with some of the older HVAC techs. Overall I think the application was successfully developed to meet the requested need.

**Technologies Used**: MVC, Web API, C#, Android development, Java, Azure Hosting, jQuery, jQuery-UI, TypeScript, Knockout.js, less css

---

**Login Page**
<img src="https://raw.githubusercontent.com/nicholasceliano/AJWorkOrders-WebApp/master/Images/LogInPage.png" />

**Admin Panel**
<img src="https://raw.githubusercontent.com/nicholasceliano/AJWorkOrders-WebApp/master/Images/AdminPanel.png" />

**Admin Panel Details**
<img src="https://raw.githubusercontent.com/nicholasceliano/AJWorkOrders-WebApp/master/Images/AdminPanelDetails.png" />

**Admin Panel Edit**
<img src="https://raw.githubusercontent.com/nicholasceliano/AJWorkOrders-WebApp/master/Images/AdminPanelEdit.png" />

**Manage Devices**
<img src="https://raw.githubusercontent.com/nicholasceliano/AJWorkOrders-WebApp/master/Images/ManageDevices.png" />

**Manage Devices Details**
<img src="https://raw.githubusercontent.com/nicholasceliano/AJWorkOrders-WebApp/master/Images/ManageDevicesDetails.png" />

**Manage Devices Edit**
<img src="https://raw.githubusercontent.com/nicholasceliano/AJWorkOrders-WebApp/master/Images/ManageDevicesEdit.png" />

**Work Orders**
<img src="https://raw.githubusercontent.com/nicholasceliano/AJWorkOrders-WebApp/master/Images/WorkOrders.png" />

**Work Orders Search**
<img src="https://raw.githubusercontent.com/nicholasceliano/AJWorkOrders-WebApp/master/Images/WorkOrdersSearch.png" />

**New Work Order**
<img src="https://raw.githubusercontent.com/nicholasceliano/AJWorkOrders-WebApp/master/Images/WorkOrdersNew.png" />

**Edit Work Order**
<img src="https://raw.githubusercontent.com/nicholasceliano/AJWorkOrders-WebApp/master/Images/WorkOrdersEdit.png" />

**Work Order Approved**
<img src="https://raw.githubusercontent.com/nicholasceliano/AJWorkOrders-WebApp/master/Images/WorkOrdersApproved.png" />

**Work Order Approval Pending sent from Android App**
<img src="https://raw.githubusercontent.com/nicholasceliano/AJWorkOrders-WebApp/master/Images/WorkOrdersApprovalPendingFromApp.png" />

**API Tests Page**
<img src="https://raw.githubusercontent.com/nicholasceliano/AJWorkOrders-WebApp/master/Images/APITests.png" />
