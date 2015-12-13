<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="EditProductBrand.aspx.cs" Inherits="SunglassesCMS.Brands.EditBrand" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Label ID="txtSuccess" Visible="false" runat="server" CssClass="title-success" Text="Промените бяха записани успешно"></asp:Label>
    <h2>Промяна на марка</h2>
    <asp:GridView ID="gridBrand" runat="server" AllowPaging="True" AutoGenerateColumns="False" DataKeyNames="BrandID" DataSourceID="ProductBrandEDS" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CellPadding="4" ForeColor="Black" GridLines="Vertical" OnRowUpdating="gridBrand_RowUpdating" OnRowDeleting="gridBrand_RowDeleting">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="BrandID" HeaderText="Номер" ReadOnly="True" SortExpression="BrandID" />
            <asp:BoundField DataField="Name" HeaderText="Име" SortExpression="Name" />
            <asp:BoundField DataField="Image" HeaderText="Изображение" SortExpression="Image" Visible="False" />
            <asp:CheckBoxField DataField="Visible" HeaderText="Изтрит" SortExpression="Visible" Visible="False" />

            <asp:TemplateField HeaderText="Лого">
                <ItemTemplate>
                    <asp:Image ID="brandImage" ImageUrl='<%# Eval("Image") %>' Width="50" Height="50" runat="server" />
                </ItemTemplate>
                <EditItemTemplate>
                    <input name="files" id="files" type="file" />
                </EditItemTemplate>
            </asp:TemplateField>

            <asp:CommandField ShowEditButton="True" CancelText="Отмени" DeleteText="Изтрий" EditText="Промени" InsertText="Добави" NewText="Нов" SelectText="Избери" UpdateText="Промени" ShowDeleteButton="True" />
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
    <asp:EntityDataSource ID="ProductBrandEDS" runat="server" ConnectionString="name=keydowno_sunglassesEntities" DefaultContainerName="keydowno_sunglassesEntities" EnableDelete="True" EnableFlattening="False" EnableUpdate="True" EntitySetName="ProductBrands" Where="it.[Visible] == true">
    </asp:EntityDataSource>

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
    <script>
        $(document).ready(function() {
            $("#files").kendoUpload();
        });
    </script>
    <style>
        #MainContent_gridBrand img {
            height: 45px;
            width: 45px;
            vertical-align: middle;
            padding: 5px 0px;
        }
        #MainContent_gridBrand td,th {
            padding-left:5px;
        }
        #MainContent_gridBrand input {
            width:100px;
            border-radius:5px;
        }
    </style>
</asp:Content>
