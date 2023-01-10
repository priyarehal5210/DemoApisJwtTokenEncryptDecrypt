using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DemoApis.Migrations
{
    public partial class addingcheckmecolinsingle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "checkme",
                table: "singleDatasetTabels",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "checkme",
                table: "singleDatasetTabels");
        }
    }
}
