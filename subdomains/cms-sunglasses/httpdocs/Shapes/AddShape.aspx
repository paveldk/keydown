<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddShape.aspx.cs" Inherits="SunglassesCMS.Shapes.AddShape" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Label ID="txtSuccess" Visible="false" runat="server" CssClass="title-success" Text="Промените бяха записани успешно"></asp:Label>
    <h2>Създаване на форма на лице:</h2>
    <asp:Label ID="lblName" runat="server" Text="Име на формата:"></asp:Label>
    <asp:TextBox ID="txtShapeName" runat="server" Width="230px"></asp:TextBox>
    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" ControlToValidate="txtShapeName" CssClass="red" runat="server" ErrorMessage="Името е задължително"></asp:RequiredFieldValidator>
    <br />
    <asp:Button ID="btnSubmit" UseSubmitBehavior="true" runat="server" OnClick="SubmitShape" Text="Добави" />
    <style>
        #MainContent_txtShapeName {
        border-radius:5px;
        }
    </style>
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
</asp:Content>
