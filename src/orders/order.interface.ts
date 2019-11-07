// import {
//   OrderBuilder
// } from './order.builder'

interface IOrder {
    id: number;
    createdAt: Date;
    packages: any[];
    contact: any;
    carrier: any;
  }

class Order implements IOrder{
    id: number;
    createdAt: Date;
    packages: Package[];
    contact: Contact;
    carrier: Carrier;

    // constructor(orderBuilder: OrderBuilder) {
    //   this.id = orderBuilder.getId();
    //   this.createdAt = orderBuilder.getCreatedAt();
    //   this.packages = orderBuilder.getPackages();
    //   this.contact = orderBuilder.getContact();
    //   this.carrier = orderBuilder.getCarrier();
    // }
  }

  class Package {
    length: Size;
    width: Size;
    height: Size;
    weight: Size;
    products: Product[]
  }
  
  class Size {
    unit: string;
    value: number;
  }
  
  class Product {
    quantity: number;
    label: string;
    ean: string;
  }
  
  class Contact {
    firstname: string;
    lastname: string;
    phone: string;
    mail: string;
    billingAddress: Address;
    deliveryAddress: Address;
  }
  
  class Address {
    postalCode: string;
    city: string;
    addressLine1: string;
    addressLine2: string;
  }
  
  class Carrier {
    name: string;
    contact: CarrierContact;
  }
  
  class CarrierContact {
    firstname: string;
    lastname: string;
    phone: string;
    mail: string;
    headOfficeAddress: Address;
  }

export {IOrder, Order, Package, Contact, Carrier}