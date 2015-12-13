<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddMaterial.aspx.cs" Inherits="SunglassesCMS.Materials.AddMaterial" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Label ID="txtSuccess" Visible="false" runat="server" CssClass="title-success" Text="Промените бяха записани успешно"></asp:Label>
    <h2>Добавяне на материал:</h2>
    <asp:Label ID="lblName" runat="server" Text="Име на материал:"></asp:Label>
    <asp:TextBox ID="txtMaterialName" runat="server" Width="150px"></asp:TextBox>
    <asp:RequiredFieldValidator ID="valRequired" ControlToValidate="txtMaterialName" CssClass="red" runat="server" ErrorMessage="Името е задължително"></asp:RequiredFieldValidator>
    <br />
    <asp:Button ID="btnSubmit" UseSubmitBehavior="true" runat="server" Text="Добави" OnClick="btnSubmit_Click" />
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
</asp:Content>