<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="HomePageImages.aspx.cs" Inherits="SunglassesCMS.Pages.HomePageImages1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Label ID="txtSuccess" Visible="false" runat="server" CssClass="title-success" Text="Промените бяха записани успешно"></asp:Label>
    <h2>Изображения към начална страница</h2>
    <asp:GridView ID="gvImages" runat="server" AllowPaging="True" AutoGenerateColumns="False" DataKeyNames="ImageID" DataSourceID="HomeImagesEDS" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CellPadding="4" ForeColor="Black" GridLines="Vertical" OnRowDeleting="gvImages_RowDeleting">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="ImageID" HeaderText="#" ReadOnly="True" SortExpression="BrandID" />
            <asp:BoundField DataField="Text" HeaderText="Текст" SortExpression="Text" />
            <asp:BoundField DataField="Image" HeaderText="Изображение" SortExpression="Image" Visible="False" />
            <asp:CheckBoxField DataField="Visible" HeaderText="Видимо" SortExpression="Visible" />

            <asp:TemplateField HeaderText="Изображение">
                <ItemTemplate>
                    <asp:Image ID="homeImage" ImageUrl='<%# Eval("Image") %>' Width="220" Height="70" runat="server" />
                </ItemTemplate>
                <%--<EditItemTemplate>
                    <input name="files" id="files" type="file" />
                </EditItemTemplate>--%>
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
    <asp:Label ID="txtNoImages" Visible="false" runat="server" CssClass="title-success" Text="Не са намерени изображения"></asp:Label>
    <asp:EntityDataSource ID="HomeImagesEDS" runat="server" ConnectionString="name=keydowno_sunglassesEntities" DefaultContainerName="keydowno_sunglassesEntities" EnableDelete="True" EnableFlattening="False" EnableUpdate="True" EntitySetName="HomePageImages">
    </asp:EntityDataSource>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
    <script>
        $(document).ready(function () {
            $("#files").kendoUpload();
        });
    </script>
    <style>
        #MainContent_gvImages td,th {
            padding-left:5px;
        }
        #MainContent_gvImages input {
            width:100px;
            border-radius:5px;
        }
    </style>
</asp:Content>
