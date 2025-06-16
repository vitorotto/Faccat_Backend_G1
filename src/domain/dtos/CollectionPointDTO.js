export class CollectionPointDTO {
    constructor({
        name,
        description,
        latitude,
        longitude,
        city,
        uf,
        address,
        types,
        operating_hours,
        contact,
        userId
    }) {
        this.name = name;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = city;
        this.uf = uf;
        this.address = address;
        this.types = types;
        this.operating_hours = operating_hours;
        this.contact = contact;
        this.userId = userId;
    }
}
