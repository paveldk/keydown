<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddColorToProductType.aspx.cs" Inherits="SunglassesCMS.Colors.AddColorToProductType" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">

    <asp:GridView ID="gvProductTypes" runat="server" AutoGenerateColumns="False" OnSelectedIndexChanged="OnSelectedIndexChanged" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CellPadding="4" DataKeyNames="ProductTypeID" DataSourceID="EntityDataSourceTypes" ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="ProductTypeID" HeaderText="Номер" ReadOnly="True" SortExpression="ProductTypeID" />
            <asp:BoundField DataField="Name" HeaderText="Категория" SortExpression="Name" />
            <asp:CommandField SelectText="Избери" ShowSelectButton="True" />
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

    <asp:CheckBoxList ID="cblColors" runat="server" AutoPostBack="True" RepeatLayout="Table" Width="500" DataSourceID="EntityDataSourceColors" DataTextField="Name" DataValueField="ColorID" OnSelectedIndexChanged="cblColors_SelectedIndexChanged"></asp:CheckBoxList>

    <asp:EntityDataSource ID="EntityDataSourceColors" runat="server" ConnectionString="name=keydowno_sunglassesEntities" DefaultContainerName="keydowno_sunglassesEntities" EnableFlattening="False" EntitySetName="Colors">
    </asp:EntityDataSource>

    <asp:EntityDataSource ID="EntityDataSourceTypes" runat="server" ConnectionString="name=keydowno_sunglassesEntities" DefaultContainerName="keydowno_sunglassesEntities" EnableFlattening="False" EntitySetName="ProductTypes">
    </asp:EntityDataSource>
    <style>
        #MainContent_gvProductTypes td, th {
            padding-left:5px;
        }
        #MainContent_cblColors td{
            margin:0 !important;
            padding:0 !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
</asp:Content>
