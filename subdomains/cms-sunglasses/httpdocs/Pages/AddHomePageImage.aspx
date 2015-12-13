<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddHomePageImage.aspx.cs" Inherits="SunglassesCMS.Pages.HomePageImages" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Label ID="txtSuccess" Visible="false" runat="server" CssClass="title-success" Text="Промените бяха записани успешно"></asp:Label>
    <h2>Добавяне на изображение към начална страница:</h2>
    <asp:Label ID="lblTitle" runat="server" Text="Заглавие на снимка: "></asp:Label>
    <br />
    <asp:TextBox ID="txtTitle" runat="server" Width="700px"></asp:TextBox>
    <br />
    <br />
    <asp:Label ID="lblImage" runat="server" Text="Изображение: "></asp:Label>
    <br />
    <input name="files" id="files" type="file" />
    <br />
    <asp:Label ID="isVisible" runat="server" Text="Да се показва: "></asp:Label>
    <asp:CheckBox ID="cbVisible" runat="server" />
    <br />
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
    <style>
        #MainContent_txtTitle {
            border-radius:5px;
        }
    </style>
</asp:Content>
