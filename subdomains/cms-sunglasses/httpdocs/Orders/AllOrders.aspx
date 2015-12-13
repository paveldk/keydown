<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AllOrders.aspx.cs" Inherits="SunglassesCMS.Orders.AllOrders" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Label ID="txtSuccess" Visible="false" runat="server" CssClass="title-success" Text="Промените бяха записани успешно"></asp:Label>
    <h2>Поръчки</h2>
    <br />
    <asp:GridView ID="gvOrders" runat="server" AllowPaging="True" AllowSorting="True" AutoGenerateColumns="False" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CellPadding="4" DataKeyNames="OrderID" DataSourceID="EntityDataSourceOrders" ForeColor="Black" GridLines="Vertical" OnSelectedIndexChanged="gvOrders_SelectedIndexChanged" OnRowDataBound="gvOrders_RowDataBound">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:CommandField ShowSelectButton="True" SelectText="Избери" />
            <asp:BoundField DataField="OrderID" HeaderText="№" ReadOnly="True" SortExpression="OrderID" />
            <asp:BoundField DataField="DateOrdered" HeaderText="Дата на поръчка" SortExpression="DateOrdered" />
            <asp:BoundField DataField="DateUpdated" HeaderText="Последна промяна" SortExpression="DateUpdated" />
            <asp:BoundField DataField="PaymentMethod" HeaderText="Плащане" SortExpression="PaymentMethod" />
            <asp:BoundField DataField="AdditionalInformation" HeaderText="Допълнителна информация" SortExpression="AdditionalInformation" />
          
        </Columns>
        <FooterStyle BackColor="#CCCC99" />
        <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
        <RowStyle BackColor="#F7F7DE" />
        <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />
        <SortedAscendingCellStyle BackColor="#FBFBF2" />
        <SortedAscendingHeaderStyle BackColor="#848384" />
        <SortedDescendingCellStyle BackColor="#EAEAD3" />
        <SortedDescendingHeaderStyle BackColor="#575357" />
    </asp:GridView>
    <asp:Label ID="txtNoOrders" Visible="false" runat="server" CssClass="title-success" Text="Липсват поръчки в базата от данни"></asp:Label>
    <asp:EntityDataSource ID="EntityDataSourceOrders" runat="server" ConnectionString="name=keydowno_sunglassesEntities" DefaultContainerName="keydowno_sunglassesEntities" EnableFlattening="False" EnableUpdate="True" EntitySetName="Orders" OrderBy="it.[DateOrdered] DESC">
    </asp:EntityDataSource>
     
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">

    <style>
        #MainContent_gvOrders tr td {
            padding-left: 5px;
        }
        #MainContent_gvOrders tr {
            height:50px !important;
        }

        #MainContent_gvOrders th {
            padding-left: 5px;
        }

        #MainContent_gvOrders input {
            border-radius: 5px;
            max-width: 170px !important;
        }

        td table td {
            border: none !important;
            text-decoration: underline !important;
            color: red !important;
            cursor: pointer;
            padding: 0px !important;
        }

            td table td a {
                border: none !important;
                color: red !important;
                padding-left: 10px;
            }
        input[name="ctl00$MainContent$gvOrders$ctl02$ctl02"] {
            width: 50px;
        }
        input[name="ctl00$MainContent$gvOrders$ctl02$ctl06"] {
            width: 50px;
        }
        input[name="ctl00$MainContent$gvOrders$ctl02$ctl07"] {
            width:50px;
        }
    </style>

</asp:Content>

