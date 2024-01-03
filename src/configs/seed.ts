import { sequelize } from ".";
import { companyService, userService } from "../services";
import { ECompanyType, EUserRole } from "../types";

async function main() {
  const password = "hellocarrier";

  await sequelize.sync({ alter: true, force: false });

  let admin = await userService.one({
    where: {
      email: "admin@gmail.com"
    }
  });

  if (!admin) {
    admin = await userService.create({
      email: "admin@gmail.com",
      password,
      role: EUserRole.Admin,
      is_password_changed: true,
      is_owner: true
    });
    console.log("Admin created");
  }

  let carrier = await userService.one({
    where: {
      email: "carrier@gmail.com"
    }
  });

  if (!carrier) {
    carrier = await userService.create({
      email: "carrier@gmail.com",
      password,
      role: EUserRole.Carrier,
      is_password_changed: true,
      is_owner: true
    });
    console.log("Carrier created");
  }

  let broker = await userService.one({
    where: {
      email: "broker@gmail.com"
    }
  });

  if (!broker) {
    broker = await userService.create({
      email: "broker@gmail.com",
      password,
      role: EUserRole.Broker,
      is_password_changed: true,
      is_owner: true
    });
    console.log("Broker created");
  }

  if (!carrier.company_id) {
    const company = await companyService.create({
      email: "company@gmail.com",
      name: "Company",
      type: ECompanyType.Carrier
    });

    carrier.company_id = company.id;

    await userService.update({
      company_id: company.id
    }, {
      where: {
        id: carrier.id
      }
    });

    console.log("Company created for carrier");
  }

  if(!broker.company_id) {
    const company = await companyService.create({
      email: "broker@gmail.com",
      name: "Broker Company",
      type: ECompanyType.Broker
    });

    broker.company_id = company.id;

    await userService.update({
      company_id: company.id
    }, {
      where: {
        id: broker.id
      }
    });

    console.log("Company created for broker");
  }
}

main();