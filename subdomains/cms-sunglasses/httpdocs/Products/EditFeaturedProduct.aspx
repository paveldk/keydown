<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="EditFeaturedProduct.aspx.cs" Inherits="SunglassesCMS.Products.EditFeaturedProduct" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <h2>Промяна на продукт на фокус</h2>
    <asp:Label ID="lblFeatured" runat="server" Text="Продукт на фокус:"></asp:Label>
    <asp:CheckBox ID="checkFeatured" runat="server" Checked="True" />
    <br />
    <asp:Label ID="lblAdded" runat="server" Text="Поставен на фокус на: "></asp:Label>
    <br />
    <br />
    <asp:Label ID="lblDescription" runat="server" Text="Описание:"></asp:Label>
    <br />
    <asp:TextBox ID="txtDescription" runat="server" TextMode="MultiLine"></asp:TextBox>
    <br />
    <asp:Button ID="btnSubmit" runat="server" Text="Запази" OnClick="btnSubmit_Click" />
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
</asp:Content>
