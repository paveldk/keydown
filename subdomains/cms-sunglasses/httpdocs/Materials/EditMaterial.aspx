<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="EditMaterial.aspx.cs" Inherits="SunglassesCMS.Materials.EditMaterial" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <h2>Промяна на материал</h2>
    <asp:GridView ID="gridMaterial" runat="server" AllowPaging="True" AllowSorting="True" AutoGenerateColumns="False" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CellPadding="4" DataKeyNames="MaterialID" DataSourceID="EntityDataSourceMaterial" ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="MaterialID" HeaderText="Номер" ReadOnly="True" SortExpression="MaterialID" />
            <asp:BoundField DataField="Name" HeaderText="Материал" SortExpression="Name" />
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
    <asp:EntityDataSource ID="EntityDataSourceMaterial" runat="server" ConnectionString="name=keydowno_sunglassesEntities" DefaultContainerName="keydowno_sunglassesEntities" EnableDelete="True" EnableFlattening="False" EnableUpdate="True" EntitySetName="Materials">
    </asp:EntityDataSource>
     <style>
        #MainContent_gridMaterial td,th {
            padding-left:5px;
        }
        #MainContent_gridMaterial input {
            width:100px;
            border-radius:5px;
        }
        #MainContent_gridMaterial tr {
            height:50px;
         }
    </style>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
</asp:Content>