using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DemoApis.Migrations
{
    public partial class addingfk : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "departments",
                newName: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "departments",
                newName: "id");
        }
    }
}
