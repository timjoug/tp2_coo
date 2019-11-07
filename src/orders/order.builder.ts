import {
    Order,
    Package, 
    Contact, 
    Carrier
} from './order.interface'

export class OrderBuilder{
    private id: number;
    private createdAt: Date;
    private packages: Package[];
    private contact: Contact;
    private carrier: Carrier;

    constructor() {}

    public setId(id: number): OrderBuilder {
        this.id = id;
        return this;
    }
    
    public setCreatedAt(createdAt: Date): OrderBuilder {
        this.createdAt = createdAt;
        return this;
    }

    public setPackages(packages: Package[]): OrderBuilder {
        this.packages = packages;
        return this;
    }

    public setContact(contact: Contact): OrderBuilder {
        this.contact = contact;
        return this;
    }

    public setCarrier(carrier: Carrier): OrderBuilder {
        this.carrier = carrier;
        return this;
    }

    public getId(): number {
        return this.id;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getPackages(): Package[] {
        return this.packages;
    }

    public getContact(): Contact {
        return this.contact;
    }

    public getCarrier(): Carrier {
        return this.carrier;
    }

    public build(): Order {
        let fakeProfile: any = {
            firstname: 'Chuck',
            lastname: 'Norris',
            phone: '+33 666666666',
            mail: 'chuck.norris@god.best',
            billingAddress: {
              postalCode: '666',
              city: 'Phoenix',
              addressLine1: '666 Texas Ranger Street',
              addressLine2: '',
            },
            deliveryAddress: {
              postalCode: '666',
              city: 'Phoenix',
              addressLine1: '666 Texas Ranger Street',
              addressLine2: '',
            },
          };
        return new Order(fakeProfile);
    }
}