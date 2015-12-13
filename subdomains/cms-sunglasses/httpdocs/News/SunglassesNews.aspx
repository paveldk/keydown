<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="SunglassesNews.aspx.cs" Inherits="SunglassesCMS.News.SunglassesNews" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Label ID="title" runat="server" Text="Заглавие: "></asp:Label>
    <asp:TextBox ID="NewsTitle" runat="server" Width="500px"></asp:TextBox>
    <asp:RequiredFieldValidator ID="ValidateTitle" runat="server" ControlToValidate="NewsTitle" ErrorMessage="Моля, попълнете заглавие"></asp:RequiredFieldValidator>

    <asp:TextBox ClientIDMode="Static" ID="KendoText" runat="server"></asp:TextBox>
    <textarea id="editor" rows="10" cols="30" style="width: 740px; height: 440px"> 
                    
    </textarea>
    <br />
    <br />
    <asp:Button ID="SaveNewsButton" runat="server" OnClick="SaveNews" Text="Съхрани" />
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
    <script>
        $(document).ready(function () {
            $("#editor").kendoEditor({
            });

            function htmlEscape(str) {
                return String(str)
                        .replace(/&/g, '&amp;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
            }

            var editor = $("#editor").data("kendoEditor");
            $(editor.window).blur(function () {
                var content = htmlEscape(editor.value());
                $("#KendoText").attr("Value", content);
            })
        });
    </script>
    <style>
        #MainContent_NewsTitle {
            border-radius:5px;
        }
    </style>
</asp:Content>
