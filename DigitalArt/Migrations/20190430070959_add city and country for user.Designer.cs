﻿// <auto-generated />
using System;
using DigitalArt.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DigitalArt.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20190430070959_add city and country for user")]
    partial class addcityandcountryforuser
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DigitalArt.Models.Artwork", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<byte[]>("Art");

                    b.Property<int?>("AuthorId");

                    b.Property<int>("CountViews");

                    b.Property<DateTime>("DateOfPublication");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.ToTable("Artworks");
                });

            modelBuilder.Entity("DigitalArt.Models.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ArtworkId");

                    b.Property<int?>("AuthorId");

                    b.Property<string>("CommentString");

                    b.Property<DateTime>("DateOfPublication");

                    b.HasKey("Id");

                    b.HasIndex("ArtworkId");

                    b.HasIndex("AuthorId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("DigitalArt.Models.Like", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ArtworkId");

                    b.Property<int?>("LikedUserId");

                    b.HasKey("Id");

                    b.HasIndex("ArtworkId");

                    b.HasIndex("LikedUserId");

                    b.ToTable("Likes");
                });

            modelBuilder.Entity("DigitalArt.Models.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ArtworkId");

                    b.Property<string>("TagName");

                    b.HasKey("Id");

                    b.HasIndex("ArtworkId");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("DigitalArt.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("About");

                    b.Property<byte[]>("Avatar");

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<DateTime>("DateOfBirthDay");

                    b.Property<string>("Email");

                    b.Property<string>("LastName");

                    b.Property<string>("Name");

                    b.Property<string>("Password");

                    b.Property<string>("Role");

                    b.Property<string>("Status");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DigitalArt.Models.Artwork", b =>
                {
                    b.HasOne("DigitalArt.Models.User", "Author")
                        .WithMany("Artworks")
                        .HasForeignKey("AuthorId");
                });

            modelBuilder.Entity("DigitalArt.Models.Comment", b =>
                {
                    b.HasOne("DigitalArt.Models.Artwork", "Artwork")
                        .WithMany("Comments")
                        .HasForeignKey("ArtworkId");

                    b.HasOne("DigitalArt.Models.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId");
                });

            modelBuilder.Entity("DigitalArt.Models.Like", b =>
                {
                    b.HasOne("DigitalArt.Models.Artwork", "Artwork")
                        .WithMany("Likes")
                        .HasForeignKey("ArtworkId");

                    b.HasOne("DigitalArt.Models.User", "LikedUser")
                        .WithMany()
                        .HasForeignKey("LikedUserId");
                });

            modelBuilder.Entity("DigitalArt.Models.Tag", b =>
                {
                    b.HasOne("DigitalArt.Models.Artwork", "Artwork")
                        .WithMany("Tags")
                        .HasForeignKey("ArtworkId");
                });
#pragma warning restore 612, 618
        }
    }
}