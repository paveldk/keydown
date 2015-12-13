<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddProductBrand.aspx.cs" Inherits="SunglassesCMS.Brands.AddBrand" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Label ID="txtSuccess" Visible="false" runat="server" CssClass="title-success" Text="Промените бяха записани успешно"></asp:Label>
    <h2>Добавяне на марка:</h2>
    <asp:Label ID="lblName" runat="server" Text="Име на марка"></asp:Label>
    <asp:TextBox ID="txtBrandName" runat="server" Width="150px"></asp:TextBox>
    <asp:RequiredFieldValidator ID="valRequired" ControlToValidate="txtBrandName" CssClass="red" runat="server" ErrorMessage="Името е задължително"></asp:RequiredFieldValidator>
    <br />
    <asp:Label ID="lblImage" runat="server" Text="Изображение:"></asp:Label>
    <br />
    <br />
    <input name="files" id="files" type="file" />
    <br />
    <asp:Button ID="btnSubmit" UseSubmitBehavior="true" runat="server" Text="Добави" OnClick="btnSubmit_Click" />
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
    <script>
        $(document).ready(function () {
            $("#files").kendoUpload({
                select: onSelect,
                multiple: false
            });
        });
        function onSelect(e) {
            var files = e.files;
            if (files.length > 10) {
                alert("Too many files selected!");
                e.preventDefault();
            }
            for (var i = 0; i < files.length; i++) {
                var fileExtension = files[i].extension.toLowerCase();
                if (fileExtension != '.jpg' && fileExtension != '.png' && fileExtension != '.jpeg' && fileExtension != '.gig') {
                    alert("Some of the selected files are not images!")
                    e.preventDefault();
                }
                if (files[i].size / 1024000 > 8) {
                    alert("Too maximum file size can be 8mb! Your file is " + files[i].size / 1024000 + "MB")
                    e.preventDefault();
                }
            }
        }
    </script>
</asp:Content>
