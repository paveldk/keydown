<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddProduct.aspx.cs" Inherits="SunglassesCMS.Products.AddProduct" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Label ID="txtSuccess" Visible="false" runat="server" CssClass="title-success" Text="Промените бяха записани успешно"></asp:Label>
    <h2>Добавяне на продукт</h2>

    <asp:Panel ID="pnlLeft" Width="35%" CssClass="float-left" runat="server">
        <h3>Избор на категория</h3>

        <asp:GridView ID="gvProductTypes" runat="server" AutoGenerateColumns="False" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CellPadding="4" DataKeyNames="ProductTypeID" DataSourceID="EntityDataSourceTypes" ForeColor="Black" GridLines="Vertical" OnSelectedIndexChanged="gvProductTypes_SelectedIndexChanged">
            <AlternatingRowStyle BackColor="White" />
            <Columns>
                <asp:BoundField DataField="ProductTypeID" HeaderText="Номер" ReadOnly="True" SortExpression="ProductTypeID" />
                <asp:BoundField DataField="Name" HeaderText="Име" SortExpression="Name" />
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
        <asp:EntityDataSource ID="EntityDataSourceTypes" runat="server" ConnectionString="name=keydowno_sunglassesEntities" DefaultContainerName="keydowno_sunglassesEntities" EnableFlattening="False" EntitySetName="ProductTypes">
        </asp:EntityDataSource>

        <h3>Избор на марка</h3>
        <div id="brands-div">
            <asp:GridView ID="gvBrands" runat="server" AutoGenerateColumns="False" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CellPadding="4" DataKeyNames="BrandID" DataSourceID="EntityDataSourceBrands" ForeColor="Black" GridLines="Vertical">
                <AlternatingRowStyle BackColor="White" />
                <Columns>
                    <asp:BoundField DataField="BrandID" HeaderText="ID" ReadOnly="True" SortExpression="BrandID" />
                    <asp:ImageField DataImageUrlField="Image" HeaderText="Картинка">
                    </asp:ImageField>
                    <asp:BoundField DataField="Name" HeaderText="Име" SortExpression="Name" />
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
        </div>
        <asp:EntityDataSource ID="EntityDataSourceBrands" runat="server" ConnectionString="name=keydowno_sunglassesEntities" DefaultContainerName="keydowno_sunglassesEntities" EnableFlattening="False" EntitySetName="ProductBrands" Where="it.[Visible] = true">
        </asp:EntityDataSource>
    </asp:Panel>
    <asp:Panel ID="pnlRight" Width="60%" CssClass="float-left" runat="server">

        <h3>Информация за продукта</h3>

        <asp:Label ID="lbl" runat="server" Text="Модел"></asp:Label>
        <asp:TextBox ID="txtModel" runat="server"></asp:TextBox>
        <asp:RequiredFieldValidator ID="RequiredFieldValidatorModel" CssClass="field-validation-error" ControlToValidate="txtModel" runat="server" ErrorMessage="Моделът е задължителен" Display="Dynamic"></asp:RequiredFieldValidator>
        <asp:CustomValidator ID="validatorTypeBrandSelected" ErrorMessage="Не сте избрали категория и марка на продукт" ControlToValidate="txtModel" runat="server" OnServerValidate="validatorTypeBrandSelected_ServerValidate" Display="Dynamic" CssClass="field-validation-error"></asp:CustomValidator>
        <asp:CustomValidator ID="validatorUniqueBrandModel" runat="server" ErrorMessage="За избраната марка вече съществува продукт с този модел" ControlToValidate="txtModel" OnServerValidate="validatorUniqueBrandModel_ServerValidate" Display="Dynamic" CssClass="field-validation-error"></asp:CustomValidator>

        <br />
        <asp:Label ID="lblDescription" runat="server" Text="Описание"></asp:Label>
        <%--<asp:TextBox TextMode="MultiLine" ID="txtDescription" runat="server"></asp:TextBox>--%>
        <asp:TextBox ID="editor" ClientIDMode="Static" runat="server" TextMode="MultiLine" Rows="5" Columns="28" Width="690" Height="220"></asp:TextBox>
        <asp:RequiredFieldValidator Display="Dynamic" ID="RequiredFieldValidator4" CssClass="field-validation-error" ControlToValidate="editor" runat="server" ErrorMessage="Описанието е задължително"></asp:RequiredFieldValidator>
        <br />
        <asp:Label ID="lblOldPrice" runat="server" Text="Стара Цена:"></asp:Label>
        <asp:TextBox ID="txtOldPrice" runat="server" Width="100px"></asp:TextBox>
        <asp:RegularExpressionValidator Display="Dynamic" ID="NumbersValidator" CssClass="field-validation-error" runat="server" ControlToValidate="txtOldPrice" ErrorMessage="Моля използвайте само цифри" ValidationExpression="^[0-9]+(\.[0-9]+)?$"></asp:RegularExpressionValidator>
        <asp:RequiredFieldValidator Display="Dynamic" ID="RequiredFieldValidator1" CssClass="field-validation-error" ControlToValidate="txtOldPrice" runat="server" ErrorMessage="Старата цена е задължителна"></asp:RequiredFieldValidator>
        <br />
        <asp:Label ID="lblNewPrice" runat="server" Text="Нова Цена:"></asp:Label>
        <asp:TextBox ID="txtNewPrice" runat="server" Width="100px"></asp:TextBox>
        <asp:RegularExpressionValidator Display="Dynamic" ID="NumbersOnlyValidator" CssClass="field-validation-error" runat="server" ControlToValidate="txtNewPrice" ErrorMessage="Моля използвайте само цифри" ValidationExpression="^[0-9]+(\.[0-9]+)?$"></asp:RegularExpressionValidator>
        <asp:RequiredFieldValidator Display="Dynamic" ID="RequiredFieldValidator2" CssClass="field-validation-error" ControlToValidate="txtNewPrice" runat="server" ErrorMessage="Новата цена е задължителна"></asp:RequiredFieldValidator>
        <br />
        <asp:Label ID="lblQuantity" runat="server" Text="Количество:"></asp:Label>
        <asp:TextBox ID="txtQuantity" runat="server" Width="100px"></asp:TextBox>
        <asp:RegularExpressionValidator Display="Dynamic" ID="QuantityValidation" CssClass="field-validation-error" runat="server" ControlToValidate="txtQuantity" ErrorMessage="Моля използвайте само цифри" ValidationExpression="^[0-9]+(\.[0-9]+)?$"></asp:RegularExpressionValidator>
        <asp:RequiredFieldValidator Display="Dynamic" ID="RequiredFieldValidator3" CssClass="field-validation-error" ControlToValidate="txtQuantity" runat="server" ErrorMessage="Количеството е задължително"></asp:RequiredFieldValidator>
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
        <asp:RequiredFieldValidator Display="Dynamic" ID="GenderValidator" CssClass="field-validation-error" runat="server" ControlToValidate="GenderList" ErrorMessage="Изберете пол"></asp:RequiredFieldValidator>
        <br />
        <br />
        <asp:Label ID="isOutlet" runat="server" Text="Добави към outlet:"></asp:Label>
        &nbsp;<asp:CheckBox ID="outlet" runat="server" />
        <br />
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
        <%--<asp:Label runat="server" Text="Избрани цветове:"></asp:Label>
        <asp:CheckBoxList ID="cbColors" runat="server">
        </asp:CheckBoxList>
        <br />
        <asp:Label runat="server" Text="Избрани материали:"></asp:Label>
        <asp:CheckBoxList ID="cbMaterials" runat="server">
        </asp:CheckBoxList>
        <br />
        <asp:Label runat="server" Text="Избрани форми на лице:"></asp:Label>
        <asp:CheckBoxList ID="cbShapes" runat="server">
        </asp:CheckBoxList>--%>
        <br />
        <asp:Label ID="lblSize" runat="server" Text="Размери:"></asp:Label>
        <asp:TextBox ID="txtSize" runat="server"></asp:TextBox>
        <br />
        <asp:Label ID="Label2" runat="server" Text="Поляризация:"></asp:Label>
        <asp:DropDownList ID="PolarizationList" runat="server">
            <asp:ListItem Value="1">Да</asp:ListItem>
            <asp:ListItem Value="0">Не</asp:ListItem>
        </asp:DropDownList>
        <br />
        <asp:Label ID="Label3" runat="server" Text="Диоптри от:"></asp:Label>
        <asp:TextBox ID="DioptersFrom" runat="server" Width="100px"></asp:TextBox>
        <asp:Label ID="Label4" runat="server" Text="До" Width="20px"></asp:Label>
        <asp:TextBox ID="DioptersTo" runat="server" Width="100px"></asp:TextBox>
        <asp:RegularExpressionValidator Display="Dynamic" ID="DioptersFromValidation" CssClass="field-validation-error" runat="server" ControlToValidate="DioptersFrom" ErrorMessage="Моля използвайте само цифри" ValidationExpression="^[0-9]+(\.[0-9]+)?$"></asp:RegularExpressionValidator>
        <asp:RegularExpressionValidator Display="Dynamic" ID="DiopterTo" runat="server" CssClass="field-validation-error" ControlToValidate="DioptersTo" ErrorMessage="Моля използвайте само цифри" ValidationExpression="^[0-9]+(\.[0-9]+)?$"></asp:RegularExpressionValidator>
        <br />
        <asp:Label ID="Label5" runat="server" Text="Диоптри стъкла:"></asp:Label>
        <asp:TextBox ID="DiopstersStep" runat="server" Width="100px"></asp:TextBox>
        <asp:RegularExpressionValidator Display="Dynamic" ID="DiopterStepValidation" CssClass="field-validation-error" runat="server" ControlToValidate="DiopstersStep" ErrorMessage="Моля използвайте само цифри" ValidationExpression="^[0-9]+(\.[0-9]+)?$"></asp:RegularExpressionValidator>
        <br />
        <br />
    </asp:Panel>
    <asp:Label ID="Label1" Visible="false" runat="server" CssClass="title-success" Text="Промените бяха записани успешно"></asp:Label>
    <div id="addImage">
        <h3>Добавяне на главна картинка:</h3>
        <br />
        <asp:Label ID="lblImage" runat="server" Text="Изображение:"></asp:Label>
        <br />
        <input name="singleFiles" id="singleFile" type="file" />
        <br />
        <h3>Добавяне на галерия:</h3>
        <asp:Label ID="glryImage" runat="server" Text="Галерия:"></asp:Label>
        <input name="multiFiles" id="multiFiles" type="file" />
        <br />
        <asp:Button ID="btnSubmit" UseSubmitBehavior="true" runat="server" Text="Съхрани" OnClick="btnSubmit_Click" />
    </div>
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
                    alert("The maximum file size can be 8mb! Your file is " + files[i].size / 1024000 + "MB")
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
        #MainContent_gvProductTypes td, th {
            padding-left: 5px;
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

        #brands-div {
            padding-right: 35px;
        }

        #MainContent_pnlRight > span {
            display: inline-block;
            width: 120px;
        }
        #checkBoxTable {
            width: 690px;
        }
    </style>


</asp:Content>
