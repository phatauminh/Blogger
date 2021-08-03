﻿using Domain.Entities;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedDefaultUserAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var administratorRole = new IdentityRole("Administrator");

            if (roleManager.Roles.All(r => r.Name != administratorRole.Name))
            {
                await roleManager.CreateAsync(administratorRole);
            }

            var administrator = new ApplicationUser { UserName = "administrator@localhost", Email = "administrator@localhost" };

            if (userManager.Users.All(u => u.UserName != administrator.UserName))
            {
                await userManager.CreateAsync(administrator, "Administrator1!");
                await userManager.AddToRolesAsync(administrator, new[] { administratorRole.Name });
            }
        }

        public static async Task SeedSampleDataAsync(ApplicationDbContext context)
        {
            if (!context.Categories.Any())
            {
                context.Categories.Add(new Category
                {
                    Name = "Shopping",
                    Items =
                    {
                        new Item { Name = "Apples" },
                        new Item { Name = "Milk"},
                        new Item { Name = "Bread"},
                        new Item { Name = "Toilet paper"},
                        new Item { Name = "Pasta" },
                        new Item { Name = "Tissues" },
                        new Item { Name = "Tuna" },
                        new Item { Name = "Water" }
                    }
                });

                await context.SaveChangesAsync();
            }
        }
    }
}
