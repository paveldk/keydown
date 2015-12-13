<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="EditShape.aspx.cs" Inherits="SunglassesCMS.Shapes.EditShape" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:GridView ID="GridViewShapes" runat="server" AllowPaging="True" AllowSorting="True" AutoGenerateColumns="False" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CellPadding="4" DataKeyNames="FaceShapeID" DataSourceID="EntityDataSourceShapes" ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="FaceShapeID" HeaderText="Номер" ReadOnly="True" SortExpression="FaceShapeID" />
            <asp:BoundField DataField="Name" HeaderText="Форма" SortExpression="Name" />
            <asp:CommandField ShowDeleteButton="True" ShowEditButton="True" CancelText="Отмени" DeleteText="Изтрий" EditText="Промени" InsertText="Добави" NewText="Нов" SelectText="Избери" UpdateText="Промени" />
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
    <asp:EntityDataSource ID="EntityDataSourceShapes" runat="server" ConnectionString="name=keydowno_sunglassesEntities" DefaultContainerName="keydowno_sunglassesEntities" EnableDelete="True" EnableFlattening="False" EnableUpdate="True" EntitySetName="FaceShapes">
    </asp:EntityDataSource>
    <style>
        #MainContent_GridViewShapes th, td {
            padding-left:5px;
        }
        #MainContent_GridViewShapes tbody tr {
            height:50px !important;
        }
        #MainContent_GridViewShapes input {
            border-radius:5px;
            width:100px !important;
        }

    </style>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
</asp:Content>
