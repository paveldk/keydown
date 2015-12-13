<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="EditColor.aspx.cs" Inherits="SunglassesCMS.Colors.EditColor" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <div id="edit-color">
        <asp:Label ID="Label1" runat="server" Text="Цвят за промяна:"></asp:Label>
        <asp:DropDownList ID="ColorDropdown" runat="server" DataSourceID="ColorsDropdown" DataTextField="Name" DataValueField="Name" Style="height: 22px" AutoPostBack="true"
            OnSelectedIndexChanged="SelectColorChange">
        </asp:DropDownList>
        <asp:EntityDataSource ID="ColorsDropdown" runat="server" ConnectionString="name=keydowno_sunglassesEntities" DefaultContainerName="keydowno_sunglassesEntities" EnableFlattening="False" EntitySetName="Colors" EntityTypeFilter="Color" Select="it.[Name]">
        </asp:EntityDataSource>
        <br />
        <asp:Label ID="Label2" runat="server" Text="Избор на нов цвят:"></asp:Label>
        <input id="picker" />
        <br />
        <asp:Label ID="Label3" runat="server" Text="Избран цвят:"></asp:Label>
        <asp:TextBox ID="SelectedColor" ClientIDMode="Static" runat="server" Width="100px"></asp:TextBox>
        <br />
        <br />
        <asp:Button ID="SaveColorButton" runat="server" UseSubmitBehavior="true" OnClick="SaveColor" Text="Запази" />
        <asp:Button ID="DeleteColorButton" runat="server" OnClick="DeleteColor" Text="Изтрий" />
    </div>
    <style>
        #edit-color > span{
            display:inline-block;
            width:120px;
        }
        .k-widget.k-colorpicker.k-header {
            width:55px !important;
        }
        #SelectedColor {
            border-radius:5px;
            width:110px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
    <script>
        $(document).ready(function () {
            $("#picker").kendoColorPicker({
                value: $("#SelectedColor").val(),
                buttons: false,
                change: function () {
                    var color = this.value();
                    $("#SelectedColor").val(color);
                    $("#SelectedColor").attr("value", color);
                }
            });
            $("#MainContent_ColorDropdown").kendoDropDownList()
        })
    </script>
</asp:Content>
