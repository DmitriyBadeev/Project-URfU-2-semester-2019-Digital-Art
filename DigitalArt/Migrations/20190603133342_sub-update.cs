using Microsoft.EntityFrameworkCore.Migrations;

namespace DigitalArt.Migrations
{
    public partial class subupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SubscriberId",
                table: "Subscriptions",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubscriberId",
                table: "Subscriptions");
        }
    }
}
