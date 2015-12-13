<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="OrdDetails.aspx.cs" Inherits="SunglassesCMS.Orders.OrderDetails" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:GridView ID="gvOrderDetails" runat="server" OnRowDataBound="gvOrderDetails_RowDataBound" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CellPadding="4" ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
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
    <br />
    <br />
     <asp:DropDownList ID="OrderStatusDD" runat="server" DataSourceID="OrderStatusDS" DataTextField="Name" DataValueField="OrderStatusID">
    </asp:DropDownList>
    <asp:EntityDataSource ID="OrderStatusDS" runat="server" ConnectionString="name=keydowno_sunglassesEntities" DefaultContainerName="keydowno_sunglassesEntities" EnableFlattening="False" EntitySetName="OrderStatus" Select="it.[OrderStatusID], it.[Name]">
    </asp:EntityDataSource>
    <br />
    <br />
    <asp:Button ID="OrderSubmit" runat="server" Text="Запази" OnClick="OrderSubmit_Click"  />
    <script>
        $('#MainContent_OrderStatusDD').kendoDropDownList();
    </script>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
   
</asp:Content>
