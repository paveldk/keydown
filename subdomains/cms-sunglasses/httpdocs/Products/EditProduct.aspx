<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="EditProduct.aspx.cs" Inherits="SunglassesCMS.Products.EditProduct" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Label ID="txtSuccess" Visible="false" runat="server" CssClass="title-success" Text="Промените бяха записани успешно"></asp:Label>
    <h2>Промени продукт:</h2>

    <asp:Label ID="lbl" runat="server" Text="Модел"></asp:Label>
    <asp:TextBox ID="txtModel" runat="server"></asp:TextBox>
    <asp:RequiredFieldValidator ID="RequiredFieldValidatorModel" ControlToValidate="txtModel" runat="server" ErrorMessage="Моделът е задължителен" Display="Dynamic" CssClass="field-validation-error"></asp:RequiredFieldValidator>
    <%--<asp:CustomValidator ID="validatorUniqueBrandModel" runat="server" ErrorMessage="Вече съществува продукт с този модел и марка" ControlToValidate="txtModel" Display="Dynamic" CssClass="field-validation-error" OnServerValidate="validatorUniqueBrandModel_ServerValidate"></asp:CustomValidator>--%>

    <br />
    <asp:Label ID="lblDescription" runat="server" Text="Описание"></asp:Label>
    <%--<asp:TextBox TextMode="MultiLine" ID="txtDescription" runat="server"></asp:TextBox>--%>
    <asp:TextBox ID="editor" ClientIDMode="Static" runat="server" TextMode="MultiLine" Rows="5" Columns="28" Width="690" Height="220"></asp:TextBox>
    <asp:RequiredFieldValidator ID="RequiredFieldValidator4" ControlToValidate="editor" runat="server" ErrorMessage="Описанието е задължително" Display="Dynamic" CssClass="field-validation-error"></asp:RequiredFieldValidator>
    <br />
    <div id="edit-product">
        <asp:Label ID="lblOldPrice" runat="server" Text="Стара Цена"></asp:Label>
        <asp:TextBox ID="txtOldPrice" runat="server" Width="100px"></asp:TextBox>
        <%--//BUG--%>
        <asp:RegularExpressionValidator ID="NumbersValidator" runat="server" ControlToValidate="txtOldPrice" ErrorMessage="Моля използвайте само цифри" ValidationExpression="^[0-9]+(\.[0-9]+)?$" Display="Dynamic" CssClass="field-validation-error"></asp:RegularExpressionValidator>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" ControlToValidate="txtOldPrice" runat="server" ErrorMessage="Старата цена е задължителна" Display="Dynamic" CssClass="field-validation-error"></asp:RequiredFieldValidator>
        <br />
        <asp:Label ID="lblNewPrice" runat="server" Text="Нова Цена"></asp:Label>
        <asp:TextBox ID="txtNewPrice" runat="server" Width="100px"></asp:TextBox>
        <%--//BUG--%>
        <asp:RegularExpressionValidator ID="NumbersOnlyValidator" runat="server" ControlToValidate="txtNewPrice" ErrorMessage="Моля използвайте само цифри" ValidationExpression="^[0-9]+(\.[0-9]+)?$" Display="Dynamic" CssClass="field-validation-error"></asp:RegularExpressionValidator>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" ControlToValidate="txtNewPrice" runat="server" ErrorMessage="Новата цена е задължителна" Display="Dynamic" CssClass="field-validation-error"></asp:RequiredFieldValidator>
        <br />
        <asp:Label ID="lblQuantity" runat="server" Text="Количество"></asp:Label>
        <asp:TextBox ID="txtQuantity" runat="server" Width="100px"></asp:TextBox>
        <%--<asp:ImageField AccessibleHeaderText="Изображение" DataImageUrlField='<%# Eval("Hyperlink") %>' HeaderText="Изображение">
            </asp:ImageField>--%>
        <asp:RegularExpressionValidator ID="QuantityValidation" runat="server" ControlToValidate="txtQuantity" ErrorMessage="Моля използвайте само цифри" ValidationExpression="^[0-9]+(\.[0-9]+)?$" Display="Dynamic" CssClass="field-validation-error"></asp:RegularExpressionValidator>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator3" ControlToValidate="txtQuantity" runat="server" ErrorMessage="Количеството е задължително" Display="Dynamic" CssClass="field-validation-error"></asp:RequiredFieldValidator>
        <br />
        <asp:Label ID="lblGender" runat="server" Text="Пол: "></asp:Label>
        <asp:DropDownList ID="GenderList" runat="server">
            <asp:ListItem>  </asp:ListItem>
            <asp:ListItem Value="M">Мъжки</asp:ListItem>
            <asp:ListItem Value="F">Женски</asp:ListItem>
            <asp:ListItem Value="U">Унисекс</asp:ListItem>
            <asp:ListItem Value="K">Детски</asp:ListItem>
            <asp:ListItem Value="N">N/A</asp:ListItem>
        </asp:DropDownList>
        <asp:RequiredFieldValidator ID="GenderValidator" runat="server" ControlToValidate="GenderList" ErrorMessage="Изберете пол" Display="Dynamic" CssClass="field-validation-error"></asp:RequiredFieldValidator>
        <br />
        <asp:Label ID="isVisible" runat="server" Text="Да се показва: "></asp:Label>
        <asp:CheckBox ID="visible" runat="server" />
        <br />
        <asp:Label ID="isOutlet" runat="server" Text="Добави към outlet: "></asp:Label>
        <asp:CheckBox ID="outlet" runat="server" />
        <br />
        <asp:Label ID="lblFeatured" runat="server" Text="Направи на фокус: "></asp:Label>
        <asp:CheckBox ID="checkFeatured" runat="server" />
        <br />
        <asp:TextBox ID="txtFeaturedDescription" runat="server" TextMode="MultiLine"></asp:TextBox>
        <h3>Допълнителна информация(незадължителни полета)</h3>
        <br />
        <table id="checkBoxTable">
            <thead>
                <tr>
                    <td>Избрани цветове</td>
                    <td>Избрани материали</td>
                    <td>Избрани форми на лице</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <asp:CheckBoxList ID="cbColors" runat="server">
                        </asp:CheckBoxList>
                    </td>
                    <td>
                        <asp:CheckBoxList ID="cbMaterials" runat="server">
                        </asp:CheckBoxList>
                    </td>
                    <td>
                        <asp:CheckBoxList ID="cbShapes" runat="server">
                        </asp:CheckBoxList>
                    </td>
                </tr>
            </tbody>
        </table>
        <br />
        <asp:Label ID="lblSize" runat="server" Text="Размери"></asp:Label>
        <asp:TextBox ID="txtSize" runat="server"></asp:TextBox>
        <br />
        <asp:Label ID="Label1" runat="server" Text="Поляризация: "></asp:Label>
        <asp:DropDownList ID="PolarizationList" runat="server">
            <asp:ListItem Value="1">Да</asp:ListItem>
            <asp:ListItem Value="0">Не</asp:ListItem>
        </asp:DropDownList>
        <br />
        <asp:Label ID="Label2" runat="server" Text="Диоптри от: "></asp:Label>
        <asp:TextBox ID="DioptersFrom" runat="server" Width="100px"></asp:TextBox>
        <asp:Label ID="Label4" runat="server" Text="До:" Width="20px"></asp:Label>
        <asp:TextBox ID="DioptersTo" runat="server" Width="100px"></asp:TextBox>
        <asp:RegularExpressionValidator ID="DioptersFromValidation" runat="server" ControlToValidate="DioptersFrom" ErrorMessage="Моля използвайте само цифри" ValidationExpression="^[0-9]+(\.[0-9]+)?$" Display="Dynamic" CssClass="field-validation-error"></asp:RegularExpressionValidator>
        <asp:RegularExpressionValidator ID="DiopterTo" runat="server" ControlToValidate="DioptersTo" ErrorMessage="Моля използвайте само цифри" ValidationExpression="^[0-9]+(\.[0-9]+)?$" Display="Dynamic" CssClass="field-validation-error"></asp:RegularExpressionValidator>
        <br />
        <asp:Label ID="Label3" runat="server" Text="Диоптри стъпка: "></asp:Label>
        <asp:TextBox ID="DiopstersStep" runat="server" Width="100px"></asp:TextBox>
        <asp:RegularExpressionValidator ID="DiopterStepValidation" runat="server" ControlToValidate="DiopstersStep" ErrorMessage="Моля използвайте само цифри" ValidationExpression="^[0-9]+(\.[0-9]+)?$" Display="Dynamic" CssClass="field-validation-error"></asp:RegularExpressionValidator>
    </div>
    <br />
    <h2>Главна картинка</h2>
    <asp:Label ID="lblProductType" runat="server" Visible="False"></asp:Label>
    <asp:GridView ID="mainImage" runat="server" OnLoad="mainImageLoad" AutoGenerateColumns="False" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px"
        CellPadding="4" ForeColor="Black" GridLines="Vertical" OnSelectedIndexChanged="DeleteMainImage">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField AccessibleHeaderText="Id" DataField="ImageID" HeaderText="Номер" />
            <%--<asp:ImageField AccessibleHeaderText="Изображение" DataImageUrlField='<%# Eval("Hyperlink") %>' HeaderText="Изображение">
            </asp:ImageField>--%>
            <asp:TemplateField HeaderText="Изображение">
                <ItemTemplate>
                    <asp:Image ID="mainImage" ImageUrl='<%# String.Format("/Media/{0}/{1}/thumbs/{2}", lblProductType.Text, txtModel.Text, Eval("Hyperlink")) %>' runat="server" />
                </ItemTemplate>
            </asp:TemplateField>
            <asp:CommandField SelectText="Изтрий" ShowSelectButton="True" />
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
    <h3>Добавяне на главна картинка</h3>
    <br />
    <asp:Label ID="lblImage" runat="server" Text="Изображение:"></asp:Label>
    <input name="singleFiles" id="singleFile" type="file" />
    <br />
    <h2>Галерия:</h2>
    <asp:GridView ID="imgGallery" runat="server" OnLoad="imgGallery_Load" AutoGenerateColumns="False" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px"
        CellPadding="4" ForeColor="Black" GridLines="Vertical" OnSelectedIndexChanged="DeleteImage">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="ImageID" HeaderText="Номер" />
            <%--<asp:ImageField DataImageUrlField="Hyperlink" HeaderText="Изображение">
            </asp:ImageField>--%>
            <asp:TemplateField HeaderText="Изображение:">
                <ItemTemplate>
                    <asp:Image ID="galleryImage" ImageUrl='<%# String.Format("/Media/{0}/{1}/thumbs/{2}", lblProductType.Text, txtModel.Text, Eval("Hyperlink")) %>' runat="server" />
                </ItemTemplate>
            </asp:TemplateField>
            <asp:CommandField ShowSelectButton="True" SelectText="Изтрий" />
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
    <br />
    <asp:Label ID="glryImage" runat="server" Text="Галерия:"></asp:Label>
    <input name="multiFiles" id="multiFiles" type="file" />
    <br />
    <asp:Button ID="Saveproduct" runat="server" OnClick="SaveProduct" Text="Запази" />
    <asp:Button ID="DeleteProduct" runat="server" OnClick="DeleteProduct_Click" Text="Изтрий" />
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsHolder" runat="server">
    <script>
        $(document).ready(function () {
            $("#singleFile").kendoUpload({
                select: onSelect,
                multiple: false
            });

            $("#multiFiles").kendoUpload({
                select: onSelect,
                multiple: true
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
    <script>
        $(document).ready(function () {
            $("#editor").kendoEditor({
                encoded: true
            });
            $('#MainContent_GenderList').kendoDropDownList();
            $('#MainContent_PolarizationList').kendoDropDownList();
        });
    </script>
    <style>
        #edit-product > span {
            display: inline-block;
            width: 120px;
        }
        #checkBoxTable {
            width: 690px;
        }
    </style>
</asp:Content>

