<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AllFeaturedProducts.aspx.cs" Inherits="SunglassesCMS.Products.AllFeaturedProducts" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Label ID="txtSuccess" Visible="false" runat="server" CssClass="title-success" Text="Промените бяха записани успешно"></asp:Label>
    <h2>Продукти на фокус</h2>
    <asp:GridView ID="gridFeaturedProducts" runat="server" AutoGenerateColumns="False" DataKeyNames="ProductID" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CellPadding="4" ForeColor="Black" GridLines="Vertical" OnSelectedIndexChanged="gridFeaturedProducts_SelectedIndexChanged">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="ProductID" HeaderText="Номер" ReadOnly="True" SortExpression="ProductID" />
            <asp:BoundField DataField="typeName" HeaderText="Тип" SortExpression="typeName" />
            <asp:BoundField DataField="brandName" HeaderText="Марка" SortExpression="brandName" />
            <asp:BoundField DataField="Model" HeaderText="Модел" SortExpression="Model" />
            <asp:BoundField DataField="NewPrice" HeaderText="Цена" SortExpression="NewPrice" />
            <asp:BoundField DataField="CurrentQuantity" HeaderText="Количество" SortExpression="CurrentQuantity" />
            <asp:CommandField CancelText="Отмени" DeleteText="Изтрий" EditText="Промени" InsertText="Добави" NewText="Нов" SelectText="Избери" ShowSelectButton="True" UpdateText="Промени" />
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
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
</asp:Content>
