<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddFeatured.aspx.cs" Inherits="SunglassesCMS.Featured.AddFeatured" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Label ID="txtSuccess" Visible="false" runat="server" CssClass="title-success" Text="Промените бяха записани успешно"></asp:Label>
    <h2>Добавяне на продукт на фокус</h2>
    <asp:Label ID="lblProduct" runat="server" Text="Избери Продукт"></asp:Label>
    <asp:DropDownList ID="ddlProducts" runat="server" DataSourceID="EntityDataSourceProducts" DataTextField="Model" DataValueField="ProductID"></asp:DropDownList>
    <br />
    <asp:Button ID="btnSubmit" UseSubmitBehavior="true" runat="server" Text="Добави" OnClick="btnSubmit_Click" />
    <asp:EntityDataSource ID="EntityDataSourceProducts" runat="server" ConnectionString="name=keydowno_sunglassesEntities" DefaultContainerName="keydowno_sunglassesEntities" EnableFlattening="False" EntitySetName="Products" Select="it.[Model], it.[ProductID]">
    </asp:EntityDataSource>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
</asp:Content>
