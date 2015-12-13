<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="EditPage.aspx.cs" Inherits="SunglassesCMS.Pages.EditPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Label ID="txtSuccess" Visible="false" runat="server" CssClass="title-success" Text="Промените бяха записани успешно"></asp:Label>
    <h2>Промяна на страница</h2>
    <asp:Label ID="lblPages" runat="server" Text="Изберете страница: "></asp:Label>
    <asp:DropDownList ClientIDMode="Static" ID="dropPages" runat="server" AutoPostBack="True" DataSourceID="PagesEDS" DataTextField="Title" DataValueField="PageID" AppendDataBoundItems="true" OnSelectedIndexChanged="dropPages_SelectedIndexChanged">
        <asp:ListItem Text="" Value="" />
    </asp:DropDownList>
    <asp:EntityDataSource ID="PagesEDS" runat="server" ConnectionString="name=keydowno_sunglassesEntities" DefaultContainerName="keydowno_sunglassesEntities" EnableFlattening="False" EntitySetName="Pages" Select="it.[PageID], it.[Title]">
    </asp:EntityDataSource>
    <br />
    <br />
    <asp:Label ID="lblTitle" runat="server" Text="Заглавие: "></asp:Label>
    <br />
    <asp:TextBox ID="txtTitle" runat="server" Width="500px"></asp:TextBox>
    <asp:RequiredFieldValidator ID="valTitle" runat="server" ControlToValidate="txtTitle" ErrorMessage="Моля, въведете заглавие."></asp:RequiredFieldValidator>
    <br />
    <br />
    <asp:Label ID="lblInfo" runat="server" Text="Съдържание: "></asp:Label>
    <asp:TextBox ID="editor" ClientIDMode="Static" runat="server" TextMode="MultiLine" Rows="10" Columns="30" Width="740" Height="440"></asp:TextBox>
    <br />
    <br />
    <asp:Button ID="btnSubmit" runat="server" Text="Съхрани" OnClick="btnSubmit_Click" />
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
    <script>
        $(document).ready(function () {
            $("#editor").kendoEditor({
                encoded: true
            });
            $("#dropPages").kendoDropDownList();
        });
    </script>
    <style>
        #MainContent_txtTitle {
            border-radius:5px;
        }
    </style>
</asp:Content>
