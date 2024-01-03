import { IClient } from "../models";

/* eslint-disable @typescript-eslint/no-unused-vars */
type IClienttEmailTemplate = Pick<IClient, "company_name" | "first_name" | "last_name">

export const createDemoRequestEmailTemplate = ({ first_name, last_name, company_name }: IClienttEmailTemplate) => {
  return `
  
  Dear ${first_name} ${last_name},
  
  Thank you for your interest in our Transportation Management System (TMS) product! We are thrilled to receive your request for a demo. Our team is dedicated to providing you with the best possible experience, and we can't wait to show you the capabilities of our TMS solution designed for carriers and brokers like ${company_name}.
  
  One of our representatives will be in touch with you shortly to schedule the demo. We want to ensure that the demo is tailored to your specific needs, so please let us know if there are any specific features or areas you would like us to focus on during the demonstration.
  
  In the meantime, if you have any questions or need any further information, please feel free to reach out to us at info@nebulagroup.us. Our team is always here to assist you.
  
  Thank you again for considering NebulaGTS. We look forward to the opportunity to demonstrate how our TMS product can benefit your carrier and brokerage operations.
  
  Best regards,
  NebulaGTS
  info@nebulagroup.us
  +1 (630) 618-9438`;
};