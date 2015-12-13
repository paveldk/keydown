<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AllDiscountCodes.aspx.cs" Inherits="SunglassesCMS.Discounts.AllDiscountCodes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Label ID="txtSuccess" Visible="false" runat="server" CssClass="title-success" Text="Промените бяха записани успешно"></asp:Label>
    <h2>Генерирани промоционални кодове</h2>
    <br />
    <asp:GridView ID="GridViewDiscountCodes" runat="server" AllowPaging="True" AllowSorting="True" AutoGenerateColumns="False" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CellPadding="4" DataKeyNames="DiscountID" DataSourceID="EntityDataSourceDiscountCodes" ForeColor="Black" GridLines="Vertical" PageSize="20">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:CommandField ShowDeleteButton="True" DeleteText="Изтрий" />
            <asp:BoundField DataField="DiscountID" HeaderText="ID" ReadOnly="True" SortExpression="DiscountID" Visible="false" />
            <asp:BoundField DataField="DiscountPercent" HeaderText="%" SortExpression="DiscountPercent" />
            <asp:BoundField DataField="DiscountCode" HeaderText="Код" SortExpression="DiscountCode" />
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
    <asp:EntityDataSource ID="EntityDataSourceDiscountCodes" runat="server" ConnectionString="name=keydowno_sunglassesEntities" DefaultContainerName="keydowno_sunglassesEntities" EnableDelete="True" EnableFlattening="False" EntitySetName="Discounts">
    </asp:EntityDataSource>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
</asp:Content>
