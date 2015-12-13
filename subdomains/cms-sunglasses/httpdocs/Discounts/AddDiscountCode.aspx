<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddDiscountCode.aspx.cs" Inherits="SunglassesCMS.Discounts.AddDiscountCode" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Label ID="txtSuccess" Visible="false" runat="server" CssClass="title-success" Text="Промените бяха записани успешно"></asp:Label>
    <h2>Генериране на промоционален код:</h2>
    <br />
    <asp:Label ID="lblDiscount" runat="server" Text="Въведи размер на намалението (%):" AssociatedControlID="txtDiscount"></asp:Label>
    <asp:TextBox ID="txtDiscount" runat="server" Width="280px"></asp:TextBox>
    <br />
    <asp:Button ID="btnGenerate" runat="server" Text="Генерирай нов код" OnClick="btnGenerate_Click" />
    <br />
    <asp:Label ID="lblForLblCode" runat="server" Text="Код: "></asp:Label>
    <asp:Label ID="lblCode" runat="server" Text=""></asp:Label>
    <style>
        #MainContent_txtDiscount {
            border-radius:5px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
</asp:Content>
