<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AddColor.aspx.cs" MasterPageFile="~/Site.Master" Inherits="SunglassesCMS.Colors.AddColor" %>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Label ID="txtSuccess" Visible="false" runat="server" CssClass="title-success" Text="Промените бяха записани успешно"></asp:Label>
    <h2>Създаване на цвят:</h2>
    <div id="add-color">
        <asp:Label ID="lbl" runat="server" Text="Име на цвят:"></asp:Label>
        <asp:TextBox ID="ColorName" runat="server"></asp:TextBox>
        <asp:RequiredFieldValidator ID="ColorNameValidator" ControlToValidate="ColorName" runat="server" ErrorMessage="Моля въведете име на цвят">
        </asp:RequiredFieldValidator>
        <br />
        <asp:Label ID="Label1" runat="server" Text="Избор на цвят:"></asp:Label>
        <input id="picker" />
        <br />
        <asp:Label ID="Label2" runat="server" Text="Избран цвят:"></asp:Label>
        <asp:TextBox ID="SelectedColor" ClientIDMode="Static" runat="server"></asp:TextBox>
        <br />
        <asp:Button ID="Submit" runat="server" OnClick="SubmitNewColor" Text="Запази" />
    </div>
    <script>
        $(document).ready(function () {
            $("#picker").kendoColorPicker({
                value: "#ffffff",
                buttons: false,
                change: function () {
                    var color = this.value();
                    $("#SelectedColor").val(color);
                }
            });
        });
    </script>
    <style>
        #add-color > input {
            margin-left: 12px;
            width: 140px !important;
            border-radius: 5px;
        }

        #MainContent_Submit {
            border-radius: 0px !important;
            margin-left: 0px !important;
            margin-top: 10px !important;
        }
    </style>
</asp:Content>
