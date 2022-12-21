using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DemoApis.Migrations
{
    public partial class addingcol : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsOkay",
                table: "employees",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsOkay",
                table: "employees");
        }
    }
}
