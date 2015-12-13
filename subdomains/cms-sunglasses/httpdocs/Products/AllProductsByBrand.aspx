<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AllProductsByBrand.aspx.cs" Inherits="SunglassesCMS.Products.AllProducts" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <h2>Преглед на Продукти</h2>
    <h3>Избор на Марка</h3>
    <p>
        <asp:DropDownList ID="BrandsDDL" runat="server" DataSourceID="BrandsDS" AppendDataBoundItems="true" DataTextField="Name" DataValueField="BrandID" OnSelectedIndexChanged="BrandsDDL_SelectedIndexChanged " AutoPostBack="true">
            <asp:ListItem Text="" Value="" />
        </asp:DropDownList>
        <asp:EntityDataSource ID="BrandsDS" runat="server" ConnectionString="name=keydowno_sunglassesEntities" DefaultContainerName="keydowno_sunglassesEntities" EnableFlattening="False" EntitySetName="ProductBrands" EntityTypeFilter="ProductBrand" Select="it.[BrandID], it.[Name]" Where="it.[Visible] = true">
        </asp:EntityDataSource>
    </p>

   <%-- <asp:GridView ID="gvBrands" runat="server" OnSelectedIndexChanged="gvBrands_SelectedIndexChanged" AutoGenerateColumns="False" DataKeyNames="BrandID" DataSourceID="EntityDataSourceBrand" AllowPaging="True" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CellPadding="4" ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="BrandID" HeaderText="Номер" ReadOnly="True" SortExpression="BrandID" />
            <asp:BoundField DataField="Name" HeaderText="Име" SortExpression="Name" />
            <asp:ImageField DataImageUrlField="Image" HeaderText="Изображение" ReadOnly="True" ControlStyle-Height="50" ControlStyle-Width="50">
                <ItemStyle HorizontalAlign="Center" VerticalAlign="Middle" Wrap="True" />
            </asp:ImageField>
            <asp:CommandField ShowSelectButton="True" SelectText="Избор" />
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
    </asp:GridView>--%>

    <asp:EntityDataSource ID="EntityDataSourceBrand" runat="server" ConnectionString="name=keydowno_sunglassesEntities" DefaultContainerName="keydowno_sunglassesEntities" EnableFlattening="False"
        EntitySetName="ProductBrands" Where="it.[Visible] == true">
    </asp:EntityDataSource>
    <br />
    <asp:Label ID="txtNoProducts" Visible="false" runat="server" CssClass="title-success" Text="Не са намерени продукти за избраната марка"></asp:Label>
    <div id="brands-info">
        <asp:GridView ID="gvProducts" runat="server" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CellPadding="4" ForeColor="Black" GridLines="Vertical" AutoGenerateColumns="False" OnSelectedIndexChanged="gvProducts_SelectedIndexChanged" AllowPaging="True" OnPageIndexChanged="gvProducts_PageIndexChanged" OnPageIndexChanging="gvProducts_PageIndexChanging" PageSize="15">
            <AlternatingRowStyle BackColor="White" />
            <Columns>
                <asp:BoundField AccessibleHeaderText="ProductId" DataField="ProductID" FooterText="Номер" HeaderText="Номер" />
                <asp:BoundField AccessibleHeaderText="Model" DataField="Model" FooterText="Модел" HeaderText="Модел" />
                <asp:BoundField AccessibleHeaderText="OldPrice" DataField="OldPrice" FooterText="Стара цена" HeaderText="Стара цена" />
                <asp:BoundField AccessibleHeaderText="NewPrice" DataField="NewPrice" FooterText="Нова цена" HeaderText="Нова цена" />
                <asp:BoundField AccessibleHeaderText="Quantity" DataField="CurrentQuantity" FooterText="Количество" HeaderText="Количество" />
                <asp:BoundField AccessibleHeaderText="Size" DataField="Size" FooterText="Размер" HeaderText="Размер" />
                <asp:BoundField AccessibleHeaderText="Gender" DataField="Gender" FooterText="Пол" HeaderText="Пол" />
                <asp:BoundField AccessibleHeaderText="DiopterLowerBound" DataField="DiopterLowerBound" FooterText="Диоптри от" HeaderText="Диоптри от" />
                <asp:BoundField AccessibleHeaderText="DiopterUpperBound" DataField="DiopterUpperBound" FooterText="Диоптри до" HeaderText="Диоптри до" />
                <asp:BoundField AccessibleHeaderText="DiopterStep" DataField="DiopterStep" FooterText="Стъпка" HeaderText="Стъпка" />
                <asp:CommandField AccessibleHeaderText="Избери" SelectText="Избери" ShowSelectButton="True" />
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
    </div>
    <style>
        #MainContent_gvProducts td {
            padding-left: 5px;
        }

        #MainContent_gvBrands td, th {
            padding-left: 5px !important;
        }

        #MainContent_gvBrands td {
            padding-left: 5px;
        }

        #MainContent_gvBrands img {
            height: 45px;
            width: 45px;
            vertical-align: middle;
            padding: 5px 0px;
        }
       #brands-info{
           position:relative;
           right:0px;
        }
    </style>
    <script>
        debugger;
        $('#MainContent_BrandsDDL').kendoDropDownList({});
    </script>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
</asp:Content>
